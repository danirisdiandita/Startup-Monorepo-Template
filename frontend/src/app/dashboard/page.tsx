"use client";
import { Heading } from "@/components/catalyst/heading";
import { Text } from "@/components/catalyst/text";
import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const session = useSession();
  return (
    <>
      <div className="border-b border-zinc-950/10 dark:border-white/10 pb-6">
        <Heading>Dashboard</Heading>
      </div>
      <Text>{JSON.stringify(session, null, 2)}</Text>
    </>
  );
};

export default Dashboard;
