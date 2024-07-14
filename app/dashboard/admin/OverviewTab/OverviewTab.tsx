"use client";
import NoticePreview from "@/app/components/DashboardComponents/Tabs/OverviewTab/NoticePreview";
import NoticePreviewSkeleton from "@/app/components/DashboardComponents/Tabs/OverviewTab/NoticePreviewSkeleton";
import Icons from "@/app/components/Icons";
import MyLoadingSpinner from "@/app/components/MyLoadingSpinner";
import UserContext from "@/app/providers/UserContex";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { Suspense, useContext } from "react";

export default function OverviewTab() {
  const { user } = useContext(UserContext);

  if (!user) return <MyLoadingSpinner />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Greetings, {user.first_name}</CardTitle>
        <CardDescription>
          Administer academic forms from your dashboard efficiently.
        </CardDescription>
      </CardHeader>

      <CardContent className="gap-1 md:gap-2 flex flex-col">
        <div className="grid gap-1 md:gap-2 grid-cols-12">
          <p className="col-span-full text-lg font-semibold">Quick Access</p>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="flex gap-1 md:gap-2">
                <Icons.student />
                Add Students
              </CardTitle>
              <CardDescription>
                Enroll new students, process and control enrollment
                applications, and access student information database.
              </CardDescription>
              <CardFooter>
                <Button>Visit now</Button>
              </CardFooter>
            </CardHeader>
          </Card>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="flex gap-1 md:gap-2">
                <Icons.note />
                Process Results
              </CardTitle>
              <CardDescription>
                Get full access to publish, modify, create, or enter data
                related to exams and results.
              </CardDescription>
              <CardFooter>
                <Button>Visit now</Button>
              </CardFooter>
            </CardHeader>
          </Card>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="flex gap-1 md:gap-2">
                <Icons.meeting />
                Manage Meetings
              </CardTitle>
              <CardDescription>
                Manage and control academic meetings with your peer from our
                Meeting Management System.
              </CardDescription>
              <CardFooter>
                <Button>Visit now</Button>
              </CardFooter>
            </CardHeader>
          </Card>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="flex gap-1 md:gap-2">
                <Icons.folderCog />
                Staff Info Management
              </CardTitle>
              <CardDescription>
                Administer, manage, assign tasks, or control staff informtaion
                and activities.
              </CardDescription>
              <CardFooter>
                <Button>Visit now</Button>
              </CardFooter>
            </CardHeader>
          </Card>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="flex gap-1 md:gap-2">
                <Icons.home />
                Back to the Portal
              </CardTitle>
              <CardDescription>
                Access the news and all of our systems from our central hub.
              </CardDescription>
              <CardFooter>
                <Button>Visit now</Button>
              </CardFooter>
            </CardHeader>
          </Card>
          <NoticePreview />
        </div>
      </CardContent>
    </Card>
  );
}
