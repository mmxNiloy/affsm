import { Label } from "@/components/ui/label";
import React from "react";
import StudentAddressInformationGridSkeleton from "./StudentAddressInformationGridSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentInformationGridSkeleton() {
  return (
    <div className="grid gap-1 md:gap-2 grid-cols-12">
      <div className="col-span-full lg:col-span-6">
        <Label>Student ID</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label>Session</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label>Department</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label>Faculty</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label>Student&apos;s Name</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label>Student&apos;s Name (In Bengali)</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label>Father&apos;s Name</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label>Father&apos;s Name (In Bengali)</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label>Mother&apos;s Name</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label>Mother&apos;s Name (In Bengali)</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label>Guardian&apos;s Name</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label>Guardian&apos;s Name (In Bengali)</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label>Relationsip with Guardian</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label>Date of Birth</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <StudentAddressInformationGridSkeleton />

      <div className="col-span-full lg:col-span-6">
        <Label>Contact</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label>Nationality</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label>Etnicity</Label>
        <Skeleton className="w-full h-8" />
      </div>

      <div className="col-span-full lg:col-span-6">
        <Label>Religion</Label>
        <Skeleton className="w-full h-8" />
      </div>
    </div>
  );
}
