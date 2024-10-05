import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const bod = await req.formData();

  // Upload to csecu server
  const apiRes = await fetch(`${process.env.API_BASE_URL}/upload`, {
    method: "POST",
    body: bod,
  });

  if (apiRes.ok) {
    return NextResponse.json(await apiRes.json(), { status: apiRes.status });
  }

  const r = await apiRes.text();
  return NextResponse.json({ found: r }, { status: apiRes.status });
}
