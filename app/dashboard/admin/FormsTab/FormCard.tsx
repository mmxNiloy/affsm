"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Exam, Form } from "@/util/types";
import Icons from "@/app/components/Icons";
import { Button } from "@/components/ui/button";
import {
  getClearanceLevel,
  getExamName,
  isFormApproved,
  isFormRejected,
  toDD_MM_YYYY,
} from "@/util/Functions";
import UserContext from "@/app/providers/UserContext";
import SubmissionCardSkeleton from "@/app/components/DashboardComponents/Tabs/SubmissionsTab/SubmissionCardSkeleton";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import FormDetailDialog from "./FormDetailDialog";

type Props = {
  form: Form;
};

export default function FormCard({ form }: Props) {
  const { user } = useContext(UserContext);

  const { toast } = useToast();

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [gotExamInfo, setGotExamInfo] = useState<boolean>(false);
  const [examInfo, setExamInfo] = useState<Exam>();

  const getExamInfo = useCallback(async () => {
    if (gotExamInfo) return;

    setLoading(true);

    const apiRes = await fetch(`/api/exam/${form.exam_id}`, {
      method: "GET",
    });

    if (apiRes.ok) {
      setExamInfo((await apiRes.json()) as Exam);
      setGotExamInfo(true);
    } else {
      setGotExamInfo(false);
      setExamInfo(undefined);
    }

    setLoading(false);
  }, [form, gotExamInfo]);

  const getExamYear = () => {
    if (!examInfo) return "N/A";

    return new Date(examInfo.exam_start_date).getFullYear().toString();
  };

  const approveForm = useCallback(async () => {
    const apiRes = await fetch(`/api/form/approve?id=${form.form_id}`, {
      method: "PUT",
    });

    if (apiRes.ok) {
      toast({
        title: "Approved Form!",
        description: `Successfully approved form #${form.form_id}. Reload the page to sync changes.`,
      });

      router.refresh();
      return;
    } else {
      toast({
        title: "Approval failed!",
        description: `Failed to approve form #${form.form_id}. Try again later.`,
        variant: "destructive",
      });
    }
  }, [form, router, toast]);

  const rejectForm = useCallback(async () => {
    const apiRes = await fetch(`/api/form/reject?id=${form.form_id}`, {
      method: "PUT",
    });

    if (apiRes.ok) {
      toast({
        title: "Rejected Form!",
        description: `Successfully rejected form #${form.form_id}. Reload the page to sync changes.`,
        variant: "destructive",
      });

      router.refresh();
      return;
    } else {
      toast({
        title: "Rejection failed!",
        description: `Failed to reject form #${form.form_id}. Try again later.`,
        variant: "destructive",
      });
    }
  }, [form, router, toast]);

  useEffect(() => {
    getExamInfo();
  }, [getExamInfo]);

  if (!user) return <SubmissionCardSkeleton />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {examInfo ? getExamName(examInfo) : "Loading exam information..."}{" "}
          {examInfo && examInfo.exam_session !== getExamYear() && (
            <>(Held on {getExamYear()})</>
          )}
        </CardTitle>
        <CardDescription>
          Submitted by: {form.student_id}
          <br />
          Submitted at: {toDD_MM_YYYY(form.form_submission_time)}
          <br />
          {examInfo && <>Start: {toDD_MM_YYYY(examInfo.exam_start_date)}</>}
          <br />
          {examInfo && examInfo.exam_end_date && (
            <>
              End : {toDD_MM_YYYY(examInfo.exam_end_date)}
              <br />
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* TODO: Think of some content here */}
        {/* Maybe a stepper or breadcrumbs? */}
        TODO
        <p>Clearance Level: {form.clearance_level}</p>
      </CardContent>
      <CardFooter className="flex flex-row gap-1 md:gap-2">
        {isFormApproved(form) && (
          <a href={`/pdf/admit/${form.form_id}`} target="_blank">
            <Button className="gap-1 md:gap-2 items-center bg-green-500 hover:bg-green-400 text-white">
              <Icons.fileText />
              Download Admit Card
            </Button>
          </a>
        )}

        <a href={`/pdf/${form.form_id}`} target="_blank">
          <Button className="gap-1 md:gap-2 items-center bg-blue-500 hover:bg-blue-400 text-white">
            <Icons.printer />
            Print Form
          </Button>
        </a>

        {!loading && examInfo && (
          <FormDetailDialog form={form} exam={examInfo} />
        )}

        <span className="flex flex-grow" />

        <Button
          onClick={approveForm}
          disabled={
            getClearanceLevel(user!) < form.clearance_level ||
            isFormRejected(form) ||
            isFormApproved(form) ||
            loading
          }
          className="gap-1 md:gap-2 items-center bg-green-500 hover:bg-green-400 text-white"
        >
          <Icons.check />
          Approve
        </Button>

        <Button
          onClick={rejectForm}
          variant={"destructive"}
          disabled={
            getClearanceLevel(user!) < form.clearance_level ||
            isFormRejected(form) ||
            isFormApproved(form) ||
            loading
          }
          className="gap-1 md:gap-2 items-center"
        >
          <Icons.cross />
          Reject
        </Button>
      </CardFooter>
    </Card>
  );
}
