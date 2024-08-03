import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileDropdowns({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/sign-in");
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 items-center border-0">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full text-lg font-semibold">
            {name[0]}
          </div>
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-black"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="px-4 py-3">
          <p className="text-sm">Signed in as</p>
          <p className="truncate text-sm font-medium text-gray-900">{email}</p>
        </div>
        <div className="py-1">
          <MenuItem>
            {({ focus }) => (
              <button
                className={classNames(
                  focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm w-full font-semibold"
                )}
              >
                <div className="justify-start flex space-x-4">
                  <Image
                    src="/icons/creditcard.svg"
                    width={20}
                    height={20}
                    alt="subscription"
                  />
                  <p>Subscription</p>
                </div>
              </button>
            )}
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            {({ focus }) => (
              <button
                type="submit"
                className={classNames(
                  focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block w-full px-4 py-2 text-left text-sm font-semibold"
                )}
                onClick={() => handleSignOut()}
              >
                <div className="flex justify-start space-x-4">
                  <Image
                    src="/icons/signout.svg"
                    alt="sign-out-icon"
                    width={20}
                    height={15}
                  />
                  <p>Sign out</p>
                </div>
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
