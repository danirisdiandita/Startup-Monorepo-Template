import { Text } from "@/components/catalyst/text";
import React from "react";

const PleaseConfirm = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Thank you for registering!
        </h1>
        <p className="mt-6 text-lg leading-7 text-gray-600">
          A confirmation email has been sent to your email address. Please check
          your inbox to verify your account.
        </p>
      </div>
    </main>
  );
};

export default PleaseConfirm;
