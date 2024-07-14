"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icons from "@/app/components/Icons";
import { Notice, PaginatedNotice } from "@/util/types";
import NoticeCardSkeleton from "./NoticeCardSkeleton";
import NoticeCard from "./NoticeCard";
import MyLoadingSpinner from "@/app/components/MyLoadingSpinner";
import NoticePreviewSkeleton from "./NoticePreviewSkeleton";

export default function NoticePreview() {
  const [notices, setNotices] = useState<PaginatedNotice>();
  const [loading, setLoading] = useState<boolean>(false);

  const getNotices = useCallback(async () => {
    setLoading(true);

    const apiRes = await fetch(`/api/notice?&limit=5`);

    if (apiRes.ok) {
      const data = (await apiRes.json()) as PaginatedNotice;
      setNotices(data);
    } else setNotices(undefined);

    setLoading(false);
  }, []);

  useEffect(() => {
    getNotices();
  }, [getNotices]);

  if (loading) return <NoticePreviewSkeleton />;
  if (!notices || notices.data.length <= 0)
    return (
      <div className="flex flex-col items-center justify-center text-center gap-1 h-32 w-full">
        <Icons.rabbit size={32} />
        No notices found!
      </div>
    );

  return (
    <Card className="w-full col-span-full">
      <CardHeader>
        <CardTitle>Notices</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 md:gap-2">
        {notices.data.map((notice, index) => (
          <NoticeCard key={`notice-${notice.notice_id}`} notice={notice} />
        ))}
      </CardContent>
      <CardFooter>
        <a href="/dashboard/notice">
          <Button className="gap-1 md:gap-2 items-center">
            <Icons.visible />
            View all
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
