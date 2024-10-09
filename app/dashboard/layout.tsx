import React from "react";
import MyAppBar from "../components/DashboardComponents/AppBar/MyAppBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <MyAppBar />
      <main className="container">{children}</main>
    </div>
  );
}
