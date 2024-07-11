"use client";
import { Button } from "@/components/catalyst/button";
import { Link } from "@/components/catalyst/link";
import { Text } from "@/components/catalyst/text";
import { useGetVerifyStatusToTrueQuery } from "@/lib/services/verification";
import React, { useEffect } from "react";

const VerificationPage = ({
  params = { verificationToken: "" },
}: {
  params: { verificationToken: string };
}) => {
  const { data, error, isLoading } = useGetVerifyStatusToTrueQuery(
    params?.verificationToken
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Email Verified</h2>
        {/* <p className="mt-2 text-gray-600">Thank you! Your email has been successfully verified.</p> */}
        <Text>Thank you! Your email has been successfully verified.</Text>
        <div className="mt-4">
          <Button className="cursor-pointer w-full" href="/sign-in">Sign In</Button>
        
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
