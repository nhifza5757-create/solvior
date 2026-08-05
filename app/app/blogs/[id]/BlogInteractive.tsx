"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Reply } from "lucide-react";

export { PlayVideoButton, ShareButtons } from "@/components/ui/MediaInteractions";

type Comment = {
  id: number;
  name: string;
  date: string;
  avatar: string;
  text: string;
  replies: { id: number; name: string; date: string; avatar: string; text: string }[];
};

/* ---------------- Video play button + modal ---------------- */
export function PlayVideoButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Play video"
        data-cursor-hover
        onClick={() => setOpen(true)}
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary transition hover:bg-white"
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
              className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>
            <iframe
              src={VIDEO_URL}
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
export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

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
          className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-primary transition hover:bg-accent hover:text-white"
        >
          <Icon className="h-3.5 w-3.5" />
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
        className="ml-1 text-xs font-medium text-muted-foreground hover:text-accent"
      >
        {copied ? "Link copied!" : "Copy link"}
      </button>
    </div>
  );
}

/* ---------------- Comments + reply form ---------------- */
export function CommentsSection({
  initialComments,
  totalCount,
}: {
  initialComments: Comment[];
  totalCount: number;
}) {
  const [comments, setComments] = useState(initialComments);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const [form, setForm] = useState({ name: "", email: "", website: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  function submitReply(commentId: number) {
    if (!replyText.trim()) return;
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: [
                ...c.replies,
                {
                  id: Date.now(),
                  name: "You",
                  date: "Just now",
                  avatar: c.avatar,
                  text: replyText,
                },
              ],
            }
          : c
      )
    );
    setReplyText("");
    setReplyingTo(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.comment.trim()) return;

    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: form.name,
        date: "Just now",
        avatar: "/images/team/team-1.webp",
        text: form.comment,
        replies: [],
      },
    ]);

    setForm({ name: "", email: "", website: "", comment: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <>
      {/* Comments */}
      <h3 className="mt-14 font-display text-xl font-medium text-primary">
        Comments ({totalCount + (comments.length - initialComments.length)})
      </h3>
      <div className="mt-6 space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-6">
            <div className="rounded-none border border-border p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                    <Image src={comment.avatar} alt={comment.name} fill className="object-cover" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-primary">{comment.name}</span>
                    <span className="block text-xs text-muted-foreground">{comment.date}</span>
                  </span>
                </div>
                <button
                  type="button"
                  data-cursor-hover
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent"
                >
                  <Reply className="h-3.5 w-3.5" />
                  Reply
                </button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{comment.text}</p>

              {replyingTo === comment.id && (
                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full rounded-full border border-border bg-background-soft px-4 py-2 text-sm text-primary outline-none placeholder:text-muted-foreground focus:border-accent"
                  />
                  <button
                    type="button"
                    onClick={() => submitReply(comment.id)}
                    className="shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-accent"
                  >
                    Post
                  </button>
                </div>
              )}
            </div>

            {comment.replies.map((reply) => (
              <div key={reply.id} className="ml-6 rounded-none border border-border p-6 sm:ml-14">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                      <Image src={reply.avatar} alt={reply.name} fill className="object-cover" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-primary">{reply.name}</span>
                      <span className="block text-xs text-muted-foreground">{reply.date}</span>
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{reply.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Leave a reply */}
      <h3 className="mt-14 font-display text-xl font-medium text-primary">Leave a reply</h3>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Enter name"
            className="rounded-full border border-border bg-background-soft px-5 py-3 text-sm text-primary outline-none placeholder:text-muted-foreground focus:border-accent"
          />
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="Enter email"
            className="rounded-full border border-border bg-background-soft px-5 py-3 text-sm text-primary outline-none placeholder:text-muted-foreground focus:border-accent"
          />
        </div>
        <input
          type="text"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
          placeholder="Your website"
          className="w-full rounded-full border border-border bg-background-soft px-5 py-3 text-sm text-primary outline-none placeholder:text-muted-foreground focus:border-accent"
        />
        <textarea
          required
          value={form.comment}
          onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
          placeholder="Enter your comments"
          rows={5}
          className="w-full rounded-none border border-border bg-background-soft px-5 py-3 text-sm text-primary outline-none placeholder:text-muted-foreground focus:border-accent"
        />
        <div className="flex items-center gap-4">
          <button
            type="submit"
            data-cursor-hover
            className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary py-2 pl-3 pr-7 text-sm font-semibold text-white"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)]"
            />
            <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center">
              <ArrowRight className="h-4 w-4" />
            </span>
            <span className="relative z-10 ml-3">Leave comment</span>
          </button>
          {submitted && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
              <Check className="h-4 w-4" /> Comment posted!
            </span>
          )}
        </div>
      </form>
    </>
  );
}
