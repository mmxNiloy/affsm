"use client";
import React, { useState } from "react";
import AcademicFormContext from "./AcademicFormContext";
import { usePathname, useRouter } from "next/navigation";
import {
  AcknowledgementsForm,
  ConfirmationForm,
  CourseSelectionForm,
  InformationForm,
} from "@/util/types";

export default function AcademicFormContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const path = usePathname();
  const [isValidAck, setIsValidAck] = useState<boolean>(false);
  const [isValidCourseSelection, setIsValidCourseSelection] =
    useState<boolean>(false);
  const [isValidInformation, setIsValidInformation] = useState<boolean>(false);
  const [isValidConfirmation, setIsValidConfirmation] =
    useState<boolean>(false);

  const [acknowledgementsForm, setAcknowledgementsForm] =
    useState<AcknowledgementsForm>();
  const [courseSelectionForm, setCourseSelectionForm] =
    useState<CourseSelectionForm>();
  const [informationForm, setInformationForm] = useState<InformationForm>();
  const [confirmationForm, setConfirmationForm] = useState<ConfirmationForm>();
  return (
    <AcademicFormContext.Provider
      value={{
        isValidAck,
        setIsValidAck,
        isValidConfirmation,
        setIsValidConfirmation,
        isValidCourseSelection,
        setIsValidCourseSelection,
        isValidInformation,
        setIsValidInformation,
        acknowledgementsForm,
        setAcknowledgementsForm,
        courseSelectionForm,
        setCourseSelectionForm,
        informationForm,
        setInformationForm,
        confirmationForm,
        setConfirmationForm,
      }}
    >
      {children}
    </AcademicFormContext.Provider>
  );
}
