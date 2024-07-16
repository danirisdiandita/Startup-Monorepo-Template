"use client";
import React, { useState } from "react";
import { Text } from "@/components/catalyst/text";
import { Button } from "@/components/catalyst/button";
import { useRouter } from "next/navigation";

const ResetPasswordSuccessful = () => {
  const router = useRouter();
  return (
    <section className={`flex-center size-full max-sm:px-6`}>
      <div className="min-h-screen w-full flex items-center justify-center dark:bg-[#18181B] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-2">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Password Reset Successfully
            </h2>
            <Text className="mt-2">
              Your password has been reset. You can now log in with your new
              password.
            </Text>
            <Button className="w-full mt-2" href="/sign-in">Sign In</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordSuccessful;
