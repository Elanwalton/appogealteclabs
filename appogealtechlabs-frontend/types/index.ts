// Tech Stack
export interface TechStack {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  description: string;
}

// Project
export interface Project {
  id: number;
  title: string;
  slug: string;
  category: 'web' | 'mobile' | 'api' | 'ecommerce' | 'other';
  short_description: string;
  cover_image: string;
  live_url: string;
  github_url: string;
  challenge_text?: string;
  solution_text?: string;
  results_metrics?: Record<string, string>;
  technologies: TechStack[];
  featured: boolean;
  is_case_study: boolean;
  created_at: string;
  updated_at?: string;
}

// Service
export interface ServicePackage {
  id: number;
  tier: 'basic' | 'standard' | 'premium';
  tier_display: string;
  price: string;
  timeline_days: number;
  features: string[];
  is_popular: boolean;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  packages: ServicePackage[];
}

// Testimonial
export interface Testimonial {
  id: number;
  client_name: string;
  client_position: string;
  client_photo: string | null;
  company_name: string;
  testimonial_text: string;
  rating: number;
  project_title: string | null;
  is_featured: boolean;
  created_at: string;
}

// Contact Form
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  inquiry_type: 'general' | 'quote' | 'support' | 'partnership';
  subject: string;
  message: string;
}
