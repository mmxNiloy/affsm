import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    { message: "This service is not ready yet." },
    { status: 501 }
  );
}
