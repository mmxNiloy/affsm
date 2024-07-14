import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function StudentAddressInformationGridSkeleton() {
  return (
    <>
      <div className="col-span-full">
        <Label htmlFor="addr-input-skel-1">Permanent Address</Label>
        <Skeleton id="addr-input-skel-1" className="w-full h-8" />
      </div>
      <div className="col-span-full">
        <Label htmlFor="addr-input-skel-2">Present Address</Label>
        <Skeleton id="addr-input-skel-2" className="w-full h-8" />
      </div>
      <div className="col-span-full">
        <Label htmlFor="addr-input-skel-3">Guardian&apos;s Address</Label>
        <Skeleton id="addr-input-skel-3" className="w-full h-8" />
      </div>
    </>
  );
}
