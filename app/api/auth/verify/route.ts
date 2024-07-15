import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { User, UserSessionCookie } from "@/util/types";

export async function GET(req: NextRequest) {
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return NextResponse.json({ message: "Session expired!" }, { status: 401 });
  }

  const session_id = sessionCookie.value ?? "";

  if (!Boolean(session_id) || session_id.length < 1)
    return NextResponse.json({ message: "Session expired" }, { status: 401 });

  const apiRes = await fetch("https://api.bike-csecu.com/api/user", {
    method: "GET",
    headers: {
      Authorization: `bearer ${session_id}`,
      "Content-Type": "application/json",
    },
  });

  if (apiRes.ok) {
    // A user is found
    // Filter the data and send it back as a response
    const user = (await apiRes.json()) as User;
    return NextResponse.json(
      { message: "Verification successful", user },
      { status: 200 }
    );
  }

  return NextResponse.json({ message: "Invalid token" }, { status: 404 });
}
