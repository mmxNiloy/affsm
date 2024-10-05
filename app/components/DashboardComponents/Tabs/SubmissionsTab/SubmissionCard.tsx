"use server";
import React from "react";
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
  getExamName,
  isFormApproved,
  toDD_MM_YYYY,
  toOrdinal,
} from "@/util/Functions";
import SubmissionCardSkeleton from "./SubmissionCardSkeleton";
import { getExamDetails } from "@/app/actions/getExamDetails";
import {
  Stepper,
  StepperConnector,
  StepperItem,
  StepperList,
} from "../../Stepper";
import { cn } from "@/lib/utils";

type Props = {
  form: Form;
};

export default async function SubmissionCard({ form }: Props) {
  const examInfo = await getExamDetails(form.exam_id);
  const examYear = new Date(examInfo.exam_start_date).getFullYear().toString();

  return (
    <Card className="from-sky-200 to-lime-300 bg-gradient-to-br">
      <CardHeader>
        <CardTitle>
          {getExamName(examInfo)}{" "}
          {examInfo.exam_session !== examYear && <>(Held on {examYear})</>}
        </CardTitle>
        <div className="flex gap-2 items-center justify-between">
          <CardDescription>Exam Center: {examInfo.exam_centre}</CardDescription>
          <CardDescription>
            Start: {toDD_MM_YYYY(examInfo.exam_start_date)}
          </CardDescription>

          {examInfo.exam_end_date && (
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
        <div
          title={`Submission time: ${toDD_MM_YYYY(form.form_submission_time)}`}
          className="flex flex-row gap-1 md:gap-2 items-center"
        >
          <Icons.clock />
          <p>
            {new Date(
              form.form_submission_time ?? new Date()
            ).toLocaleDateString("en-GB")}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-1 md:gap-2">
        {/* TODO: Make download admit card available when the form has clearance level 6 */}
        {isFormApproved(form) && (
          <a href={`/pdf/admit/${form.form_id}`} target="_blank">
            <Button className="gap-1 md:gap-2 items-center bg-green-500 hover:bg-green-400">
              <Icons.fileText />
              Download Admit Card
            </Button>
          </a>
        )}

        {/* TODO: Should trigger a dialog to pop-up that shows the form details. */}
        {/* For reference: @/app/dashboard/admin/FormsTab/FormCard.tsx */}
        <Button className="gap-1 md:gap-2 items-center">
          <Icons.visible />
          View
        </Button>
      </CardFooter>
    </Card>
  );
}
