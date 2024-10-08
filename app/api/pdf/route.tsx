import { renderToStream } from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";
import PdfFormPage1 from "./page_1";

export async function GET(req: NextRequest) {
  const stream = await renderToStream(<PdfFormPage1 />);
  return new NextResponse(stream as unknown as ReadableStream);
}
