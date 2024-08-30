import React from "react";
import { InputGroup, Input } from "@/components/catalyst/input";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Env } from "@/common/env";
import Image from "next/image";
import NextLink from "next/link";
import { Button } from "@/components/catalyst/button";
import { useAppSelector } from "@/lib/hooks";

const Blog = () => {
  return (
    <>
      <nav className="bg-white shadow-md dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16 items-center">
            <div className="flex">
              <Button
                className="rounded-l-xl rounded-r-none text-lg"
                href="/blog/engineering"
                color="dark"
              >
                Engineering
              </Button>
              <Button className="rounded-none text-lg" href="/blog/products" color="dark">
                Products
              </Button>
              <Button className="rounded-none text-lg" href="/blog/life" color="dark">
                Life
              </Button>
              <Button
                className="rounded-l-none rounded-r-xl text-lg"
                href="/blog/miscellaneous"
                color="dark"
              >
                Miscellaneous
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <div className="hero-image relative">
          <svg width="100%" height="300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hexagonPattern"
                width="173.2"
                height="200"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M86.6,0 L173.2,50 L173.2,150 L86.6,200 L0,150 L0,50 Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
                <path
                  d="M0,50 L86.6,100 L86.6,200 M173.2,50 L86.6,100"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="black" />
            <rect width="100%" height="100%" fill="url(#hexagonPattern)" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-white">{`${Env.productName} Blog`}</h1>
            <p className="text-md text-white mt-2">Latest News of Technology</p>
          </div>
        </div>
        <div className="flex ml-24">
          <aside className="w-64 bg-gray-100 h-screen p-4">
            <InputGroup>
              <MagnifyingGlassIcon />
              <Input
                name="search"
                placeholder="Search&hellip;"
                aria-label="Search"
              />
            </InputGroup>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-blue-600 hover:underline">
                  Software Engineering
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-blue-600 hover:underline">
                  Data Science
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-blue-600 hover:underline">
                  Machine Learning
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-blue-600 hover:underline">
                  Artificial Intelligence
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Blog;
