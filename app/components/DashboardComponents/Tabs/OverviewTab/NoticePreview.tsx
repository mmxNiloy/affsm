"use server";
import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icons from "@/app/components/Icons";
import { PaginatedNotice } from "@/util/types";
import NoticeCard from "./NoticeCard";
import NoticePreviewSkeleton from "./NoticePreviewSkeleton";
import { getNotices } from "@/app/actions/getNotices";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default async function NoticePreview() {
  const notices = await getNotices({ page: 1, limit: 5 });

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Notices</CardTitle>
          <div className="flex gap-2">
            {/* <Input type="search" placeholder="Search..." /> */}
            <Link href={"/dashboard/notice"} passHref>
              <Button variant="link">View All</Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {notices.data.map((notice, index) => (
          <NoticeCard key={`notice-${notice.notice_id}`} notice={notice} />
        ))}
      </CardContent>
    </Card>
  );
}
