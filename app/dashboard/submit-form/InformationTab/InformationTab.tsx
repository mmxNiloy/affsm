"use client";
import AcademicFormContext from "@/app/providers/AcademicFormContext";
import UserContext from "@/app/providers/UserContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { StudentAddress } from "@/util/types";
import React, { useCallback, useContext, useEffect, useState } from "react";
import StudentInformationGrid from "./StudentInformationGrid";

export default function InformationTab() {
  const { user } = useContext(UserContext);
  const { setIsValidInformation } = useContext(AcademicFormContext);

  const [studentAddresses, setStudentAddresses] = useState<StudentAddress>();
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false);
  const [gotAddresses, setGotAddresses] = useState<boolean>(false);

  const getAddresses = useCallback(async () => {
    if (gotAddresses) return;

    setLoadingAddress(true);

    const apiRes = await fetch(`/api/address`);

    if (apiRes.ok) {
      const data = (await apiRes.json()) as StudentAddress;
      setStudentAddresses(data);
      setGotAddresses(true);
    } else setStudentAddresses(undefined);

    setLoadingAddress(false);
  }, [gotAddresses]);

  useEffect(() => {
    getAddresses();
  }, [getAddresses]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student&apos;s Information</CardTitle>
        <CardDescription>
          Confirm the correctness of your information below. Your information is
          stored in the university database. You may request a review for any
          discrepancy.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <StudentInformationGrid user={user!} />
      </CardContent>

      <CardFooter>
        <div className="col-span-full lg:col-span-6 flex gap-1 md:gap-2">
          <Checkbox
            id="info-tnc-checkbox"
            onCheckedChange={(chk) => {
              if (chk) setIsValidInformation(true);
              else setIsValidInformation(false);
            }}
          />
          <Label htmlFor="info-tnc-checkbox">
            I confirm the correctness of the information and agree to the T&C
            set out by the academy.
          </Label>
        </div>
      </CardFooter>
    </Card>
  );
}
