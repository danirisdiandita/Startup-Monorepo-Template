"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import ProfileDropdowns from "./molecules/ProfileDropdowns";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const session = useSession();
  console.log('session', session)
  const router = useRouter();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/sign-in");
  };
  return (
    <>
      <header className="bg-white">
        <nav className="flex justify-between px-10 py-3">
          <div>This is logo</div>
          <ProfileDropdowns
            name={
              session?.data?.user?.name ? session?.data?.user?.name : "Guest"
            }
            email={
              session?.data?.user?.email ? session?.data?.user?.email : session?.data?.user?.name
            }
          />
          
        </nav>
      </header>
    </>
  );
};

export default Navbar;
