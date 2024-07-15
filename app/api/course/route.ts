import { Course, PaginatedCourses } from "@/util/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const semester: string = req.nextUrl.searchParams.get("semester") ?? "";
  const department: string = req.nextUrl.searchParams.get("department") ?? "";

  if (!Boolean(semester) || !Boolean(department)) {
    return NextResponse.json(
      { message: "Invalid semester or department" },
      { status: 400 }
    );
  }

  // Req 1: Get current semester courses
  const currRes = await fetch(
    `https://api.bike-csecu.com/api/course-semester?semester=${semester}`,
    {
      method: "GET",
    }
  );

  var courses: Course[] = [];
  if (currRes.ok) {
    const data = (await currRes.json()) as PaginatedCourses;
    courses = data.data;
  }

  const imprvRes = await fetch(
    `https://api.bike-csecu.com/api/course-semester?semester=${
      Number.parseInt(semester) - 2
    }`,
    {
      method: "GET",
    }
  );

  if (imprvRes.ok) {
    const data = (await currRes.json()) as PaginatedCourses;
    courses = [...courses, ...data.data];
  }

  return NextResponse.json({ courses }, { status: 200 });
}
