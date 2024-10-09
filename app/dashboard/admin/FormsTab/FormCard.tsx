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
import { Exam, Form, User } from "@/util/types";
import Icons from "@/app/components/Icons";
import { Button } from "@/components/ui/button";
import {
  getClearanceLevel,
  getExamName,
  isFormApproved,
  isFormRejected,
  toDD_MM_YYYY,
  toOrdinal,
} from "@/util/Functions";
import UserContext from "@/app/providers/UserContext";
import SubmissionCardSkeleton from "@/app/components/DashboardComponents/Tabs/SubmissionsTab/SubmissionCardSkeleton";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import FormDetailDialog from "./FormDetailDialog";
import {
  Stepper,
  StepperConnector,
  StepperItem,
  StepperList,
} from "@/app/components/DashboardComponents/Stepper";

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
      router.refresh();
      return;
    }
  }, [form, router, toast]);

  useEffect(() => {
    getExamInfo();
  }, [getExamInfo]);

  if (!user) return <SubmissionCardSkeleton />;

  return (
    <Card className="from-sky-200 to-lime-300 bg-gradient-to-br">
      <CardHeader>
        <CardTitle>
          {examInfo ? getExamName(examInfo) : "Loading exam information..."}{" "}
          {examInfo && examInfo.exam_session !== getExamYear() && (
            <>(Held on {getExamYear()})</>
          )}
        </CardTitle>
        <div className="flex gap-2 items-center justify-between">
          <CardDescription>
            Exam Center: {examInfo?.exam_centre}
          </CardDescription>
          <CardDescription>
            Start: {toDD_MM_YYYY(examInfo?.exam_start_date)}
          </CardDescription>

          {examInfo?.exam_end_date && (
            <CardDescription>
              End : {toDD_MM_YYYY(examInfo.exam_end_date)}
            </CardDescription>
          )}

          <CardDescription>
            Submitted at:{" "}
            {form.form_submission_time
              ? new Date(form.form_submission_time).toLocaleDateString("en-GB")
              : "N/A"}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {/* TODO: Think of some content here */}
        {/* Maybe a stepper or breadcrumbs? */}
        <Stepper>
          {form.clearance_level > 0 ? (
            form.clearance_level < 6 ? (
              <StepperList>
                <StepperItem
                  className="flex-col"
                  variant={form.clearance_level > 1 ? "success" : "warning"}
                >
                  <Icons.building className="size-4" /> Department
                </StepperItem>

                <StepperConnector
                  variant={form.clearance_level > 1 ? "fancy" : "default"}
                />

                <StepperItem
                  className="flex-col"
                  variant={
                    form.clearance_level > 2
                      ? "success"
                      : form.clearance_level == 2
                      ? "warning"
                      : "default"
                  }
                >
                  <Icons.userShield className="size-4" /> Provost
                </StepperItem>

                <StepperConnector
                  variant={form.clearance_level > 2 ? "fancy" : "default"}
                />

                <StepperItem
                  className="flex-col"
                  variant={
                    form.clearance_level > 3
                      ? "success"
                      : form.clearance_level == 3
                      ? "warning"
                      : "default"
                  }
                >
                  <Icons.accountant className="size-4" /> Accounts
                </StepperItem>

                <StepperConnector
                  variant={form.clearance_level > 3 ? "fancy" : "default"}
                />

                <StepperItem
                  className="flex-col"
                  variant={
                    form.clearance_level > 4
                      ? "success"
                      : form.clearance_level == 4
                      ? "warning"
                      : "default"
                  }
                >
                  <Icons.bank className="size-4" /> Bank
                </StepperItem>

                <StepperConnector
                  variant={form.clearance_level > 4 ? "fancy" : "default"}
                />

                <StepperItem
                  className="flex-col"
                  variant={
                    form.clearance_level > 5
                      ? "success"
                      : form.clearance_level == 5
                      ? "warning"
                      : "default"
                  }
                >
                  <Icons.adminUser className="size-4" /> Controller
                </StepperItem>
              </StepperList>
            ) : (
              <StepperList>
                <StepperItem className="flex-col" variant="success">
                  <Icons.fileApproved className="size-4" />
                  Approved
                </StepperItem>
              </StepperList>
            )
          ) : (
            <StepperList>
              <StepperItem className="flex-col" variant="destructive">
                <Icons.fileRejected className="size-4" />
                Rejected
              </StepperItem>
            </StepperList>
          )}
        </Stepper>
      </CardContent>
      <CardFooter className="flex flex-row gap-1 md:gap-2">
        {isFormApproved(form) && (
          <a
            href={`/api/pdf?form_id=${form.form_id}&as_admit=true`}
            target="_blank"
          >
            <Button className="gap-1 md:gap-2 items-center bg-green-500 hover:bg-green-400 text-white">
              <Icons.fileText />
              Download Admit Card
            </Button>
          </a>
        )}

        <a href={`/api/pdf?form_id=${form.form_id}`} target="_blank">
          <Button className="gap-1 md:gap-2 items-center bg-blue-500 hover:bg-blue-400 text-white">
            <Icons.visible />
            View Form
          </Button>
        </a>

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
