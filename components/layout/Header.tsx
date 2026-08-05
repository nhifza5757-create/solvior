"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  Search,
  LayoutGrid,
  ArrowRight,
  X,
  Settings2,
  Grid2x2,
  Users,
  Sparkles,
  Target,
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  Clock,
} from "lucide-react";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { mainNav, siteConfig } from "@/data/site";

const SERVICE_ICONS = [Settings2, Grid2x2, Users, Sparkles, Target, ArrowUpRight];

const LOGO_SRC = "/images/logo.webp";
const PANEL_LOGO_SRC = "/images/primary-logo.webp";

function Badge({ text }: { text: string }) {
  const isHot = text.toLowerCase() === "hot";
  return (
    <span
      className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white ${
        isHot ? "bg-red-500" : "bg-accent"
      }`}
    >
      {text}
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const isScrolled = useScrollHeader(40);
  const { close } = useMobileMenu();
  const [searchOpen, setSearchOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [panelSearchQuery, setPanelSearchQuery] = useState("");
  const [openPanelItem, setOpenPanelItem] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  const isDark = (!isHomePage || isScrolled);

  const runSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchOpen(false);
    setPanelOpen(false);
    router.push(`/blogs?search=${encodeURIComponent(trimmed)}`);
  };

  const togglePanelItem = (label: string) => {
    setOpenPanelItem((prev) => (prev === label ? null : label));
  };

  const closePanel = () => {
    setPanelOpen(false);
    close();
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* TOP BAR (Only visible on non-Home pages when not scrolled) */}
      {!isHomePage && !isScrolled && (
        <div className="hidden sm:flex items-center justify-between bg-[#0075ff] px-4 py-2 text-[10px] text-white lg:px-8 relative z-40">
          <div className="flex items-center gap-1">
            <span>Trusted partner in business excellence</span>
            <span className="font-bold underline cursor-pointer hover:no-underline active:no-underline">Join us now</span>
            <ArrowRight className="h-3 w-3" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> Mon - Friday : 9:00 - 18:00
            </div>
            <span className="h-3 w-px bg-white/20" />
            <div className="flex items-center gap-1.5">
              <Mail className="h-3 w-3" /> {siteConfig.email}
            </div>
            <span className="h-3 w-px bg-white/20" />
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" /> English <ChevronDown className="h-2.5 w-2.5" />
            </div>
          </div>
        </div>
      )}

      {/* MAIN HEADER */}
      <header
        className={`w-full transition-all duration-300 ${
          isDark 
            ? (isScrolled 
                ? "sticky top-0 z-50 bg-[#0a1426]/95 backdrop-blur-md shadow-lg py-2 lg:py-3" 
                : "absolute top-[8px] sm:top-[30px] left-0 z-30 bg-transparent py-2 lg:py-3" 
              )
            : "sticky top-0 z-50 px-4 pt-4" 
        } ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className={`container-custom ${isDark && !isScrolled ? "px-4 lg:px-6" : "px-4 lg:px-4"}`}>
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isDark
                ? "w-full" 
                : "-mx-5 sm:mx-0 rounded-full bg-white/95 px-4 py-2.5 shadow-[0_2px_20px_rgba(5,18,41,0.08)] backdrop-blur lg:px-6" 
            }`}
          >
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src={isDark ? PANEL_LOGO_SRC : LOGO_SRC}
                alt="Solvior logo"
                width={140}
                height={36}
                className="h-9 w-auto object-contain transition-opacity duration-300"
                priority
              />
            </Link>

            {/* NAV LINKS */}
            <nav className="hidden lg:flex items-center gap-7">
              {mainNav.map((item) => {
                const showCaret = item.label !== "Contact";
                const isServices = item.label === "Services";
                const isPages = item.label === "Pages" && "megaMenu" in item;

                return (
                  <div key={item.label} className="group relative">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors group-hover:text-accent group-active:text-accent ${
                        isDark ? "text-white/80" : "text-foreground/80"
                      }`}
                    >
                      {item.label}
                      {showCaret && (
                        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180 group-active:rotate-180" />
                      )}
                    </Link>

                    {isPages && (
                      <div className="invisible absolute left-0 top-full w-[680px] max-w-[85vw] translate-y-2 overflow-hidden rounded-3xl border border-border bg-background opacity-0 shadow-2xl transition-all group-hover:visible group-active:visible group-hover:translate-y-3 group-active:translate-y-3 group-hover:opacity-100 group-active:opacity-100">
                        <span className="absolute inset-x-0 top-0 h-[3px] rounded-t-3xl bg-accent" aria-hidden />
                        <div className="grid grid-cols-[0.8fr_0.8fr_1fr] gap-6 p-8">
                          {item.megaMenu!.columns.map((col) => (
                            <div key={col.title}>
                              <h4 className="mb-4 font-display text-sm font-semibold text-primary">
                                {col.title}
                              </h4>
                              <div className="flex flex-col gap-3">
                                {col.items.map((link) => (
                                  <Link
                                    key={link.label}
                                    href={link.href}
                                    className="flex items-center text-sm text-foreground/70 transition hover:text-accent active:text-accent"
                                  >
                                    {link.label}
                                    {link.badge && <Badge text={link.badge} />}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}

                         <div className="relative min-w-[180px] self-start h-[300px] overflow-hidden rounded-none bg-primary p-5 text-white">
                            <Image
                              src="/images/widget-cta.webp"
                              alt=""
                              fill
                              className="object-cover opacity-30"
                              aria-hidden
                            />
                            <div className="relative">
                              <span className="mb-6 flex h-9 w-9 items-center justify-center rounded-full bg-accent">
                                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                                  <path d="M6 12L10 16L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                              <h5 className="font-display text-xl font-medium leading-tight">
                                Need help?
                                <br />
                                Feel free contact us
                              </h5>
                              <p className="mt-3 text-sm text-white/70">
                                Our mission is to empower businesses of all sizes.
                              </p>
                              <Link
                                href="/contact"
                                className="group/btn relative mt-6 inline-flex items-center overflow-hidden rounded-full bg-white py-2 pl-3 pr-6 text-sm font-semibold text-primary"
                              >
                                <span
                                  aria-hidden
                                  className="absolute inset-y-0 left-3 z-0 my-auto h-7 w-7 rounded-full bg-accent transition-all duration-500 ease-out group-hover/btn:w-[calc(100%-24px)]"
                                />
                                <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center text-white">
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </span>
                                <span className="relative z-10 ml-3 whitespace-nowrap transition group-hover/btn:text-white">
                                  Get in touch
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.children && (
                      <div
                        className={`invisible absolute left-0 top-full min-w-[220px] translate-y-2 overflow-hidden rounded-lg border border-border bg-background opacity-0 shadow-lg transition-all group-hover:visible group-active:visible group-hover:translate-y-3 group-active:translate-y-3 group-hover:opacity-100 group-active:opacity-100 ${
                          isServices ? "min-w-[280px] p-2" : "p-3"
                        }`}
                      >
                        <span className="absolute inset-x-0 top-0 h-[3px] bg-accent" aria-hidden />

                        {isServices ? (
                          <div className="flex flex-col">
                            {item.children.map((child, i) => {
                              const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
                              return (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className="flex items-center gap-4 rounded-md px-3 py-3 transition hover:bg-muted active:bg-muted"
                                >
                                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted text-accent">
                                    <Icon className="h-5 w-5" />
                                  </span>
                                  <span className="text-sm font-semibold text-primary">
                                    {child.label}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        ) : (
                          item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted active:bg-muted hover:text-accent active:text-accent"
                            >
                              {child.label}
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-4">
              
              <div className={`hidden items-center gap-4 text-sm font-medium md:flex ${isDark ? "text-white/80" : "text-foreground/80"}`}>
                <button
                  type="button"
                  aria-label="Search"
                  data-cursor-hover
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-1.5 transition-colors hover:text-accent active:text-accent"
                >
                  {isDark ? "Explore" : "Search"}
                  <Search className="h-4 w-4" />
                </button>
                
                <span className={`h-4 w-px ${isDark ? "bg-white/20" : "bg-border"}`} />
                
                <button
                  type="button"
                  aria-label="Open menu panel"
                  data-cursor-hover
                  onClick={() => setPanelOpen(true)}
                  className="flex items-center gap-1.5 transition-colors hover:text-accent active:text-accent"
                >
                  Menu
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
          <Link
  href="/contact"
  data-cursor-hover
  className={`group relative hidden sm:inline-flex items-center overflow-hidden rounded-full py-2 pl-3 pr-7 text-sm font-semibold ${
    isDark 
      ? "bg-white text-[#0a1426]" 
      : "bg-[#0a1426] text-white"
  }`}
>
  <span
    aria-hidden
    className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-[#0075ff] transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)] group-active:w-[calc(100%-24px)]"
  />
  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center text-white">
    <ArrowRight className="h-4 w-4" />
  </span>
  <span className="relative z-10 ml-3">
    Get a quote
  </span>
</Link>

              {/* Mobile Menu Toggle -> opens the same slide panel as desktop */}
              <button
                aria-label="Toggle menu"
                onClick={() => setPanelOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent active:text-accent lg:hidden ${
                  isDark ? "text-white/80" : "text-foreground/80"
                }`}
              >
                {panelOpen ? "Close" : "Menu"}
                {panelOpen ? <X className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH OVERLAY */}
      <div
        className={`fixed inset-x-0 top-0 z-[60] overflow-hidden bg-primary transition-all duration-500 ease-out ${
          searchOpen ? "h-[280px] opacity-100" : "h-0 opacity-0"
        }`}
      >
        <div className="container-custom flex h-full flex-col justify-center py-10">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">
              Search Blog, projects, Service or people.
            </h2>
            <button
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 active:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center border-b border-white/20 pb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runSearch(searchQuery)}
              placeholder="Search here..."
              className="w-full bg-transparent text-lg text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="button"
              aria-label="Submit search"
              data-cursor-hover
              onClick={() => runSearch(searchQuery)}
              className="shrink-0 text-white"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      {searchOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        />
      )}

      {/* SLIDE PANEL (used on both desktop "Menu" click and mobile hamburger click) */}
      <div
        className={`fixed inset-y-0 right-0 z-[70] w-full max-w-md overflow-y-auto overscroll-contain bg-primary p-8 text-white transition-transform duration-500 ease-out sm:p-10 ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.25) transparent" }}
        data-lenis-prevent
        onWheel={(e) => {
          e.stopPropagation();
          e.preventDefault();
          e.currentTarget.scrollTop += e.deltaY;
        }}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={closePanel}>
            <Image
              src={PANEL_LOGO_SRC}
              alt="Solvior logo"
              width={140}
              height={36}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            aria-label="Close menu"
            onClick={closePanel}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10 active:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 flex items-center gap-3 border-b border-white/15 pb-4">
          <input
            type="text"
            value={panelSearchQuery}
            onChange={(e) => setPanelSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch(panelSearchQuery)}
            placeholder="Search here"
            className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          <button
            type="button"
            aria-label="Submit search"
            data-cursor-hover
            onClick={() => runSearch(panelSearchQuery)}
            className="shrink-0"
          >
            <Search className="h-4 w-4 text-white/60" />
          </button>
        </div>

        {/* NAV LINKS (accordion) — mobile/tablet only; desktop already has the horizontal nav bar */}
        <nav className="mt-6 flex flex-col lg:hidden">
          {mainNav.map((item) => {
            const isActive = pathname === item.href;
            const hasChildren = Boolean(item.children) || ("megaMenu" in item && Boolean(item.megaMenu));
            const isItemOpen = openPanelItem === item.label;

            const childLinks: Array<{ label: string; href: string; badge?: string }> = item.children
              ? item.children
              : "megaMenu" in item && item.megaMenu
              ? item.megaMenu.columns.flatMap(
                  (col) =>
                    col.items as Array<{
                      label: string;
                      href: string;
                      badge?: string;
                    }>,
                )
              : [];

            return (
              <div key={item.label} className="border-b border-white/15">
                <div className="flex items-center justify-between py-4">
                  <Link
                    href={item.href}
                    onClick={closePanel}
                    className={`font-display text-lg font-medium transition-colors hover:text-accent active:text-accent ${
                      isActive ? "text-accent" : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {hasChildren && (
                    <button
                      type="button"
                      aria-label={`Toggle ${item.label} submenu`}
                      onClick={() => togglePanelItem(item.label)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10 active:bg-white/10"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isItemOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {hasChildren && (
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${
                      isItemOpen ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="flex flex-col gap-1 overflow-hidden pl-2">
                      {childLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={closePanel}
                          className="flex items-center rounded-md py-2 text-sm text-white/70 transition hover:text-accent active:text-accent"
                        >
                          {link.label}
                          {"badge" in link && link.badge && <Badge text={link.badge} />}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <h3 className="mt-10 font-display text-2xl font-medium">Contact info</h3>
        <div className="mt-4 space-y-6 border-t border-white/15 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/50">Email</p>
              <p className="mt-1 font-semibold">{siteConfig.email}</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          </div>
          <div>
            <p className="text-xs text-white/50">Phone</p>
            <p className="mt-1 font-semibold">{siteConfig.phone}</p>
          </div>
          <div>
            <p className="text-xs text-white/50">Location</p>
            <p className="mt-1 font-semibold">{siteConfig.location}</p>
          </div>
        </div>

        <h3 className="mt-10 font-display text-2xl font-medium">Follow us</h3>
        <div className="mt-4 flex items-center gap-3 border-t border-white/15 pt-6">
          {[
            { Icon: Facebook, href: siteConfig.socials.facebook, label: "Facebook" },
            { Icon: Instagram, href: siteConfig.socials.instagram, label: "Instagram" },
            { Icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
            { Icon: Twitter, href: siteConfig.socials.twitter, label: "Twitter" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              data-cursor-hover
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10 active:bg-white/10"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      {panelOpen && (
        <div
          className="fixed inset-0 z-[65] bg-black/40 backdrop-blur-sm"
          onClick={closePanel}
        />
      )}
    </>
  );
}