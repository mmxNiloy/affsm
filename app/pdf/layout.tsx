import SiteConfig from "@/util/SiteConfig";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `${SiteConfig.site_title} | PDF`,
  description: SiteConfig.site_description,
};

export default function PDFLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
