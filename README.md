# Solvior Clone — Next.js (App Router)

A close recreation of the "Home 04" page from the Solvior business-consulting
template — layout, content, structure, **and animations** — built with
TypeScript, Tailwind CSS, reusable components, and custom hooks.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Folder structure

```
app/                  Routes (App Router)
  layout.tsx           Root layout — wires up Lenis + custom cursor
  page.tsx              Home page ("home-04")
  about/, contact/, services/, portfolios/, team/, blogs/   Secondary routes
  globals.css           Design tokens, keyframes, reveal-animation classes

components/
  layout/
    Header.tsx           Sticky header with slide-down "duplicate header" on scroll
    Footer.tsx
    SmoothScrollProvider.tsx   Initializes Lenis for the whole app
  sections/               Hero, Features, About, Services, Marquee,
                           CaseStudies, Team, Testimonials, Blog, Newsletter
  ui/
    Reveal.tsx             Scroll-triggered reveal wrapper (WOW.js equivalent)
    AnimatedTitle.tsx        Word-by-word hero headline reveal
    CustomCursor.tsx          Custom cursor follower (desktop only)

hooks/
  useScrollHeader.ts       Detects scroll position for the sticky header
  useMobileMenu.ts          Mobile nav open/close + body scroll lock
  useCountUp.ts              Animated stat counters (IntersectionObserver)
  useInView.ts                 Generic "has scrolled into view" hook
  useLenis.ts                   Sets up Lenis smooth scrolling
  useCustomCursor.ts              Tracks pointer position + hover state

data/
  site.ts                Nav links, services, team, testimonials, blog content

public/images/          Placeholder images (see note below)
```

## Animations implemented (matched against the live site's DevTools output)

| Reference site (from your screenshots)      | This project                                   |
|-----------------------------------------------|-------------------------------------------------|
| `class="lenis"` smooth scroll                 | `hooks/useLenis.ts` (via the `lenis` npm package)|
| `wow fadeInUp` / `data-wow-delay`              | `components/ui/Reveal.tsx` (`animation` + `delay` props) |
| `hero-title text-anim`                          | `components/ui/AnimatedTitle.tsx` (word-by-word reveal) |
| `mouseCursor cursor-outer/cursor-inner`          | `components/ui/CustomCursor.tsx`                 |
| `header-duplicate header-sticky`                 | `Header.tsx` + `.header-sticky-anim` slide-down  |
| `shape-1 zoominout` / `hero-shape move-anim`     | `.shape-zoominout` / `.shape-move` CSS classes   |
| Animated stat counters (`8.5x`, `20M`, etc.)      | `hooks/useCountUp.ts`                            |

All scroll animations respect `prefers-reduced-motion`.

## Note on images

The live template's real photos live on its own server, which this sandbox
can't fetch from. The `public/images` folders are filled with generated
placeholder graphics (correct filenames, sizes, and folders) so every layout
renders exactly like the original — swap the files with your own photos to
finish it off.

## Note on fonts

The reference site uses **Lato** (body) + **Libre Franklin** (display),
loaded via `next/font/google`. That needs internet access at build time,
which wasn't available in this sandbox, so the CSS currently falls back to
system fonts. Once you `npm install` on your own machine (or deploy to
Vercel), swap `app/globals.css`'s `--font-sans` / `--font-display` for a
`next/font/google` setup with Lato + Libre Franklin to match exactly.

## Note on the custom cursor

The custom cursor hides the native pointer on desktop (`pointer: fine` +
≥1024px) to match the reference site. If you'd rather keep the OS cursor,
delete `<CustomCursor />` from `app/layout.tsx` and the `cursor: none` rule
in `globals.css`.
