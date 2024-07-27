import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  DocumentChartBarIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import FeatureDropdown from "./feature-dropdown";
import { Text } from "./text";
import { useRef } from "react";

const solutions = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools and find out expectations",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers with our engagement tool",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Reports",
    description: "Edit, manage and create newly informed decisions",
    href: "#",
    icon: DocumentChartBarIcon,
  },
];

// https://github.com/tailwindlabs/headlessui/discussions/425 nlap comment

export default function MegaMenu({ mode }: { mode: string }) {
  const popoverButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Popover className={`relative ${mode}`}>
      <div
        onMouseLeave={() => {
          console.log(
            "onMouseLeave",
            popoverButtonRef.current?.getAttribute("data-headlessui-state")
          );
          if (
            popoverButtonRef.current?.getAttribute("data-headlessui-state") !==
            ""
          ) {
            popoverButtonRef.current?.click();
          }
        }}
        onMouseEnter={() => {
          console.log(
            "onMouseEnter",
            popoverButtonRef.current?.getAttribute("data-headlessui-state")
          );
          if (
            popoverButtonRef.current?.getAttribute("data-headlessui-state") ===
            ""
          ) {
            popoverButtonRef.current?.click();
          }
        }}
      >
        <PopoverButton
          className="inline-flex items-center gap-x-1 leading-6 focus:outline-none"
          ref={popoverButtonRef}
        >
          <FeatureDropdown text="Features" />
        </PopoverButton>
        <PopoverPanel
          transition
          className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="dark:border-white border-[0.5] w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
            <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
              {solutions.map((item) => (
                <div
                  key={item.name}
                  className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-zinc-800/75"
                >
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon
                      aria-hidden="true"
                      className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                    />
                  </div>
                  <div>
                    <a
                      href={item.href}
                      className="font-semibold text-gray-900 dark:text-white"
                    >
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <Text className="mt-1">{item.description}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PopoverPanel>
      </div>
    </Popover>
  );
}
