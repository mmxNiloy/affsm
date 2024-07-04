import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const encodeMessage = (message: string) => {
  // Prime encoding, avoid for better security
  // Uses a permutation of primes to encode the id(message)
  // Only encode valid evaluator id
  const msg = message.toString() + "";
  if (msg.length != 6) {
    return msg;
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(msg);
  const positions = [11, 5, 2, 3, 13, 7];
  const bytes = [];
  for (let i = 0; i < 16; i++) bytes.push(Math.floor(Math.random() * 16));
  for (let i = 0; i < data.length; i++) bytes[positions[i]] = data[i];
  //console.log('bytes', new Uint8Array(bytes))
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json()) as {
    email: string;
    password: string;
  };

  if (!Boolean(email) || !Boolean(password)) {
    return NextResponse.json(
      { message: "Invalid user id or password" },
      { status: 500 }
    );
  }

  const apiRes = await fetch("http://api.bike-csecu.com/api/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (apiRes.ok) {
    const data = (await apiRes.json()) as { session_id: string };

    const encodedID =
      encodeMessage(data.session_id + "") +
      encodeMessage((Date.now() % 1000000).toString().padStart(6, "0"));

    cookies().set(process.env.MY_SECRET_USER_KEY + encodedID, data.session_id, {
      httpOnly: true,
    });

    // Code
    return NextResponse.json(
      {
        message: "Successfully authenticated",
        secret: encodedID,
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: "Invalid credentials." },
    { status: 401 }
  );
}
