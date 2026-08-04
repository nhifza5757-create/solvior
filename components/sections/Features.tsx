import { features } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

const icons: Record<string, React.ReactNode> = {
  "01": (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8">
      <rect x="3" y="3" width="22" height="22" stroke="currentColor" strokeWidth="1.4" />
      <rect x="15" y="15" width="22" height="22" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  "02": (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8">
      <path
        d="M20 2 36.3 11 36.3 29 20 38 3.7 29 3.7 11Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M20 13v3M20 24v3M13 20h3M24 20h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  "03": (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8">
      <circle cx="16" cy="20" r="12" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="24" cy="20" r="12" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  "04": (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8">
      <path
        d="M15 3 28 11.5 28 28.5 15 37 2 28.5 2 11.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M30 13 38 20 30 27" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function Features() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-custom">
        <Reveal animation="fadeInUp" className="mx-auto mb-14 max-w-xl text-center">
          <span className="eyebrow">Number #1 Solver</span>
          <h2 className="mt-4 font-display text-3xl font-medium text-primary sm:text-4xl">
            Explore our core features
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our mission is to empower businesses of thrive in solutions
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal
              key={f.id}
              animation="fadeInUp"
              delay={i * 0.1}
              className="group relative overflow-hidden rounded-none border border-border transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <div
  aria-hidden
  className="pointer-events-none absolute inset-x-0 bottom-0 h-[28rem] origin-bottom scale-y-0 opacity-0 blur-2xl transition-all duration-500 ease-out group-hover:scale-y-100 group-hover:opacity-60"
  style={{
    backgroundImage:
      "radial-gradient(ellipse 220% 100% at bottom, rgba(125,190,255,0.9) 0%, rgba(125,190,255,0.4) 40%, rgba(125,190,255,0.15) 65%, transparent 85%)",
  }}
/>
          <div className="relative bg-gradient-to-b from-white via-muted/40 to-muted px-8 pb-12 pt-12">
  <div className="flex h-16 w-16 items-center justify-center border border-border bg-white">
    <span className="text-primary transition group-hover:text-accent">
      {icons[f.id]}
    </span>
  </div>

  <h3 className="mt-10 text-lg font-semibold text-primary">{f.title}</h3>
  <p className="mt-4 text-sm text-muted-foreground">{f.description}</p>
</div>     
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
} 