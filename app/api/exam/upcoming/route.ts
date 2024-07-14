import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return NextResponse.json({ message: "Session expired!" }, { status: 401 });
  }

  const session_id = sessionCookie.value ?? "";

  if (!Boolean(session_id) || session_id.length < 1)
    return NextResponse.json({ message: "Session expired" }, { status: 401 });

  const apiRes = await fetch("http://localhost:5000/api/exam/upcoming", {
    method: "GET",
    headers: {
      Authorization: `bearer ${session_id}`,
    },
  });

  return NextResponse.json(await apiRes.json(), { status: apiRes.status });
}
