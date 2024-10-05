import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const sessionCookie = cookies().get(process.env.USER_COOKIE!);
  if (!sessionCookie) {
    return NextResponse.json(
      { message: "User has already logged out." },
      { status: 200 }
    );
  }

  const apiRes = await fetch(`${process.env.API_BASE_URL}/logout`, {
    method: "POST",
    headers: {
      Authorization: `bearer ${sessionCookie.value}`,
    },
  });

  if (apiRes.ok) {
    cookies().delete(process.env.USER_COOKIE!);
    return NextResponse.json(
      { message: "Logged out successfully." },
      { status: 200 }
    );
  }

  return NextResponse.json({ message: "Failed to log out." }, { status: 500 });
}
