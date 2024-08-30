import Image from "next/image";
import { Container } from "../../components/landingpage/Container";

import { useEffect } from "react";
import MegaMenu from "../catalyst/mega-menu";
import NavbarLink from "../catalyst/navbar-button";
import BlogLink from "../landingpage/BlogLink";
    


export default function BlogHeader() {

    return (
        <header >
              <nav className="bg-white shadow-md dark:bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16 items-center">
            <div className="flex space-x-4">
              <BlogLink href={"/blog/engineering"} text={"Engineering"} />
              <BlogLink href={"/blog/product"} text={"Product"} />
              <BlogLink href={"/blog/life"} text={"Life"} />
              <BlogLink href={"/blog/miscellaneious"} text={"Miscellaneious"} />
            </div>
          </div>
        </div>
      </nav>
        </header>
    );
}