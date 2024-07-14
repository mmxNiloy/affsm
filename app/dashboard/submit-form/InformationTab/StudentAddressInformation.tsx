"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toAddressString } from "@/util/Functions";
import { StudentAddress, User } from "@/util/types";
import React, { useCallback, useContext, useEffect, useState } from "react";
import StudentAddressInformationGridSkeleton from "./StudentAddressInformationGridSkeleton";
import UserContext from "@/app/providers/UserContex";

type Props = {
  user: User;
};

export default function StudentAddressInformation({ user }: Props) {
  // const { user } = useContext(UserContext);
  const [studentAddresses, setStudentAddresses] = useState<StudentAddress>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAddresses = useCallback(async () => {
    setLoading(true);

    const apiRes = await fetch("/api/address/");

    if (apiRes.ok) {
      setStudentAddresses((await apiRes.json()) as StudentAddress);
    } else setStudentAddresses(undefined);

    setLoading(false);
  }, []);

  useEffect(() => {
    getAddresses();
  }, [getAddresses]);

  if (loading || !user || !studentAddresses)
    return <StudentAddressInformationGridSkeleton />;

  return (
    <>
      <div className="col-span-full">
        <Label htmlFor="perm-addr-input">Permanent Address</Label>
        <Input
          id="perm-addr-input"
          disabled
          value={
            studentAddresses
              ? toAddressString(studentAddresses.permanent_address)
              : user!.permanent_address_id
          }
          title="PO Code, PO, Union, Thana, District, Division, Country"
        />
      </div>

      <div className="col-span-full">
        <Label htmlFor="curr-addr-input">Present Address</Label>
        <Input
          id="curr-addr-input"
          disabled
          value={
            studentAddresses
              ? toAddressString(studentAddresses.present_address)
              : user!.present_address_id
          }
          title="PO Code, PO, Union, Thana, District, Division, Country"
        />
      </div>

      <div className="col-span-full">
        <Label htmlFor="guardians-addr-input">Guardian&apos;s Address</Label>
        <Input
          id="guardians-addr-input"
          disabled
          value={
            studentAddresses
              ? toAddressString(studentAddresses.guardian_address)
              : user!.guardian_address_id
          }
          title="PO Code, PO, Union, Thana, District, Division, Country"
        />
      </div>
    </>
  );
}
