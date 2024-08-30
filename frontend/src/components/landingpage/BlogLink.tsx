"use client";
import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

const BlogLink = ({ text, href }: { text: string; href: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const styleArray = [
    "group cursor-pointer rounded-full px-4 min-w-20 py-2.5 focus:outline-none sm:px-3 sm:py-1.5",
    "text-center dark:border-zinc-100 border-zinc-900 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]",
    "data-[focus]:bg-blue-500 data-[focus]:text-white",
    "data-[disabled]:opacity-50",
    "forced-color-adjust-none forced-colors:data-[focus]:bg-[Highlight] forced-colors:data-[focus]:text-[HighlightText] forced-colors:[&>[data-slot=icon]]:data-[focus]:text-[HighlightText]",
    "col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center supports-[grid-template-columns:subgrid]:grid-cols-subgrid",
    isHovered ? "bg-white/75 dark:bg-zinc-900/75" : "",
  ];

  return (
    <Link 
      className={clsx(styleArray)} 
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className={`${isHovered ? 'text-black dark:text-white' : 'dark:text-zinc-400 text-zinc-500'}`}>
        {text}
      </p>
    </Link>
  );
};

export default BlogLink;