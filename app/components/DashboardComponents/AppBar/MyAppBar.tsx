"use client";
import { useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/app/providers/UserContex";
import { Button } from "@/components/ui/button";
import Icons from "../../Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavDrawer from "../Drawer/NavDrawer";
import Link from "next/link";

const MyAppBar = () => {
  const { user, setUser } = useContext(UserContext);

  const router = useRouter();
  const settings = [
    {
      text: "Profile",
      icon: <Icons.user />,
    },
    {
      text: "Preferences",
      icon: <Icons.settings />,
    },
    {
      text: "Logout",
      icon: <Icons.logout />,
    },
  ];

  const logout = useCallback(async () => {
    const apiRes = await fetch("/api/auth/logout", {
      method: "DELETE",
    });

    if (apiRes.ok) {
      alert("Logout successful");
      setUser(undefined);
      router.replace("/");
    } else {
      alert("Logout failed");
    }
  }, [router, setUser]);

  const handleMenuItemClick = (index: number) => {
    if (settings[index].text === "Logout") logout();
    return;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-2 md:gap-4 lg:gap-8 px-6 md:px-8 lg:px-16 sm:space-x-0">
        {/* Nav Drawer */}
        <NavDrawer />
        {/* Appbar code */}
        <div className="flex flex-grow">
          <Link
            href={user ? (user.roles ? "/dashboard/admin" : "dashboard") : "/"}
          >
            <Button variant={"link"} className="text-lg lg:text-xl font-bold">
              AFFSM
            </Button>
          </Link>
        </div>

        {/* Profile Menu Popover */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="rounded-full">
              <Icons.user className="w-full h-full" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-64">
            <DropdownMenuGroup>
              {settings.map((item, index) => (
                <DropdownMenuItem
                  key={`profile_menu_item_${index}`}
                  onClick={() => {
                    handleMenuItemClick(index);
                  }}
                >
                  <div className="flex flex-row gap-2 justify-around">
                    {item.icon}
                    <p className="text-center">{item.text}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default MyAppBar;
