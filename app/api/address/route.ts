import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionCookie = cookies().get(process.env.USER_COOKIE!);
  if (!sessionCookie) {
    return NextResponse.json({ message: "Session expired" }, { status: 403 });
  }

  const apiRes = await fetch(`${process.env.API_BASE_URL}/address/my`, {
    headers: { Authorization: `bearer ${sessionCookie.value}` },
  });

  return NextResponse.json(await apiRes.json(), { status: apiRes.status });
}
