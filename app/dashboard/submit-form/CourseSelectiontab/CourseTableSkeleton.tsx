import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

export default function CourseTableSkeleton({
  isCompact,
}: {
  isCompact?: boolean;
}) {
  return (
    <>
      {[0, 1, 2, 3].map((index) => (
        <TableRow key={`course-table-skeleton-row-${index}`}>
          <TableCell>
            <Skeleton className="h-4 w-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[6ch]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[32ch]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[6ch]" />
          </TableCell>
          <TableCell hidden={isCompact}>
            <Skeleton className="h-4 w-[2ch]" />
          </TableCell>
          <TableCell hidden={isCompact}>
            <Skeleton className="h-4 w-[3ch]" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
