"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React, { useContext } from "react";
import StudentInformationGrid from "../InformationTab/StudentInformationGrid";
import UserContext from "@/app/providers/UserContext";
import AcademicFormContext from "@/app/providers/AcademicFormContext";
import { getExamName, toDD_MM_YYYY } from "@/util/Functions";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MyLoadingSpinner from "@/app/components/MyLoadingSpinner";

export default function ConfirmationTab() {
  const { user } = useContext(UserContext);
  const { acknowledgementsForm, courseSelectionForm, setIsValidConfirmation } =
    useContext(AcademicFormContext);

  if (!user) return <MyLoadingSpinner />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirm your information</CardTitle>
        <CardDescription>
          Confirm your information again before submission. Once submitted you
          cannot change your information unless requested. Requests for change
          may take long formal procedures. Make sure the given information is
          correct.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-1 md:gap-2">
        <p>
          I seek permission to participate in the upcoming{" "}
          {acknowledgementsForm && acknowledgementsForm.exam ? (
            <b>
              {getExamName(acknowledgementsForm.exam) +
                ` starting at ${toDD_MM_YYYY(
                  acknowledgementsForm.exam.exam_start_date
                )}`}
            </b>
          ) : (
            <b>
              <i>Please select an exam you want to sit in</i>
            </b>
          )}
          . I pledge that I&apos;ll oblige by the decisions made by the
          officials.
        </p>

        {courseSelectionForm && (
          <div className="flex flex-col gap-1 md:gap-2">
            <div className="w-full">
              <Label htmlFor="form-type-input">Form type</Label>
              <Input
                id="form-type-input"
                disabled
                value={courseSelectionForm.formType}
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Index</TableHead>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Course Type</TableHead>
                  <TableHead>Credit</TableHead>
                  <TableHead>Exam Minutes</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {/* Render selected courses */}
                {courseSelectionForm.courses.map((course, index) => (
                  <TableRow key={`course-checkbox-${course.course_id}`}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{course.course_code}</TableCell>
                    <TableCell>{course.course_title}</TableCell>
                    <TableCell>{course.course_type}</TableCell>
                    <TableCell>{course.credit}</TableCell>
                    <TableCell>{course.exam_minutes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableCaption>
                List of selected courses for{" "}
                {acknowledgementsForm && acknowledgementsForm.exam
                  ? getExamName(acknowledgementsForm?.exam!)
                  : "Please select an exam you want to sit in."}
              </TableCaption>
            </Table>
          </div>
        )}

        <StudentInformationGrid user={user} />
      </CardContent>

      <CardFooter>
        <div className="flex gap-1 md:gap-2">
          <Checkbox
            id="confirmation-checkbox"
            onCheckedChange={(chk) => {
              if (chk) setIsValidConfirmation(true);
              else setIsValidConfirmation(false);
            }}
          />
          <Label htmlFor="confirmation-checkbox">
            I affirm the correctness of the information and agree to the T&C set
            out by the academy.
          </Label>
        </div>
      </CardFooter>
    </Card>
  );
}
