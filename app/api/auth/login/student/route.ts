import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const encodeMessage = (message: string) => {
  // Prime encoding, avoid for better security
  // Uses a permutation of primes to encode the id(message)
  // Only encode valid evaluator id
  const msg = message.toString() + "";
  if (msg.length != 8) {
    return msg;
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(msg);
  const positions = [19, 7, 3, 31, 23, 29, 2, 17];
  const bytes = [];
  for (let i = 0; i < 32; i++) bytes.push(Math.floor(Math.random() * 16));
  for (let i = 0; i < data.length; i++) bytes[positions[i]] = data[i];
  //console.log('bytes', new Uint8Array(bytes))
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export async function POST(req: NextRequest) {
  // Get the student id and password from the query parameters
  const { id, password } = (await req.json()) as {
    id: string;
    password: string;
  };

  const apiRes = await fetch("http://api.bike-csecu.com/api/login/student", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      student_id: Number.parseInt(id),
      password: password,
    }),
  });

  if (apiRes.ok) {
    const data = (await apiRes.json()) as { session_id: string };

    const encodedID =
      encodeMessage(data.session_id) +
      encodeMessage((Date.now() % 1000000).toString().padStart(6, "0"));

    const today = new Date();
    const nextExp = new Date();
    nextExp.setDate(today.getDate() + 7);

    cookies().set(process.env.MY_SECRET_USER_KEY + encodedID, data.session_id, {
      httpOnly: true,
      expires: nextExp,
    });

    return NextResponse.json({ ...data, secret: encodedID }, { status: 200 });
  }

  return NextResponse.json(
    { message: "Failed to login.", result: await apiRes.json() },
    { status: 403 }
  );
}
