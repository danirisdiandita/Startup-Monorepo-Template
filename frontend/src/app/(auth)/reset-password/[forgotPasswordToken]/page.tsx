"use client";
import React, { useState } from "react";
import { Text } from "@/components/catalyst/text";
import { Input } from "@/components/catalyst/input";
import { Button } from "@/components/catalyst/button";
import { Loader2 } from "lucide-react";
import { changeNewPassword } from "../../../../../lib/actions/user.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const ResetPassword = ({
  params = { forgotPasswordToken: "" },
}: {
  params: { forgotPasswordToken: string };
}) => {
  const [password, setPassword] = useState<string>("");
  const [confirmationPassword, setConfirmationPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      if (password.length < 8) {
        toast.error("Password needs to be minimum of 8 character length", {position: "bottom-center"})
        return;
      }
      if (password !== confirmationPassword) {
        toast.error("Password doesn't match", {position: "bottom-center"})
      } else {
        const response = await changeNewPassword({
          forgotPasswordToken: params.forgotPasswordToken,
          newPassword: password,
        });
        router.push("/reset-password-successful");
      }
    } catch (err) {
      let errorMessage: string = "";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      toast.error(errorMessage, { position: "bottom-center" });
    }

    setIsLoading(false);
  };
  return (
    <section className={`flex-center size-full max-sm:px-6`}>
      <div className="min-h-screen w-full flex items-center justify-center dark:bg-[#18181B] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-2">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Reset Password
            </h2>
            <Text className="mt-2">
              Enter your email to receive a password reset link
            </Text>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm mb-2">
              <Input
                id="reset-password-password"
                name="reset-password-password"
                type="password"
                required
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="rounded-md shadow-sm mb-2">
              <Input
                id="reset-password-confirmation"
                name="reset-password-confirmation"
                type="password"
                required
                placeholder="Confirm Your Password"
                value={confirmationPassword}
                onChange={(e) => setConfirmationPassword(e.target.value)}
              />
            </div>
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
                  "Reset Password"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
