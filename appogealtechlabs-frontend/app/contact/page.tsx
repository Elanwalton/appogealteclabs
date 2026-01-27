'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import api, { endpoints } from '@/lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
    agreed: false
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, agreed: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) return;
    
    setStatus('submitting');
    try {
      // Assuming endpoint exists, otherwise fallback to mock success for UI demo
      // await api.post(endpoints.contact, formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Mock delay
      setStatus('success');
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '', agreed: false });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className="min-h-screen py-32 px-6 lg:px-8 relative bg-[linear-gradient(180deg,#0a192f_0%,#112240_50%,#0a192f_100%)]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[rgba(100,255,218,0.05)] rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-start relative z-10">
        
        {/* Contact Info */}
        <div className="animate-fadeInUp">
          <span className="inline-block px-5 py-2 bg-[rgba(100,255,218,0.1)] border border-[rgba(100,255,218,0.3)] rounded-[20px] text-accent text-sm font-semibold uppercase tracking-[0.1em] mb-6">
            Get In Touch
          </span>
          <h2 className="text-5xl font-bold bg-gradient-to-br from-[#e6f1ff] to-accent bg-clip-text text-transparent mb-6">
            Let's Build Something Amazing
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-12 max-w-lg">
            Whether you have a question, a project idea, or just want to say hi, our team is ready to answer all your questions.
          </p>

          <div className="space-y-8 mb-12">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[rgba(17,34,64,0.6)] border border-[rgba(100,255,218,0.2)] text-accent group-hover:bg-accent group-hover:text-bg-primary transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-1">Email Us</h3>
                <p className="text-text-secondary mb-1">Our friendly team is here to help.</p>
                <a href="mailto:hello@appogeal.com" className="text-accent hover:underline font-mono">hello@appogeal.com</a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[rgba(17,34,64,0.6)] border border-[rgba(100,255,218,0.2)] text-accent group-hover:bg-accent group-hover:text-bg-primary transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-1">Visit Us</h3>
                <p className="text-text-secondary mb-1">Come say hello at our office.</p>
                <div className="text-text-primary font-mono">123 Innovation Drive, Tech City</div>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[rgba(17,34,64,0.6)] border border-[rgba(100,255,218,0.2)] text-accent group-hover:bg-accent group-hover:text-bg-primary transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-1">Call Us</h3>
                <p className="text-text-secondary mb-1">Mon-Fri from 8am to 5pm.</p>
                <a href="tel:+254700000000" className="text-accent hover:underline font-mono">+254 700 000 000</a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[rgba(17,34,64,0.7)] backdrop-blur-xl border border-[rgba(100,255,218,0.12)] rounded-[28px] p-8 md:p-10 shadow-[0_16px_48px_rgba(0,0,0,0.4)] animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          
          {status === 'success' ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-[rgba(16,185,129,0.1)] rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Message Sent!</h3>
              <p className="text-text-secondary mb-8">
                Thank you for contacting us. We'll get back to you shortly.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="px-6 py-2 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="form-group">
                  <label htmlFor="name" className="block text-[#e6f1ff] text-[0.9375rem] font-semibold mb-2">
                    Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 bg-[rgba(17,34,64,0.6)] backdrop-blur-md border border-[rgba(100,255,218,0.2)] rounded-xl text-[#e6f1ff] text-base outline-none transition-all focus:bg-[rgba(17,34,64,0.8)] focus:border-accent focus:shadow-[0_0_0_3px_rgba(100,255,218,0.1)] placeholder:text-[#495670]"
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="block text-[#e6f1ff] text-[0.9375rem] font-semibold mb-2">
                    Email <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 bg-[rgba(17,34,64,0.6)] backdrop-blur-md border border-[rgba(100,255,218,0.2)] rounded-xl text-[#e6f1ff] text-base outline-none transition-all focus:bg-[rgba(17,34,64,0.8)] focus:border-accent focus:shadow-[0_0_0_3px_rgba(100,255,218,0.1)] placeholder:text-[#495670]"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="form-group mb-6">
                <label htmlFor="subject" className="block text-[#e6f1ff] text-[0.9375rem] font-semibold mb-2">
                  Subject
                </label>
                {/* Custom SVG arrow background is tricky with Tailwind arbitrary values for background-image string escaping. 
                    Using a simpler relative positioning approach or just standard select is safer, but strictly following spec: */}
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-[rgba(17,34,64,0.6)] backdrop-blur-md border border-[rgba(100,255,218,0.2)] rounded-xl text-[#e6f1ff] text-base outline-none transition-all focus:bg-[rgba(17,34,64,0.8)] focus:border-accent focus:shadow-[0_0_0_3px_rgba(100,255,218,0.1)] appearance-none cursor-pointer pr-12"
                  >
                    <option value="General Inquiry" className="bg-[#112240] text-[#e6f1ff] py-2">General Inquiry</option>
                    <option value="Project Proposal" className="bg-[#112240] text-[#e6f1ff] py-2">Project Proposal</option>
                    <option value="Technical Support" className="bg-[#112240] text-[#e6f1ff] py-2">Technical Support</option>
                    <option value="Partnership" className="bg-[#112240] text-[#e6f1ff] py-2">Partnership</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M6 9L1 4h10z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-group mb-6">
                <label htmlFor="message" className="block text-[#e6f1ff] text-[0.9375rem] font-semibold mb-2">
                  Message <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-5 py-3.5 bg-[rgba(17,34,64,0.6)] backdrop-blur-md border border-[rgba(100,255,218,0.2)] rounded-xl text-[#e6f1ff] text-base font-sans outline-none transition-all focus:bg-[rgba(17,34,64,0.8)] focus:border-accent focus:shadow-[0_0_0_3px_rgba(100,255,218,0.1)] resize-y placeholder:text-[#495670]"
                  placeholder="Tell us about your project..."
                />
              </div>

              <div className="mb-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.agreed}
                      onChange={handleCheckboxChange}
                      className="peer appearance-none w-5 h-5 bg-[rgba(17,34,64,0.6)] border-2 border-[rgba(100,255,218,0.3)] rounded-md cursor-pointer checked:bg-gradient-to-br checked:from-accent checked:to-[#00d4ff] checked:border-transparent transition-all"
                    />
                    <CheckCircle className="absolute w-3.5 h-3.5 text-[#0a192f] left-1 top-1 opacity-0 peer-checked:opacity-100 pointer-events-none" />
                  </div>
                  <span className="text-[#8892b0] text-[0.9375rem] group-hover:text-text-primary transition-colors">
                    I agree to the <a href="#" className="text-accent underline">Privacy Policy</a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || !formData.agreed}
                className="w-full py-4 bg-gradient-to-br from-accent to-[#00d4ff] text-[#0a192f] text-base font-bold rounded-xl shadow-[0_4px_16px_rgba(100,255,218,0.3)] hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(100,255,218,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#0a192f] border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
