'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, X, Clock, ChevronDown, Rocket, Sparkles, Code, ArrowRight } from 'lucide-react';

const pricingPlans = [
  {
    tier: 'Basic',
    price: '50,000',
    description: 'Perfect for small projects and MVPs. Get your product to market quickly.',
    icon: <Code size={32} />,
    features: [
      { text: 'Single page application', included: true },
      { text: 'Responsive design', included: true },
      { text: 'Basic SEO optimization', included: true },
      { text: 'Contact form integration', included: true },
      { text: '1 month support', included: true },
      { text: 'Backend development', included: false },
      { text: 'Database integration', included: false },
      { text: 'Custom animations', included: false },
    ],
    delivery: '2-3 weeks',
    popular: false
  },
  {
    tier: 'Standard',
    price: '150,000',
    description: 'Ideal for growing businesses. Full-stack solution with backend integration.',
    icon: <Rocket size={32} />,
    features: [
      { text: 'Multi-page application', included: true },
      { text: 'Responsive & mobile-first', included: true },
      { text: 'Advanced SEO optimization', included: true },
      { text: 'Form & email integration', included: true },
      { text: '3 months support', included: true },
      { text: 'Backend development', included: true },
      { text: 'Database integration', included: true },
      { text: 'Custom animations', included: true },
      { text: 'Admin dashboard', included: true },
      { text: 'API development', included: true },
    ],
    delivery: '4-6 weeks',
    popular: true
  },
  {
    tier: 'Premium',
    price: '350,000',
    description: 'Enterprise-grade solution with advanced features and dedicated support.',
    icon: <Sparkles size={32} />,
    features: [
      { text: 'Complex web application', included: true },
      { text: 'Fully responsive design', included: true },
      { text: 'Enterprise SEO & analytics', included: true },
      { text: 'Advanced integrations', included: true },
      { text: '6 months priority support', included: true },
      { text: 'Full-stack development', included: true },
      { text: 'Multi-database support', included: true },
      { text: 'Advanced animations & 3D', included: true },
      { text: 'Custom admin panel', included: true },
      { text: 'RESTful API & webhooks', included: true },
      { text: 'Third-party integrations', included: true },
      { text: 'Performance optimization', included: true },
      { text: 'Security audit', included: true },
      { text: 'Deployment & hosting setup', included: true },
    ],
    delivery: '8-12 weeks',
    popular: false
  }
];

const faqItems = [
  {
    question: "What's included in the support period?",
    answer: "Support includes bug fixes, minor updates, technical assistance, and guidance on using your new platform. We're here to ensure your success!"
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Absolutely! You can upgrade to a higher tier at any time. We'll credit your previous payment toward the upgrade."
  },
  {
    question: "Do you offer custom solutions?",
    answer: "Yes! If our standard plans don't fit your needs, we can create a custom quote tailored specifically to your requirements."
  },
  {
    question: "What technologies do you use?",
    answer: "We primarily use Next.js for frontend, Django for backend, PostgreSQL for databases, and deploy on platforms like Vercel and Railway for optimal performance."
  }
];

export default function ServicesPage() {
  const [billingCycle, setBillingCycle] = useState<'one-time' | 'retainer'>('one-time');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen py-32 px-6 lg:px-8 relative bg-[linear-gradient(180deg,#112240_0%,#0a192f_50%,#112240_100%)]">
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
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-[rgba(17,34,64,0.7)] backdrop-blur-xl border border-[rgba(100,255,218,0.12)] rounded-[24px] p-10 transition-all duration-400 hover:-translate-y-2 hover:border-[rgba(100,255,218,0.3)] hover:shadow-[0_16px_56px_rgba(0,0,0,0.5),0_0_32px_rgba(100,255,218,0.2)] animate-fadeInScale ${
                plan.popular ? 'border-[rgba(100,255,218,0.4)] shadow-[0_12px_48px_rgba(0,0,0,0.4),0_0_40px_rgba(100,255,218,0.15)] scale-105 z-10 lg:-translate-y-4' : ''
              }`}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-[#00d4ff] opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${plan.popular ? 'opacity-100' : ''}`}></div>

              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-br from-accent to-[#00d4ff] text-bg-primary text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_4px_16px_rgba(100,255,218,0.4)]">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="flex flex-col items-center mb-8 relative">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(100,255,218,0.15),rgba(0,212,255,0.15))] border-2 border-[rgba(100,255,218,0.3)] text-accent mb-6">
                  {plan.icon}
                </div>
                <h3 className="text-[1.75rem] font-bold text-text-primary mb-0">{plan.tier}</h3>
              </div>

              {/* Price */}
              <div className="flex items-baseline justify-center mb-6">
                <span className="text-xl font-semibold text-text-secondary mr-1">KSh</span>
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#e6f1ff] to-accent">
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
                <span>Delivery: {plan.delivery}</span>
              </div>

              {/* CTA */}
              <button className={`w-full py-4 text-center rounded-xl font-bold text-base transition-all duration-300 ${
                  plan.popular 
                  ? 'bg-gradient-to-br from-accent to-[#00d4ff] text-bg-primary shadow-[0_4px_16px_rgba(100,255,218,0.3)] hover:shadow-[0_8px_32px_rgba(100,255,218,0.6)] hover:-translate-y-0.5'
                  : 'bg-[rgba(100,255,218,0.1)] text-accent border border-[rgba(100,255,218,0.3)] hover:bg-gradient-to-br hover:from-accent hover:to-[#00d4ff] hover:text-bg-primary hover:border-transparent'
              }`}>
                Choose {plan.tier}
              </button>
            </div>
          ))}
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
                <tr className="border-b border-[rgba(100,255,218,0.1)] hover:bg-[rgba(100,255,218,0.03)] transition-colors">
                  <td className="p-5 font-semibold text-text-primary">Responsive Design</td>
                  <td className="p-5"><Check size={20} className="text-[#10b981]" /></td>
                  <td className="p-5"><Check size={20} className="text-[#10b981]" /></td>
                  <td className="p-5"><Check size={20} className="text-[#10b981]" /></td>
                </tr>
                <tr className="border-b border-[rgba(100,255,218,0.1)] hover:bg-[rgba(100,255,218,0.03)] transition-colors">
                  <td className="p-5 font-semibold text-text-primary">Backend Development</td>
                  <td className="p-5"><X size={20} className="text-[#ef4444] opacity-50" /></td>
                  <td className="p-5"><Check size={20} className="text-[#10b981]" /></td>
                  <td className="p-5"><Check size={20} className="text-[#10b981]" /></td>
                </tr>
                <tr className="border-b border-[rgba(100,255,218,0.1)] hover:bg-[rgba(100,255,218,0.03)] transition-colors">
                  <td className="p-5 font-semibold text-text-primary">Database</td>
                  <td className="p-5"><X size={20} className="text-[#ef4444] opacity-50" /></td>
                  <td className="p-5">PostgreSQL</td>
                  <td className="p-5">PostgreSQL + Redis</td>
                </tr>
                <tr className="border-b border-[rgba(100,255,218,0.1)] hover:bg-[rgba(100,255,218,0.03)] transition-colors">
                  <td className="p-5 font-semibold text-text-primary">Admin Dashboard</td>
                  <td className="p-5"><X size={20} className="text-[#ef4444] opacity-50" /></td>
                  <td className="p-5">Basic</td>
                  <td className="p-5">Advanced</td>
                </tr>
                <tr className="border-b border-[rgba(100,255,218,0.1)] hover:bg-[rgba(100,255,218,0.03)] transition-colors">
                  <td className="p-5 font-semibold text-text-primary">Support Duration</td>
                  <td className="p-5">1 month</td>
                  <td className="p-5">3 months</td>
                  <td className="p-5">6 months</td>
                </tr>
                <tr className="border-b border-[rgba(100,255,218,0.1)] hover:bg-[rgba(100,255,218,0.03)] transition-colors">
                  <td className="p-5 font-semibold text-text-primary">Revisions</td>
                  <td className="p-5">2 rounds</td>
                  <td className="p-5">4 rounds</td>
                  <td className="p-5">Unlimited</td>
                </tr>
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
                className={`bg-[rgba(17,34,64,0.6)] backdrop-blur-xl border border-[rgba(100,255,218,0.2)] rounded-2xl overflow-hidden transition-all duration-300 ${
                  openFaqIndex === index ? 'border-accent shadow-[0_4px_16px_rgba(100,255,218,0.2)]' : 'hover:border-[rgba(100,255,218,0.4)]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 bg-transparent border-none text-text-primary text-lg font-semibold text-left cursor-pointer hover:text-accent transition-colors"
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
                  <p className="text-text-secondary leading-relaxed m-0">
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
