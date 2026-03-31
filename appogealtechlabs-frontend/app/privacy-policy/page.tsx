import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
      <div className="mb-12 animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6">Privacy Policy</h1>
        <p className="text-text-secondary text-lg">Last updated: March 25, 2026</p>
      </div>

      <div className="prose prose-invert max-w-none text-text-secondary w-full space-y-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">1. Information We Collect</h2>
          <p className="leading-relaxed">
            We collect information you provide directly to us when you request a quote, subscribe to our newsletter, or communicate with us. This may include your name, email address, phone number, and any other details you choose to provide in your inquiries. Furthermore, when you visit our website, our servers automatically log standard data provided by your web browser, such as your IP address, browser type, and the pages you visit for analytics purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">2. How We Use Your Information</h2>
          <p className="leading-relaxed mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve our web development and consulting services.</li>
            <li>Communicate with you regarding your projects, inquiries, and customer support.</li>
            <li>Send you technical notices, security alerts, and administrative messages.</li>
            <li>Analyze website traffic and usage trends to improve our platform experience.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">3. Data Security & Retention</h2>
          <p className="leading-relaxed">
            We employ industry-standard security measures, including encryption and secure database configurations (such as Firebase and PostgreSQL), to protect your personal information from unauthorized access or disclosure. We retain your information only for as long as necessary to fulfill the purposes for which it was collected or as required by applicable laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">4. Your Data Rights</h2>
          <p className="leading-relaxed">
            Depending on your location, you may have the right to access, correct, or delete your personal data. You can also opt out of promotional communications at any time by clicking the unsubscribe link in our newsletter emails. If you wish to exercise any of these rights, please contact us at privacy@appogealtechlabs.com.
          </p>
        </section>

        <div className="mt-12 p-6 bg-accent/5 border border-accent/20 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
          <p className="text-sm font-medium">
            By using our website and services, you consent to our collection and use of information as described in this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
