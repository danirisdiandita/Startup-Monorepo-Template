import { updateThemeMode } from "@/lib/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/16/solid";
import React from "react";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const themeValue = useAppSelector((state) => state.theme);
  return (
    <div className="flex">
      <button
        className="rounded-l-full  border-l-[1px] border-y-[1px] items-center dark:border-white border-zinc-900"
        onClick={() => {
          if (typeof window !== "undefined") {
            dispatch(
              updateThemeMode(
                "system"
              )
            );
          }
        }}
      >
        <div className="p-1">
          <ComputerDesktopIcon className={themeValue.mode === "system" ? "text-zinc-900 dark:text-white w-4 h-4": "text-zinc-400 w-4 h-4"} />
        </div>
      </button>
      <button
        className="border-x-[1px] border-y-[1px] text-white flex items-center border-zinc-900 dark:border-white"
        onClick={() => {
          dispatch(updateThemeMode("light"));
        }}
      >
        <div className="p-1">
          <SunIcon className={themeValue.mode === "light" ? "text-zinc-900 dark:text-white w-4 h-4": "text-zinc-400 w-4 h-4"} />
        </div>
      </button>
      <button
        className={`rounded-r-full items-center border-r-[1px] border-y-[1px] dark:border-white border-zinc-900`}
        onClick={() => {
          dispatch(updateThemeMode("dark"));
        }}
      >
        <div className="p-1">
          <MoonIcon className={themeValue.mode === "dark" ? "text-zinc-900 dark:text-white w-4 h-4": "text-zinc-400 w-4 h-4"} />
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
