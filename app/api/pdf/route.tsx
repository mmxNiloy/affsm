import { renderToStream } from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";
import PdfFormPage1 from "./page_1";
import { getFormDetails } from "@/app/actions/getFormDetails";
import { getExamDetails } from "@/app/actions/getExamDetails";
import { getStudentInfo } from "@/app/actions/getStudentInfo";

export async function GET(req: NextRequest) {
  const form_id = Number.parseInt(
    req.nextUrl.searchParams.get("form_id") ?? "0"
  );

  // Get form full details here
  // const form = await getFormDetails(form_id);
  // const exam = await getExamDetails(form.exam_id);
  // const student = await getStudentInfo(form.student_id ?? 0);

  // if (!student)
  //   return NextResponse.json(
  //     { message: "Student data not found!" },
  //     { status: 404 }
  //   );

  const stream = await renderToStream(
    <PdfFormPage1
    // {...{ form, exam, student }}
    />
  );

  return new NextResponse(stream as unknown as ReadableStream);
}
