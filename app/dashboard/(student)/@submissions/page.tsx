"use server";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Icons from "@/app/components/Icons";
import { IQueryParamProps } from "@/util/types";
import { Button } from "@/components/ui/button";
import { getForms } from "@/app/actions/getForms";
import { getSearchParams } from "@/util/Functions";
import SubmissionCard from "@/app/components/DashboardComponents/Tabs/SubmissionsTab/SubmissionCard";

export default async function SubmissionsTab({
  searchParams,
}: IQueryParamProps) {
  const forms = await getForms(getSearchParams(searchParams));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex felx-row gap-1 md:gap-2">
          <Icons.list />
          <p>My Submissions</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {forms.data.map((form) => (
          <SubmissionCard key={`${form.form_id}`} form={form} />
        ))}
        {forms.data.map((form) => (
          <SubmissionCard key={`${form.form_id}`} form={form} />
        ))}

        <Pagination className="col-span-full">
          <PaginationContent>
            {forms.previous ? (
              <PaginationPrevious href={`?page=${forms.previous.page}`} />
            ) : (
              <PaginationPrevious href="#" />
            )}

            {Array.from(
              { length: forms.page_count },
              (_, index) => index + 1
            ).map((item) => (
              <PaginationItem key={`submission-page-${item}`}>
                <Button
                  variant={
                    Math.max(
                      ...[
                        1,
                        (forms.next?.page ?? 2) - 1,
                        (forms.previous?.page ?? 0) + 1,
                      ]
                    ) === item
                      ? "outline"
                      : "ghost"
                  }
                >
                  {item}
                </Button>
              </PaginationItem>
            ))}

            {forms.next ? (
              <PaginationNext href={`?page=${forms.next.page}`} />
            ) : (
              <PaginationNext />
            )}
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
}
