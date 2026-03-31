import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const endpoints = {
  techStack: '/tech-stack',
  projects: '/projects',
  services: '/services',
  testimonials: '/testimonials',
  contact: '/inquiries',
  team: '/team',
  faqs: '/faqs',
  popularProjects: '/popular-projects',
  blog: {
    posts: '/blog/posts',
    categories: '/blog/categories',
    tags: '/blog/tags',
  },
  newsletter: {
    subscribe: '/newsletter/subscribe',
  },
  calculator: '/calculator/options',
  caseStudies: '/case-studies',
  tutorials: '/tutorials',
  documentation: '/documentation',
};

export default api;
