"use client";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import Icons from "../../Icons";
import { Exam, FormDetail, User } from "@/util/types";

const MyPDFViewer = ({
  form,
  exam,
  student,
  admitCard,
}: {
  form: FormDetail;
  exam: Exam;
  student: User;
  admitCard?: boolean;
}) => {
  if (!Boolean(form))
    return (
      <div className="flex flex-col gap-1 h-64 w-full">
        <Icons.rabbit size={32} />
        Form not found!
      </div>
    );

  if (admitCard)
    return (
      <PDFViewer
        style={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <MyDocument form={form} exam={exam} student={student} admitCard />
      </PDFViewer>
    );

  return (
    <PDFViewer
      style={{
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <MyDocument form={form} exam={exam} student={student} />
    </PDFViewer>
  );
};

export default MyPDFViewer;
