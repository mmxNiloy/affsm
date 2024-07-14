"use client";
import Icons from "@/app/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toDD_MM_YYYY } from "@/util/Functions";
import { User } from "@/util/types";
import React, { Suspense, useContext } from "react";
import StudentAddressInformationGridSkeleton from "./StudentAddressInformationGridSkeleton";
import StudentAddressInformation from "./StudentAddressInformation";
import UserContext from "@/app/providers/UserContex";
import StudentInformationGridSkeleton from "./StudentInformationGridSkeleton";

type Props = {
  user: User;
};

export default function StudentInformationGrid({ user }: Props) {
  // const { user } = useContext(UserContext);

  if (!user) return <StudentInformationGridSkeleton />;

  return (
    <div className="grid gap-1 md:gap-2 grid-cols-12">
      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="sid-input">Student ID</Label>
        <Input id="sid-input" disabled value={user!.student_id} />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="sid-input">Session</Label>
        <Input id="sid-input" disabled value={user!.session} />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="dept-input">Department</Label>
        <Input id="dept-input" disabled value={user!.department_name} />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="faculty-input">Faculty</Label>
        <Input id="faculty-input" disabled value={user!.faculty} />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="full-name-input">Student&apos;s Name</Label>
        <Input
          id="full-name-input"
          disabled
          value={`${user!.first_name} ${user!.last_name}`}
        />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="full-name-bn-input">
          Student&apos;s Name (In Bengali)
        </Label>
        <Input
          id="full-name-bn-input"
          disabled
          value={`${user!.first_name_bn} ${user!.last_name_bn}`}
        />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="fathers-name-input">Father&apos;s Name</Label>
        <Input id="fathers-name-input" disabled value={user!.fathers_name} />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="faters-name-bn-input">
          Father&apos;s Name (In Bengali)
        </Label>
        <Input
          id="faters-name-bn-input"
          disabled
          value={user!.fathers_name_bn}
        />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="mothers-name-input">Mother&apos;s Name</Label>
        <Input id="mothers-name-input" disabled value={user!.mothers_name} />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="mothers-name-bn-input">
          Mother&apos;s Name (In Bengali)
        </Label>
        <Input
          id="mothers-name-bn-input"
          disabled
          value={user!.mothers_name_bn}
        />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="guardians-name-input">Guardian&apos;s Name</Label>
        <Input id="guardians-name-input" disabled value={user!.guardian_name} />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="guardians-name-bn-input">
          Guardian&apos;s Name (In Bengali)
        </Label>
        <Input
          id="guardians-name-bn-input"
          disabled
          value={user!.guardian_name_bn}
        />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="guardian-rel-input">Relationsip with Guardian</Label>
        <Input
          id="guardian-rel-input"
          disabled
          value={user!.guardian_relation}
        />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="dob-button">Date of Birth</Label>
        <Button
          id="dob-button"
          disabled
          variant={"outline"}
          className="flex gap-1 md:gap-2 px-2 w-full justify-start"
        >
          <Icons.calendar />
          {toDD_MM_YYYY(user!.dob)}
        </Button>
      </div>

      <StudentAddressInformation user={user} />

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="contact-input">Contact</Label>
        <Input id="contact-input" disabled value={user!.phone} />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="nationality-input">Nationality</Label>
        <Input id="nationality-input" disabled value={user!.nationality} />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="ethnicity-input">Etnicity</Label>
        <Input id="ethnicity-input" disabled value={user!.ethnicity} />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label htmlFor="religion-input">Religion</Label>
        <Input id="religion-input" disabled value={user!.religion} />
      </div>
    </div>
  );
}
