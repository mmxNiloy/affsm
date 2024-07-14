"use client";
import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
import UserContext from "@/app/providers/UserContex";
import Icons from "@/app/components/Icons";
import { Form, PaginatedForms, PaginatedNotice } from "@/util/types";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";
import MyLoadingSpinner from "@/app/components/MyLoadingSpinner";
import NoticeCard from "@/app/components/DashboardComponents/Tabs/OverviewTab/NoticeCard";
import NoticeCardSkeleton from "@/app/components/DashboardComponents/Tabs/OverviewTab/NoticeCardSkeleton";

export default function NoticesTab() {
  const { user } = useContext(UserContext);

  const [notices, setNotices] = useState<PaginatedNotice>();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const getNotices = useCallback(async () => {
    setLoading(true);

    // Get forms of te current user
    const apiRes = await fetch(`/api/notice/my?page=${page}`, {
      method: "GET",
    });
    if (apiRes.ok) {
      const mNotices = (await apiRes.json()) as PaginatedNotice;
      setNotices(mNotices);
    } else setNotices(undefined);

    setLoading(false);
  }, [page]);

  useEffect(() => {
    getNotices();
  }, [getNotices]);

  if (!user) return <MyLoadingSpinner />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex felx-row gap-1 md:gap-2">
          <Icons.list />
          <p>My Notices</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 md:gap-2">
        {loading && <MyLoadingSpinner />}
        {!loading &&
          notices &&
          notices.data.length > 0 &&
          notices.data.map((notice) => (
            <Suspense
              key={`submission-${notice.notice_id}`}
              fallback={<NoticeCardSkeleton />}
            >
              <NoticeCard notice={notice} />
            </Suspense>
          ))}

        {!loading && notices && notices.data.length <= 0 && (
          <div className="w-full h-64 flex flex-col items-center justify-center text-center">
            <Icons.rabbit size={64} />
            You haven&apos;t posted any notice yet.
          </div>
        )}

        {!loading && notices && notices.data.length > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  className="items-center gap-1 md:gap-2"
                  variant="ghost"
                  disabled={!notices.previous}
                  onClick={() => {
                    const currentPage = page;
                    if (notices.previous) setPage(currentPage - 1);
                  }}
                >
                  <Icons.chevronLeft />
                  <p>Previous</p>
                </Button>
              </PaginationItem>

              {Array.from(
                { length: notices.page_count },
                (_, index) => index + 1
              ).map((item) => (
                <PaginationItem key={`submission-page-${item}`}>
                  <Button
                    variant={page === item ? "outline" : "ghost"}
                    onClick={() => {
                      setPage(item);
                    }}
                  >
                    {item}
                  </Button>
                </PaginationItem>
              ))}

              <PaginationItem>
                <Button
                  className="items-center gap-1 md:gap-2"
                  variant="ghost"
                  disabled={!notices.next}
                  onClick={() => {
                    const currentPage = page;
                    if (notices.next) setPage(currentPage + 1);
                  }}
                >
                  <p>Next</p>
                  <Icons.chevronRight />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>

      {/* <SubmissionsPreviewDialog
    open={open}
    user={user}
    dialogData={dialogData}
    onClose={handleDialogClose}
  /> */}
    </Card>
  );
}
