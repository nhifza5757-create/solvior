import { ArrowIcon } from "./Icons";

const team = [
  { name: "Savanah Reyes", role: "Manager", tone: "#c7d2ea" },
  { name: "Owen Blackwood", role: "Co. Founder", tone: "#b7c6e6" },
  { name: "Renata Cruz", role: "Sr. Manager", tone: "#9fb3dd" },
  { name: "Julian Adeyemi", role: "Sr. Marketer", tone: "#8aa3d6" },
];

export function Team() {
  return (
    <section id="team" className="bg-navy">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 py-24">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="eyebrow bg-white/10 text-white">// Meet our team</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-5">Expert team members</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((m) => (
            <div key={m.name} className="group">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl">
                <div className="w-full h-full transition-transform duration-500 group-hover:scale-110" style={{ backgroundColor: m.tone }} />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="font-semibold text-white group-hover:text-blue-soft transition-colors">{m.name}</p>
                  <p className="text-sm text-white/60">{m.role}</p>
                </div>
                <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-blue group-hover:border-blue group-hover:rotate-45">
                  <ArrowIcon className="w-3.5 h-3.5 text-white -rotate-45" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
