import React from "react";
import { Heading } from "@/components/catalyst/heading";
import { CircleStackIcon } from "@heroicons/react/24/outline";

const Database = () => {
  return (
    <>
      <div className="border-b border-zinc-950/10 dark:border-white/10 pb-6">
        <div className="flex justify-start space-x-2">
          <CircleStackIcon
            className="dark:text-white text-black"
            width={30}
            height={30}
          />
          <Heading>Database</Heading>
        </div>
      </div>
      
    </>
  );
};

export default Database;
