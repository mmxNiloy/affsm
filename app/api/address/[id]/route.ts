import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: number;
};

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const id = params.id ?? 0;

  const apiRes = await fetch(`https://api.bike-csecu.com/api/address/${id}`);

  return NextResponse.json(await apiRes.json(), { status: apiRes.status });
}
