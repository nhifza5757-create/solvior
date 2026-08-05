import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-24">
      <div className="container-custom text-center">
        <span className="eyebrow justify-center">Error 404</span>
        <h1 className="mt-4 font-display text-6xl font-medium text-primary sm:text-8xl">
          Page not found
        </h1>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          data-cursor-hover
          className="group relative mt-8 inline-flex items-center overflow-hidden rounded-full bg-primary py-2 pl-3 pr-7 text-sm font-semibold text-white"
        >
          <span
            aria-hidden
            className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)]"
          />
          <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center">
            <ArrowRight className="h-4 w-4" />
          </span>
          <span className="relative z-10 ml-3">Back to homepage</span>
        </Link>
      </div>
    </section>
  );
}
