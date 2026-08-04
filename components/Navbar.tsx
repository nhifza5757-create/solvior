import { LogoMark, ArrowIcon } from "./Icons";

const links = ["Home", "Approach", "Services", "Work", "Team", "Journal"];

export function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between bg-white rounded-full px-4 py-2.5 shadow-sm">
          <a href="#" className="flex items-center gap-2.5 font-display text-xl font-bold text-ink pl-2">
            <LogoMark />
            Northbound
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-ink">
            {links.map((l, i) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className={`relative group py-1 ${i === 0 ? "text-blue" : "text-slate hover:text-ink transition-colors"}`}
              >
                {l}
                <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-blue transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-navy text-white pl-5 pr-2 py-2 text-sm font-semibold group transition-transform hover:scale-[1.03]"
          >
            Get a quote
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue">
              <ArrowIcon className="w-3.5 h-3.5 text-white" />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
