import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function NoticeCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-[2rem] w-full" />
        </CardTitle>
        <CardDescription className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-1 md:gap-2">
          <Skeleton className="flex h-[1.25rem] flex-grow" />
          <Skeleton className="flex flex-grow h-[1.25rem]" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-16 w-full" />
      </CardContent>
      <CardFooter className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-1 md:gap-2">
        <Skeleton className="flex h-[1.25rem] flex-grow" />
        <Skeleton className="flex flex-grow h-[1.25rem]" />
      </CardFooter>
    </Card>
  );
}
