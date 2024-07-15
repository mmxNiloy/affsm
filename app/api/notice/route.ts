import { POST_Notice_Body } from "@/util/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page") ?? "1";
  const limit = req.nextUrl.searchParams.get("limit") ?? "10";

  const apiRes = await fetch(
    `https://api.bike-csecu.com/api/notice?page=${page}&limit=${limit}`
  );
  return NextResponse.json(await apiRes.json(), { status: apiRes.status });
}

export async function POST(req: NextRequest) {
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return NextResponse.json({ message: "Session expired" }, { status: 403 });
  }

  const reqBod = (await req.json()) as POST_Notice_Body;

  const apiRes = await fetch("https://api.bike-csecu.com/api/notice", {
    method: "POST",
    headers: {
      Authorization: `bearer ${sessionCookie.value}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(reqBod),
  });

  return NextResponse.json(await apiRes.json(), { status: apiRes.status });
}
