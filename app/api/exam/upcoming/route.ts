import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionCookie = cookies().get(process.env.USER_COOKIE!);
  if (!sessionCookie) {
    return NextResponse.json({ message: "Session expired!" }, { status: 401 });
  }

  const session_id = sessionCookie.value ?? "";

  if (!Boolean(session_id) || session_id.length < 1)
    return NextResponse.json({ message: "Session expired" }, { status: 401 });

  const apiRes = await fetch(`${process.env.API_BASE_URL}/exam/upcoming`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${session_id}`,
    },
  });

  return NextResponse.json(await apiRes.json(), { status: apiRes.status });
}
