import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return NextResponse.json(
      { message: "User has already logged out." },
      { status: 200 }
    );
  }

  const apiRes = await fetch("https://api.bike-csecu.com/api/logout", {
    method: "POST",
    headers: {
      Authorization: `bearer ${sessionCookie.value}`,
    },
  });

  if (apiRes.ok) {
    cookies().delete("session");
    return NextResponse.json(
      { message: "Logged out successfully." },
      { status: 200 }
    );
  }

  return NextResponse.json({ message: "Failed to log out." }, { status: 500 });
}
