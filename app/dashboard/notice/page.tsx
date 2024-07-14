"use client";

import NoticeCard from "@/app/components/DashboardComponents/Tabs/OverviewTab/NoticeCard";
import NoticeCardSkeleton from "@/app/components/DashboardComponents/Tabs/OverviewTab/NoticeCardSkeleton";
import Icons from "@/app/components/Icons";
import MyLoadingSpinner from "@/app/components/MyLoadingSpinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Notice, PaginatedNotice } from "@/util/types";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

export default function NoticePage() {
  const params = useSearchParams();

  const [notices, setNotices] = useState<PaginatedNotice>();
  const [loading, setLoading] = useState<boolean>(false);
  const [capPageIndex, setCapPageIndex] = useState<number>(1);
  const [bracket, setBracket] = useState<number[]>([]);
  const [currPage, setCurrPage] = useState<number>(1);

  const getNotices = useCallback(async () => {
    setLoading(true);

    const page = Number.parseInt(params.get("page") ?? "1");
    setCurrPage(page);

    const apiRes = await fetch(`/api/notice?page=${page}&limit=10`);

    if (apiRes.ok) {
      const data = (await apiRes.json()) as PaginatedNotice;
      setNotices(data);
      const mCapPageIndex: number = Math.max(data.page_count - 4, 1);
      const mBracket: number[] = Array.from(
        { length: Math.min(5, data.page_count) },
        (_, idx) => Math.min(page, mCapPageIndex) + idx
      );

      setCapPageIndex(mCapPageIndex);
      setBracket(mBracket);
    } else setNotices(undefined);

    setLoading(false);
  }, [params]);

  useEffect(() => {
    getNotices();
  }, [getNotices]);

  if (loading) return <MyLoadingSpinner />;
  if (!notices || notices.data.length <= 0)
    return (
      <div className="flex flex-col items-center justify-center text-center gap-1 h-32 w-full">
        <Icons.rabbit size={32} />
        No notices found!
      </div>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row gap-1 md:gap-2">
          <Icons.bell />
          All Notices
        </CardTitle>
        <CardDescription>
          Stay up-to-date with the academy activities.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 md:gap-2">
        {notices.data.map((notice) => (
          <NoticeCard key={`notice-${notice.notice_id}`} notice={notice} />
        ))}
      </CardContent>
      <CardFooter>
        <Pagination>
          <PaginationContent>
            {notices.previous && (
              <PaginationItem>
                <PaginationPrevious href={`?page=${notices.previous.page}`} />
              </PaginationItem>
            )}
            {bracket[0] > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {bracket.map((index) => (
              <PaginationItem key={`pagination-page-${index}`}>
                <PaginationLink
                  isActive={currPage === index}
                  href={`?page=${index}`}
                >
                  {index}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currPage < capPageIndex && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {notices.next && (
              <PaginationItem>
                <PaginationNext href={`?page=${notices.next.page}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
