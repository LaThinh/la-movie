// app/components/ThemeSwitcher.tsx
"use client";

import { Button, Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";

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
    <>
      <Link href="/search" title="Go to Search Pages">
        <MagnifyingGlassIcon
          width="36"
          height="36"
          className="text-white hover:text-yellow-400 font-semibold"
        />
      </Link>
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
    </>
  );
}
