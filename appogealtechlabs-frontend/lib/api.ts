import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const endpoints = {
  techStack: '/tech-stack/',
  projects: '/projects/',
  services: '/services/',
  testimonials: '/testimonials/',
  contact: '/contact/',
};

export default api;
