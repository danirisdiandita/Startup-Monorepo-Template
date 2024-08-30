import React from "react";
import { InputGroup, Input } from "@/components/catalyst/input";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Env } from "@/common/env";
import BlogLink from "@/components/landingpage/BlogLink";
import Image from "next/image";
import { Text } from "@/components/catalyst/text";

const Blog = () => {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-[#000000] p-8">
        <div className="w-full dark:bg-[#000000] bg-white  mb-8">
          <Image
            src="/images/Telaga-Menjer-Kabupaten-Wonosobo.jpg"
            alt="Dummy image"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />
          <h1 className="text-4xl font-bold text-black dark:text-white mt-4 mb-2">
            Welcome to DataQuery
          </h1>
          <Text className="text-sm text-gray-600 mb-4 dark:text-white">
            By Norma Dani Risdiandita
          </Text>
          <Text className="text-lg text-gray-800 dark:text-white">
            Programming is the process of designing and writing instructions
            that a computer can execute to perform specific tasks. It involves
            using various languages, such as Python, JavaScript, or C++, to
            create software, automate processes, and solve problems efficiently.
            Through programming, ideas are transformed into functional
            applications, enabling innovation and technology advancement across
            numerous fields.
          </Text>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {/* Card 1 */}
          <div className="bg-white dark:bg-[#000000] py-4">
            <Image
              src="/images/Telaga-Menjer-Kabupaten-Wonosobo.jpg"
              alt="Dummy image"
              width={1920}
              height={1080}
              className="w-full h-auto"
            />
            <h2 className="text-xl font-bold text-black mb-2 dark:text-white mt-4">
              Hidup itu lucu
            </h2>
            <Text className="text-sm text-gray-600 mb-4 dark:text-white">
              by Norma Dani Risdiandita
            </Text>
            <Text className="text-gray-800 dark:text-white">
              Programming is the process of designing and writing instructions
              that a computer can execute to perform specific tasks. It involves
              using various languages, such as Python, JavaScript, or C++, to
              create software, automate processes, and solve problems
              efficiently.
            </Text>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-[#000000] py-4">
            <Image
              src="/images/Telaga-Menjer-Kabupaten-Wonosobo.jpg"
              alt="Dummy image"
              width={1920}
              height={1080}
              className="w-full h-auto"
            />
            <h2 className="text-xl font-bold text-black mb-2 dark:text-white mt-4">
              Hidup itu lucu
            </h2>
            <Text className="text-sm text-gray-600 mb-4 dark:text-white">
              by Norma Dani Risdiandita
            </Text>
            <Text className="text-gray-800 dark:text-white">
              Programming is the process of designing and writing instructions
              that a computer can execute to perform specific tasks. It involves
              using various languages, such as Python, JavaScript, or C++, to
              create software, automate processes, and solve problems
              efficiently.
            </Text>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-[#000000] py-4">
            <Image
              src="/images/Telaga-Menjer-Kabupaten-Wonosobo.jpg"
              alt="Dummy image"
              width={1920}
              height={1080}
              className="w-full h-auto"
            />
            <h2 className="text-xl font-bold text-black mb-2 dark:text-white mt-4">
              Hidup itu lucu
            </h2>
            <Text className="text-sm text-gray-600 mb-4 dark:text-white">
              by Norma Dani Risdiandita
            </Text>
            <Text className="text-gray-800 dark:text-white">
              Programming is the process of designing and writing instructions
              that a computer can execute to perform specific tasks. It involves
              using various languages, such as Python, JavaScript, or C++, to
              create software, automate processes, and solve problems
              efficiently.
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
