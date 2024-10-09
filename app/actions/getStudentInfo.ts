"use server";

import { User } from "@/util/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getStudentInfo(student_id: Number) {
  try {
    const sessionCookie = cookies().get(process.env.USER_COOKIE!);
    if (!sessionCookie) {
      redirect("/?_ref=session-expired");
    }

    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/student/${student_id}`,
      {
        headers: {
          Authorization: `bearer ${sessionCookie.value}`,
        },
      }
    );

    if (apiRes.ok) return (await apiRes.json()) as User;
    else
      console.log("Actions > Get Student Info > Failed to get student info >", {
        status: apiRes.status,
        error: await apiRes.json(),
      });
  } catch (err) {
    console.error(
      "Actions > Get Student Info > Failed to get Student info >",
      err
    );
  }

  return undefined;
}
