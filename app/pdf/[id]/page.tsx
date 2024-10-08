"use server";

import dynamic from "next/dynamic";
import { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "@/app/providers/UserContext";
import MyLoadingSpinner from "@/app/components/MyLoadingSpinner";
import { Exam, FormDetail, StudentAddress, User } from "@/util/types";
import Icons from "@/app/components/Icons";
import { getFormDetails } from "@/app/actions/getFormDetails";
import { getExamDetails } from "@/app/actions/getExamDetails";
import { getStudentInfo } from "@/app/actions/getStudentInfo";
import { getUser } from "@/app/actions/getUser";
import NoData from "@/app/components/NoData";
import MyPDFViewer from "../../components/DashboardComponents/PDF/MyPDFViewer";

export default async function AcademicFormPDF({
  params,
}: {
  params: { id: string };
}) {
  const form_id = Number.parseInt(params.id);

  const form = await getFormDetails(form_id);
  const exam = await getExamDetails(form.exam_id);
  const student = await getStudentInfo(form.student_id ?? 0);

  if (!student || form.form_id == 0 || exam.exam_id == 0) {
    return <NoData />;
  }

  return <MyPDFViewer form={form} exam={exam} student={student} />;
}
