"use server";
import Icons from "@/app/components/Icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getExamName } from "@/util/Functions";
import { Course, Exam, Form, FormDetail, User } from "@/util/types";
import { cookies } from "next/headers";
import React from "react";

type Props = {
  form: Form;
};

export default async function FormDetailCoursesTable({ form }: Props) {
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return (
      <div className="flex flex-col gap-1 w-full h-64 items-center justify-center text-center">
        <Icons.rabbit />
        Session Expired. Login again!
      </div>
    );
  }

  const apiRes = await fetch(`http://localhost:5000/api/form/${form.form_id}`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${sessionCookie.value}`,
    },
  });
  const data = (await apiRes.json()) as FormDetail;
  const courses = data.courses;

  return (
    <Table className="w-full">
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
        {/* Render courses */}
        {courses.map((course, index) => (
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
    </Table>
  );
}
