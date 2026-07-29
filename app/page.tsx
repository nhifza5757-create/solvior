import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Approach } from "@/components/Approach";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";
import { Journal } from "@/components/Journal";
import { NewsletterCta } from "@/components/NewsletterCta";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Reveal>
          <Approach />
        </Reveal>
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Services />
        </Reveal>
        <Reveal>
          <Work />
        </Reveal>
        <Reveal>
          <Team />
        </Reveal>
        <Reveal>
          <Testimonials />
        </Reveal>
        <Reveal>
          <Journal />
        </Reveal>
        <Reveal>
          <NewsletterCta />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
