import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Get the student id and password from the query parameters
  const { id, password } = (await req.json()) as {
    id: number;
    password: string;
  };

  const apiRes = await fetch("https://api.bike-csecu.com/api/login/student", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      student_id: id,
      password: password,
    }),
  });

  if (apiRes.ok) {
    const data = (await apiRes.json()) as { session_id: string };

    cookies().set("session", data.session_id, {
      httpOnly: true,
    });

    return NextResponse.json(
      { message: "Successfully authenticated" },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: "Failed to login.", result: await apiRes.json() },
    { status: 403 }
  );
}
