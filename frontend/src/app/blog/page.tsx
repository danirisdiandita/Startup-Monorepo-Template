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
      <div className="min-h-screen bg-white dark:bg-[#000000] p-4 sm:p-6 md:p-8">
        <div className="w-full dark:bg-[#000000] bg-white mb-6 sm:mb-8">
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
            <Image
              src="/images/Telaga-Menjer-Kabupaten-Wonosobo.jpg"
              alt="Dummy image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white mt-4 mb-2">
            Welcome to DataQuery
          </h1>
          <Text className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 dark:text-white">
            By Norma Dani Risdiandita
          </Text>
          <Text className="text-base sm:text-lg text-gray-800 dark:text-white">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {/* Card 1 */}
          <div className="bg-white dark:bg-[#000000]  rounded-lg shadow-md">
            <div className="relative w-full h-40 sm:h-48">
              <Image
                src="/images/Telaga-Menjer-Kabupaten-Wonosobo.jpg"
                alt="Dummy image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-black mb-2 dark:text-white mt-3">
              Hidup itu lucu
            </h2>
            <Text className="text-xs sm:text-sm text-gray-600 mb-3 dark:text-white">
              by Norma Dani Risdiandita
            </Text>
            <Text className="text-sm sm:text-base text-gray-800 dark:text-white">
              Programming is the process of designing and writing instructions
              that a computer can execute to perform specific tasks. It involves
              using various languages, such as Python, JavaScript, or C++, to
              create software, automate processes, and solve problems
              efficiently.
            </Text>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-[#000000] rounded-lg shadow-md">
            <div className="relative w-full h-40 sm:h-48">
              <Image
                src="/images/Telaga-Menjer-Kabupaten-Wonosobo.jpg"
                alt="Dummy image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-black mb-2 dark:text-white mt-3">
              Hidup itu lucu
            </h2>
            <Text className="text-xs sm:text-sm text-gray-600 mb-3 dark:text-white">
              by Norma Dani Risdiandita
            </Text>
            <Text className="text-sm sm:text-base text-gray-800 dark:text-white">
              Programming is the process of designing and writing instructions
              that a computer can execute to perform specific tasks. It involves
              using various languages, such as Python, JavaScript, or C++, to
              create software, automate processes, and solve problems
              efficiently.
            </Text>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-[#000000]  rounded-lg shadow-md">
            <div className="relative w-full h-40 sm:h-48">
              <Image
                src="/images/Telaga-Menjer-Kabupaten-Wonosobo.jpg"
                alt="Dummy image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-black mb-2 dark:text-white mt-3">
              Hidup itu lucu
            </h2>
            <Text className="text-xs sm:text-sm text-gray-600 mb-3 dark:text-white">
              by Norma Dani Risdiandita
            </Text>
            <Text className="text-sm sm:text-base text-gray-800 dark:text-white">
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
