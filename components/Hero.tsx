import { ArrowIcon, DotCloud } from "./Icons";

const avatars = ["#c7d2ea", "#b7c6e6", "#9fb3dd", "#8aa3d6"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg pt-36 pb-0">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start relative">
        <div className="relative pb-16">
          <DotCloud className="absolute -left-2 -top-4 w-28 h-28 -z-0" />
          <h1 className="relative text-[2.75rem] sm:text-6xl lg:text-[3.6rem] leading-[1.06] font-bold text-ink max-w-lg">
            Tailored <span className="text-blue">direction</span> for the growing business
          </h1>
          <p className="mt-6 text-lg text-slate max-w-md leading-relaxed">
            Northbound pairs your team with senior operators who help you
            choose a course — and stay long enough to see it through.
          </p>
          <div className="mt-9 flex items-center gap-6 flex-wrap">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 rounded-full bg-navy text-white pl-6 pr-2 py-2 font-semibold hover:bg-ink transition-colors group transition-transform hover:scale-[1.03]"
            >
              Free consultation
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue transition-transform group-hover:translate-x-0.5">
                <ArrowIcon className="w-4 h-4 text-white" />
              </span>
            </a>
            <div className="flex items-center">
              {avatars.map((c, i) => (
                <span
                  key={i}
                  className="w-11 h-11 rounded-full border-2 border-bg -ml-3 first:ml-0"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden bg-gradient-to-br from-navy via-[#16235a] to-blue relative">
            <div className="absolute inset-0 opacity-40 dot-grid" style={{ backgroundPosition: "20px 20px" }} />
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        <div className="lg:w-1/2 -mt-2 lg:-mt-8 mb-[-1px]">
          <div className="bg-navy rounded-t-3xl px-8 sm:px-12 py-10 grid grid-cols-2 gap-8 relative overflow-hidden">
            <div>
              <p className="font-display text-4xl sm:text-5xl font-bold text-white">8.5x</p>
              <p className="text-white/60 mt-2 text-sm">Faster growth</p>
            </div>
            <div>
              <p className="font-display text-4xl sm:text-5xl font-bold text-white">20M</p>
              <p className="text-white/60 mt-2 text-sm">Reach worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
