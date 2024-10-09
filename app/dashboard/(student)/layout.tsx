import type { Metadata } from "next";
import SiteConfig from "@/util/SiteConfig";
import MyAppBar from "../../components/DashboardComponents/AppBar/MyAppBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: `${SiteConfig.site_title} | Student Dashboard`,
  description: SiteConfig.site_description,
};

interface Props {
  children: React.ReactNode;
  submissions: React.ReactNode;
  preferences: React.ReactNode;
}

export default function RootLayout({
  children,
  submissions,
  preferences,
}: Props) {
  return (
    <>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent
          forceMount
          className="data-[state=inactive]:hidden"
          value="overview"
        >
          {children}
        </TabsContent>
        <TabsContent
          forceMount
          className="data-[state=inactive]:hidden"
          value="submissions"
        >
          {submissions}
        </TabsContent>
        <TabsContent
          forceMount
          className="data-[state=inactive]:hidden"
          value="preferences"
        >
          {preferences}
        </TabsContent>
      </Tabs>
    </>
  );
}
