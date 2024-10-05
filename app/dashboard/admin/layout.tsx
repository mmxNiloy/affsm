import type { Metadata } from "next";
import SiteConfig from "@/util/SiteConfig";
import MyAppBar from "../../components/DashboardComponents/AppBar/MyAppBar";

export const metadata: Metadata = {
  title: `${SiteConfig.site_title} | Admin Dashboard`,
  description: SiteConfig.site_description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MyAppBar />
      <main className="container">{children}</main>
    </>
  );
}
