import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import CourseTableSkeleton from "../../submit-form/CourseSelectiontab/CourseTableSkeleton";

export default function FormDetailCoursesTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Index</TableHead>
          <TableHead>Course Code</TableHead>
          <TableHead>Course Title</TableHead>
          <TableHead>Course Type</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <CourseTableSkeleton isCompact />
      </TableBody>
    </Table>
  );
}
