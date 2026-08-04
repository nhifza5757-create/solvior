import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";

const LOGO_SRC = "/images/primary-logo.webp";

const serviceLinks = [
  "Strategic planning",
  "Market research",
  "Business process",
  "Financial management",
  "Change management",
  "IT consulting",
];

const resourceLinks = [
  { label: "Contact us", href: "/contact" },
  { label: "Privacy policy", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blogs" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="container-custom py-16">
        <div className="mb-14 flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-center">
          <h2 className="max-w-xl font-display text-3xl font-medium leading-tight sm:text-4xl">
            Looking to transform your business?
          </h2>
          <Link
            href="/contact"
            data-cursor-hover
            className="group relative inline-flex items-center overflow-hidden rounded-full bg-white py-2 pl-3 pr-7 text-sm font-semibold text-primary-dark"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)]"
            />
            <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center text-white">
              <ArrowRight className="h-4 w-4" />
            </span>
            <span className="relative z-10 ml-3 transition-colors duration-300 group-hover:text-white">
              Contact us now
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src={LOGO_SRC}
              alt="Solvior logo"
              width={140}
              height={36}
              className="h-9 w-auto object-contain"
            />
            <p className="mt-4 text-sm text-white/60">
              Tailored consulting for the modern business — strategy, growth and
              leadership guidance for teams of every size.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/50">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-sm text-white/70 hover:text-white">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/50">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((r) => (
                <li key={r.label}>
                  <Link href={r.href} className="text-sm text-white/70 hover:text-white">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/50">
              Our office
            </h4>
            <p className="text-sm text-white/70">{siteConfig.location}</p>
            <p className="mt-2 text-sm text-white/70">{siteConfig.email}</p>
            <p className="mt-2 text-sm text-white/70">{siteConfig.phone}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Solvior. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-white">
              Policy & privacy
            </Link>
            <Link href="/contact" className="hover:text-white">
              Terms & conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}