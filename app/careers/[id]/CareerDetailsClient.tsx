"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { ShareButtons } from "@/components/ui/MediaInteractions";

const HERO_BG = "/images/project/pheader-bg.webp";

// DATA EXPORTED FROM HERE
export const careersData = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10 text-white">
        <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 34C10 28.4772 14.4772 24 20 24C25.5228 24 30 28.4772 30 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 16L32 18L38 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Business strategy consultant",
    salary: "$400-$550 / week",
    type: "Full time job/on site",
    tag: "Urgent",
    location: "London,UK",
    category: "Business consultant",
    number: "8080UO",
    company: "Solvior",
    website: "www.example.com",
    vacancy: "03 Available",
    applyBy: "OCT 22, 2024",
    description: "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional in the values through our strategic inset, approaches empower.",
    requirements: "Formulating and implementing business goals. We begin with an in-depth analysis of your business and market to identify opportunities and challenges. From there, we work with you to define clear, actionable.",
    responsibilities: "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional in the values through our strategic inset, approaches empower.",
    highlights: [
      "Clear vision and direction for your business for consultings.",
      "Enhanced ability to anticipate and respond to market changes.",
      "Data-driven decision-making for strategic planning executions.",
      "Structured approach to achieving your business goals.",
    ],
    responsibilitiesList: [
      "Discover our expertise",
      "Journey and commitment to explained",
      "Meet our team and learn",
      "Meet our team"
    ],
    tags: ["Business", "Consulting", "Insights"]
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10 text-white">
        <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 10V20L25 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Management consultant",
    salary: "$400-$550 / week",
    type: "Full time job/on site",
    tag: "Urgent",
    location: "London,UK",
    category: "Management consultant",
    number: "8081UO",
    company: "Solvior",
    website: "www.example.com",
    vacancy: "02 Available",
    applyBy: "NOV 10, 2024",
    description: "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches.",
    requirements: "Formulating and implementing management goals. We begin with an in-depth analysis of your business and market to identify opportunities and challenges.",
    responsibilities: "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset.",
    highlights: [
      "Clear vision and direction for your management consultings.",
      "Enhanced ability to anticipate and respond to market changes.",
      "Data-driven decision-making for strategic planning executions.",
      "Structured approach to achieving your business goals.",
    ],
    responsibilitiesList: [
      "Discover our expertise",
      "Journey and commitment to explained",
      "Meet our team and learn",
      "Meet our team"
    ],
    tags: ["Management", "Consulting", "Strategy"]
  },
];

export default function CareerDetailsClient({ jobId }: { jobId: number }) {
  // Saara data yahan use karo
  const [currentId, setCurrentId] = useState(jobId);
  
  const currentJob = careersData.find((j) => j.id === currentId);
  const isLastJob = currentId === careersData[careersData.length - 1].id;

  // Handle "Next" button click
  function handleNext() {
    if (!isLastJob) {
      const nextId = currentId + 1;
      setCurrentId(nextId);
      // Update URL without reloading page
      window.history.pushState({}, "", `/careers/${nextId}`);
    }
  }

  const [applyForm, setApplyForm] = useState({ name: "", email: "", phone: "", cover: "" });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [applySubmitted, setApplySubmitted] = useState(false);

  function handleApplyChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setApplyForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleApplySubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Job application: ${currentJob?.title ?? ""}`);
    const body = encodeURIComponent(
      `Name: ${applyForm.name}\nEmail: ${applyForm.email}\nPhone: ${applyForm.phone}\nResume: ${
        resumeFile ? resumeFile.name + " (please attach manually)" : "Not attached"
      }\n\nCover letter:\n${applyForm.cover}`
    );
    window.location.href = `mailto:careers@solvior.com?subject=${subject}&body=${body}`;
    setApplySubmitted(true);
    setApplyForm({ name: "", email: "", phone: "", cover: "" });
    setResumeFile(null);
    setTimeout(() => setApplySubmitted(false), 5000);
  }

  if (!currentJob) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
        <h2 className="text-3xl font-bold text-[#0a1426] mb-4">Job Not Found</h2>
        <Link href="/careers" className="text-[#0075ff] hover:underline active:underline">Go back to Careers</Link>
      </div>
    );
  }

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

          <Link href="/" className="transition hover:text-[#0075ff]">
            Home
          </Link>

          <span>/</span>

          <span className="text-white/80">
            Careers Details
          </span>

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
              {/* Job Header Card */}
              <div className="bg-[#F0F5FF] p-8 rounded-lg border border-gray-100 flex flex-col sm:flex-row items-start gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-[#0075ff]">
                  {currentJob.icon}
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="rounded-full border border-gray-300 px-3 py-1 text-[10px] font-medium text-gray-500">
                      {currentJob.type}
                    </span>
                    <span className="rounded-full border border-gray-300 px-3 py-1 text-[10px] font-medium text-gray-500">
                      {currentJob.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0a1426]">{currentJob.title}</h3>
                  <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4" /> {currentJob.location}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Job Description */}
            <Reveal animation="fadeInUp" delay={0.1}>
              <h3 className="text-xl font-bold text-[#0a1426] mb-4">Job Description</h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                {currentJob.description}
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset.
              </p>
            </Reveal>

            {/* Requirements */}
            <Reveal animation="fadeInUp" delay={0.15}>
              <h3 className="text-xl font-bold text-[#0a1426] mb-4">Requirements</h3>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                {currentJob.requirements}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {currentJob.highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 border border-gray-200 p-4 rounded bg-white">
                    <Check className="h-4 w-4 text-[#0075ff] shrink-0 mt-1" />
                    <p className="text-sm text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches.
              </p>
            </Reveal>

            {/* Responsibilities */}
            <Reveal animation="fadeInUp" delay={0.2}>
              <h3 className="text-xl font-bold text-[#0a1426] mb-4">Responsibilities</h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                {currentJob.responsibilities}
              </p>
              <div className="flex flex-col gap-2 mb-6">
                {currentJob.responsibilitiesList.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-[#0075ff] shrink-0 mt-1" />
                    <p className="text-sm text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Footer Tags & Share */}
            <Reveal animation="fadeInUp" delay={0.25}>
              <div className="flex flex-wrap items-center justify-between border-t border-gray-200 pt-6">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-[#0a1426] mr-2">Tags:</span>
                  {currentJob.tags.map((tag, index) => (
                    <span key={index} className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <ShareButtons title={currentJob.title} />
                </div>
              </div>
            </Reveal>

            {/* Next Button (Now Working!) */}
            <Reveal animation="fadeInUp" delay={0.3}>
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleNext}
                  disabled={isLastJob}
                  className={`group relative inline-flex items-center rounded-lg border px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    isLastJob
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-200 text-[#0a1426] hover:border-[#0075ff] active:border-[#0075ff] hover:bg-[#0075ff] active:bg-[#0075ff] hover:text-white active:text-white"
                  }`}
                >
                  <span className="mr-8">Next</span>
                  <ArrowRight className="absolute right-4 h-4 w-4 transition-transform group-hover:translate-x-1 group-active:translate-x-1" />
                </button>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN - Job Information & Apply Form */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <Reveal animation="fadeInUp">
              <div className="border border-gray-200 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-[#0a1426] mb-4 pb-2 border-b-2 border-[#0075ff] w-fit">Job information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Category</span>
                    <span className="text-[#0a1426] font-medium">: {currentJob.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Number</span>
                    <span className="text-[#0a1426] font-medium">: {currentJob.number}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Company</span>
                    <span className="text-[#0a1426] font-medium">: {currentJob.company}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Website</span>
                    <span className="text-[#0a1426] font-medium">: {currentJob.website}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Salary</span>
                    <span className="text-[#0a1426] font-medium">: {currentJob.salary}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Vacancy</span>
                    <span className="text-[#0a1426] font-medium">: {currentJob.vacancy}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-500">Apply on</span>
                    <span className="text-[#0a1426] font-medium">: {currentJob.applyBy}</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal animation="fadeInUp" delay={0.1}>
              <div className="border border-gray-200 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-[#0a1426] mb-4 pb-2 border-b-2 border-[#0075ff] w-fit">Apply online</h4>
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <input type="text" name="name" value={applyForm.name} onChange={handleApplyChange} required placeholder="Full name*" className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#0075ff] transition-colors" />
                  <input type="email" name="email" value={applyForm.email} onChange={handleApplyChange} required placeholder="Enter email*" className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#0075ff] transition-colors" />
                  <input type="tel" name="phone" value={applyForm.phone} onChange={handleApplyChange} required placeholder="Phone number*" className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#0075ff] transition-colors" />
                  <textarea name="cover" value={applyForm.cover} onChange={handleApplyChange} required placeholder="Cover letter*" rows={3} className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#0075ff] transition-colors resize-none"></textarea>
                  <div className="border border-gray-200 rounded p-2 flex items-center gap-3 bg-gray-50">
                    <label className="bg-[#0075ff] text-white px-4 py-1.5 rounded text-xs font-semibold hover:bg-blue-700 active:bg-blue-700 transition-colors cursor-pointer">
                      Choose File
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                      />
                    </label>
                    <span className="text-xs text-gray-500">{resumeFile ? resumeFile.name : "No file chosen"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button type="submit" data-cursor-hover className="group relative inline-flex w-fit items-center overflow-hidden rounded-full bg-[#0a1426] py-2 pl-3 pr-7 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 active:-translate-y-0.5 hover:shadow-xl active:shadow-xl">
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-[#0075ff] transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)] group-active:w-[calc(100%-24px)]"
                      />
                      <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 group-hover:-rotate-45 group-active:-rotate-45">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span className="relative z-10 ml-3">Submit now</span>
                    </button>
                    {applySubmitted && (
                      <span className="flex items-center gap-1.5 text-sm font-medium text-[#0075ff]">
                        <Check className="h-4 w-4" /> Opening your email client...
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
        <span
          aria-hidden
          className="absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-white/20"
        />
        <span
          aria-hidden
          className="absolute -right-10 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-white/20"
        />
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
            <span
              aria-hidden
              className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-[#0a1426] transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)] group-active:w-[calc(100%-24px)]"
            />
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