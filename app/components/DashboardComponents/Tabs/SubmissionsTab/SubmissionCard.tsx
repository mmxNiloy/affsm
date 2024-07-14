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
import { getExamName, toDD_MM_YYYY, toOrdinal } from "@/util/Functions";

type Props = {
  form: Form;
};

export default async function SubmissionCard({ form }: Props) {
  const apiRes = await fetch(`http://localhost:5000/api/exam/${form.exam_id}`, {
    method: "GET",
  });

  const examInfo = (await apiRes.json()) as Exam;
  const examYear = new Date(examInfo.exam_start_date).getFullYear().toString();

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
        <a href={`/pdf/admit/${form.form_id}`} target="_blank">
          <Button className="gap-1 md:gap-2 items-center bg-green-500 hover:bg-green-400">
            <Icons.fileText />
            Download Admit Card
          </Button>
        </a>

        <Button className="gap-1 md:gap-2 items-center">
          <Icons.visible />
          View
        </Button>
      </CardFooter>
    </Card>
  );
}
