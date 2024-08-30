"use client";
import React from "react";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (value.mode === "dark") {
      document.body.classList.add("dark");
    } else if (value.mode === "system") {
      if (typeof window !== "undefined") {
        const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

        if (theme === "dark") {
          document.body.classList.add("dark");
        }
      }
    } else {
      document.body.classList.remove("dark");
    }
  }, [value.mode]);

  const isLightOrDark = (mode: "system" | "dark" | "light") => {
    if (mode === "system") {
      if (typeof window !== "undefined") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      } else {
        return "dark";
      }
    } else {
      return mode;
    }
  };

  return (
    <main className={`bg-white dark:bg-zinc-800 ${isLightOrDark(value.mode)}`}>
      {children}
    </main>
  );
}
