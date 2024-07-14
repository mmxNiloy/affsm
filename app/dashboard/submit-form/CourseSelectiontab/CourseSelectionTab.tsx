"use client";
import AcademicFormContext from "@/app/providers/AcademicFormContext";
import {
  Card,
  CardFooter,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ExamCourse, FormType } from "@/util/types";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { getExamName } from "@/util/Functions";
import CourseTableSkeleton from "./CourseTableSkeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CourseSelectionTab() {
  const {
    acknowledgementsForm,
    setCourseSelectionForm,
    setIsValidCourseSelection,
  } = useContext(AcademicFormContext);

  const [courses, setCourses] = useState<ExamCourse[]>([]);
  const [gotCourses, setGotCourses] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedCourses, setSelectedCourses] = useState<boolean[]>([]);
  const [tncChecked, setTnCChecked] = useState<boolean>(false);
  const [formType, setFormType] = useState<FormType>();

  const getCourses = useCallback(async () => {
    if (gotCourses || !acknowledgementsForm) return;

    setLoading(true);
    const apiRes = await fetch(
      `/api/exam/course/${acknowledgementsForm.exam.exam_id}`
    );
    if (apiRes.ok) {
      const data = (await apiRes.json()) as ExamCourse[];
      setSelectedCourses(data.map((_) => false));
      setCourses(data);
      setGotCourses(true);
    } else setCourses([]);

    setLoading(false);
  }, [acknowledgementsForm, gotCourses]);

  useEffect(() => {
    getCourses();

    // Check if at least one course is selected
    const selections = courses.filter((_, index) => selectedCourses[index]);
    console.log("User selected courses", selections);
    if (selections.length > 0 && tncChecked && formType) {
      setIsValidCourseSelection(true);
      setCourseSelectionForm({ courses: selections, tncChecked, formType });
    } else setIsValidCourseSelection(false);
  }, [
    courses,
    formType,
    getCourses,
    selectedCourses,
    setCourseSelectionForm,
    setIsValidCourseSelection,
    tncChecked,
  ]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Selection</CardTitle>
        <CardDescription>Select courses for your exam.</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-1 md:gap-2">
        {/* Form type select */}
        <Select
          onValueChange={(val) => setFormType(val as FormType | undefined)}
        >
          <SelectTrigger value={undefined}>
            <SelectValue placeholder="Select Form Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Form Type</SelectLabel>
            </SelectGroup>

            <SelectItem value="Regular">Regular</SelectItem>
            <SelectItem value="Improvement">Improvement</SelectItem>
          </SelectContent>
        </Select>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Selection</TableHead>
              <TableHead>Course Code</TableHead>
              <TableHead>Course Title</TableHead>
              <TableHead>Course Type</TableHead>
              <TableHead>Credit</TableHead>
              <TableHead>Exam Minutes</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Table skeleton upon loading */}
            {loading && <CourseTableSkeleton />}

            {/* Render courses */}
            {courses.map((course, index) => (
              <TableRow key={`course-checkbox-${course.course_id}`}>
                <TableCell>
                  <Checkbox
                    id={`course-checkbox-component-${course.course_id}`}
                    onCheckedChange={(chk) => {
                      const tempSelections = [...selectedCourses];
                      if (chk) {
                        tempSelections[index] = true;
                      } else tempSelections[index] = false;

                      setSelectedCourses(tempSelections);
                    }}
                  />
                </TableCell>
                <TableCell>{course.course_code}</TableCell>
                <TableCell>{course.course_title}</TableCell>
                <TableCell>{course.course_type}</TableCell>
                <TableCell>{course.credit}</TableCell>
                <TableCell>{course.exam_minutes}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableCaption>
            List of available courses for{" "}
            {acknowledgementsForm && acknowledgementsForm.exam
              ? getExamName(acknowledgementsForm?.exam!)
              : "Please select an exam you want to sit in."}
          </TableCaption>
        </Table>
      </CardContent>

      <CardFooter className="flex gap-1 md:gap-2 items-center">
        <Checkbox
          id="course-selection-tnc-checkbox"
          disabled={loading}
          onCheckedChange={(chk) => {
            if (chk) {
              setTnCChecked(true);
            } else setTnCChecked(false);
          }}
        />
        <Label htmlFor="course-selection-tnc-checkbox">
          I confirm the correctness of the data and agree to the T&C set out by
          the academy.
        </Label>
      </CardFooter>
    </Card>
  );
}
