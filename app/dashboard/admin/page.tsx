import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./OverviewTab/OverviewTab";
import FormsTab from "./FormsTab/FormsTab";
import NoticesTab from "./NoticesTab/NoticesTab";
import PreferencesTab from "@/app/components/DashboardComponents/Tabs/PreferencesTab/PreferencesTab";

export default function AdminDashboard() {
  return (
    <div className="w-full">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="all-forms">Forms</TabsTrigger>
          <TabsTrigger value="my-notices">Notices</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="all-forms">
          <FormsTab />
        </TabsContent>
        <TabsContent value="my-notices">
          <NoticesTab />
        </TabsContent>
        <TabsContent value="preferences">
          <PreferencesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
