import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sessionCookie = cookies().get(process.env.USER_COOKIE!);
  if (!sessionCookie) {
    return NextResponse.json({ message: "Session expired" }, { status: 403 });
  }

  const page = req.nextUrl.searchParams.get("page") ?? "1";
  const limit = req.nextUrl.searchParams.get("limit") ?? "10";

  const apiRes = await fetch(
    `${process.env.API_BASE_URL}/notice/my?page=${page}&limit=${limit}`,
    {
      headers: { Authorization: `bearer ${sessionCookie.value}` },
    }
  );
  return NextResponse.json(await apiRes.json(), { status: apiRes.status });
}
