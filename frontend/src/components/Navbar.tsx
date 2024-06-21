"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  return (
    <>
      <header className="bg-white">
        <nav className="flex justify-between px-10 py-3">
          <div>This is logo</div>
          <button
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-300"
            onClick={toggleDropdown}
          >
            <div className="text-xl font-bold text-gray-700">
              {session?.data?.user?.name ? session?.data?.user?.name[0] : "?"}
            </div>
          </button>
        </nav>
        {isDropdownVisible && (
          <div className="absolute mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 right-8">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <button 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                role="menuitem"
              >
                Option 1
              </button>
              <button 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                role="menuitem"
              >
                Option 2
              </button>
              <button 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                role="menuitem"
              >
                Option 3
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
