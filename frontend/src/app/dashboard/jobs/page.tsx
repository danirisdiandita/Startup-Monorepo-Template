import { ClockIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Heading } from "@/components/catalyst/heading";
const Jobs = () => {
  return (
    <>
      <div className="border-b border-zinc-950/10 dark:border-white/10 pb-6">
        <div className="flex justify-start space-x-2">
          <ClockIcon
            className="dark:text-white text-black"
            width={30}
            height={30}
          />
          <Heading>Jobs</Heading>
        </div>
      </div>
    </>
  );
};

export default Jobs;
