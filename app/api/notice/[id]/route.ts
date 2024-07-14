import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: number;
};

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const id = params.id;
  const apiRes = await fetch(`http://api.bike-cesecu.com/api/notice/${id}`);
  return NextResponse.json(await apiRes.json(), { status: apiRes.status });
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const id = params.id;
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return NextResponse.json({ message: "Session expired!" }, { status: 403 });
  }

  const { notice_type, notice_title, notice_description, notice_attachment } =
    await req.json();

  const apiRes = await fetch(`http://api.bike-cesecu.com/api/notice/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `bearer ${sessionCookie.value}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return NextResponse.json(await apiRes.json(), { status: apiRes.status });
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const id = params.id;
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return NextResponse.json({ message: "Session expired!" }, { status: 403 });
  }

  const apiRes = await fetch(`http://api.bike-cesecu.com/api/notice/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `bearer ${sessionCookie.value}`,
      Accept: "application/json",
    },
  });

  return NextResponse.json(await apiRes.json(), { status: apiRes.status });
}
