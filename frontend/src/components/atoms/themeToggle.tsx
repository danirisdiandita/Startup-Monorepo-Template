import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/16/solid";
import React from "react";

const ThemeToggle = ({
  setMode,
}: {
  setMode: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex">
      <button
        className="rounded-l-full  border-l-[1px] border-y-[1px] items-center"
        onClick={() => {
          setMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark': 'light')
        }}
      >
        <div className="p-1">
          <ComputerDesktopIcon className="text-white w-4 h-4" />
        </div>
      </button>
      <button
        className="border-x-[1px] border-y-[1px] text-white flex items-center"
        onClick={() => {
          setMode("light");
        }}
      >
        <div className="p-1">
          <SunIcon className="text-white w-4 h-4" />
        </div>
      </button>
      <button
        className="rounded-r-full items-center border-r-[1px] border-y-[1px]"
        onClick={() => {
          setMode("dark");
        }}
      >
        <div className="p-1">
          <MoonIcon className="text-white w-4 h-4" />
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
