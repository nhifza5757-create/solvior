import { ArrowIcon } from "./Icons";

const cases = [
  { n: "01", name: "Lumen Retail Group", tone: "from-navy to-[#1c2a5e]" },
  { n: "02", name: "Fernbank Health", tone: "from-blue to-[#123a99]" },
  { n: "03", name: "Torrey Logistics", tone: "from-[#c7d2ea] to-[#dfe6f4]" },
];

export function Work() {
  return (
    <section id="work" className="max-w-[1240px] mx-auto px-6 lg:px-8 py-24">
      <div className="grid lg:grid-cols-[minmax(0,340px)_1fr] gap-14">
        <div>
          <span className="eyebrow">// Our case study</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-5 leading-tight">
            Explore our outstanding client projects
          </h2>
          <a
            href="#"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-navy text-white pl-6 pr-2 py-2 font-semibold group transition-transform hover:scale-[1.03]"
          >
            Explore more
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue transition-transform group-hover:translate-x-0.5">
              <ArrowIcon className="w-4 h-4 text-white" />
            </span>
          </a>
        </div>

        <div className="divide-y divide-line border-t border-line">
          {cases.map((c) => (
            <a key={c.n} href="#" className="group flex items-center justify-between gap-6 py-6 transition-colors hover:bg-blue-soft/40 rounded-xl px-3 -mx-3">
              <span className="flex items-center gap-4">
                <span className="text-blue font-semibold">{c.n}.</span>
                <span className="text-xl sm:text-2xl font-semibold text-ink group-hover:text-blue group-hover:translate-x-1 transition-all inline-block">
                  {c.name}
                </span>
              </span>
              <span className="w-11 h-11 rounded-full bg-blue-soft text-blue flex items-center justify-center shrink-0 group-hover:bg-blue group-hover:text-white group-hover:rotate-45 transition-all duration-300">
                <ArrowIcon className="w-4 h-4 -rotate-45" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
