"use server";

import {
  ISearchParamProps,
  ISearchParams,
  PaginatedNotice,
} from "@/util/types";

export async function getNotices({
  page,
  limit,
}: ISearchParams): Promise<PaginatedNotice> {
  const fallback: PaginatedNotice = {
    data: [],
    first_page: 1,
    page_count: 1,
    total_data: 0,
    total_records: 0,
  };

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/notice?page=${page}&limit=${limit}`
    );

    if (apiRes.ok) {
      return (await apiRes.json()) as PaginatedNotice;
    } else return fallback;
  } catch (err) {
    console.error("Actions > Get notices > Failed to get notices", err);
  }

  return fallback;
}
