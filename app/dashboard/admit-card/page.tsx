"use client";
import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import UserContext from "@/app/providers/UserContext";
import Icons from "@/app/components/Icons";
import { PaginatedForms } from "@/util/types";
import { Button } from "@/components/ui/button";
import SubmissionCardSkeleton from "@/app/components/DashboardComponents/Tabs/SubmissionsTab/SubmissionCardSkeleton";
import SubmissionCard from "@/app/components/DashboardComponents/Tabs/SubmissionsTab/SubmissionCard";
import MyLoadingSpinner from "@/app/components/MyLoadingSpinner";

export default function AdmitCardPage() {
  const { user } = useContext(UserContext);
  const [submissions, setSubmissions] = useState<PaginatedForms>();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const getSubmissions = useCallback(async () => {
    setLoading(true);

    // Get forms of te current user
    const apiRes = await fetch(`/api/form?page=${page}`, { method: "GET" });
    if (apiRes.ok) {
      const subs = (await apiRes.json()) as PaginatedForms;
      const admitableSubs = subs.data.filter(
        (form) => form.clearance_level >= 6
      );
      subs.data = admitableSubs;
      setSubmissions(subs);
    } else setSubmissions(undefined);

    setLoading(false);
  }, [page]);

  useEffect(() => {
    getSubmissions();
  }, [getSubmissions]);

  if (!user) return <MyLoadingSpinner />;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex felx-row gap-1 md:gap-2">
          <Icons.list />
          <p>My Admit Cards</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 md:gap-2">
        {loading && (
          <div className="h-64 w-full flex flex-row items-center justify-center gap-1 md:gap-2">
            <Icons.spinner className="animate-spin ease-in-out duration-700" />
            <p>Loading...</p>
          </div>
        )}
        {!loading &&
          submissions &&
          submissions.data.length > 0 &&
          submissions.data.map((form) => (
            <Suspense
              key={`submission-${form.form_id}`}
              fallback={<SubmissionCardSkeleton />}
            >
              <SubmissionCard form={form} />
            </Suspense>
          ))}

        {!loading && submissions && submissions.data.length <= 0 && (
          <div className="w-full h-64 flex items-center justify-center text-center">
            No admit card available
          </div>
        )}

        {!loading && submissions && submissions.data.length > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  className="items-center gap-1 md:gap-2"
                  variant="ghost"
                  disabled={!submissions.previous}
                  onClick={() => {
                    const currentPage = page;
                    if (submissions.previous) setPage(currentPage - 1);
                  }}
                >
                  <Icons.chevronLeft />
                  <p>Previous</p>
                </Button>
              </PaginationItem>

              {Array.from(
                { length: submissions.page_count },
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
                  disabled={!submissions.next}
                  onClick={() => {
                    const currentPage = page;
                    if (submissions.next) setPage(currentPage + 1);
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
