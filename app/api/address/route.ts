import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return NextResponse.json({ message: "Session expired" }, { status: 403 });
  }

  const apiRes = await fetch(`http://localhost:5000/api/address/my`, {
    headers: { Authorization: `bearer ${sessionCookie.value}` },
  });

  return NextResponse.json(await apiRes.json(), { status: apiRes.status });
}
