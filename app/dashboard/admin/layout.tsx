import type { Metadata } from "next";
import SiteConfig from "@/util/SiteConfig";

export const metadata: Metadata = {
  title: `${SiteConfig.site_title} | Admin Dashboard`,
  description: SiteConfig.site_description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
