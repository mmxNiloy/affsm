"use client";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import ResponsiveAppBar from "./ResponsiveAppBar";
import PersistentDrawer from "../Drawer/PersistentDrawer";
import { useRouter } from "next/navigation";
import axios from "axios";
import UserContext from "@/app/providers/UserContex";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Icons from "../../Icons";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
      icon: <AccountCircleIcon />,
    },
    {
      text: "Preferences",
      icon: <SettingsIcon />,
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
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
  }, []);

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
                  onClick={(e) => {
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
