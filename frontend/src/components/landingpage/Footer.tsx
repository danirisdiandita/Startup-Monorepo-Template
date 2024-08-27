import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { Env } from "@/common/env";
import NextLink from "next/link";
interface FeatureItem {
  name: string;
  link: string;
  description?: string;
}

interface FeatureList {
  featureTitle: string;
  featureItems: FeatureItem[];
}

export const productFeatureList: FeatureList[] = [
  {
    featureTitle: "PRODUCT",
    featureItems: [
      { name: "Cron Job Scheduler", link: "#", description: "Schedule cron jobs in a browser" },
      { name: "SQL Scheduler", link: "#", description: "Schedule SQL in a browser" },
      { name: "In-Browser Code Editor", link: "#", description: "Developers" },
      { name: "Python Script Scheduler", link: "#", description: "Run Python scripts on a schedule" },
    ],
  },
  {
    featureTitle: "USE CASES",
    featureItems: [
      { name: "Schedule SQL in a browser", link: "#" },
      { name: "Running a Python Script on a schedule", link: "#" },
    ],
  },
  {
    featureTitle: "RESOURCES",
    featureItems: [{ name: "Blog", link: "/blog" }],
  },
  {
    featureTitle: "COMPARE",
    featureItems: [
      { name: "Airbyte", link: "#" },
      { name: "Apache Airflow", link: "#" },
    ],
  },
  {
    featureTitle: "COMPANY",
    featureItems: [
      { name: "About us", link: "#" },
      { name: "Events", link: "#" },
      { name: "Customers", link: "#" },
      { name: "Careers", link: "#" },
    ],
  },
];

export function FeatureFooter({ feature }: { feature: FeatureList }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-zinc-500 dark:text-white">
        {feature.featureTitle}
      </h3>
      <ul className="space-y-2">
        {feature.featureItems.map((featureItem: FeatureItem, index: number) => (
          <li key={index}>
            <NextLink
              href={featureItem.link}
              className="hover:text-zinc-950 dark:hover:text-white text-zinc-500"
            >
              {featureItem.name}
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FooterBrand() {
  return (
    <>
      <div className="flex justify-start items-start">
        <h2 className="text-2xl font-semibold mr-4 dark:text-white">
          {Env.productName}
        </h2>
        {/* <div className="flex space-x-3">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <img src="/icons/x.svg" alt="X" />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <img src="/icons/youtube.svg" alt="YouTube" />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <img src="/icons/instagram.svg" alt="Instagram" />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <img src="/icons/facebook.svg" alt="Facebook" />
          </a>
        </div> */}
      </div>
      {/* <div className="mt-10">
        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
          English
        </a>
      </div> */}
    </>
  );
}

export function Footer() {
  return (
    // <footer className="bg-black-1">

    //   <Container>
    //     <div className='bg-black-1 h-[659px] text-white'> gitu</div>

    //   </Container>
    // </footer>

    <footer className="bg-white dark:bg-zinc-900 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <FooterBrand />
          {productFeatureList.map((feature: FeatureList, index: number) => (
            <FeatureFooter key={index} feature={feature} />
          ))}
        </div>
      </div>
    </footer>
  );
}
