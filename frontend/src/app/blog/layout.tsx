"use client";
import React from "react";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import BlogHeader from "@/components/blog/BlogHeader";

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
    <main className={`bg-white dark:bg-[#000000] ${isLightOrDark(value.mode)} max-w-7xl mx-auto`}>
      <BlogHeader />
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 ">{children}</div>
    </main>
  );
}
