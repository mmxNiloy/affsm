"use client";

import dynamic from "next/dynamic";
import { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "@/app/providers/UserContex";
import MyLoadingSpinner from "@/app/components/MyLoadingSpinner";
import { Exam, FormDetail, StudentAddress, User } from "@/util/types";
import Icons from "@/app/components/Icons";
const DynamicPDFViewer = dynamic(
  () => import("../../../components/DashboardComponents/PDF/MyPDFViewer"),
  {
    ssr: false,
  }
);

export default function AcademicFormAdmitCardPDF({
  params,
}: {
  params: { id: string };
}) {
  const [form, setForm] = useState<FormDetail>();
  const [exam, setExam] = useState<Exam>();
  const [student, setStudent] = useState<User>();

  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const fetchData = useCallback(async () => {
    if (form && exam && student) return;

    setLoading(true);

    try {
      const fid = Number.parseInt(params.id);
      const req = await fetch(`/api/form/${fid}`);
      if (req.ok) {
        const data = (await req.json()) as FormDetail;

        // Get exam data
        const examRes = await fetch(`/api/exam/${data.exam_id}`);
        if (examRes.ok) {
          setExam((await examRes.json()) as Exam);
        } else setExam(undefined);

        // Get student information
        const stuRes = await fetch(`/api/student/${data.student_id}`);
        if (stuRes.ok) {
          setStudent((await stuRes.json()) as User);
        } else setStudent(undefined);

        setForm(data);
      } else setForm(undefined);
    } catch (err) {
      setForm(undefined);
    }

    setLoading(false);
  }, [exam, form, params.id, student]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <MyLoadingSpinner />;
  if (!user)
    return (
      <div className="flex w-full h-64 items-center justify-center text-center">
        Authenticating...
      </div>
    );
  if (!form || !student || !exam)
    return (
      <div className="flex flex-col gap-1 w-full h-64 text-center items-center justify-center">
        <Icons.rabbit size={64} />
        Oops, Something went wrong! Form not found.
      </div>
    );

  return (
    <div className="flex items-center justify-center">
      <DynamicPDFViewer form={form} exam={exam} student={student} admitCard />
    </div>
  );
}
