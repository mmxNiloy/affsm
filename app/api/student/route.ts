import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return NextResponse.json({ message: "Session expired!" }, { status: 403 });
  }

  const apiRes = await fetch("https://api.bike-csecu.com/api/student", {
    headers: {
      Authorization: `bearer ${sessionCookie.value}`,
    },
  });

  return NextResponse.json(await apiRes.json(), { status: apiRes.status });
}
