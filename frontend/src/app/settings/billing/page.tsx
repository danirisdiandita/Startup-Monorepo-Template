import { Button } from "@/components/catalyst/button";
import { Divider } from "@/components/catalyst/divider";
import { Heading } from "@/components/catalyst/heading";
import { Text } from "@/components/catalyst/text";
import Head from "next/head";
import React from "react";

const ProgressBar = ({
  label,
  max,
  used,
}: {
  label: string;
  max: number;
  used: number;
}) => {
  const percentage = ({ used, max }: { used: number; max: number }) => {
    return (100 * used) / max;
  };
  return (
    <div className="flex flex-col space-y-3 py-2 pr-4">
      <Text>{label}</Text>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="dark:bg-white bg-black-2 h-2.5 rounded-full"
          style={{ width: `${60}%` }}
        ></div>
      </div>
      <div className="flex justify-between">
        <Text>{`Used: ${used} (${percentage({ used, max })}%)`}</Text>
        <Text>{`Max: ${max}`}</Text>
      </div>
    </div>
  );
};

const Billing = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Heading>Plan & Billing</Heading>
      <Divider className="mt-6" />
      <div className="overflow-hidden bg-white shadow sm:rounded-lg mt-4 dark:bg-zinc-950">
        <div className="px-4 py-5 sm:p-6 flex-col">
          <div className="grid sm:grid-rows-1 sm:grid-cols-3 grid-rows-3 grid-cols-1">
            <div className="flex-col">
              <Text>Plan</Text>
              <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
                Free Plan
              </h1>
            </div>
            <div className="flex-col">
              <Text>Payment</Text>
              <div className="flex space-x-2 items-center">
                <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
                  0$
                </h1>
                <Text>per month</Text>
              </div>
            </div>
            <div className="flex space-x-2 items-center justify-end">
              <Button plain>Cancel Subscription</Button>
              <Button>Upgrade</Button>
            </div>
          </div>
          <Divider className="my-2" />
          <div className="grid grid-cols-3">
            <ProgressBar used={3} max={5} label="Cron Jobs" />
            <ProgressBar used={3} max={5} label="Charts" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Billing;
