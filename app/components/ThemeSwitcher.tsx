// app/components/ThemeSwitcher.tsx
"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeTheme = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <div
      title={`Click here  ${
        theme == "light" ? "Change theme to Dark Mode" : "Back to Light Mode"
      }`}
    >
      <Switch
        isSelected={theme === "dark"}
        onValueChange={changeTheme}
        size="md"
        color={theme === "dark" ? "warning" : "secondary"}
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
      />
    </div>
  );
}
