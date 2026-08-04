import { ArrowIcon } from "./Icons";

const services = [
  { name: "Growth strategy", tone: "from-[#c7d2ea] to-[#dfe6f4]" },
  { name: "Operating model design", tone: "from-navy to-[#1c2a5e]" },
  { name: "Leadership advisory", tone: "from-blue to-[#123a99]" },
];

export function Services() {
  return (
    <section id="services" className="max-w-[1240px] mx-auto px-6 lg:px-8 py-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
        <div>
          <span className="eyebrow">// Transformative solution</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-4">
            A comprehensive service offer.
          </h2>
        </div>
        <div className="flex gap-3">
          <button aria-label="Previous" className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-ink hover:bg-white">
            <ArrowIcon className="w-4 h-4 rotate-180" />
          </button>
          <button aria-label="Next" className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-white bg-navy">
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.name} className="group rounded-2xl overflow-hidden border border-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
            <div className={`aspect-[4/3] bg-gradient-to-br ${s.tone} relative overflow-hidden`}>
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110 bg-gradient-to-br from-transparent to-black/10" />
              <span className="absolute left-5 bottom-[-22px] w-14 h-14 rounded-full bg-white shadow flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowIcon className="w-4 h-4 text-blue -rotate-45" />
              </span>
            </div>
            <div className="p-6 pt-9 flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-ink group-hover:text-blue transition-colors">{s.name}</h3>
              <span className="w-9 h-9 rounded-full bg-navy flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:bg-blue group-hover:scale-110">
                <ArrowIcon className="w-3.5 h-3.5 text-white -rotate-45" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
