import React from "react";
import Icons from "./Icons";

export default function MyLoadingSpinner() {
  return (
    <div className="h-64 w-full flex flex-row items-center justify-center gap-1 md:gap-2">
      <Icons.spinner className="animate-spin ease-in-out duration-700" />
      <p>Loading...</p>
    </div>
  );
}
