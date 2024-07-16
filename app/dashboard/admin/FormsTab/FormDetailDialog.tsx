"use client";

import Icons from "@/app/components/Icons";
import UserContext from "@/app/providers/UserContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getClearanceLevel,
  getExamName,
  isFormApproved,
  isFormRejected,
  toDD_MM_YYYY,
} from "@/util/Functions";
import { Exam, Form, User } from "@/util/types";
import Image from "next/image";
import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import FormDetailCoursesTableSkeleton from "./FormDetailCoursesTableSkeleton";
import FormDetailCoursesTable from "./FormDetailCoursesTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import StudentInformationGrid from "../../submit-form/InformationTab/StudentInformationGrid";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type Params = {
  form: Form;
  exam: Exam;
};

export default function FormDetailDialog({ form, exam }: Params) {
  const { user } = useContext(UserContext);
  const [student, setStudent] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const getStudentInfo = useCallback(async () => {
    if (student) return;

    setLoading(true);

    // Make api request to get student information
    const apiRes = await fetch(`/api/student/${form.student_id}`);

    if (apiRes.ok) {
      const mStudent = (await apiRes.json()) as User;
      setStudent(mStudent);
    } else setStudent(undefined);

    setLoading(false);
  }, [form, student]);

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
    getStudentInfo();
  }, [getStudentInfo]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-1 md:gap-2 items-center">
          <Icons.visible />
          View
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm md:max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>{getExamName(exam)}</DialogTitle>
          <DialogDescription>
            Submitted By: {form.student_id} <br />
            Student Status: {form.student_status}
            <br />
            Submission Date: {toDD_MM_YYYY(form.form_submission_time)}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="w-full h-[65vh]">
          {/* Dialog content, show just like the submission form */}
          <div className="flex flex-col gap-1 md:gap-2">
            <div className="flex flex-col items-center justify-center gap-2">
              <Image
                src="/cu_logo.svg"
                className="dark:invert"
                height={64}
                width={43}
                alt="CU Logo"
              />
              <p className="text-lg font-bold">University of Chittagong</p>
            </div>

            <p className="font-bold">Application</p>
            <div className="container">
              <p className="font-semibold">Exam Controller</p>
              <p className="font-semibold">
                University of Chittagong, Chittagong
              </p>
              <p className="font-semibold">Sir,</p>
              <p>
                I request your permission to participate in the upcoming{" "}
                {exam ? (
                  <b>
                    {getExamName(exam) +
                      ` starting at ${toDD_MM_YYYY(exam.exam_start_date)}`}
                  </b>
                ) : (
                  <b>
                    <i>Please select an exam you want to sit in</i>
                  </b>
                )}
                . I pledge that I&apos;ll oblige by the decisions made by the
                officials.
              </p>
            </div>

            <p className="font-bold">Selected Courses</p>

            <Suspense fallback={<FormDetailCoursesTableSkeleton />}>
              <FormDetailCoursesTable form={form} />
            </Suspense>

            <Label htmlFor="student-status-input">Student Status</Label>
            <Input
              id="student-status-input"
              disabled
              value={form.student_status}
            />

            <p className="font-bold">Student Information</p>
            {student && <StudentInformationGrid user={student} />}
          </div>
        </ScrollArea>

        <DialogFooter>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
