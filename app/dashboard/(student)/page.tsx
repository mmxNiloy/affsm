"use server";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "../../components/DashboardComponents/Tabs/OverviewTab/OverviewTab";
import SubmissionsTab from "../../components/DashboardComponents/Tabs/SubmissionsTab/SubmissionsTab";
import PreferencesTab from "../../components/DashboardComponents/Tabs/PreferencesTab/PreferencesTab";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUser } from "@/app/actions/getUser";
import { Button } from "@/components/ui/button";
import Icons from "@/app/components/Icons";
import { Suspense } from "react";
import NoticePreview from "@/app/components/DashboardComponents/Tabs/OverviewTab/NoticePreview";
import NoticePreviewSkeleton from "@/app/components/DashboardComponents/Tabs/OverviewTab/NoticePreviewSkeleton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toOrdinal } from "@/util/Functions";
import Link from "next/link";

export default async function Dashboard() {
  const user = await getUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Greetings, {user.first_name}</CardTitle>
        <CardDescription>
          Access your academic information, track your forms, and stay
          up-to-date.
        </CardDescription>

        <CardContent className="gap-1 md:gap-2 flex flex-col">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Student&apos;s Name</Label>
                <Input
                  readOnly
                  defaultValue={`${user.first_name} ${user.last_name}`}
                  placeholder="Student's Name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Student ID</Label>
                <Input
                  readOnly
                  defaultValue={user.student_id}
                  placeholder="Student ID"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Department</Label>
                <Input
                  readOnly
                  defaultValue={user.department_name}
                  placeholder="Department"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Semester</Label>
                <Input
                  readOnly
                  defaultValue={toOrdinal(user.semester ?? 1)}
                  placeholder="Semester"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Session</Label>
                <Input
                  readOnly
                  defaultValue={user.session}
                  placeholder="Session"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="http://www.bike-csecu.com:3090?_ref=request-student-info-edit"
                passHref
              >
                <Button className="gap-1 bg-blue-500 hover:bg-blue-400 text-white">
                  <Icons.edit />
                  Request Edit Access
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <NoticePreview />
        </CardContent>
      </CardHeader>
    </Card>
  );
}
