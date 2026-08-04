import { ArrowIcon, LogoMark } from "./Icons";

const cols = [
  {
    heading: "Services",
    links: ["Growth strategy", "Operating model", "Leadership advisory", "Market entry", "Change management"],
  },
  {
    heading: "Resources",
    links: ["Contact us", "Privacy policy", "Careers", "Journal", "Feedback"],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy mt-4">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 py-20 grid lg:grid-cols-[1.1fr_1fr_1fr_1fr] gap-12">
        <div>
          <a href="#" className="flex items-center gap-2.5 font-display text-xl font-bold text-white mb-5">
            <LogoMark />
            Northbound
          </a>
          <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-6">
            Looking to transform your business?
          </h3>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 rounded-full bg-white text-navy pl-6 pr-2 py-2 font-semibold"
          >
            Contact us now
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue transition-transform group-hover:translate-x-0.5">
              <ArrowIcon className="w-4 h-4 text-white" />
            </span>
          </a>
        </div>

        {cols.map((c) => (
          <div key={c.heading}>
            <h4 className="text-sm font-semibold text-white mb-5">{c.heading}</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-sm font-semibold text-white mb-5">Our offices</h4>
          <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Headquarters — USA</p>
          <p className="text-sm text-white/70 mb-4">Suite 210, 88 Market Street, San Francisco, CA</p>
          <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Operations — Canada</p>
          <p className="text-sm text-white/70">140 King Street, Toronto, ON</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Northbound Consulting. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
