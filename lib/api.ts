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