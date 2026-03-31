'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Check, X, Clock, ChevronDown, Rocket, Sparkles, Code, ArrowRight } from 'lucide-react';
import api, { endpoints } from '@/lib/api';

interface Feature {
  text: string;
  included: boolean;
}

interface ServicePackage {
  tier: 'basic' | 'standard' | 'premium';
  tier_display: string;
  price: string;
  description: string;
  timeline_days: number;
  features: Feature[];
  is_popular: boolean;
  icon?: React.ReactNode; 
}

// Helper to map tier to icon
const getIcon = (tier: string) => {
  switch(tier) {
    case 'basic': return <Code size={32} />;
    case 'standard': return <Rocket size={32} />;
    case 'premium': return <Sparkles size={32} />;
    default: return <Code size={32} />;
  }
};

// FAQs are now fetched from backend via API

export default function ServicesPage() {
  const [billingCycle, setBillingCycle] = useState<'one-time' | 'retainer'>('one-time');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [pricingPlans, setPricingPlans] = useState<ServicePackage[]>([]);
  const [faqItems, setFaqItems] = useState<any[]>([]);
  const [popularProjects, setPopularProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get(`${endpoints.services}/web-application-development`);
        const packages = response.data.packages.map((pkg: any) => ({
          ...pkg,
          icon: getIcon(pkg.tier)
        }));
        setPricingPlans(packages);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchFaqs = async () => {
      try {
        const response = await api.get(`${endpoints.faqs}?category=services`);
        setFaqItems(response.data);
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      }
    };
    
    const fetchPopular = async () => {
      try {
        const response = await api.get(endpoints.popularProjects);
        setPopularProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch popular projects:', error);
      }
    };

    fetchServices();
    fetchFaqs();
    fetchPopular();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="services-section min-h-screen py-32 px-6 lg:px-8 relative">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="inline-block px-5 py-2 bg-[rgba(100,255,218,0.1)] border border-[rgba(100,255,218,0.3)] rounded-[20px] text-accent text-sm font-semibold uppercase tracking-[0.1em] mb-6">
            Services & Pricing
          </span>
          <h2 className="text-5xl font-bold bg-gradient-to-br from-[#e6f1ff] to-accent bg-clip-text text-transparent mb-6">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Flexible pricing options designed to fit your project needs. 
            From startups to enterprise, we've got you covered.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center gap-2 p-2 bg-[rgba(17,34,64,0.6)] backdrop-blur-xl border border-[rgba(100,255,218,0.2)] rounded-2xl w-fit mx-auto mb-16">
          <button
            onClick={() => setBillingCycle('one-time')}
            className={`px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 ${
              billingCycle === 'one-time'
                ? 'bg-gradient-to-br from-accent to-[#00d4ff] text-[#0a192f] shadow-[0_4px_16px_rgba(100,255,218,0.3)]'
                : 'text-text-secondary hover:text-accent bg-transparent'
            }`}
          >
            One-Time Project
          </button>
          <button
            onClick={() => setBillingCycle('retainer')}
            className={`px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 ${
              billingCycle === 'retainer'
                ? 'bg-gradient-to-br from-accent to-[#00d4ff] text-[#0a192f] shadow-[0_4px_16px_rgba(100,255,218,0.3)]'
                : 'text-text-secondary hover:text-accent bg-transparent'
            }`}
          >
            Monthly Retainer
          </button>
        </div>


        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-24 max-w-6xl mx-auto">
          {loading ? (
             [...Array(3)].map((_, i) => (
               <div key={i} className="service-card h-[600px] animate-pulse bg-[rgba(17,34,64,0.7)] rounded-[24px]"></div>
             ))
          ) : pricingPlans.map((plan, index) => (

            <div 
              key={index}
              className={`service-card relative bg-[rgba(17,34,64,0.7)] backdrop-blur-xl border border-[rgba(100,255,218,0.12)] rounded-[24px] p-10 transition-all duration-400 hover:-translate-y-2 hover:border-[rgba(100,255,218,0.3)] hover:shadow-[0_16px_56px_rgba(0,0,0,0.5),0_0_32px_rgba(100,255,218,0.2)] animate-fadeInScale ${
                plan.is_popular ? 'border-[rgba(100,255,218,0.4)] shadow-[0_12px_48px_rgba(0,0,0,0.4),0_0_40px_rgba(100,255,218,0.15)] scale-105 z-10 lg:-translate-y-4' : ''
              }`}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-[#00d4ff] opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${plan.is_popular ? 'opacity-100' : ''}`}></div>

              {plan.is_popular && (
                <div className="popular-badge absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-br from-accent to-[#00d4ff] text-bg-primary text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_4px_16px_rgba(100,255,218,0.4)]">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="flex flex-col items-center mb-8 relative">
                <div className="service-icon w-20 h-20 flex items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(100,255,218,0.15),rgba(0,212,255,0.15))] border-2 border-[rgba(100,255,218,0.3)] text-accent mb-6">
                  {plan.icon}
                </div>
                <h3 className="service-tier text-[1.75rem] font-bold text-text-primary mb-0">{plan.tier_display}</h3>
              </div>

              {/* Price */}
              <div className="flex items-baseline justify-center mb-6">
                <span className="text-xl font-semibold text-text-secondary mr-1">KSh</span>
                <span className="price-amount text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#e6f1ff] to-accent">
                  {plan.price}
                </span>
                <span className="text-text-secondary ml-2">/project</span>
              </div>

              <p className="text-center text-text-secondary leading-relaxed mb-8 pb-8 border-b border-[rgba(100,255,218,0.1)]">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[0.9375rem] text-text-secondary">
                    {feature.included ? (
                      <Check size={20} className="text-[#10b981] flex-shrink-0 mt-0.5" />
                    ) : (
                      <X size={20} className="text-[#ef4444] opacity-50 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? '' : 'opacity-60'}>{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* Timeline */}
              <div className="flex items-center justify-center gap-2 p-4 mb-6 bg-[rgba(100,255,218,0.05)] rounded-xl text-text-secondary text-sm">
                <Clock size={16} className="text-accent" />
                <span>Delivery: {plan.timeline_days} days</span>
              </div>

              {/* CTA */}
              <button className={`service-cta w-full py-4 text-center rounded-xl font-bold text-base transition-all duration-300 ${
                  plan.is_popular 
                  ? 'bg-gradient-to-br from-accent to-[#00d4ff] text-bg-primary shadow-[0_4px_16px_rgba(100,255,218,0.3)] hover:shadow-[0_8px_32px_rgba(100,255,218,0.6)] hover:-translate-y-0.5'
                  : 'bg-[rgba(100,255,218,0.1)] text-accent border border-[rgba(100,255,218,0.3)] hover:bg-gradient-to-br hover:from-accent hover:to-[#00d4ff] hover:text-bg-primary hover:border-transparent'
              }`}>
                Choose {plan.tier_display}
              </button>
            </div>
          ))}
        </div>

        {/* Top 10 Requested Projects */}
        <div className="mb-24">
          <div className="text-center mb-12 animate-fadeInUp">
            <span className="inline-block px-5 py-2 bg-[rgba(100,255,218,0.1)] border border-[rgba(100,255,218,0.3)] rounded-[20px] text-accent text-sm font-semibold uppercase tracking-[0.1em] mb-4">
              Client Favorites
            </span>
            <h3 className="text-4xl font-bold bg-gradient-to-br from-[#e6f1ff] to-accent bg-clip-text text-transparent">Top 10 Most Requested Projects</h3>
            <p className="text-text-secondary mt-6 max-w-2xl mx-auto text-lg">
              Are you looking for a standard solution? Here are the platforms our clients bring to us most frequently, complete with approximate baseline prices to help you start budgeting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {popularProjects.map((project, index) => (
              <div key={project.id || index} className="p-8 bg-[rgba(17,34,64,0.6)] backdrop-blur-xl border border-[rgba(100,255,218,0.15)] rounded-2xl hover:border-accent hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors leading-tight pr-4">{project.name}</h4>
                    <span className="px-3 py-1.5 bg-[rgba(100,255,218,0.05)] border border-[rgba(100,255,218,0.2)] text-accent text-sm font-mono rounded-lg whitespace-nowrap tracking-wide">
                      {project.approximate_price}
                    </span>
                  </div>
                  <p className="text-text-secondary text-base leading-relaxed">{project.description}</p>
                </div>
                <div className="mt-8 pt-5 border-t border-[rgba(100,255,218,0.1)]">
                   <Link href="/contact" className="text-accent text-[0.9375rem] font-semibold flex items-center gap-2 hover:gap-3 transition-all tracking-wide uppercase">
                      Request this build <ArrowRight size={16} />
                   </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">Detailed Feature Comparison</h3>
          <div className="bg-[rgba(17,34,64,0.6)] backdrop-blur-xl border border-[rgba(100,255,218,0.2)] rounded-[20px] p-8 overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="p-6 bg-[rgba(100,255,218,0.05)] text-text-primary text-left border-b-2 border-[rgba(100,255,218,0.2)] rounded-tl-xl text-lg">Feature</th>
                  <th className="p-6 bg-[rgba(100,255,218,0.05)] text-text-primary text-left border-b-2 border-[rgba(100,255,218,0.2)] text-lg">Basic</th>
                  <th className="p-6 bg-[rgba(100,255,218,0.05)] text-text-primary text-left border-b-2 border-[rgba(100,255,218,0.2)] text-lg">Standard</th>
                  <th className="p-6 bg-[rgba(100,255,218,0.05)] text-text-primary text-left border-b-2 border-[rgba(100,255,218,0.2)] rounded-tr-xl text-lg">Premium</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-[rgba(100,255,218,0.1)] hover:bg-[rgba(100,255,218,0.03)] transition-colors">
                  <td className="p-5 font-semibold text-text-primary">Pages</td>
                  <td className="p-5">1-3</td>
                  <td className="p-5">5-10</td>
                  <td className="p-5">Unlimited</td>
                </tr>
                {/* ... other rows ... */}
                <tr className="border-b border-[rgba(100,255,218,0.1)] hover:bg-[rgba(100,255,218,0.03)] transition-colors">
                  <td className="p-5 font-semibold text-text-primary">Responsive Design</td>
                  <td className="p-5"><Check size={20} className="text-[#10b981]" /></td>
                  <td className="p-5"><Check size={20} className="text-[#10b981]" /></td>
                  <td className="p-5"><Check size={20} className="text-[#10b981]" /></td>
                </tr>
                {/* ... omitted for brevity ... */}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-24 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className={`faq-item bg-[rgba(17,34,64,0.6)] backdrop-blur-xl border border-[rgba(100,255,218,0.2)] rounded-2xl overflow-hidden transition-all duration-300 ${
                  openFaqIndex === index ? 'border-accent shadow-[0_4px_16px_rgba(100,255,218,0.2)]' : 'hover:border-[rgba(100,255,218,0.4)]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="faq-question w-full flex justify-between items-center p-6 bg-transparent border-none text-text-primary text-lg font-semibold text-left cursor-pointer hover:text-accent transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-accent transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-400 ease-in-out px-6 ${
                    openFaqIndex === index ? 'max-h-[500px] pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="faq-answer text-text-secondary leading-relaxed m-0">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Quote CTA */}
        <div className="text-center">
          <div className="max-w-[800px] mx-auto py-16 px-12 bg-[rgba(17,34,64,0.7)] backdrop-blur-xl border border-[rgba(100,255,218,0.2)] rounded-[24px] relative overflow-hidden group hover:border-accent transition-all duration-300">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(100,255,218,0.1),transparent_50%)] pointer-events-none"></div>
            
            <h3 className="text-[2rem] font-bold text-text-primary mb-4 relative z-10">Need Something Different?</h3>
            <p className="text-lg text-text-secondary leading-relaxed mb-8 relative z-10">
              Let's discuss your unique requirements and create a custom 
              solution that perfectly fits your needs and budget.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-accent to-[#00d4ff] text-[#0a192f] text-lg font-bold rounded-xl shadow-[0_4px_16px_rgba(100,255,218,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(100,255,218,0.4)] transition-all duration-300 relative z-10"
            >
              Request Custom Quote
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
