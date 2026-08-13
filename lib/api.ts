const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDesc: string | null;
  description: string;
  icon: string | null;
  image: string | null;
  order: number;
  isActive: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string | null;
  image: string | null;
  linkedin: string | null;
  twitter: string | null;
  instagram: string | null;
  facebook: string | null;
  order: number;
  isActive: boolean;
}

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  category: string | null;
  description: string;
  image: string | null;
  gallery: string[];
  order: number;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string | null;
  company: string | null;
  content: string;
  rating: number;
  image: string | null;
  order: number;
  isActive: boolean;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  order: number;
  isActive: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  category: string | null;
  author: string | null;
  isPublished: boolean;
  publishedAt: string | null;
}

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    next: { revalidate: 60 }, // cache for 60s, re-fetch after that
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
  }
  return res.json();
}

export function getServices() {
  return fetchFromApi<Service[]>('/services');
}

export function getTeam() {
  return fetchFromApi<TeamMember[]>('/team');
}

export function getPortfolios() {
  return fetchFromApi<Portfolio[]>('/portfolios');
}

export function getTestimonials() {
  return fetchFromApi<Testimonial[]>('/testimonials');
}

export function getFaqs() {
  return fetchFromApi<Faq[]>('/faq');
}

export function getBlogPosts() {
  return fetchFromApi<BlogPost[]>('/blog');
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  location: string | null;
  type: string | null;
  description: string;
  requirements: string | null;
  isActive: boolean;
}

export function getJobs() {
  return fetchFromApi<Job[]>('/careers/jobs');
}

export function getJobBySlug(slug: string) {
  return fetchFromApi<Job>(`/careers/jobs/slug/${slug}`);
}

export interface JobApplicationPayload {
  name: string;
  email: string;
  phone?: string;
  resumeUrl: string;
  coverLetter?: string;
}

export async function submitJobApplication(jobId: string, payload: JobApplicationPayload) {
  const res = await fetch(`${API_URL}/careers/jobs/${jobId}/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message || 'Failed to submit application');
  }
  return res.json();
}

export async function uploadResume(file: File): Promise<{ url: string; publicId: string }> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/upload/resume`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message || 'Failed to upload resume');
  }
  return res.json();
}