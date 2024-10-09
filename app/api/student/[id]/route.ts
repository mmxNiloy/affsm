import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: number;
};

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const id = params.id;
  const sessionCookie = cookies().get(process.env.USER_COOKIE!);
  if (!sessionCookie) {
    return NextResponse.json({ message: "Session expired!" }, { status: 403 });
  }

  const apiRes = await fetch(`${process.env.API_BASE_URL}/student/${id}`, {
    headers: {
      Authorization: `bearer ${sessionCookie.value}`,
    },
  });

  return NextResponse.json(await apiRes.json(), { status: apiRes.status });
}
