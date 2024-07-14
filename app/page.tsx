"use server";

import Head from "next/head";
import Grid from "@mui/material/Grid";
import LoginForm from "@/app/components/LoginPageComponents/LoginForm";
import Footer from "@/app/components/LoginPageComponents/Footer";
import LogoDescription from "@/app/components/LoginPageComponents/LogoDescription";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/util/types";

export default async function Home() {
  return (
    <main className="flex flex-col gap-1 md:gap-2">
      <div className="h-[100vh] w-[100vw] flex flex-col md:flex-row items-center justify-around gap-1 md:gap-2">
        {/* Logo and description */}
        <div className="flex items-center justify-center col-span-2 lg:col-span-1">
          <LogoDescription />
        </div>

        {/* Login form (maybe sign-up options?) */}
        <div className="flex items-center justify-center col-span-2 lg:col-span-1">
          <LoginForm />
        </div>
      </div>

      <Footer />
    </main>
  );
}
