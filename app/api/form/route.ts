import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PaginatedForms, POST_Form_Body } from "@/util/types";

export async function GET(req: NextRequest) {
  // const { id, semester, limit } = req.query
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return NextResponse.json({ message: "Session Expired!" }, { status: 403 });
  }

  const page = req.nextUrl.searchParams.get("page") ?? "1";
  const limit = req.nextUrl.searchParams.get("limit") ?? "10";

  const apiRes = await fetch(
    `http://localhost:5000/api/form?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `bearer ${sessionCookie.value}`,
      },
    }
  );

  if (apiRes.ok) {
    // Got forms for the user
    const forms = (await apiRes.json()) as PaginatedForms;
    return NextResponse.json(forms, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Failed to fetch forms from the server." },
      { status: apiRes.status }
    );
  }
}

export async function POST(req: NextRequest) {
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return NextResponse.json({ message: "Session Expired!" }, { status: 403 });
  }

  const reqBody = (await req.json()) as POST_Form_Body;
  const apiRes = await fetch("http://localhost:5000/api/form", {
    method: "POST",
    headers: {
      Authorization: `bearer ${sessionCookie.value}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(reqBody),
  });

  if (apiRes.ok) {
    return NextResponse.json(await apiRes.json(), { status: 201 });
  }

  return NextResponse.json(await apiRes.json(), { status: apiRes.status });
}
