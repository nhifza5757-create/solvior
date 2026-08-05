"use client";

import { useState } from "react";
import { Play, X, Facebook, Twitter, Linkedin } from "lucide-react";

// Replace with your real promo video URL (YouTube embed link)
const VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ";

/* ---------------- Video play button + modal ---------------- */
export function PlayVideoButton({ videoUrl = VIDEO_URL }: { videoUrl?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Play video"
        data-cursor-hover
        onClick={() => setOpen(true)}
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary transition hover:bg-white active:bg-white"
      >
        <Play className="h-5 w-5 fill-primary" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative aspect-video w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>
            <iframe
              src={videoUrl}
              title="Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="h-full w-full rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- Share buttons ---------------- */
export function ShareButtons({
  title,
  size = "sm",
}: {
  title: string;
  size?: "sm" | "md";
}) {
  const [copied, setCopied] = useState(false);
  const dim = size === "md" ? "h-9 w-9" : "h-8 w-8";
  const iconDim = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";

  function share(network: "facebook" | "twitter" | "linkedin") {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    window.open(shareUrls[network], "_blank", "noopener,noreferrer,width=600,height=500");
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-primary">Share:</span>
      {[
        { Icon: Facebook, key: "facebook" as const },
        { Icon: Twitter, key: "twitter" as const },
        { Icon: Linkedin, key: "linkedin" as const },
      ].map(({ Icon, key }) => (
        <button
          key={key}
          type="button"
          aria-label={`Share on ${key}`}
          data-cursor-hover
          onClick={() => share(key)}
          className={`flex ${dim} items-center justify-center rounded-full bg-muted text-primary transition hover:bg-accent active:bg-accent hover:text-white active:text-white`}
        >
          <Icon className={iconDim} />
        </button>
      ))}
      <button
        type="button"
        aria-label="Copy link"
        data-cursor-hover
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="ml-1 text-xs font-medium text-muted-foreground hover:text-accent active:text-accent"
      >
        {copied ? "Link copied!" : "Copy link"}
      </button>
    </div>
  );
}
