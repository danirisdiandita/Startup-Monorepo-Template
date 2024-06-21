"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardPage = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/sign-in");
  };
  return (
    <div className="flex flex-col">
      <div>DashboardPage</div>
      <Button
        className="bg-slate-100 text-black rounded-full py-4 w-40"
        onClick={() => handleSignOut()}
      >
        Log Out
      </Button>
    </div>
  );
};

export default DashboardPage;
