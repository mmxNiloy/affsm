import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json()) as {
    email: string;
    password: string;
  };

  const apiRes = await fetch("https://api.bike-csecu.com/api/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (apiRes.ok) {
    const data = (await apiRes.json()) as { session_id: string };

    cookies().set("session", data.session_id, {
      httpOnly: true,
    });

    // Code
    return NextResponse.json(
      {
        message: "Successfully authenticated",
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: "Invalid credentials.", result: await apiRes.json() },
    { status: apiRes.status }
  );
}
