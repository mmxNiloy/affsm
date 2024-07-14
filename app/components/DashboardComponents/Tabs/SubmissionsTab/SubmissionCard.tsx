"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import { getExamName, toDD_MM_YYYY, toOrdinal } from "@/util/Functions";
import SubmissionCardSkeleton from "./SubmissionCardSkeleton";

type Props = {
  form: Form;
};

export default function SubmissionCard({ form }: Props) {
  const [examInfo, setExamInfo] = useState<Exam>();
  const [examYear, setExamYear] = useState<string>("");

  const getExamInfo = useCallback(async () => {
    const apiRes = await fetch(
      `http://api.bike-csecu.com/api/exam/${form.exam_id}`,
      {
        method: "GET",
      }
    );

    const data = (await apiRes.json()) as Exam;
    setExamInfo(data);
    setExamYear(new Date(data.exam_start_date).getFullYear().toString());
  }, [form.exam_id]);

  useEffect(() => {
    getExamInfo();
  }, [getExamInfo]);

  if (!examInfo) return <SubmissionCardSkeleton />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {getExamName(examInfo)}{" "}
          {examInfo.exam_session !== examYear && <>(Held on {examYear})</>}
        </CardTitle>
        <CardDescription>
          Exam Center: {examInfo.exam_centre}
          <br />
          Start: {toDD_MM_YYYY(examInfo.exam_start_date)}
          <br />
          {examInfo.exam_end_date && (
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
        <p>Clearance Level: {form.clearance_level}</p>
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
        <a href={`/pdf/admit/${form.form_id}`} target="_blank">
          <Button className="gap-1 md:gap-2 items-center bg-green-500 hover:bg-green-400">
            <Icons.fileText />
            Download Admit Card
          </Button>
        </a>

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
