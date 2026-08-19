import type { LucideIcon } from 'lucide-react';

// Navy + light-blue theme tokens, matching the dashboard's header band and
// chart palette (CHART_NAVY / CHART_LIGHT_BLUE) so every admin page shares
// the same brand identity.
const NAVY = '#0a1426';
const LIGHT_BLUE = '#0075ff';

export default function PageHeader({
  icon: Icon,
  title,
  subtitle,
  count,
  action,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  count?: number;
  action?: React.ReactNode;
}) {
  return (
    <div
      className="relative mb-6 flex flex-col gap-4 overflow-hidden rounded-2xl bg-cover bg-center px-5 py-5 sm:px-7 sm:py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-0"
      style={{ backgroundImage: "url('/images/hero/h4-hero-stat-bg.jpg')" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${NAVY}E6 0%, #132038D9 55%, ${LIGHT_BLUE}B3 160%)` }}
      />
      <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-16 right-20 h-32 w-32 rounded-full bg-[#0075ff]/10" />

      <div className="relative flex items-center gap-3.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#4da3ff] ring-1 ring-white/15">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-display font-semibold text-white tracking-tight">{title}</h1>
            {typeof count === 'number' && (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/80 ring-1 ring-white/10">
                {count}
              </span>
            )}
          </div>
          {subtitle && <p className="mt-0.5 text-sm text-white/60">{subtitle}</p>}
        </div>
      </div>
      {action && (
        <div className="relative w-full transition-transform duration-200 hover:scale-[1.02] active:scale-95 lg:w-auto">
          {action}
        </div>
      )}
    </div>
  );
}
