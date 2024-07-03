// import React from "react";

import { CallToAction } from "@/components/landingpage/CallToAction";
import { Faqs } from "@/components/landingpage/Faqs";
import { Footer } from "@/components/landingpage/Footer";
import { Header } from "@/components/landingpage/Header";
import { Hero } from "@/components/landingpage/Hero";
import { Pricing } from "@/components/landingpage/Pricing";
import { PrimaryFeatures } from "@/components/landingpage/PrimaryFeatures";
import { SecondaryFeatures } from "@/components/landingpage/SecondaryFeatures";
import { Testimonials } from "@/components/landingpage/Testimonials";

// const HomePage = () => {
//   return (
//     <div>
//       <div>Landing Page</div>
//     </div>
//   );
// };

// export default HomePage;


export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
