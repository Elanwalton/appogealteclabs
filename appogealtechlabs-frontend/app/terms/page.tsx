import React from 'react';

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
      <div className="mb-12 animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6">Terms of Service</h1>
        <p className="text-text-secondary text-lg">Effective Date: March 25, 2026</p>
      </div>

      <div className="prose prose-invert max-w-none text-text-secondary w-full space-y-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By accessing or using the website and services provided by AppogealTechLabs ("we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access our website or utilize our development and consulting services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">2. Scope of Services</h2>
          <p className="leading-relaxed">
            We provide custom software development, web design, cloud architecture setup, and related technical consulting services. The specific scope, deliverables, timeline, and pricing for any client project will be governed by a separate, mutually agreed-upon formal Statement of Work (SOW) or Service Agreement. Estimates provided via our website calculator are non-binding.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">3. Intellectual Property Rights</h2>
          <p className="leading-relaxed mb-4">
            Our intellectual property policy is structured as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Client Ownership:</strong> Upon full and final payment for custom development services, clients receive full ownership rights to the final deliverable code, unless otherwise specified in the project agreement.</li>
            <li><strong>Our IP:</strong> We retain all rights to pre-existing libraries, tools, and proprietary methodologies we utilize or incorporate into your project, granting you a perpetual license to use them within the scope of the final product.</li>
            <li><strong>Website Content:</strong> All text, graphics, logos, and designs on this website are the property of AppogealTechLabs and are protected by copyright laws.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">4. Limitation of Liability</h2>
          <p className="leading-relaxed">
            AppogealTechLabs provides our website "as is" and makes no warranties, expressed or implied. In no event shall we be liable for any indirect, incidental, special, or consequential damages—including loss of profits, revenue, data, or use—incurred by you or any third party arising from your access to, or use of, our website or services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">5. Governing Law</h2>
          <p className="leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or local courts located in Nairobi.
          </p>
        </section>
      </div>
    </div>
  );
}
