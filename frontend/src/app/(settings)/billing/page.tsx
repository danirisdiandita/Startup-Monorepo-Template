import { Button } from "@/components/catalyst/button";
import { Divider } from "@/components/catalyst/divider";
import { Text } from "@/components/catalyst/text";
import React from "react";

const Billing = () => {
  return (
    <>
      <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
        Plan & Billing
      </h1>
      <Divider className="mt-6" />
      <div className="overflow-hidden bg-white shadow sm:rounded-lg mt-4 dark:bg-zinc-950">
        <div className="px-4 py-5 sm:p-6 grid grid-cols-3">
          <div className="flex-col">
            <Text>Plan</Text>
            <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
              Another Plan
            </h1>
          </div>
          <div className="flex-col">
            <Text>Payment</Text>
            <div className="flex space-x-2 items-center">
              <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
                10$
              </h1>
              <Text>per month</Text>
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <Button plain>Cancel Subscription</Button>
            <Button>Upgrade</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Billing;
