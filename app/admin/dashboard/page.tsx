'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Briefcase, Users, FolderKanban, Newspaper, GraduationCap,
  MessageSquareQuote, DollarSign, HelpCircle, Mail, MailPlus, ArrowRight, ArrowUpRight, Plus,
} from 'lucide-react';

interface StatCard { label: string; href: string; count: number | null; icon: React.ElementType; }
interface ContactMsg { id: string; name: string; email: string; subject: string | null; status: string; createdAt: string; }
interface BlogPost { id: string; title: string; isPublished: boolean; createdAt: string; }

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
  { label: 'Add Service', href: '/admin/services/new' },
  { label: 'Add Team Member', href: '/admin/team/new' },
  { label: 'Add Portfolio Project', href: '/admin/portfolio/new' },
  { label: 'Add Blog Post', href: '/admin/blog/new' },
  { label: 'Add Job', href: '/admin/careers/new' },
  { label: 'Add Testimonial', href: '/admin/testimonials/new' },
  { label: 'Add Pricing Plan', href: '/admin/pricing/new' },
  { label: 'Add FAQ', href: '/admin/faq/new' },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatCard[]>(
    MODULES.map((m) => ({ label: m.label, href: m.href, count: null, icon: m.icon }))
  );
  const [recentContacts, setRecentContacts] = useState<ContactMsg[] | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState('');
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

    const token = localStorage.getItem('admin_token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchStats = async () => {
      const results = await Promise.all(
        MODULES.map(async (m) => {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${m.endpoint}`, { headers });
            if (!res.ok) return { ...m, count: 0, raw: [] as any[] };
            const data = await res.json();
            const count = Array.isArray(data) ? data.length : (data?.total ?? 0);
            return { ...m, count, raw: data };
          } catch {
            return { ...m, count: 0, raw: [] as any[] };
          }
        })
      );
      setStats(results.map((r) => ({ label: r.label, href: r.href, count: r.count, icon: r.icon })));

      const contactsRaw = results.find((r) => r.label === 'Contact Messages')?.raw;
      if (Array.isArray(contactsRaw)) {
        setRecentContacts(
          [...contactsRaw]
            .sort((a: ContactMsg, b: ContactMsg) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5)
        );
      } else {
        setRecentContacts([]);
      }

      const postsRaw = results.find((r) => r.label === 'Blog Posts')?.raw;
      if (Array.isArray(postsRaw)) {
        setRecentPosts(
          [...postsRaw]
            .sort((a: BlogPost, b: BlogPost) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5)
        );
      } else {
        setRecentPosts([]);
      }
    };

    fetchStats().catch(() => setError('Failed to load some dashboard data'));
  }, []);

  const newContactCount = stats.find((s) => s.label === 'Contact Messages')?.count;
  const totalItems = stats.reduce((sum, s) => sum + (s.count ?? 0), 0);

  return (
    <div>

{/* Header band — background image with dark overlay for text readability */}
      <div
        className="relative mb-6 overflow-hidden rounded-2xl bg-primary bg-cover bg-center px-5 py-5 sm:mb-8 sm:px-7 sm:py-7"
        style={{ backgroundImage: "url('/images/home-4/cta/h4-cta-bg.webp')" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-primary/85" />
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/5" />
        <div className="relative flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-white/70 sm:text-sm">{today}</p>
            <h1 className="mt-1 text-xl font-display font-semibold text-white tracking-tight sm:text-2xl">{getGreeting()}, Admin</h1>
            <p className="mt-1 text-xs text-white/70 sm:text-sm">
              {totalItems} items across {MODULES.length} modules on Solvior.
            </p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white ring-1 ring-white/20 sm:h-11 sm:w-11">
            A
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

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group relative flex items-center justify-between overflow-hidden rounded-xl bg-white p-5 pt-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-blue-500" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{s.label}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {s.count === null ? (
                    <span className="inline-block h-8 w-10 animate-pulse rounded bg-gray-100" />
                  ) : (
                    s.count
                  )}
                </p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-500" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick add */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">Quick Add</h2>
          <div className="grid grid-cols-1 gap-2">
            {QUICK_ADD.map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                {q.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent contact messages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Recent Contact Messages</h2>
            <Link href="/admin/contact" className="text-xs font-medium text-primary hover:text-accent transition-colors">View all</Link>
          </div>
          {recentContacts === null && <p className="text-sm text-gray-400">Loading...</p>}
          {recentContacts?.length === 0 && <p className="text-sm text-gray-400">No messages yet.</p>}
          <ul className="space-y-4">
            {recentContacts?.map((c) => (
              <li key={c.id} className="flex items-start gap-3 text-sm">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{c.name}</p>
                  <p className="text-gray-500">{c.subject || c.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent blog posts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Recent Blog Posts</h2>
            <Link href="/admin/blog" className="text-xs font-medium text-primary hover:text-accent transition-colors">View all</Link>
          </div>
          {recentPosts === null && <p className="text-sm text-gray-400">Loading...</p>}
          {recentPosts?.length === 0 && <p className="text-sm text-gray-400">No posts yet.</p>}
          <ul className="space-y-4">
            {recentPosts?.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 text-sm">
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