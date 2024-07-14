"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Icons from "../../Icons";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import UserContext from "@/app/providers/UserContex";
import { usePathname } from "next/navigation";

type MenuItem = {
  title: string;
  ref:
    | "dashboard"
    | "notice"
    | "post-notice"
    | "submit-form"
    | "admit-card"
    | "history";
  Icon: React.JSX.Element;
  hidden?: boolean;
};

export default function NavDrawer() {
  const { user } = useContext(UserContext);
  const path = usePathname();

  useEffect(() => {
    if (user) {
      setMenuItems([
        {
          title: "Notice",
          ref: "notice",
          Icon: <Icons.bell />,
        },
        {
          title: "Post a Notice",
          ref: "post-notice",
          hidden: !Boolean(user!.roles), // Hidden from the students
          Icon: <Icons.newspaper />,
        },
        {
          title: "Submit Form",
          ref: "submit-form",
          hidden: Boolean(user!.roles), // Hidden from the admin users
          Icon: <Icons.send />,
        },
        {
          title: "Admit Card",
          ref: "admit-card",
          Icon: <Icons.admitCard />,
        },
        {
          title: "History",
          ref: "history",
          hidden: Boolean(user!.roles), // Hidden from the admin users
          Icon: <Icons.history />,
        },
      ]);
    }
  }, [user]);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" disabled={!user}>
          <Icons.menu />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-screen top-0 right-auto left-0 mt-0 min-w-64 rounded-none">
        <div className="flex flex-col gap-1 md:gap-2">
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>

          <Separator />

          <Link
            href={user ? (user.roles ? "/dashboard/admin" : "/dashboard") : "/"}
            passHref
            className="px-2 md:px-4"
          >
            <Button
              variant={"ghost"}
              className="w-full items-center justify-start gap-1 md:gap-2 text-base md:text-lg"
            >
              <Icons.dashboard />
              <p className="flex flex-grow">Dashboard</p>
              {(path.endsWith("dashboard") ||
                path.endsWith("dashboard/admin")) && (
                <span className="bg-blue-500 rounded-full h-2 w-2" />
              )}
            </Button>
          </Link>

          <Separator />

          {/* List subheader */}
          <p className="text-muted-foreground p-4">Form Menu</p>

          {menuItems.map(
            (item, index) =>
              !item.hidden && (
                <Link
                  className="px-2 md:px-4"
                  key={`nav-drawer-link-${index}`}
                  href={`/dashboard/${item.ref}`}
                  passHref
                >
                  <Button
                    variant={"ghost"}
                    className={`w-full items-center justify-start gap-1 md:gap-2 text-base md:text-lg`}
                  >
                    {item.Icon}
                    <p className="flex flex-grow">{item.title}</p>
                    {path.endsWith(`/${item.ref}`) && (
                      <span className="bg-blue-500 rounded-full h-2 w-2" />
                    )}
                  </Button>
                </Link>
              )
          )}

          <Separator />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
