import React from "react";
import Icons from "./Icons";

export default function NoData() {
  return (
    <div className="col-span-full flex-grow min-h-screen w-full flex flex-col gap-2 items-center justify-center">
      <Icons.rabbit className="size-32" />
      <p className="text-xl">No data found...</p>
    </div>
  );
}
