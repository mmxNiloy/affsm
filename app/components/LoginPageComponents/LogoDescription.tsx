"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const LogoDescription = () => {
  const { theme } = useTheme();
  const [logoDir, setLogoDir] = useState("/affsm_logo_dark.svg");

  useEffect(() => {
    if (theme === "dark") setLogoDir("/affsm_logo_dark.svg");
    else setLogoDir("/affsm_logo_light.svg");
  }, [theme]);

  return (
    <Image
      src={logoDir}
      unoptimized
      alt="logo"
      height={360}
      width={480}
      priority
    />
  );
};

export default LogoDescription;
