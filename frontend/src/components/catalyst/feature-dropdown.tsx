import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
// hover:bg-zinc-500

const FeatureDropdown = ({ text }: { text: string }) => {
  const [styleArray, setStyleArray] = useState([
    "group cursor-pointer rounded-full px-3.5 py-2.5 focus:outline-none sm:px-3 sm:py-1.5",
    "text-left text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]",
    "data-[focus]:bg-blue-500 data-[focus]:text-white",
    "data-[disabled]:opacity-50",
    "forced-color-adjust-none forced-colors:data-[focus]:bg-[Highlight] forced-colors:data-[focus]:text-[HighlightText] forced-colors:[&>[data-slot=icon]]:data-[focus]:text-[HighlightText]",
    "col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center supports-[grid-template-columns:subgrid]:grid-cols-subgrid",
    "[&>[data-slot=icon]]:col-start-1 [&>[data-slot=icon]]:row-start-1 [&>[data-slot=icon]]:-ml-0.5 [&>[data-slot=icon]]:mr-2.5 [&>[data-slot=icon]]:size-5 sm:[&>[data-slot=icon]]:mr-2 [&>[data-slot=icon]]:sm:size-4",
    "[&>[data-slot=icon]]:text-zinc-500 [&>[data-slot=icon]]:data-[focus]:text-white [&>[data-slot=icon]]:dark:text-zinc-400 [&>[data-slot=icon]]:data-[focus]:dark:text-white",
    "[&>[data-slot=avatar]]:-ml-1 [&>[data-slot=avatar]]:mr-2.5 [&>[data-slot=avatar]]:size-6 sm:[&>[data-slot=avatar]]:mr-2 sm:[&>[data-slot=avatar]]:size-5",
  ]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStyleArray([...styleArray, "bg-white/75 dark:bg-zinc-800/75"]);
      setTextColor("text-black dark:text-white");
    } else {
      setStyleArray(styleArray.slice(0, -1));
      setTextColor("dark:text-zinc-400 text-zinc-500");
    }
  }, [isOpen]);

  const [textColor, setTextColor] = useState("dark:text-zinc-400 text-black");
  return (
    <div
      className={clsx(styleArray)}
      onMouseEnter={() => {
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
      }}
    >
      <div className="flex items-center space-x-2">
        <p className={textColor}>{text}</p>
        {isOpen ? (
          <ChevronDownIcon width={20} height={20} className={textColor} />
        ) : (
          <ChevronUpIcon width={20} height={20} className={textColor} />
        )}
      </div>
    </div>
  );
};

export default FeatureDropdown;
