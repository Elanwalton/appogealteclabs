const { db } = require('./src/config/firebase');

const calculatorOptions = [
  // Types
  { category: 'type', name: 'landing', label: 'Landing Page', price: 30000, description: 'Single page highly converting site', icon: '📄' },
  { category: 'type', name: 'corporate', label: 'Corporate Website', price: 50000, description: 'Multi-page professional business site', icon: '🏢' },
  { category: 'type', name: 'ecommerce', label: 'E-Commerce Platform', price: 100000, description: 'Online store with inventory & cart', icon: '🛒' },
  { category: 'type', name: 'webapp', label: 'Custom Web Application', price: 150000, description: 'Complex logic and user portals', icon: '💻' },
  { category: 'type', name: 'mobile', label: 'Mobile App (iOS/Android)', price: 200000, description: 'Native-like cross platform app', icon: '📱' },

  // Features
  { category: 'feature', name: 'auth', label: 'User Authentication', price: 15000, description: 'Login, Registration, Social Auth', icon: '🔐' },
  { category: 'feature', name: 'payment', label: 'Payment Gateway', price: 25000, description: 'M-Pesa, Stripe, PayPal Integration', icon: '💳' },
  { category: 'feature', name: 'cms', label: 'CMS / Admin Panel', price: 20000, description: 'Manage your own content easily', icon: '⚙️' },
  { category: 'feature', name: 'seo', label: 'Advanced SEO', price: 10000, description: 'Technical on-page optimization', icon: '🔍' },
  { category: 'feature', name: 'i18n', label: 'Multi-language (i18n)', price: 30000, description: 'Support for multiple languages', icon: '🌍' },
  { category: 'feature', name: 'analytics', label: 'Advanced Analytics', price: 40000, description: 'Custom dashboards and tracking', icon: '📊' },
  { category: 'feature', name: 'api', label: 'Third-party API Integrations', price: 35000, description: 'Connect with external services', icon: '🔌' }
];

async function seedCalculator() {
  try {
    console.log('Seeding calculator options...');
    
    // Clear existing
    const snapshot = await db.collection('calculator_options').get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    // Add new
    for (const opt of calculatorOptions) {
      opt.is_active = true;
      opt.created_at = new Date().toISOString();
      const ref = db.collection('calculator_options').doc();
      batch.set(ref, opt);
    }
    
    await batch.commit();
    console.log('✅ Successfully seeded Calculator Options to Firestore.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed:', error);
    process.exit(1);
  }
}

seedCalculator();
