import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { team } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

const SOCIALS = [
  { key: "linkedin", icon: Linkedin, label: "LinkedIn" },
  { key: "twitter", icon: Twitter, label: "Twitter" },
  { key: "instagram", icon: Instagram, label: "Instagram" },
  { key: "facebook", icon: Facebook, label: "Facebook" },
] as const;

export default function Team() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-custom">
        <Reveal animation="fadeInUp" className="mb-14 max-w-xl">
          <span className="eyebrow">Meet our team</span>
          <h2 className="mt-4 font-display text-3xl font-medium text-primary sm:text-4xl">
            Expert team members
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal key={member.id} animation="fadeInUp" delay={i * 0.1} className="group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition duration-500 ease-out group-hover:scale-105"
                />
                {/* Subtle darkening on hover so the icon stack stays legible over any photo */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {/* Social icons: hidden by default, slide in as a vertical stack on the right edge on hover */}
                <div className="absolute right-3 top-1/2 flex -translate-y-1/2 translate-x-12 flex-col gap-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                  {SOCIALS.map(({ key, icon: Icon, label }, si) => (
                    <a key={key} href={member.socials?.[key]} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on ${label}`} data-cursor-hover style={{ transitionDelay: `${si * 60}ms` }} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary shadow-md transition-colors duration-300 hover:bg-accent hover:text-white">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <Link href={`/team/${member.id}`} data-cursor-hover className="font-semibold text-primary hover:underline">
                    {member.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
                <Link
                  href={`/team/${member.id}`}
                  data-cursor-hover
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-primary transition group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}