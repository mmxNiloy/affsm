"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function PreferencesTab() {
  const { theme, setTheme } = useTheme();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>
          Set up the application according to your preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Theme setting */}
        <div className="flex flex-row items-center gap-1 md:gap-2">
          <Switch
            id="dark-theme-switch"
            checked={theme === "dark"}
            onCheckedChange={(e) => {
              if (e) {
                setTheme("dark");
              } else setTheme("light");
            }}
          />
          <Label htmlFor="dark-theme-switch">Dark Theme</Label>
        </div>
      </CardContent>
    </Card>
  );
}
