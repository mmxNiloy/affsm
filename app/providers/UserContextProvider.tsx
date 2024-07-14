"use client";
import { User } from "@/util/types";
import React, { useCallback, useEffect, useState } from "react";
import UserContext from "./UserContex";
import { usePathname, useRouter } from "next/navigation";

export default function UserContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const path = usePathname();
  const [user, setUser] = useState<User>();

  const verifySession = useCallback(async () => {
    const req = await fetch("/api/auth/verify");
    if (req.ok) {
      const data = (await req.json()) as { message: string; user: User };
      setUser(data.user);
    } else {
      setUser(undefined);
      router.replace("/");
    }
  }, [setUser, router]);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
