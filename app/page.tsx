import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Marquee from "@/components/sections/Marquee";
import CaseStudies from "@/components/sections/CaseStudies";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Blog from "@/components/sections/Blog";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <Services />
      <Marquee />
      <CaseStudies />
      <Team />
      <Testimonials />
      <Blog />
      <Newsletter />
    </>
  );
}
