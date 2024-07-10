import { Button } from "@/components/catalyst/button";
import { Input } from "@/components/catalyst/input";
import { Text } from "@/components/catalyst/text";
import React from "react";

const PleaseConfirm = ({
  params = { email: "Your Email" },
}: {
  params: { email: string };
}) => {
  return (
    <main>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Verify your email</h2>
          <Text>
            We've sent you an email with a link that you will need to click to
            verify your email. You might need to check your spam folder if you
            don't see it. Please verify by clicking the link on your most recent
            verification email. This link will expire in 12 hours.
          </Text>
          <Input
            type="email"
            value={params.email.replace("%40", "@")}
            disabled={true}
            className="py-2"
          />
          <Button className="cursor-pointer w-full">Resend Verification Token</Button>
        </div>
      </div>
    </main>
  );
};

export default PleaseConfirm;
