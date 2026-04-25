"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const nextTheme = saved === "light" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.classList.toggle("light", nextTheme === "light");
    setCurrentTheme(nextTheme);
    setTheme(nextTheme);
  }, [setTheme]);

  useEffect(() => {
    if (!resolvedTheme) return;
    const nextTheme = resolvedTheme === "light" ? "light" : "dark";
    setCurrentTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.classList.toggle("light", nextTheme === "light");
  }, [resolvedTheme]);

  const isLight = currentTheme === "light";

  const handleToggle = () => {
    const nextTheme = isLight ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.classList.toggle("light", nextTheme === "light");
    setCurrentTheme(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="rounded-full border border-border/70 bg-card/70"
      aria-label="Toggle light and dark mode"
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      {isLight ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
