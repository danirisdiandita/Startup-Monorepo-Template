"use client";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PaintBrushIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import {
  Cog6ToothIcon,
  HomeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from "@heroicons/react/20/solid";
import { SidebarLayout } from "../../components/catalyst/sidebar-layout";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "../../components/catalyst/sidebar"; //  "@components/catalyst/sidebar";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "../../components/catalyst/navbar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "../../components/catalyst/dropdown";
import { Avatar } from "../../components/catalyst/avatar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Strong, Text } from "@/components/catalyst/text";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/atoms/themeToggle";
import clsx from "clsx";
import { updateThemeMode } from "@/lib/features/theme/themeSlice";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const session = useSession();
  const router = useRouter();
  const [mode, setMode] = useState("dark");
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

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/sign-in");
  };

  return (
    <main
      className={
        value.mode === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : value.mode
      }
    >
      <SidebarLayout
        navbar={
          <Navbar>
            <NavbarSpacer />
            <NavbarSection>
              <NavbarItem href="/search" aria-label="Search">
                <MagnifyingGlassIcon />
              </NavbarItem>
              <NavbarItem href="/inbox" aria-label="Inbox">
                <InboxIcon />
              </NavbarItem>
              <Dropdown>
                <DropdownButton as={NavbarItem}>
                  <Avatar src="/profile-photo.jpg" square />
                </DropdownButton>
                <DropdownMenu className="min-w-64" anchor="bottom end">
                  <DropdownItem href="/my-profile">
                    <UserIcon />
                    <DropdownLabel>My profile</DropdownLabel>
                  </DropdownItem>
                  <DropdownItem href="/settings">
                    <Cog8ToothIcon />
                    <DropdownLabel>Settings</DropdownLabel>
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem href="/privacy-policy">
                    <ShieldCheckIcon />
                    <DropdownLabel>Privacy policy</DropdownLabel>
                  </DropdownItem>
                  <DropdownItem href="/share-feedback">
                    <LightBulbIcon />
                    <DropdownLabel>Share feedback</DropdownLabel>
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem href="/logout">
                    <ArrowRightStartOnRectangleIcon />
                    <DropdownLabel>Sign out</DropdownLabel>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarSection>
          </Navbar>
        }
        sidebar={
          <Sidebar>
            <SidebarHeader>
              <Dropdown>
                <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                  <Avatar src="/tailwind-logo.svg" />
                  <SidebarLabel>Your Company Name</SidebarLabel>
                  <ChevronDownIcon />
                </DropdownButton>
                <DropdownMenu
                  className="min-w-80 lg:min-w-64"
                  anchor="bottom start"
                >
                  <DropdownItem href="/teams/1/settings">
                    <Cog8ToothIcon />
                    <DropdownLabel>Settings</DropdownLabel>
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem href="/teams/1">
                    <Avatar slot="icon" src="/tailwind-logo.svg" />
                    <DropdownLabel>Tailwind Labs</DropdownLabel>
                  </DropdownItem>
                  <DropdownItem href="/teams/2">
                    <Avatar
                      slot="icon"
                      initials="WC"
                      className="bg-purple-500 text-white"
                    />
                    <DropdownLabel>Workcation</DropdownLabel>
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem href="/teams/create">
                    <PlusIcon />
                    <DropdownLabel>New team&hellip;</DropdownLabel>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <SidebarSection className="max-lg:hidden">
                <SidebarItem href="/search">
                  <MagnifyingGlassIcon />
                  <SidebarLabel>Search</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/inbox">
                  <InboxIcon />
                  <SidebarLabel>Inbox</SidebarLabel>
                </SidebarItem>
              </SidebarSection>
            </SidebarHeader>
            <SidebarBody>
              <SidebarSection>
                <SidebarItem href="/">
                  <HomeIcon />
                  <SidebarLabel>Home</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/events">
                  <Square2StackIcon />
                  <SidebarLabel>Events</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/orders">
                  <TicketIcon />
                  <SidebarLabel>Orders</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/settings">
                  <Cog6ToothIcon />
                  <SidebarLabel>Settings</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/broadcasts">
                  <MegaphoneIcon />
                  <SidebarLabel>Broadcasts</SidebarLabel>
                </SidebarItem>
              </SidebarSection>
              <SidebarSection className="max-lg:hidden">
                <SidebarHeading>Upcoming Events</SidebarHeading>
                <SidebarItem href="/events/1">
                  Bear Hug: Live in Concert
                </SidebarItem>
                <SidebarItem href="/events/2">Viking People</SidebarItem>
                <SidebarItem href="/events/3">Six Fingers — DJ Set</SidebarItem>
                <SidebarItem href="/events/4">We All Look The Same</SidebarItem>
              </SidebarSection>
              <SidebarSpacer />
              <SidebarSection>
                <SidebarItem href="/support">
                  <QuestionMarkCircleIcon />
                  <SidebarLabel>Support</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/changelog">
                  <SparklesIcon />
                  <SidebarLabel>Changelog</SidebarLabel>
                </SidebarItem>
              </SidebarSection>
            </SidebarBody>
            <SidebarFooter className="max-lg:hidden">
              <Dropdown>
                <DropdownButton as={SidebarItem}>
                  <span className="flex min-w-0 items-center gap-3">
                    <Avatar
                      square
                      initials={session?.data?.first_name && session?.data?.last_name ? session?.data?.first_name[0] + session?.data?.last_name[0]: "G"}
                      className="size-8 bg-zinc-900 text-white dark:bg-white dark:text-black-1 font-semibold"
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                        {session?.data?.first_name && session?.data?.last_name
                          ? session?.data?.first_name +
                            " " +
                            session?.data?.last_name
                          : "Guest"}
                      </span>
                      <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                        {session?.data?.email ? session?.data?.email : ''}
                      </span>
                    </span>
                  </span>
                  <ChevronUpIcon />
                </DropdownButton>
                <DropdownMenu className="min-w-64" anchor="top start">
                  <DropdownItem href="/my-profile">
                    <UserIcon />
                    <DropdownLabel>My profile</DropdownLabel>
                  </DropdownItem>
                  <DropdownItem href="/settings">
                    <Cog8ToothIcon />
                    <DropdownLabel>Settings</DropdownLabel>
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem href="/privacy-policy">
                    <ShieldCheckIcon />
                    <DropdownLabel>Privacy policy</DropdownLabel>
                  </DropdownItem>
                  <DropdownItem href="/share-feedback">
                    <LightBulbIcon />
                    <DropdownLabel>Share feedback</DropdownLabel>
                  </DropdownItem>
                  <DropdownDivider/>
                  <div
                    className={clsx(
                      // Base styles
                      "group cursor-default rounded-lg px-3.5 py-2.5 focus:outline-none sm:px-3 sm:py-1.5",
                      // Text styles
                      "text-left text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]",
                      // Focus
                      "data-[focus]:bg-blue-500 data-[focus]:text-white",
                      // Disabled state
                      "data-[disabled]:opacity-50",
                      // Forced colors mode
                      "forced-color-adjust-none forced-colors:data-[focus]:bg-[Highlight] forced-colors:data-[focus]:text-[HighlightText] forced-colors:[&>[data-slot=icon]]:data-[focus]:text-[HighlightText]",
                      // Use subgrid when available but fallback to an explicit grid layout if not
                      "col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center supports-[grid-template-columns:subgrid]:grid-cols-subgrid",
                      // Icons
                      "[&>[data-slot=icon]]:col-start-1 [&>[data-slot=icon]]:row-start-1 [&>[data-slot=icon]]:-ml-0.5 [&>[data-slot=icon]]:mr-2.5 [&>[data-slot=icon]]:size-5 sm:[&>[data-slot=icon]]:mr-2 [&>[data-slot=icon]]:sm:size-4",
                      "[&>[data-slot=icon]]:text-zinc-500 [&>[data-slot=icon]]:data-[focus]:text-white [&>[data-slot=icon]]:dark:text-zinc-400 [&>[data-slot=icon]]:data-[focus]:dark:text-white",
                      // Avatar
                      "[&>[data-slot=avatar]]:-ml-1 [&>[data-slot=avatar]]:mr-2.5 [&>[data-slot=avatar]]:size-6 sm:[&>[data-slot=avatar]]:mr-2 sm:[&>[data-slot=avatar]]:size-5"
                    )}
                  >
                    <PaintBrushIcon />
                    <div className="justify-between flex">
                      <Text>
                        <Strong>Theme</Strong>
                      </Text>
                      <ThemeToggle />
                    </div>
                  </div>
                  <DropdownDivider />
                  <DropdownItem onClick={handleSignOut}>
                    <ArrowRightStartOnRectangleIcon />
                    <DropdownLabel>Sign out</DropdownLabel>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </SidebarFooter>
          </Sidebar>
        }
      >
        {children}
      </SidebarLayout>
    </main>
  );
};

export default RootLayout;
