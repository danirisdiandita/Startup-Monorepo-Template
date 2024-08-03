"use client";
import { Button } from "@/components/catalyst/button";
import { Input } from "@/components/catalyst/input";
import { Text } from "@/components/catalyst/text";
import React, { useEffect, useState } from "react";
import { resendVerificationEmail } from "../../../../../lib/actions/user.action";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const parseEmailFromUserData = (userdata: string) => {
  let email = "";
  if (userdata) {
    try {
      const decodedUri = decodeURIComponent(userdata);
      if (decodedUri) {
        email = JSON.parse(decodedUri)?.email;
      }
    } catch (error) {
      email = "";
    }
  }

  return email;
};

const parseFirstNameFromUserData = (userdata: string) => {
  let firstName = "";
  if (userdata) {
    try {
      const decodedUri = decodeURIComponent(userdata);
      if (decodedUri) {
        firstName = JSON.parse(decodedUri)?.firstName;
      }
    } catch (error) {
      firstName = "";
    }
  }

  return firstName;
};

const parseLastNameFromUserData = (userdata: string) => {
  let lastName = "";
  if (userdata) {
    try {
      const decodedUri = decodeURIComponent(userdata);
      if (decodedUri) {
        lastName = JSON.parse(decodedUri)?.lastName;
      }
    } catch (error) {
      lastName = "";
    }
  }

  return lastName;
};

const PleaseConfirm = ({
  params = { userdata: "User Data" },
}: {
  params: { userdata: string };
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params?.userdata) {
      setFirstName(parseFirstNameFromUserData(params.userdata));
      setEmail(parseEmailFromUserData(params.userdata));
      setLastName(parseLastNameFromUserData(params.userdata));
    }
  }, [params]);

  const handleResendVerificationToken = async () => {
    setIsLoading(true)
    resendVerificationEmail({ email, firstName, lastName });
    setIsLoading(false)

    toast.success("Email Verification Token sent", {position: 'bottom-center'})
  };

  return (
    <main>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Verify your email</h2>
          <Text>
            We&apos;ve sent you an email with a link that you will need to click to
            verify your email. You might need to check your spam folder if you
            don&apos;t see it. Please verify by clicking the link on your most recent
            verification email. This link will expire in 12 hours.
          </Text>
          <Input type="email" value={email} disabled={true} className="py-2" />
          <Button
            onClick={handleResendVerificationToken}
            className="cursor-pointer w-full"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Loading
                ...
              </>
            ) : (
              "Resend Verification Token"
            )}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default PleaseConfirm;
