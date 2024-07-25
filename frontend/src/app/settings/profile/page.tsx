"use client";
import { Heading } from "@/components/catalyst/heading";
import { Text } from "@/components/catalyst/text";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/catalyst/input";
import { useSession } from "next-auth/react";
import { Button } from "@/components/catalyst/button";
import { changeFirstNameAndLastName } from "../../../../lib/actions/user.action";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const session = useSession();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saveChangesDisabled, setSaveChangesDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSaveChanges = async () => {
    setIsLoading(true);

    try {
      const response = await changeFirstNameAndLastName({
        firstName,
        lastName,
      });
      session.update({
        ...session,
        data: {
          ...session.data,
          first_name: response?.first_name,
          last_name: response?.last_name,
        },
      });

      toast.success("Your Profile has been updated", {
        position: "bottom-center",
      });
    } catch (error) {
      let errorMessage: string = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error(errorMessage, { position: "bottom-center" });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setFirstName(session?.data?.first_name);
    setLastName(session?.data?.last_name);
  }, [session?.data]);

  useEffect(() => {
    if (
      firstName === session?.data?.first_name &&
      lastName === session?.data?.last_name
    ) {
      setSaveChangesDisabled(true);
    } else {
      setSaveChangesDisabled(false);
    }
  }, [firstName, lastName, session?.data]);

  return (
    <>
      <div className="border-b border-zinc-950/10 dark:border-white/10 pb-6">
        <Heading>My Profile</Heading>
      </div>
      <div className="mt-3">
        <Text>Name</Text>
        <div className="mt-3 pt-2 pb-1 px-3 border border-zinc-950/10 dark:border-white/10 rounded-lg items-center dark:text-zinc-700 text-base/6 w-full sm:text-sm/6 text-zinc-500 text-left dark:bg-white/[2.5%]">
          {session?.data?.email}
        </div>
      </div>
      <div className="mt-3">
        <Text>Password</Text>
        <button
          onClick={() => {
            router.push("/settings/change-password");
          }}
          className="mt-3 pt-2 pb-1 px-3 border border-zinc-950/10 dark:border-white/10 rounded-lg items-center dark:text-zinc-300 text-base/6 w-full sm:text-sm/6 text-zinc-700 text-left dark:bg-white/[2.5%]"
        >
          ********
        </button>
      </div>
      <div className="mt-3">
        <Text>First Name</Text>
        <Input
          value={firstName}
          onChange={(e) => {
            e.preventDefault();
            setFirstName(e.target.value);
          }}
          className="mt-3"
        />
      </div>
      <div className="mt-3">
        <Text>Last Name</Text>
        <Input
          value={lastName}
          onChange={(e) => {
            e.preventDefault();
            setLastName(e.target.value);
          }}
          className="mt-3"
        />
      </div>
      <Button
        className="mt-4"
        disabled={saveChangesDisabled || isLoading}
        onClick={handleSaveChanges}
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" /> &nbsp; Loading
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </>
  );
};

export default ProfilePage;
