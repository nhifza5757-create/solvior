import { FeatureIcon } from "./Icons";

const items = [
  {
    title: "Quick diagnosis",
    body: "We map what's actually happening in the business before proposing a single change.",
  },
  {
    title: "Senior advice",
    body: "Every engagement is led by a partner, not handed off to a junior analyst.",
  },
  {
    title: "Strategic planning",
    body: "Plans built around the two or three moves that matter most this year.",
  },
  {
    title: "Efficient execution",
    body: "We stay close through rollout so the plan survives contact with reality.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="max-w-[1240px] mx-auto px-6 lg:px-8 py-24">
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="eyebrow mb-5">// Number one, on purpose</span>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-ink mt-4">
          Explore our core approach
        </h2>
        <p className="text-slate mt-4">
          We help ambitious teams turn strategy into something they can run.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <div
            key={it.title}
            className={`rounded-2xl p-7 border border-line transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${i === 1 ? "bg-navy text-white" : "bg-white"}`}
          >
            <div className={i === 1 ? "text-white" : ""}>
              <FeatureIcon variant={i as 0 | 1 | 2 | 3} />
            </div>
            <h3 className={`text-lg font-semibold mt-6 mb-2 ${i === 1 ? "text-white" : "text-ink"}`}>
              {it.title}
            </h3>
            <p className={`text-sm leading-relaxed ${i === 1 ? "text-white/70" : "text-slate"}`}>
              {it.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
