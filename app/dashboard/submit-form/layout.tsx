import AcademicFormContextProvider from "@/app/providers/AcademicFormContextProvider";
import React from "react";

export default function SubmitFormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AcademicFormContextProvider>{children}</AcademicFormContextProvider>
    </>
  );
}
