"use client";
import { Heading } from "@/components/catalyst/heading";
import { Text } from "@/components/catalyst/text";
import { useGetPokemonByNameQuery } from "@/lib/services/pokemon";
import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const session = useSession();
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
  return (
    <>
      <div className="border-b border-zinc-950/10 dark:border-white/10 pb-6">
        <Heading>Dashboard</Heading>
      </div>
      <Text>{JSON.stringify(session, null, 2)}</Text>
      <Text>nggakgitu</Text>
      <Text>{data ? data?.abilities[0]?.ability?.name : ''}</Text>
    </>
  );
};

export default Dashboard;
