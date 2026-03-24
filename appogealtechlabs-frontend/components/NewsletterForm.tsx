'use client';

import { useState } from 'react';
import api, { endpoints } from '@/lib/api';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      await api.post(endpoints.newsletter.subscribe, { email });
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (err: any) {
      console.error('Newsletter subscription failed:', err);
      setStatus('error');
      if (err.response?.data?.email) {
          setMessage(err.response.data.email[0]); // Likely "Subscriber with this email already exists."
      } else {
          setMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="newsletter-component">
      <form onSubmit={handleSubmit} className="relative mb-2">
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your email"
            className="newsletter-input w-full pl-5 pr-14 py-3.5 border rounded-xl text-[0.9375rem] outline-none transition-all disabled:opacity-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            required
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`newsletter-submit absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${status === 'success' ? 'bg-green-500 text-white' : 'bg-gradient-to-br from-accent to-[#00d4ff] text-[#0a192f] hover:scale-105 hover:shadow-[0_4px_16px_rgba(100,255,218,0.4)]'}`}
          >
            {status === 'loading' ? (
              <Loader2 size={18} className="animate-spin" />
            ) : status === 'success' ? (
              <CheckCircle size={18} />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </form>
      
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-sm flex items-center gap-2 ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}
          >
            {status === 'error' && <AlertCircle size={14} />}
            {message}
          </motion.div>
        )}
      </AnimatePresence>
      
        <label className="flex items-center gap-2 text-text-secondary text-xs cursor-pointer mt-2">
           <input type="checkbox" className="w-4 h-4 rounded cursor-pointer accent-accent" required />
           <span>I agree to receive marketing emails</span>
        </label>
    </div>
  );
}
