'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Briefcase, Users, FolderKanban, Newspaper, GraduationCap,
  MessageSquareQuote, DollarSign, HelpCircle, Mail, MailPlus,
  ArrowUpRight, Plus, Layers, MessageCircle, FileText,
  TrendingUp,
} from 'lucide-react';
import { adminFetch } from '@/lib/adminFetch';

interface ModuleResult {
  label: string;
  href: string;
  icon: React.ElementType;
  count: number | null;
  raw: any[];
}
interface ContactMsg { id: string; name: string; email: string; subject: string | null; status: string; createdAt: string; }
interface BlogPost { id: string; title: string; isPublished: boolean; createdAt: string; }
interface ActivityItem { id: string; type: 'contact' | 'blog'; title: string; sub: string; createdAt: string; }

// Chart palette — navy blue, light blue, dark grey, purple. Used only for
// data-viz (donut, bar chart, trend line, legend dots, stat icons); the
// header banner keeps the project's own brand background untouched.
const CHART_NAVY = '#1e3a72';
const CHART_LIGHT_BLUE = '#0075ff';
const CHART_GREY = '#4b5563';
const CHART_PURPLE = '#7c5cd6';

const COLORS = [
  { bg: 'bg-[#1e3a72]/10', text: 'text-[#1e3a72]', bar: 'bg-[#1e3a72]', ring: 'ring-[#1e3a72]/10', dot: CHART_NAVY },
  { bg: 'bg-[#0075ff]/10', text: 'text-[#0075ff]', bar: 'bg-[#0075ff]', ring: 'ring-[#0075ff]/10', dot: CHART_LIGHT_BLUE },
  { bg: 'bg-[#4b5563]/10', text: 'text-[#4b5563]', bar: 'bg-[#4b5563]', ring: 'ring-[#4b5563]/10', dot: CHART_GREY },
  { bg: 'bg-[#7c5cd6]/10', text: 'text-[#7c5cd6]', bar: 'bg-[#7c5cd6]', ring: 'ring-[#7c5cd6]/10', dot: CHART_PURPLE },
];

const MODULES: { label: string; href: string; endpoint: string; icon: React.ElementType }[] = [
  { label: 'Services', href: '/admin/services', endpoint: 'services/admin', icon: Briefcase },
  { label: 'Team Members', href: '/admin/team', endpoint: 'team/admin', icon: Users },
  { label: 'Portfolio Projects', href: '/admin/portfolio', endpoint: 'portfolios/admin', icon: FolderKanban },
  { label: 'Blog Posts', href: '/admin/blog', endpoint: 'blog/posts/admin', icon: Newspaper },
  { label: 'Job Openings', href: '/admin/careers', endpoint: 'careers/jobs/admin', icon: GraduationCap },
  { label: 'Testimonials', href: '/admin/testimonials', endpoint: 'testimonials/admin', icon: MessageSquareQuote },
  { label: 'Pricing Plans', href: '/admin/pricing', endpoint: 'pricing/admin', icon: DollarSign },
  { label: 'FAQs', href: '/admin/faq', endpoint: 'faq/admin', icon: HelpCircle },
  { label: 'Contact Messages', href: '/admin/contact', endpoint: 'contact', icon: Mail },
  { label: 'Newsletter Subscribers', href: '/admin/newsletter', endpoint: 'newsletter', icon: MailPlus },
];

const QUICK_ADD = [
  { label: 'Service', href: '/admin/services/new', icon: Briefcase },
  { label: 'Team Member', href: '/admin/team/new', icon: Users },
  { label: 'Portfolio', href: '/admin/portfolio/new', icon: FolderKanban },
  { label: 'Blog Post', href: '/admin/blog/new', icon: Newspaper },
  { label: 'Job', href: '/admin/careers/new', icon: GraduationCap },
  { label: 'Testimonial', href: '/admin/testimonials/new', icon: MessageSquareQuote },
  { label: 'Pricing Plan', href: '/admin/pricing/new', icon: DollarSign },
  { label: 'FAQ', href: '/admin/faq/new', icon: HelpCircle },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

// Trading-style smooth area chart, built with plain SVG (no chart lib),
// colored entirely from the primary brand token via a gradient fill.
// Uses a Catmull-Rom → cubic-Bezier conversion for genuinely rounded
// curves (no sharp V-shaped peaks), matching a real stock/trading chart.
function catmullRomPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y} `;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y} `;
  }
  return d;
}

function TrendChart({ series }: { series: { label: string; value: number }[] }) {
  const width = 600;
  const height = 160;
  const padX = 8;
  const padY = 18;
  const max = Math.max(1, ...series.map((s) => s.value));
  const stepX = (width - padX * 2) / Math.max(1, series.length - 1);

  const points = series.map((s, i) => ({
    x: padX + i * stepX,
    y: padY + (height - padY * 2) * (1 - s.value / max),
  }));

  const linePath = catmullRomPath(points);
  const last = points[points.length - 1];
  const first = points[0];
  const areaPath = `${linePath} L ${last.x} ${height - padY} L ${first.x} ${height - padY} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40" preserveAspectRatio="none">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CHART_NAVY} stopOpacity="0.25" />
          <stop offset="100%" stopColor={CHART_NAVY} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#trendFill)" stroke="none" />
      <path d={linePath} fill="none" stroke={CHART_NAVY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last.x} cy={last.y} r="4.5" fill={CHART_NAVY} />
      <circle cx={last.x} cy={last.y} r="8" fill={CHART_NAVY} fillOpacity="0.18" />
    </svg>
  );
}

// Vertical bar chart, alternating navy/purple — the "Content by Module"
// counterpart to the trading-style trend line, echoing the reference's
// Traffic-by-Device bar panel.
function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const width = 600;
  const height = 160;
  const padX = 12;
  const padBottom = 22;
  const max = Math.max(1, ...data.map((d) => d.value));
  const gap = 14;
  const barW = (width - padX * 2 - gap * (data.length - 1)) / data.length;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40" preserveAspectRatio="none">
      {data.map((d, i) => {
        const barH = Math.max(4, ((height - padBottom - 10) * d.value) / max);
        const x = padX + i * (barW + gap);
        const y = height - padBottom - barH;
        const palette = [CHART_NAVY, CHART_LIGHT_BLUE, CHART_GREY, CHART_PURPLE];
        const color = palette[i % palette.length];
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barW} height={barH} rx={4} fill={color} fillOpacity={0.85} />
            <text x={x + barW / 2} y={height - 6} textAnchor="middle" fontSize="9" fill="#9ca3af">
              {d.label.length > 8 ? `${d.label.slice(0, 7)}…` : d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Builds a conic-gradient donut from module counts using only brand tokens.
function buildDonutGradient(stats: ModuleResult[]) {
  const total = stats.reduce((s, m) => s + (m.count ?? 0), 0);
  if (total === 0) return `conic-gradient(#e5e7eb 0deg 360deg)`;
  let acc = 0;
  const palette = [CHART_NAVY, CHART_LIGHT_BLUE, CHART_GREY, CHART_PURPLE];
  const stops = stats
    .filter((s) => (s.count ?? 0) > 0)
    .map((s, i) => {
      const start = (acc / total) * 360;
      acc += s.count ?? 0;
      const end = (acc / total) * 360;
      return `${palette[i % palette.length]} ${start}deg ${end}deg`;
    });
  return `conic-gradient(${stops.join(', ')})`;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<ModuleResult[]>(
    MODULES.map((m) => ({ label: m.label, href: m.href, icon: m.icon, count: null, raw: [] }))
  );
  const [recentContacts, setRecentContacts] = useState<ContactMsg[] | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[] | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

    const fetchStats = async () => {
      const results = await Promise.all(
        MODULES.map(async (m) => {
          try {
            const res = await adminFetch(`${process.env.NEXT_PUBLIC_API_URL}/${m.endpoint}`);
            if (!res.ok) return { ...m, count: 0, raw: [] as any[] };
            const data = await res.json();
            const count = Array.isArray(data) ? data.length : (data?.total ?? 0);
            return { ...m, count, raw: Array.isArray(data) ? data : [] };
          } catch {
            return { ...m, count: 0, raw: [] as any[] };
          }
        })
      );
      setStats(results.map((r) => ({ label: r.label, href: r.href, icon: r.icon, count: r.count, raw: r.raw })));

      const contactsRaw = results.find((r) => r.label === 'Contact Messages')?.raw ?? [];
      setRecentContacts(
        [...contactsRaw]
          .sort((a: ContactMsg, b: ContactMsg) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)
      );

      const postsRaw = results.find((r) => r.label === 'Blog Posts')?.raw ?? [];
      setRecentPosts(
        [...postsRaw]
          .sort((a: BlogPost, b: BlogPost) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)
      );
      setLoaded(true);
    };

    fetchStats().catch(() => setError('Failed to load some dashboard data'));
  }, []);

  const newContactCount = stats.find((s) => s.label === 'Contact Messages')?.count;
  const totalItems = stats.reduce((sum, s) => sum + (s.count ?? 0), 0);
  const publishedPosts = recentPosts?.filter((p) => p.isPublished).length ?? null;
  const maxCount = Math.max(1, ...stats.map((s) => s.count ?? 0));

  const topFive = useMemo(
    () => [...stats].sort((a, b) => (b.count ?? 0) - (a.count ?? 0)).slice(0, 5),
    [stats]
  );

  const donutGradient = useMemo(() => buildDonutGradient(stats), [stats]);

  // Last-7-days activity trend, combining every blog post + contact message
  // by day — this is what feeds the trading-style line chart below.
  const trendSeries = useMemo(() => {
    const contactsAll = stats.find((s) => s.label === 'Contact Messages')?.raw ?? [];
    const postsAll = stats.find((s) => s.label === 'Blog Posts')?.raw ?? [];
    const allDates = [...contactsAll, ...postsAll].map((x: any) => x.createdAt).filter(Boolean);

    const days: { label: string; value: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayKey = d.toDateString();
      const count = allDates.filter((ds: string) => new Date(ds).toDateString() === dayKey).length;
      days.push({ label: d.toLocaleDateString(undefined, { weekday: 'short' }), value: count });
    }
    return days;
  }, [stats]);

  const activity: ActivityItem[] = useMemo(() => {
    const fromContacts: ActivityItem[] = (recentContacts ?? []).map((c) => ({
      id: `c-${c.id}`, type: 'contact', title: c.name, sub: c.subject || c.email, createdAt: c.createdAt,
    }));
    const fromPosts: ActivityItem[] = (recentPosts ?? []).map((p) => ({
      id: `b-${p.id}`, type: 'blog', title: p.title, sub: p.isPublished ? 'Published' : 'Draft', createdAt: p.createdAt,
    }));
    return [...fromContacts, ...fromPosts]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);
  }, [recentContacts, recentPosts]);

  return (
    <div>
      {/* Header band */}
      <div
        className="relative mb-6 overflow-hidden rounded-2xl bg-primary bg-cover bg-center px-5 py-6 sm:mb-8 sm:px-8 sm:py-8"
        style={{ backgroundImage: "url('/images/home-4/cta/h4-cta-bg.webp')" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-accent/70" />
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/5" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs text-white/70 sm:text-sm">
              {today}
            </p>
            <h1 className="mt-1 text-2xl font-display font-semibold text-white tracking-tight sm:text-3xl">
              {getGreeting()}, Admin
            </h1>
            <p className="mt-1.5 text-xs text-white/75 sm:text-sm">
              {totalItems} items live across {MODULES.length} modules on Solvior.
            </p>
          </div>
          <div className="flex gap-3 sm:gap-4">
            <div className="rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-sm ring-1 ring-white/15">
              <p className="text-lg font-semibold text-white leading-none">{totalItems}</p>
              <p className="mt-1 text-[11px] text-white/70">Total content</p>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-sm ring-1 ring-white/15">
              <p className="text-lg font-semibold text-white leading-none">{publishedPosts ?? '–'}</p>
              <p className="mt-1 text-[11px] text-white/70">Published posts</p>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-sm ring-1 ring-white/15">
              <p className="text-lg font-semibold text-white leading-none">{newContactCount ?? '–'}</p>
              <p className="mt-1 text-[11px] text-white/70">New messages</p>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="mb-4 rounded-lg bg-red-50 border border-red-100 px-3.5 py-2.5 text-sm text-red-600">{error}</p>}

      {typeof newContactCount === 'number' && newContactCount > 0 && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-gray-700">
          <span>
            You have <strong className="text-gray-900">{newContactCount}</strong> contact message{newContactCount === 1 ? '' : 's'} awaiting review.
          </span>
          <Link href="/admin/contact" className="font-medium text-primary hover:text-accent transition-colors whitespace-nowrap ml-4">
            Review &rarr;
          </Link>
        </div>
      )}

      {/* Stat cards — trend-style, matching the reference's metric-tile pattern */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const c = COLORS[i % COLORS.length];
          const pct = s.count === null ? 0 : Math.round(((s.count ?? 0) / maxCount) * 100);
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-white p-4 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${c.bg} ${c.text} ring-4 ${c.ring}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gray-500" />
              </div>
              <div className="mt-3">
                <p className="text-2xl font-semibold text-gray-900 leading-none">
                  {s.count === null ? (
                    <span className="inline-block h-7 w-10 animate-pulse rounded bg-gray-100" />
                  ) : (
                    s.count
                  )}
                </p>
                <p className="mt-1.5 text-xs font-medium text-gray-400 truncate">{s.label}</p>
              </div>
              {/* mini sparkline-style bar, echoes the reference's compact trend indicator */}
              <div className="mt-3 h-1 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${c.bar} transition-all duration-700 ease-out`}
                  style={{ width: loaded ? `${Math.max(pct, s.count ? 6 : 0)}%` : '0%' }}
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Growth trend — trading-chart style line + gradient area, brand-colored */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-900">Growth Trend — Last 7 Days</h2>
          </div>
          <span className="text-xs font-semibold text-primary">
            {trendSeries.reduce((s, d) => s + d.value, 0)} new items
          </span>
        </div>
        <TrendChart series={trendSeries} />
        <div className="flex justify-between mt-1 px-1">
          {trendSeries.map((d, i) => (
            <span key={i} className="text-[10px] text-gray-400">{d.label}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Content by Module — bar chart counterpart to the trend line, navy/purple */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <Layers className="h-4 w-4 text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-900">Content by Module</h2>
          </div>
          <BarChart data={stats.map((s) => ({ label: s.label.split(' ')[0], value: s.count ?? 0 }))} />
        </div>

        {/* Content distribution — donut + ranked list, like the reference's traffic-by-location panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
            <Layers className="h-4 w-4 text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-900">Content Distribution</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative shrink-0 h-36 w-36 rounded-full" style={{ background: loaded ? donutGradient : '#f3f4f6' }}>
              <div className="absolute inset-3 rounded-full bg-white flex flex-col items-center justify-center">
                <p className="text-xl font-semibold text-gray-900 leading-none">{totalItems}</p>
                <p className="mt-1 text-[10px] text-gray-400">total items</p>
              </div>
            </div>
            <div className="w-full space-y-3">
              {topFive.map((s, i) => {
                const c = COLORS[i % COLORS.length];
                const share = totalItems > 0 ? Math.round(((s.count ?? 0) / totalItems) * 100) : 0;
                return (
                  <div key={s.label} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-gray-600">
                      <span className={`h-2 w-2 rounded-full ${c.bar}`} />
                      {s.label}
                    </span>
                    <span className="font-semibold text-gray-800">{s.count ?? '–'} <span className="text-gray-400 font-normal">({share}%)</span></span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
        {/* Quick add */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
          <Plus className="h-4 w-4 text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-900">Quick Add</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {QUICK_ADD.map((q) => {
              const Icon = q.icon;
              return (
                <Link
                  key={q.href}
                  href={q.href}
                  className="group flex flex-col items-start gap-2 rounded-lg border border-gray-200 px-3 py-3 text-xs font-medium text-gray-700 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                  {q.label}
                </Link>
              );
            })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Recent activity — notification-panel treatment, like the reference's activity feed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
            </div>
            {activity.length > 0 && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {activity.length} new
              </span>
            )}
          </div>
          {activity.length === 0 && (recentContacts === null || recentPosts === null) && (
            <p className="text-sm text-gray-400">Loading...</p>
          )}
          {activity.length === 0 && recentContacts !== null && recentPosts !== null && (
            <p className="text-sm text-gray-400">No recent activity yet.</p>
          )}
          <ul className="space-y-1">
            {activity.map((a) => (
              <li key={a.id} className="flex items-start gap-3 text-sm rounded-lg px-2 py-2.5 -mx-2 hover:bg-gray-50 transition-colors">
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    a.type === 'contact' ? 'bg-[#1e3a72]/10 text-[#1e3a72]' : 'bg-[#7c5cd6]/10 text-[#7c5cd6]'
                  }`}
                >
                  {a.type === 'contact' ? <Mail className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-800 truncate">{a.title}</p>
                  <p className="text-gray-500 truncate">{a.sub}</p>
                </div>
                <span className="shrink-0 text-xs text-gray-400 whitespace-nowrap">{timeAgo(a.createdAt)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent blog posts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-900">Recent Blog Posts</h2>
            </div>
            <Link href="/admin/blog" className="text-xs font-medium text-primary hover:text-accent transition-colors">View all</Link>
          </div>
          {recentPosts === null && <p className="text-sm text-gray-400">Loading...</p>}
          {recentPosts?.length === 0 && <p className="text-sm text-gray-400">No posts yet.</p>}
          <ul className="space-y-1">
            {recentPosts?.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 text-sm rounded-lg px-2 py-2.5 -mx-2 hover:bg-gray-50 transition-colors">
                <span className="text-gray-800 truncate">{p.title}</span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    p.isPublished ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {p.isPublished ? 'Published' : 'Draft'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}