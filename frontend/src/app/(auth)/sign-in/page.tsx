"use client";
import AuthForm from "@/components/AuthForm";
import { useSearchParams } from "next/navigation";

import React from "react";

const SignIn = () => {
  const searchParams = useSearchParams();

  const extraParamsObject = Object.fromEntries(searchParams.entries());

  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-in" extra_params={extraParamsObject} />
    </section>
  );
};

export default SignIn;
