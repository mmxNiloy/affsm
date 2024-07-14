import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: number;
};

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const id = params.id; // Exam id
  const apiRes = await fetch(`http://localhost:5000/api/course-semester/${id}`);
  return NextResponse.json(await apiRes.json(), { status: apiRes.status });
}
