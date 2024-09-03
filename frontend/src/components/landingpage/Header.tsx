"use client";
import NextLink from "next/link";
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from "@headlessui/react";
import clsx from "clsx";
import { Container } from "./Container";
import { NavLink } from "./NavLink";
import { Button } from "../catalyst/button";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { Text } from "../catalyst/text";
import FeatureDropdown from "../catalyst/feature-dropdown";
import MegaMenu from "../catalyst/mega-menu";
import ThemeToggle from "../atoms/themeToggle";
import NavbarLink from "../catalyst/navbar-button";

function MobileNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <PopoverButton as={NextLink} href={href} className="block w-full p-2">
      {children}
    </PopoverButton>
  );
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          "origin-center transition",
          open && "scale-90 opacity-0"
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          "origin-center transition",
          !open && "scale-90 opacity-0"
        )}
      />
    </svg>
  );
}

function MobileNavigation() {
  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 bg-slate-300/50 duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <PopoverPanel
        transition
        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-150 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <MobileNavLink href="#features">Features</MobileNavLink>
        <MobileNavLink href="#testimonials">Testimonials</MobileNavLink>
        <MobileNavLink href="#pricing">Pricing</MobileNavLink>
        <hr className="m-2 border-slate-300/40" />
        <MobileNavLink href="/login">Sign in</MobileNavLink>
      </PopoverPanel>
    </Popover>
  );
}

export function Header() {
  const value = useAppSelector((state) => state.theme);
  useEffect(() => {
    if (value.mode === "dark") {
      document.body.classList.add("dark");
    } else if (value.mode === "system") {
      if (typeof window !== "undefined") {
        const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

        if (theme === "dark") {
          document.body.classList.add("dark");
        }
      }
    } else {
      document.body.classList.remove("dark");
    }
  }, [value.mode]);

  const isLightOrDark = (mode: "system" | "dark" | "light") => {
    if (mode === "system") {
      if (typeof window !== "undefined") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      } else {
        return "dark";
      }
    } else {
      return mode;
    }
  };

  return (
    <header className={`py-2 dark:bg-zinc-900 w-full fixed z-50 ${value.mode}`}>
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center">
            <NextLink href="/">
              <Image
                width={80}
                height={80}
                src={
                  isLightOrDark(value.mode) === "light"
                    ? "/images/logos/logo.svg"
                    : "/images/logos/logo-dark.svg"
                }
                alt="product_logo"
                className="md:mr-12"
              />
            </NextLink>

            <div className="hidden md:flex md:gap-x-6">
              <MegaMenu mode={isLightOrDark(value.mode)} />
            </div>
            <NavbarLink href={"/blog"} text={"Blog"} />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Button href={"/sign-in"} outline>
              Sign In
            </Button>
            <Button href="/sign-up" color="white">Sign Up</Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
