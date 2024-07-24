"use client";
import { Heading } from "@/components/catalyst/heading";
import { Text } from "@/components/catalyst/text";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/catalyst/input";
import { useSession } from "next-auth/react";
import { Button } from "@/components/catalyst/button";

const ProfilePage = () => {
  const session = useSession();
  const [firstName, setFirstName] = useState(session?.data?.first_name);
  const [lastName, setLastName] = useState(session?.data?.last_name);
  const [saveChangesDisabled, setSaveChangesDisabled] = useState(true);

  useEffect(() => {
    if (
      firstName === session?.data?.first_name &&
      lastName === session?.data?.last_name
    ) {
      setSaveChangesDisabled(true);
    } else {
      setSaveChangesDisabled(false);
    }
  }, [firstName, lastName]);

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
          onClick={() => console.log("klik klik password ")}
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
      <Button className="mt-4" disabled={saveChangesDisabled}>
        Save Changes
      </Button>
    </>
  );
};

export default ProfilePage;
