"use client";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [transition, startTransition] = useTransition();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        startTransition(() => setTheme(theme === "light" ? "dark" : "light"));
      }}
    >
      {theme === "light" ? (
        <Sun className="transition-all h-5 w-5 " />
      ) : (
        <Moon className="transition-all h-5 w-5" />
      )}
    </Button>
  );
}
