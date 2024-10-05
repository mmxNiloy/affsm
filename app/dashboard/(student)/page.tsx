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
            <CardContent className="grid grid-cols-2 gap-2">
              <p className="col-span-1">Student&apos;s Name</p>
              <p className="col-span-1">
                {`${user.first_name} ${user.last_name}`}
              </p>
              <p className="col-span-1">Student ID</p>
              <p className="col-span-1">{user.student_id}</p>

              <p className="col-span-1">Department</p>
              <p className="hidden md:flex col-span-1">
                {user.department_name}
              </p>
              <p className="flex md:hidden col-span-1">
                {user.department_abbr}
              </p>

              <p className="col-span-1">Semester</p>
              <p className="col-span-1">{user.semester}</p>

              <p className="col-span-1">Session</p>
              <p className="col-span-1">{user.session}</p>
            </CardContent>
            <CardFooter>
              <Button className="gap-1 md:gap-2 items-center">
                <Icons.edit />
                Request Edit Access
              </Button>
            </CardFooter>
          </Card>

          <NoticePreview />
        </CardContent>
      </CardHeader>
    </Card>
  );
}
