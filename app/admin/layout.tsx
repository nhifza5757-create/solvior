'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard, Briefcase, Users, FolderKanban, Newspaper,
  MessageSquareQuote, DollarSign, HelpCircle, GraduationCap,
  Mail, MailPlus, LogOut,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Services', href: '/admin/services', icon: Briefcase },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Portfolio', href: '/admin/portfolio', icon: FolderKanban },
  { label: 'Blog', href: '/admin/blog', icon: Newspaper },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'Pricing', href: '/admin/pricing', icon: DollarSign },
  { label: 'FAQ', href: '/admin/faq', icon: HelpCircle },
  { label: 'Careers', href: '/admin/careers', icon: GraduationCap },
  { label: 'Contact Messages', href: '/admin/contact', icon: Mail },
  { label: 'Newsletter', href: '/admin/newsletter', icon: MailPlus },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Login page doesn't need auth check
    if (pathname === '/admin/login') {
      setChecking(false);
      return;
    }

    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setChecking(false);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  // This hides the site's main header on every /admin/* page
  const hideHeader = (
    <style jsx global>{`
      header {
        display: none !important;
      }
    `}</style>
  );

  // Login page: render without sidebar, but still hide header
  if (pathname === '/admin/login') {
    return (
      <>
        {hideHeader}
        {children}
      </>
    );
  }

  if (checking) {
    return (
      <>
        {hideHeader}
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Loading...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {hideHeader}
      <div className="min-h-screen flex bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 flex flex-col bg-[#0b0f1a] text-gray-300">
          <div className="border-b border-white/10 px-5 py-5">
            <Image
              src="/images/primary-logo.webp"
              alt="Solvior"
              width={140}
              height={36}
              className="h-8 w-auto object-contain"
            />
            <p className="mt-1.5 text-[11px] uppercase tracking-wider text-gray-500">Admin Panel</p>
          </div>

          <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-3">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </>
  );
}