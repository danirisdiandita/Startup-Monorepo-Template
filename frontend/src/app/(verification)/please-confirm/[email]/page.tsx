import { Button } from "@/components/catalyst/button";
import { Field, Label } from "@/components/catalyst/fieldset";
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
          <h1 className="text-2xl font-semibold mb-4">Verify your email</h1>
          <p className="text-gray-700 mb-6">
            We've sent you an email with a link that you will need to click to
            verify your email. You might need to check your spam folder if you
            don't see it. Please verify by clicking the link on your most recent
            verification email. This link will expire in 12 hours.
          </p>
          <input
            type="email"
            value={params.email.replace("%40", "@")}
            readOnly
            className="w-full mb-4 px-4 py-2 border rounded-full bg-gray-200 cursor-not-allowed"
          />
          <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700">
            Resend verification email
          </button>
        </div>
      </div>
    </main>
  );
};

export default PleaseConfirm;
