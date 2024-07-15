import { Department } from "@/util/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") ?? "0";

  try {
    const did = Number.parseInt(id);
    const apiRes = await fetch(
      `https://api.bike-csecu.com/api/department/${did}`
    );
    if (apiRes.ok) {
      const data = (await apiRes.json()) as Department;

      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: `Department with id ${did} does not exist.` },
        { status: 404 }
      );
    }
  } catch (ignored) {
    return NextResponse.json(
      {
        message: "Department id cannot be empty or non-integer. Try ?id=1",
      },
      { status: 400 }
    );
  }
}
