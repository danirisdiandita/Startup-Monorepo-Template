import React from "react";
import { Strong, Text } from "../catalyst/text";
import { WalletIcon } from "@heroicons/react/20/solid";
import { SidebarItem } from "../catalyst/sidebar";

const PlanOnSidebar = () => {
  return (
    <div className="my-2">
      <div className="flex space-x-2 justify-start items-center px-2">
        <WalletIcon
          width={20}
          height={20}
          className="text-black dark:text-white"
        />
        <Text>
          <Strong>Free Plan</Strong>
        </Text>
      </div>
      <Text className="px-2">Description of the plan</Text>
      <SidebarItem href="/settings/billing">Manage Plan</SidebarItem>
    </div>
  );
};

export default PlanOnSidebar;
