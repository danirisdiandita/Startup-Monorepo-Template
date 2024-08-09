"use client";
import AuthForm from "@/components/AuthForm";
import { useSearchParams } from "next/navigation";

import React from "react";

const SignIn = () => {
  const searchParams = useSearchParams();
  console.log("searchParams", searchParams);

  if (searchParams.get("link")) {
    console.log('searchParams.get("link")', searchParams.get("link"));
  
  }
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-in" />
    </section>
  );
};

export default SignIn;
