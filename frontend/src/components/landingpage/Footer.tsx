import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { Env } from "@/common/env";
import NextLink from "next/link";
interface FeatureItem {
  name: string;
  link: string;
}

interface FeatureList {
  featureTitle: string;
  featureItems: FeatureItem[];
}

const productFeatureList: FeatureList[] = [
  {
    featureTitle: "PRODUCT",
    featureItems: [
      { name: "Cron Job Scheduler", link: "#" },
      { name: "SQL Scheduler", link: "#" },
      { name: "In-Browser Code Editor", link: "#" },
    ],
  },
  {
    featureTitle: "USE CASES",
    featureItems: [
      { name: "UI design", link: "#" },
      { name: "UX design", link: "#" },
      { name: "Wireframing", link: "#" },
      { name: "Diagramming", link: "#" },
      { name: "Prototyping", link: "#" },
      { name: "Brainstorming", link: "#" },
      { name: "Presentation maker", link: "#" },
      { name: "Online whiteboard", link: "#" },
      { name: "Agile", link: "#" },
      { name: "Strategic planning", link: "#" },
      { name: "Mind mapping", link: "#" },
    ],
  },
  {
    featureTitle: "RESOURCES",
    featureItems: [
      { name: "Blog", link: "#" },
      { name: "Best practices", link: "#" },
      { name: "Color wheel", link: "#" },
      { name: "Colors", link: "#" },
      { name: "Templates", link: "#" },
      { name: "Developers", link: "#" },
      { name: "Integrations", link: "#" },
      { name: "Affiliate program", link: "#" },
      { name: "Resource library", link: "#" },
      { name: "Reports and insights", link: "#" },
      { name: "Support", link: "#" },
      { name: "Status", link: "#" },
      { name: "Legal and privacy", link: "#" },
      { name: "Modern slavery statement", link: "#" },
      { name: "Climate disclosure statement", link: "#" },
    ],
  },
  {
    featureTitle: "COMPARE",
    featureItems: [
      { name: "Sketch", link: "#" },
      { name: "Adobe XD", link: "#" },
      { name: "Framer", link: "#" },
      { name: "Miro", link: "#" },
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
      <h3 className="text-lg font-semibold mb-4 text-zinc-500">{feature.featureTitle}</h3>
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
