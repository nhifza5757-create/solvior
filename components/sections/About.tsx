import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ExploreBadge from "@/components/ui/ExploreBadge";

const MAIN_IMAGE = "/images/about/h4-about-1.webp";
const SIDE_IMAGE = "/images/about/h4-about-side.jpg";

export default function About() {
  return (
    <section className="bg-muted py-20 lg:py-28">
      <div className="container-custom">
        <div className="relative mb-16 grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
       <div className="absolute -top-27 -right-0 z-10 hidden h-48 w-48 overflow-hidden  shadow-xl lg:block">
            <Image src={SIDE_IMAGE} alt="Consultant reviewing an agreement" fill className="object-cover" />
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <Reveal
              animation="fadeInRight"
              className="group relative aspect-[3/4] overflow-hidden "
            >
              <Image src={MAIN_IMAGE} alt="Team discussing strategy" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/10" />
            </Reveal>

            <div className="pointer-events-none absolute inset-0 flex items-start justify-center lg:items-center lg:justify-end">
              <div className="pointer-events-auto relative -translate-y-1/2 scale-75 sm:scale-90 lg:translate-y-0 lg:scale-100 lg:mr-[-3.5rem]">
                <div aria-hidden className="absolute -inset-2 rounded-full bg-primary shadow-2xl" />
                <div className="relative z-10">
                  <ExploreBadge />
                </div>
              </div>
            </div>
          </div>

          <Reveal animation="fadeInUp" delay={0.2} className="relative pr-0 pl-0 lg:pr-40 lg:pl-14">
            <span className="eyebrow">Our company</span>
            <h2 className="mt-4 max-w-md font-display text-3xl font-medium leading-tight text-primary sm:text-4xl">
              Crafting tailored solutions for your ultimate business challenges
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Our mission is to empower businesses of every size to thrive in a
              constantly changing marketplace. In today&apos;s dynamic business
              environment, the key to success lies in adaptable strategy and
              people-first execution.
            </p>
            <Link
              href="/contact"
              data-cursor-hover
              className="group relative mt-6 inline-flex items-center overflow-hidden rounded-full bg-primary py-2 pl-3 pr-7 text-sm font-semibold text-white"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)] group-active:w-[calc(100%-24px)]"
              />
              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center">
                <ArrowRight className="h-4 w-4" />
              </span>
              <span className="relative z-10 ml-3">Read more</span>
            </Link>

            <div className="mt-8 flex items-center gap-4">
              <Image
                src="/images/about/h4-about-side.jpg"
                alt="Burdee Nicolas"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-primary">Burdee Nicolas</p>
                <p className="text-sm text-muted-foreground">Co. Founder</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}