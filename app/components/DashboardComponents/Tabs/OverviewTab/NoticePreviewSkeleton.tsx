import React, { Suspense } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";

export default function NoticePreviewSkeleton() {
  const notices = [1, 2, 3];
  return (
    <Card className="w-full col-span-full">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-full w-64" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 md:gap-2">
        {notices.map((notice) => (
          <NoticeCardSkeleton key={`notice-skeleton-${notice}`} />
        ))}
      </CardContent>
      <CardFooter>
        <Skeleton className="h-8 w-32" />
      </CardFooter>
    </Card>
  );
}
