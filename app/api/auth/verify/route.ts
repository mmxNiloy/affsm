import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { User, UserSessionCookie } from "@/util/types";

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");

  if (key == null || !Boolean(key) || key.length < 1)
    return NextResponse.json({ message: "Key not found" }, { status: 403 });

  const keyCookie = cookies().get(process.env.MY_SECRET_USER_KEY + key);
  if (!keyCookie) {
    return NextResponse.json(
      { message: "Token has expired or not found" },
      { status: 401 }
    );
  }

  const session_id = keyCookie.value ?? "";

  if (!Boolean(session_id) || session_id.length < 1)
    return NextResponse.json(
      { message: "Token has expired or not found" },
      { status: 401 }
    );

  const apiRes = await fetch("http://api.bike-csecu.com/api/user", {
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
