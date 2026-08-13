"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Check, MapPin } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { ShareButtons } from "@/components/ui/MediaInteractions";
import { getJobs, submitJobApplication, uploadResume, type Job } from "@/lib/api";

const HERO_BG = "/images/project/pheader-bg.webp";

export default function CareerDetailsClient({ slug }: { slug: string }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobs()
      .then((data) => setJobs(data))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  const currentJob = jobs.find((j) => j.slug === slug);
  const currentIndex = jobs.findIndex((j) => j.slug === slug);
  const nextJob = currentIndex >= 0 ? jobs[(currentIndex + 1) % jobs.length] : null;
  const isLastJob = !nextJob || nextJob.slug === slug;

  const [applyForm, setApplyForm] = useState({ name: "", email: "", phone: "", cover: "" });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [applyError, setApplyError] = useState("");

  function handleApplyChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setApplyForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleApplySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentJob) return;
    if (!resumeFile) {
      setApplyError("Please attach your resume/CV.");
      return;
    }
    setApplyError("");
    setSubmitting(true);
    try {
      const uploaded = await uploadResume(resumeFile);
      await submitJobApplication(currentJob.id, {
        name: applyForm.name.trim(),
        email: applyForm.email.trim(),
        phone: applyForm.phone.trim() || undefined,
        resumeUrl: uploaded.url,
        coverLetter: applyForm.cover.trim() || undefined,
      });
      setApplySubmitted(true);
      setApplyForm({ name: "", email: "", phone: "", cover: "" });
      setResumeFile(null);
      setTimeout(() => setApplySubmitted(false), 6000);
    } catch (err: any) {
      setApplyError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <p className="text-gray-500 text-sm">Loading job details...</p>
      </div>
    );
  }

  if (!currentJob) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
        <h2 className="text-3xl font-bold text-[#0a1426] mb-4">Job Not Found</h2>
        <Link href="/careers" className="text-[#0075ff] hover:underline active:underline">Go back to Careers</Link>
      </div>
    );
  }

  const requirementLines = (currentJob.requirements || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <div>
      {/* HERO BANNER */}
      <section className="relative -mt-[104px] flex min-h-[500px] sm:h-[550px] items-center justify-center overflow-hidden pt-[104px]">
        <Image
          src={HERO_BG}
          alt="Careers details background"
          fill
          priority
          className="animate-hero-zoom object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0a1426]/65" />
        <div className="relative z-10 flex w-full items-center justify-center px-5 sm:px-6">
          <div className="max-w-4xl text-center text-white">
            <Reveal animation="fadeInUp">
              <h1 className="font-display text-[34px] font-bold leading-tight sm:text-5xl lg:text-6xl">
                Careers Details
              </h1>
            </Reveal>
            <Reveal animation="fadeInUp" delay={0.15}>
              <div className="mt-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs text-white backdrop-blur-md sm:text-sm">
                <Link href="/" className="transition hover:text-[#0075ff]">Home</Link>
                <span>/</span>
                <Link href="/careers" className="transition hover:text-[#0075ff]">Careers</Link>
                <span>/</span>
                <span className="text-white/80">{currentJob.title}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MAIN DETAILS SECTION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT COLUMN - Job Details */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <Reveal animation="fadeInUp">
              <div className="bg-[#F0F5FF] p-8 rounded-lg border border-gray-100 flex flex-col sm:flex-row items-start gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-[#0075ff]">
                  <Briefcase className="h-9 w-9 text-white" />
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {currentJob.type && (
                      <span className="rounded-full border border-gray-300 px-3 py-1 text-[10px] font-medium text-gray-500">
                        {currentJob.type}
                      </span>
                    )}
                    {currentJob.department && (
                      <span className="rounded-full border border-gray-300 px-3 py-1 text-[10px] font-medium text-gray-500">
                        {currentJob.department}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-[#0a1426]">{currentJob.title}</h3>
                  <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4" /> {currentJob.location || "Remote"}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Job Description */}
            <Reveal animation="fadeInUp" delay={0.1}>
              <h3 className="text-xl font-bold text-[#0a1426] mb-4">Job Description</h3>
              <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                {currentJob.description}
              </p>
            </Reveal>

            {/* Requirements */}
            {requirementLines.length > 0 && (
              <Reveal animation="fadeInUp" delay={0.15}>
                <h3 className="text-xl font-bold text-[#0a1426] mb-4">Requirements</h3>
                <div className="flex flex-col gap-2">
                  {requirementLines.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-[#0075ff] shrink-0 mt-1" />
                      <p className="text-sm text-gray-600">{item}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Footer: Share */}
            <Reveal animation="fadeInUp" delay={0.25}>
              <div className="flex flex-wrap items-center justify-end border-t border-gray-200 pt-6">
                <div className="flex items-center gap-3">
                  <ShareButtons title={currentJob.title} />
                </div>
              </div>
            </Reveal>

            {/* Next Button */}
            <Reveal animation="fadeInUp" delay={0.3}>
              <div className="flex justify-center mt-8">
                <Link
                  href={isLastJob ? "#" : `/careers/${nextJob!.slug}`}
                  aria-disabled={isLastJob}
                  className={`group relative inline-flex items-center rounded-lg border px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    isLastJob
                      ? "pointer-events-none border-gray-200 text-gray-400"
                      : "border-gray-200 text-[#0a1426] hover:border-[#0075ff] active:border-[#0075ff] hover:bg-[#0075ff] active:bg-[#0075ff] hover:text-white active:text-white"
                  }`}
                >
                  <span className="mr-8">Next</span>
                  <ArrowRight className="absolute right-4 h-4 w-4 transition-transform group-hover:translate-x-1 group-active:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN - Job Information & Apply Form */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <Reveal animation="fadeInUp">
              <div className="border border-gray-200 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-[#0a1426] mb-4 pb-2 border-b-2 border-[#0075ff] w-fit">Job information</h4>
                <div className="space-y-3 text-sm">
                  {currentJob.department && (
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Department</span>
                      <span className="text-[#0a1426] font-medium">: {currentJob.department}</span>
                    </div>
                  )}
                  {currentJob.type && (
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Type</span>
                      <span className="text-[#0a1426] font-medium">: {currentJob.type}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-500">Location</span>
                    <span className="text-[#0a1426] font-medium">: {currentJob.location || "Remote"}</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal animation="fadeInUp" delay={0.1}>
              <div className="border border-gray-200 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-[#0a1426] mb-4 pb-2 border-b-2 border-[#0075ff] w-fit">Apply online</h4>
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  {applyError && (
                    <p className="rounded-md bg-red-50 border border-red-100 px-3 py-2 text-xs text-red-600">{applyError}</p>
                  )}
                  <input type="text" name="name" value={applyForm.name} onChange={handleApplyChange} required placeholder="Full name*" className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#0075ff] transition-colors" />
                  <input type="email" name="email" value={applyForm.email} onChange={handleApplyChange} required placeholder="Enter email*" className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#0075ff] transition-colors" />
                  <input type="tel" name="phone" value={applyForm.phone} onChange={handleApplyChange} placeholder="Phone number" className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#0075ff] transition-colors" />
                  <div className="border border-gray-200 rounded p-2 flex items-center gap-3 bg-gray-50">
                    <label className="bg-[#0075ff] text-white px-4 py-1.5 rounded text-xs font-semibold hover:bg-blue-700 active:bg-blue-700 transition-colors cursor-pointer shrink-0">
                      Choose File
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                      />
                    </label>
                    <span className="text-xs text-gray-500 truncate">{resumeFile ? resumeFile.name : "Resume/CV — no file chosen*"}</span>
                  </div>
                  <textarea name="cover" value={applyForm.cover} onChange={handleApplyChange} placeholder="Cover letter (optional)" rows={3} className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#0075ff] transition-colors resize-none"></textarea>

                  <div className="flex items-center gap-4">
                    <button type="submit" disabled={submitting} data-cursor-hover className="group relative inline-flex w-fit items-center overflow-hidden rounded-full bg-[#0a1426] py-2 pl-3 pr-7 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 active:-translate-y-0.5 hover:shadow-xl active:shadow-xl disabled:opacity-60">
                      <span aria-hidden className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-[#0075ff] transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)] group-active:w-[calc(100%-24px)]" />
                      <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 group-hover:-rotate-45 group-active:-rotate-45">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span className="relative z-10 ml-3">{submitting ? "Uploading & submitting..." : "Submit now"}</span>
                    </button>
                    {applySubmitted && (
                      <span className="flex items-center gap-1.5 text-sm font-medium text-[#0075ff]">
                        <Check className="h-4 w-4" /> Application submitted!
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden bg-[#0075ff] py-16">
        <span aria-hidden className="absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-white/20" />
        <span aria-hidden className="absolute -right-10 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-white/20" />
        <Reveal
          animation="fadeInUp"
          className="container mx-auto max-w-7xl px-4 relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center"
        >
          <h2 className="font-display text-4xl font-bold uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
            Get consultant now!
          </h2>
          <Link
            href="/contact"
            className="group relative inline-flex shrink-0 items-center overflow-hidden rounded-full bg-white py-2 pl-3 pr-7 text-sm font-semibold text-[#0a1426] transition-transform duration-300 hover:-translate-y-0.5 active:-translate-y-0.5 hover:shadow-xl active:shadow-xl"
          >
            <span aria-hidden className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-[#0a1426] transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)] group-active:w-[calc(100%-24px)]" />
            <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 group-hover:-rotate-45 group-active:-rotate-45">
              <ArrowRight className="h-4 w-4" />
            </span>
            <span className="relative z-10 ml-3 transition-colors duration-300 group-hover:text-white group-active:text-white">
              Lets talk now
            </span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}