import { ArrowIcon } from "./Icons";

const posts = [
  { date: "12", month: "JUL", tag: "Strategy", comments: "03 Comments", title: "Why most growth plans die in the second quarter", tone: "from-navy to-[#1c2a5e]" },
  { date: "03", month: "JUN", tag: "Business", comments: "03 Comments", title: "The org chart is not your operating model", tone: "from-[#0b1330] to-blue" },
  { date: "19", month: "MAY", tag: "Leadership", comments: "03 Comments", title: "Coaching for founders who hate being coached", tone: "from-navy to-[#1c2a5e]" },
];

export function Journal() {
  return (
    <section id="journal" className="max-w-[1240px] mx-auto px-6 lg:px-8 py-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
        <div>
          <span className="eyebrow">// Latest news</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-4">Tips and notes for success</h2>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-3 rounded-full bg-navy text-white pl-6 pr-2 py-2 font-semibold whitespace-nowrap group transition-transform hover:scale-[1.03]"
        >
          More journal
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue transition-transform group-hover:translate-x-0.5">
            <ArrowIcon className="w-4 h-4 text-white" />
          </span>
        </a>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <a key={p.title} href="#" className={`group relative block rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br ${p.tone} p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl`}>
            <div className="bg-white/15 backdrop-blur rounded-lg px-3 py-2 w-fit text-white">
              <p className="font-display text-xl font-bold leading-none">{p.date}</p>
              <p className="text-[10px] uppercase tracking-widest mt-1">{p.month}</p>
            </div>
            <div>
              <p className="text-white/70 text-xs mb-3">{p.tag} · {p.comments}</p>
              <h3 className="text-lg font-semibold text-white leading-snug group-hover:text-blue-soft transition-colors">
                {p.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
