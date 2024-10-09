"use server";

import { FormDetail } from "@/util/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getFormDetails(form_id: number): Promise<FormDetail> {
  const fallback: FormDetail = {
    clearance_level: 0,
    courses: [],
    evaluation: [],
    exam_id: 0,
    form_id: 0,
    student_status: "Regular",
  };
  try {
    const sessionCookie = cookies().get(process.env.USER_COOKIE!);
    if (!sessionCookie) {
      redirect("/?_ref=session-expired");
    }

    const apiRes = await fetch(`${process.env.API_BASE_URL}/form/${form_id}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${sessionCookie.value}`,
      },
    });
    if (apiRes.ok) {
      return (await apiRes.json()) as FormDetail;
    } else {
      console.error(
        "Actions > Get form details > Failed to get form details >",
        { status: apiRes.status, error: await apiRes.json() }
      );
    }
  } catch (err) {
    console.error(
      "Actions > Get form details > Failed to get form details >",
      err
    );
  }

  return fallback;
}
