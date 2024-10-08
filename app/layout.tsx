import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import SiteConfig from "@/util/SiteConfig";
import UserContextProvider from "./providers/UserContextProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SiteConfig.site_title,
  description: SiteConfig.site_description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "from-lime-200/40 to-amber-300/60 bg-gradient-to-br min-h-screen",
          nunito.className
        )}
      >
        <ThemeProvider defaultTheme="light" attribute="class">
          <UserContextProvider>{children}</UserContextProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
