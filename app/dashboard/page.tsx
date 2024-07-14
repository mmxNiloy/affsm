"use server";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "../components/DashboardComponents/Tabs/OverviewTab/OverviewTab";
import SubmissionsTab from "../components/DashboardComponents/Tabs/SubmissionsTab/SubmissionsTab";
import PreferencesTab from "../components/DashboardComponents/Tabs/PreferencesTab/PreferencesTab";

export default async function Dashboard() {
  return (
    <div className="w-full">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="submissions">
          <SubmissionsTab />
        </TabsContent>
        <TabsContent value="preferences">
          <PreferencesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
