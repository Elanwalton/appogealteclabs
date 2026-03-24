import CostCalculator from '@/components/CostCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Cost Estimator | AppogealTechLabs',
  description: 'Estimate the cost of your web or mobile app project instantly with our interactive calculator.',
};

export default function CostCalculatorPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-wider text-sm uppercase mb-4 block">
            Transparent Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Estimate Your Project Investment
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Get a rough estimate for your upcoming project. Choose the features you need and see how they impact the timeline and budget.
          </p>
        </div>

        <CostCalculator />
      </div>
    </div>
  );
}
