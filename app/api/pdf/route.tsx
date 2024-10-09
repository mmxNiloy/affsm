import { renderToStream } from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";
import PdfFormPage1 from "./page_1";
import { getFormDetails } from "@/app/actions/getFormDetails";
import { getExamDetails } from "@/app/actions/getExamDetails";
import { getStudentInfo } from "@/app/actions/getStudentInfo";
import { cookies } from "next/headers";
import AdmitPDF from "./admit";
import { isFormApproved } from "@/util/Functions";

export async function GET(req: NextRequest) {
  const sessionCookie = cookies().get(process.env.USER_COOKIE!);
  if (!sessionCookie || sessionCookie.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again" },
      { status: 401 }
    );
  }

  const form_id = Number.parseInt(
    req.nextUrl.searchParams.get("form_id") ?? "0"
  );

  const as_admit = req.nextUrl.searchParams.get("as_admit") ?? "false";

  if (Number.isNaN(form_id) || form_id == 0)
    return NextResponse.json({ message: "Invalid form id" }, { status: 400 });

  // Get form full details here
  const form = await getFormDetails(form_id);
  const exam = await getExamDetails(form.exam_id);

  console.log("API > Generate PDF > Form found", form);
  console.log("API > Generate PDF > Form Exam", exam);

  const student = await getStudentInfo(form.student_id ?? 0);

  if (!student)
    return NextResponse.json(
      { message: "Student data not found!" },
      { status: 404 }
    );

  if (as_admit === "true" && isFormApproved(form)) {
    const stream = await renderToStream(
      <AdmitPDF {...{ form, exam, student }} />
    );

    return new NextResponse(stream as unknown as ReadableStream);
  }

  const stream = await renderToStream(
    <PdfFormPage1 {...{ form, exam, student }} />
  );

  return new NextResponse(stream as unknown as ReadableStream);
}
