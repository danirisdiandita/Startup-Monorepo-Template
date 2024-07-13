'use client'
import { Heading } from "@/components/catalyst/heading";
import { Text } from "@/components/catalyst/text";
import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const session = useSession()
  return <Heading>{JSON.stringify(session)}</Heading>;
};

export default Dashboard;
