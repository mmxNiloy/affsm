import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubmissionCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-full w-64" />
        </CardTitle>
        <CardDescription className="flex flex-col gap-1 md:gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 md:gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-16 w-64" />
      </CardContent>
      <CardFooter className="flex flex-row gap-1 md:gap-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-32" />
      </CardFooter>
    </Card>
  );
}
