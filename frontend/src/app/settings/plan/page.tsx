"use client";
import React from "react";
import { Heading } from "@/components/catalyst/heading";
import { Divider } from "@/components/catalyst/divider";
import { Text } from "@/components/catalyst/text";
import { useState } from "react";
import {
  CheckIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import { CheckIcon as CheckIconMini } from "@heroicons/react/24/outline";
import pricingTemplate from "../../../../public/plan/pricing.json";
import { Button } from "@/components/catalyst/button";
import { generateSubscriptionInfo } from "../../../../lib/actions/billing.action";
import { Loader2 } from "lucide-react";
import { Square3Stack3DIcon } from "@heroicons/react/20/solid";

interface Pricing {
  tiers: {
    name: string;
    id: string;
    href: string;
    featured: boolean;
    description: string;
    price: { monthly: string; annually: string };
    mainFeatures: string[];
  }[];
  sections: {
    name: string;
    features: {
      name: string;
      tiers: { [key: string]: boolean | string };
    }[];
  }[];
}

const pricing: Pricing = pricingTemplate;


function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Plan = () => {
  const [currentPlan, setCurrentPlan] = useState<string>("free");
  const [isUpgradeLoading, setIsUpgradeLoading] = useState<boolean>(false);

  const upgradeToPlan = async (plan: string) => {
    setIsUpgradeLoading(true);
    const response = await generateSubscriptionInfo();

    if (response?.checkoutUrl) {
      window.open(response.checkoutUrl, "_blank");
    }
    setIsUpgradeLoading(false);
  };

  return (
    <div>
      <div className="justify-start flex space-x-2">
        <Square3Stack3DIcon
          width={30}
          height={30}
          className="dark:text-white text-black"
        />
        <Heading>Plan</Heading>
      </div>
      <Divider className="mt-6" />
      <div className="overflow-hidden bg-white shadow sm:rounded-lg mt-4 dark:bg-zinc-950">
        <div className="px-4 py-5 sm:p-6 flex-col">
          <div className="flex flex-col sm:flex-row">
            <div className="flex-col">
              <Text>Plan</Text>
              <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
                {currentPlan === "free" ? "Free Plan" : "Premium Plan"}
              </h1>
              <Text>
                {currentPlan === "free"
                  ? "You are using the free plan. You can upgrade to a paid plan to get more features."
                  : "You are using the premium plan. You can downgrade to a free plan to save money."}
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing section */}

      <div className="relative bg-gray-50 dark:bg-zinc-950 py-16 mt-3 rounded-lg border-zinc-200 dark:border-white/10 border-[0.5px]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Feature comparison (up to lg) */}
          <section
            aria-labelledby="mobile-comparison-heading"
            className="lg:hidden"
          >
            <h2 id="mobile-comparison-heading" className="sr-only text-black-1">
              Feature comparison
            </h2>

            <div className="mx-auto max-w-2xl space-y-16">
              {pricing.tiers.map((tier) => (
                <div key={tier.id} className="border-t border-gray-900/10">
                  <div
                    className={classNames(
                      tier.featured
                        ? "border-zinc-950 dark:border-white"
                        : "border-transparent",
                      "-mt-px w-72 border-t-2 pt-10 md:w-80"
                    )}
                  >
                    <h3
                      className={classNames(
                        tier.featured
                          ? "text-zinc-950 dark:text-white"
                          : "text-gray-900",
                        "text-sm font-semibold leading-6  text-[#000000] dark:text-white"
                      )}
                    >
                      {tier.name + "gitu"}
                    </h3>
                    <div className="mt-1 leading-6 flex justify-between">
                      <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
                        {tier.price.monthly}
                      </h1>
                      <Text>{tier.description}</Text>
                    </div>
                  </div>

                  <div className="mt-10 space-y-10">
                    {pricing.sections.map((section) => (
                      <div key={section.name}>
                        <h4 className="text-sm  leading-6  font-semibold text-zinc-950 dark:text-white">
                          {section.name}
                        </h4>
                        <div className="relative mt-6">
                          {/* Fake card background */}
                          <div
                            aria-hidden="true"
                            className="absolute inset-y-0 right-0 hidden w-1/2 rounded-lg bg-gray-50 dark:bg-zinc-950 shadow-sm sm:block"
                          />

                          <div
                            className={classNames(
                              tier.featured
                                ? "ring-2 ring-indigo-600"
                                : "ring-1 ring-gray-900/10",
                              "relative rounded-lg bg-gray-50 dark:bg-zinc-950 shadow-sm sm:rounded-none dark:shadow-none sm:bg-transparent sm:shadow-none sm:ring-0"
                            )}
                          >
                            <dl className="divide-y divide-gray-200 text-sm leading-6">
                              {section.features.map((feature) => (
                                <div
                                  key={feature.name}
                                  className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0"
                                >
                                  <dt className="pr-4  font-semibold text-zinc-950  dark:text-white">
                                    {feature.name}
                                  </dt>
                                  <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                    {typeof feature.tiers[tier.name] ===
                                    "string" ? (
                                      <span
                                        className={
                                          tier.featured
                                            ? "font-semibold text-indigo-600"
                                            : "font-semibold text-zinc-950 dark:text-white"
                                        }
                                      >
                                        {feature.tiers[tier.name]}
                                      </span>
                                    ) : (
                                      <>
                                        {feature.tiers[tier.name] === true ? (
                                          <CheckIcon
                                            aria-hidden="true"
                                            className="mx-auto h-5 w-5 text-indigo-600"
                                          />
                                        ) : (
                                          <XMarkIconMini
                                            aria-hidden="true"
                                            className="mx-auto h-5 w-5 text-gray-400"
                                          />
                                        )}

                                        <span className="sr-only">
                                          {feature.tiers[tier.name] === true
                                            ? "Yes"
                                            : "No"}
                                        </span>
                                      </>
                                    )}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          </div>

                          {/* Fake card border */}
                          <div
                            aria-hidden="true"
                            className={classNames(
                              tier.featured
                                ? "ring-2 ring-indigo-600"
                                : "ring-1 ring-gray-900/10",
                              "pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 rounded-lg sm:block"
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Feature comparison (lg+) */}
          <section
            aria-labelledby="comparison-heading"
            className="hidden lg:block"
          >
            <h2 id="comparison-heading" className="sr-only">
              Feature comparison
            </h2>

            <div className="grid grid-cols-3 gap-x-8 border-t border-gray-900/10 before:block">
              {pricing.tiers.map((tier) => (
                <div key={tier.id} aria-hidden="true" className="-mt-px">
                  <div
                    className={classNames(
                      tier.featured
                        ? "border-zinc-950 dark:border-white"
                        : "border-transparent",
                      "border-t-2 pt-10"
                    )}
                  >
                    <h1 className="text-xl font-semibold leading-6 text-zinc-950 dark:text-white text-center">
                      {tier.name}
                    </h1>
                    <div className="mt-1 text-center">
                      <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
                        {tier.price.monthly}
                      </h1>
                      <Text>{tier.description}</Text>
                      {tier.name !== "Free" && (
                        <Button
                          className="w-full mt-4"
                          onClick={() => {
                            upgradeToPlan(tier.name);
                          }}
                        >
                          {isUpgradeLoading ? (
                            <>
                              <Loader2 size={20} className="animate-spin" />{" "}
                              &nbsp; Please wait
                            </>
                          ) : (
                            "Upgrade"
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="-mt-6 space-y-16">
              {pricing.sections.map((section) => (
                <div key={section.name} className="mt-10">
                  <h3 className="text-sm font-semibold leading-6 text-zinc-950 dark:text-white">
                    {section.name}
                  </h3>
                  <div className="relative -mx-8 mt-10">
                    {/* Fake card backgrounds */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-8 inset-y-0 grid grid-cols-3 gap-x-8 before:block"
                    >
                      <div className="h-full w-full rounded-lg bg-gray-50 dark:bg-zinc-950 shadow-sm" />
                      <div className="h-full w-full rounded-lg bg-gray-50 dark:bg-zinc-950 shadow-sm" />
                      <div className="h-full w-full rounded-lg bg-gray-50 dark:bg-zinc-950 shadow-sm" />
                    </div>

                    <table className="relative w-full border-separate border-spacing-x-8">
                      <thead>
                        <tr className="text-left">
                          <th scope="col">
                            <span className="sr-only">Feature</span>
                          </th>
                          {pricing.tiers.map((tier) => (
                            <th key={tier.id} scope="col">
                              <span className="sr-only">{tier.name} tier</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.features.map((feature, featureIdx) => (
                          <tr key={feature.name}>
                            <th
                              scope="row"
                              className="w-1/4 py-3 pr-4 text-left text-sm  leading-6 font-semibold text-zinc-950 dark:text-white"
                            >
                              {feature.name}
                              {featureIdx !== section.features.length - 1 ? (
                                <div className="absolute inset-x-8 mt-3 h-px bg-gray-200" />
                              ) : null}
                            </th>
                            {pricing.tiers.map((tier) => (
                              <td
                                key={tier.id}
                                className="relative w-1/4 px-4 py-0 text-center"
                              >
                                <span className="relative h-full w-full py-3">
                                  {typeof feature.tiers[tier.name] ===
                                  "string" ? (
                                    <span
                                      className={classNames(
                                        tier.featured
                                          ? "font-semibold text-zinc-950 dark:text-white"
                                          : "text-zinc-950 dark:text-white",
                                        "text-sm leading-6 font-semibold text-zinc-950"
                                      )}
                                    >
                                      {feature.tiers[tier.name]}
                                    </span>
                                  ) : (
                                    <>
                                      {feature.tiers[tier.name] === true ? (
                                        <CheckIcon
                                          aria-hidden="true"
                                          className="mx-auto h-5 w-5 text-zinc-950 dark:text-white"
                                        />
                                      ) : (
                                        <XMarkIconMini
                                          aria-hidden="true"
                                          className="mx-auto h-5 w-5 text-zinc-950 dark:text-white"
                                        />
                                      )}

                                      <span className="sr-only">
                                        {feature.tiers[tier.name] === true
                                          ? "Yes"
                                          : "No"}
                                      </span>
                                    </>
                                  )}
                                </span>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Fake card borders */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-3 gap-x-8 before:block"
                    >
                      {pricing.tiers.map((tier) => (
                        <div
                          key={tier.id}
                          className={classNames(
                            tier.featured
                              ? "ring-2 ring-zinc-950 dark:ring-white"
                              : "ring-1 ring-gray-900/10",
                            "rounded-lg"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Plan;
