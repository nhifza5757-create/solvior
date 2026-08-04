import { ArrowIcon, DotCloud } from "./Icons";

export function About() {
  return (
    <section className="max-w-[1240px] mx-auto px-6 lg:px-8 py-10 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-navy to-[#1c2a5e]">
          <button
            aria-label="Play introduction video"
            className="absolute left-8 bottom-8 w-16 h-16 rounded-full bg-blue flex items-center justify-center shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white ml-0.5" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        <div className="relative">
          <DotCloud className="absolute -right-4 -top-8 w-28 h-28 hidden lg:block" />
          <span className="eyebrow">// Our company</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-5 leading-tight">
            Direction, built from inside your own operations.
          </h2>
          <p className="text-slate mt-5 leading-relaxed max-w-lg">
            We spend our first weeks in the business, not the boardroom.
            Every recommendation that follows is tied to a number your team
            already tracks — so progress is never a matter of opinion.
          </p>
          <a
            href="#contact"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-navy text-white pl-6 pr-2 py-2 font-semibold group transition-transform hover:scale-[1.03]"
          >
            Read more
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue transition-transform group-hover:translate-x-0.5">
              <ArrowIcon className="w-4 h-4 text-white" />
            </span>
          </a>

          <div className="mt-9 flex items-center gap-4 border-t border-line pt-7">
            <div className="w-12 h-12 rounded-full bg-[#c7d2ea]" />
            <div>
              <p className="font-semibold text-ink">Priya Malhotra</p>
              <p className="text-sm text-slate">Managing Partner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
