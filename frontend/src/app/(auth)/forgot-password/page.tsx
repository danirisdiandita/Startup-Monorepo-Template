"use client";
import { Button } from "@/components/catalyst/button";
import { Input } from "@/components/catalyst/input";
import React, { useEffect, useState } from "react";
import { Text } from "@/components/catalyst/text";
import { useAppSelector } from "@/lib/hooks";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const value = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (value.mode === "dark") {
      document.body.classList.add("dark");
    } else if (value.mode === "system") {
      if (typeof window !== "undefined") {
        const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

        if (theme === "dark") {
          document.body.classList.add("dark");
        }
      }
    } else {
      document.body.classList.remove("dark");
    }
  }, [value.mode]);

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
    <section className={`flex-center size-full max-sm:px-6 ${value.mode}`}>
      <div className="min-h-screen w-full flex items-center justify-center dark:bg-[#18181B] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-2">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Forgot Password
            </h2>
            <Text className="mt-2">
              Enter your email to receive a password reset link
              </Text>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm mb-2">
              {/* <label htmlFor="email-address" className="sr-only dark:text-white">
                  Email address
                </label> */}
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
