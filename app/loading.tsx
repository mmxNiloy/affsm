import React from "react";
import Icons from "./components/Icons";

export default function Loading() {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-row gap-2 items-center justify-center">
      <Icons.spinner className="animate-spin ease-in-out duration-700" />
      <p>Loading...</p>
    </div>
  );
}
