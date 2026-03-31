'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Smartphone, 
  Monitor, 
  ShoppingCart, 
  Briefcase, 
  Database,
  Shield,
  Search,
  Zap,
  Layout,
  PenTool,
  ArrowRight,
  RefreshCw,
  Globe,
  Cpu,
  Users,
  CreditCard,
  LayoutDashboard,
  Server,
  MessageSquare,
  BarChart,
  Languages
} from 'lucide-react';
import api, { endpoints } from '@/lib/api';

// Icon mapping
const iconMap: { [key: string]: any } = {
  'Monitor': Monitor,
  'Smartphone': Smartphone,
  'ShoppingCart': ShoppingCart,
  'Briefcase': Briefcase,
  'Globe': Globe,
  'Cpu': Cpu,
  'Shield': Shield,
  'Database': Database,
  'Search': Search,
  'Zap': Zap,
  'PenTool': PenTool,
  'Users': Users,
  'CreditCard': CreditCard,
  'LayoutDashboard': LayoutDashboard,
  'Server': Server,
  'MessageSquare': MessageSquare,
  'BarChart': BarChart,
  'Languages': Languages,
  'Layout': Layout
};

interface CostOption {
  id: number;
  category: 'type' | 'feature';
  name: string;
  label: string;
  price: string;
  description: string;
  icon: string;
}

export default function CostCalculator() {
  const [projectTypes, setProjectTypes] = useState<CostOption[]>([]);
  const [features, setFeatures] = useState<CostOption[]>([]);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await api.get(endpoints.calculator);
        let data = response.data;
        let types: CostOption[] = [];
        let feats: CostOption[] = [];
        
        if (Array.isArray(data)) {
          types = data.filter(o => o.category === 'type');
          feats = data.filter(o => o.category === 'feature');
        } else if (data && data.type) {
          types = data.type || [];
          feats = data.feature || [];
        }

        // Fallback to elegant mock data if the Firestore DB is currently empty
        // so the frontend component still looks and functions perfectly out of the box.
        if (types.length === 0) {
          types = [
            { id: 1, category: 'type', name: 'landing', label: 'Landing Page', price: '999', description: 'Single page funnel', icon: 'Layout' },
            { id: 2, category: 'type', name: 'ecommerce', label: 'E-Commerce Store', price: '2999', description: 'Digital storefront', icon: 'ShoppingCart' },
            { id: 3, category: 'type', name: 'webapp', label: 'Custom Web App', price: '4999', description: 'SaaS or internal tool', icon: 'Database' },
            { id: 4, category: 'type', name: 'mobile', label: 'Mobile App', price: '6999', description: 'iOS and Android app', icon: 'Smartphone' }
          ] as any;
        }
        if (feats.length === 0) {
          feats = [
            { id: 10, category: 'feature', name: 'auth', label: 'User Auth & Profiles', price: '499', description: '', icon: 'Users' },
            { id: 11, category: 'feature', name: 'payments', label: 'Payment Gateway', price: '799', description: '', icon: 'CreditCard' },
            { id: 12, category: 'feature', name: 'cms', label: 'Custom CMS Admin', price: '1299', description: '', icon: 'LayoutDashboard' },
            { id: 13, category: 'feature', name: 'seo', label: 'Advanced SEO Setup', price: '399', description: '', icon: 'Search' },
            { id: 14, category: 'feature', name: 'lang', label: 'Multi-language (i18n)', price: '699', description: '', icon: 'Languages' },
            { id: 15, category: 'feature', name: 'chat', label: 'Live Chat Integration', price: '299', description: '', icon: 'MessageSquare' }
          ] as any;
        }

        setProjectTypes(types);
        setFeatures(feats);
      } catch (error) {
        console.error('Failed to fetch calculator options:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const toggleFeature = (id: number) => {
    setSelectedFeatures(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id) 
        : [...prev, id]
    );
  };

  const calculateTotal = () => {
    let total = 0;
    if (selectedType) {
      const typeOption = projectTypes.find(t => t.id === selectedType);
      total += parseFloat(typeOption?.price || '0');
    }
    
    selectedFeatures.forEach(fid => {
      const feature = features.find(f => f.id === fid);
      total += parseFloat(feature?.price || '0');
    });

    return total;
  };

  const reset = () => {
    setSelectedType(null);
    setSelectedFeatures([]);
  };

  const total = calculateTotal();

  return (
    <div className="bg-bg-secondary rounded-2xl border border-[rgba(100,255,218,0.1)] overflow-hidden shadow-2xl">
      <div className="p-8 border-b border-[rgba(100,255,218,0.1)] bg-bg-primary/50">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent mb-2">
          Project Cost Estimator
        </h2>
        <p className="text-text-secondary">
          Select your project type and features to get an instant estimated range.
        </p>
      </div>

      <div className="p-8 space-y-10">
        
        {/* Step 1: Project Type */}
        <section>
          <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">1</span>
            Select Project Type
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
               [...Array(4)].map((_, i) => (
                 <div key={i} className="h-40 animate-pulse bg-bg-primary rounded-xl"></div>
               ))
            ) : projectTypes.map((type) => {
              const Icon = iconMap[type.icon] || Globe;
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`relative p-6 rounded-xl border text-left transition-all duration-300 group ${
                    isSelected 
                      ? 'bg-accent/10 border-accent shadow-[0_0_20px_rgba(100,255,218,0.1)]' 
                      : 'bg-bg-primary border-transparent hover:border-gray-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                    isSelected ? 'bg-accent text-bg-primary' : 'bg-gray-800 text-text-muted group-hover:text-text-primary'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <h4 className={`font-semibold text-lg mb-1 ${isSelected ? 'text-accent' : 'text-text-primary'}`}>
                    {type.label}
                  </h4>
                  <p className="text-sm text-text-secondary">Starting from Ksh {parseFloat(type.price).toLocaleString()}</p>
                  
                  {isSelected && (
                    <motion.div 
                      layoutId="check"
                      className="absolute top-4 right-4 text-accent"
                    >
                      <Check size={20} />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2: Features */}
        <section>
          <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">2</span>
            Add Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
               [...Array(6)].map((_, i) => (
                 <div key={i} className="h-20 animate-pulse bg-bg-primary rounded-xl"></div>
               ))
            ) : features.map((feature) => {
              const Icon = iconMap[feature.icon] || Zap;
              const isSelected = selectedFeatures.includes(feature.id);
              return (
                <button
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left ${
                    isSelected 
                      ? 'bg-accent/5 border-accent/50' 
                      : 'bg-bg-primary border-transparent hover:border-gray-700'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-accent/20 text-accent' : 'bg-gray-800 text-text-muted'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">{feature.label}</div>
                    <div className="text-sm text-accent">+Ksh {parseFloat(feature.price).toLocaleString()}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Total & CTA */}
        <div className="mt-12 pt-8 border-t border-[rgba(100,255,218,0.1)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="text-text-secondary mb-1">Estimated Cost Range</div>
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#00d4ff]">
                Ksh {total.toLocaleString()} - Ksh {(total * 1.2).toLocaleString()}
              </div>
              <p className="text-sm text-text-muted mt-2">*Final quote may vary based on exact requirements</p>
            </div>

            <div className="flex gap-4">
               <button 
                onClick={reset}
                className="px-6 py-4 rounded-xl border border-gray-700 text-text-secondary hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <RefreshCw size={18} />
                Reset
              </button>
              <Link
                href="/contact"
                className="px-8 py-4 bg-accent text-bg-primary font-bold rounded-xl hover:bg-[#00e5c0] transition-colors flex items-center gap-2 shadow-[0_4px_16px_rgba(100,255,218,0.3)]"
              >
                Request Quote
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
