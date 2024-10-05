"use server";

import { getNotices } from "@/app/actions/getNotices";
import NoticeCard from "@/app/components/DashboardComponents/Tabs/OverviewTab/NoticeCard";
import Icons from "@/app/components/Icons";
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
import { getSearchParams } from "@/util/Functions";
import { IQueryParamProps } from "@/util/types";

export default async function NoticePage({ searchParams }: IQueryParamProps) {
  const notices = await getNotices(getSearchParams(searchParams));

  const currPage = Math.max(
    1,
    (notices.next?.page ?? 2) - 1,
    (notices.previous?.page ?? 0) + 1
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
      <CardContent className="grid grid-cols-2 gap-4">
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
            {currPage > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {notices.previous && (
              <PaginationItem>
                <PaginationLink href={`?page=${currPage - 1}`}>
                  {currPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink isActive href="#">
                {currPage}
              </PaginationLink>
            </PaginationItem>
            {notices.next && (
              <PaginationItem>
                <PaginationLink href={`?page=${currPage + 1}`}>
                  {currPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            {currPage < notices.page_count && (
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
