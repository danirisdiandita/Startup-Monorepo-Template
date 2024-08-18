"use client";
import { Button } from "@/components/catalyst/button";
import { Text } from "@/components/catalyst/text";
import { useGetVerifyStatusToTrueQuery } from "@/lib/services/verification";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const VerificationPage = () => {
  const searchParams = useSearchParams();
  const extraParamsObject = Object.fromEntries(searchParams.entries());

  // {
  //   params = { verificationToken: "" },
  // }: {
  //   params: { verificationToken: string };
  // }
  const { data, error, isLoading } = useGetVerifyStatusToTrueQuery(
    extraParamsObject
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isLoading ? (
        <></>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">
            {error ? "Verification Failed" : "Email Verified"}
          </h2>
          {/* <p className="mt-2 text-gray-600">Thank you! Your email has been successfully verified.</p> */}
          {error ? (
            <Text>{JSON.stringify(error)}</Text>
          ) : (
            <Text>Thank you! Your email has been successfully verified.</Text>
          )}

          {error ? (
            <></>
          ) : (
            <div className="mt-4">
              <Button className="cursor-pointer w-full" href="/sign-in">
                Sign In
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerificationPage;
