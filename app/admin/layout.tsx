'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard, Briefcase, Users, FolderKanban, Newspaper,
  MessageSquareQuote, DollarSign, HelpCircle, GraduationCap,
  Mail, MailPlus, LogOut, Menu, X,
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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

  // Close the mobile drawer automatically whenever the route changes
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

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
      <div className="min-h-screen bg-gray-50 lg:flex">
        {/* Mobile top bar — visible below lg, holds the hamburger toggle */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-[#0b0f1a] px-4 py-3 lg:hidden">
          <Image
            src="/images/primary-logo.webp"
            alt="Solvior"
            width={120}
            height={30}
            className="h-7 w-auto object-contain"
          />
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Backdrop for mobile drawer */}
        {mobileNavOpen && (
          <div
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            aria-hidden="true"
          />
        )}

        {/* Sidebar — off-canvas drawer on mobile, static column on lg+ */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] transform flex-col bg-[#0b0f1a] text-gray-300 transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:w-64 lg:max-w-none lg:translate-x-0 ${
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
            <div>
              <Image
                src="/images/primary-logo.webp"
                alt="Solvior"
                width={140}
                height={36}
                className="h-8 w-auto object-contain"
              />
              <p className="mt-1.5 text-[11px] uppercase tracking-wider text-gray-500">Admin Panel</p>
            </div>
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close menu"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
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
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </>
  );
}