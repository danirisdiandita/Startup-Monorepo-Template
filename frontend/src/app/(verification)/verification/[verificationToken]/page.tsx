"use client";
import { useGetVerifyStatusToTrueQuery } from "@/lib/services/verification";
import React, { useEffect } from "react";

const VerificationPage = ({
  params = { verificationToken: "" },
}: {
  params: { verificationToken: string };
}) => {
  // extract verification token (create backend for verification token)

  const { data, error, isLoading } = useGetVerifyStatusToTrueQuery(
    params?.verificationToken
  );

  useEffect(() => {
    console.log('fetching data')
    if (data) {
      console.log("data verificaiton", data);
    } else {
      console.log('fkldsjfklds', data)
    }
  }, [data]);
  return (
    <div>{params?.verificationToken ? params?.verificationToken : "gitu"}

    </div>
  );
};

export default VerificationPage;
