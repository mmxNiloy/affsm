"use server";

import { ISearchParams, PaginatedForms } from "@/util/types";
import { cookies } from "next/headers";

export async function getForms({
  page,
  limit,
}: ISearchParams): Promise<PaginatedForms> {
  const fallback: PaginatedForms = {
    data: [],
    first_page: 1,
    page_count: 1,
    total_data: 0,
    total_records: 0,
  };

  const sessionCookie = cookies().get(process.env.USER_COOKIE!);
  if (!sessionCookie) {
    return fallback;
  }

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/form?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${sessionCookie.value}`,
        },
      }
    );

    if (apiRes.ok) {
      // Got forms for the user
      const forms = (await apiRes.json()) as PaginatedForms;
      return forms;
    } else {
      return fallback;
    }
  } catch (err) {
    return fallback;
  }
}
