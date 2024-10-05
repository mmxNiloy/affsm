"use server";

import { User } from "@/util/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUser(): Promise<User> {
  const sessionCookie = cookies().get(process.env.USER_COOKIE!);
  if (!sessionCookie) {
    redirect("/?_ref=session-expired");
  }

  const session_id = sessionCookie.value ?? "";

  if (!Boolean(session_id) || session_id.length < 1) {
    redirect("/?_ref=session-expired");
  }

  // Look for saved user data
  if (cookies().has(process.env.USER_DATA_COOKIE!)) {
    try {
      return JSON.parse(
        cookies().get(process.env.USER_DATA_COOKIE!)?.value ?? "{}"
      ) as User;
    } catch (err) {
      console.error(
        "Actions > Get User Data > Malformed cookie, trying to get data again..."
      );
    }
  }

  const apiRes = await fetch(`${process.env.API_BASE_URL}/user`, {
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
    // cookies().set(process.env.USER_DATA_COOKIE!, JSON.stringify(user));
    return user;
  } else {
    // cookies().delete(process.env.USER_DATA_COOKIE!);
    // cookies().delete(process.env.USER_COOKIE!);
  }

  redirect("/?_ref=session-expired");
}
