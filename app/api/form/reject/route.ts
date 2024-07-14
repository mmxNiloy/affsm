import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") ?? "0";

  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return NextResponse.json({ message: "Session expired" }, { status: 403 });
  }

  const apiRes = await fetch(
    `http://api.bike-csecu.com/api/form/reject/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `bearer ${sessionCookie.value}`,
      },
    }
  );

  return NextResponse.json(await apiRes.json(), { status: apiRes.status });
}
