import type { LucideIcon } from 'lucide-react';

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
    <div className="mb-6 flex flex-col gap-4 border-b border-gray-100 pb-5 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-display font-semibold text-gray-900 tracking-tight">{title}</h1>
            {typeof count === 'number' && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                {count}
              </span>
            )}
          </div>
          {subtitle && <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
      {action && (
        <div className="w-full transition-transform duration-200 hover:scale-[1.02] active:scale-95 lg:w-auto">
          {action}
        </div>
      )}
    </div>
  );
}