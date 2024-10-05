import React from "react";
import MyAppBar from "../components/DashboardComponents/AppBar/MyAppBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MyAppBar />
      <main className="container">{children}</main>
    </>
  );
}
