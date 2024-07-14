import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const bod = await req.formData();

  // Upload to csecu server
  const apiRes = await fetch("http://localhost:5000/api/upload", {
    method: "POST",
    body: bod,
  });

  if (apiRes.ok) {
    return NextResponse.json(await apiRes.json(), { status: apiRes.status });
  }

  const r = await apiRes.text();
  return NextResponse.json({ found: r }, { status: apiRes.status });
}
