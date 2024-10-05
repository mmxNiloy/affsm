import { NextRequest, NextResponse } from "next/server";

type Props = {
  id: number;
};

export async function GET(req: NextRequest, { params }: { params: Props }) {
  const id = params.id;
  const apiRes = await fetch(`${process.env.API_BASE_URL}/exam/${id}`, {
    method: "GET",
  });

  if (apiRes.ok) {
    return NextResponse.json(await apiRes.json(), { status: 200 });
  }

  return NextResponse.json(
    { message: "Failed to fetch exam information" },
    { status: 500 }
  );
}
