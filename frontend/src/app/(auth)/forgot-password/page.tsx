"use client";
import { Button } from "@/components/catalyst/button";
import { Input } from "@/components/catalyst/input";
import React, { useState } from "react";
import { Text } from "@/components/catalyst/text";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await fetch("/api/forgot-password", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email }),
    // });

    // const data = await res.json();
    // if (data.error) {
    //   setMessage(data.error);
    // } else {
    //   setMessage("Check your email for a link to reset your password.");
    // }

    setMessage("Check your email for a link to reset your password");
  };
  return (
    <section className="flex-center size-full max-sm:px-6">
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Forgot Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>
          <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Input
                  id="forgot-password-email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {message && <Text>{message}</Text>}
            <div>
              <Button type="submit" className="w-full cursor-pointer">
                Send Reset Link
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
