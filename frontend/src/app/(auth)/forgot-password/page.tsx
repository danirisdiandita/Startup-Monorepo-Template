"use client";
import { Button } from "@/components/catalyst/button";
import { Input } from "@/components/catalyst/input";
import React, { useEffect, useState } from "react";
import { Text } from "@/components/catalyst/text";

import { sendForgotPasswordEmail } from "../../../../lib/actions/user.action";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   if (value.mode === "dark") {
  //     document.body.classList.add("dark");
  //   } else if (value.mode === "system") {
  //     if (typeof window !== "undefined") {
  //       const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
  //         ? "dark"
  //         : "light";

  //       if (theme === "dark") {
  //         document.body.classList.add("dark");
  //       }
  //     }
  //   } else {
  //     document.body.classList.remove("dark");
  //   }
  // }, [value.mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      await sendForgotPasswordEmail({ email });
      setMessage("Check your email for a link to reset your password");
    } catch (err) {
      let errorMessage: string = "";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      toast.error(errorMessage, { position: "bottom-center" });
    }
    setIsLoading(false)
  };
  return (
    <section className={`flex-center size-full max-sm:px-6`}>
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
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    Loading
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
