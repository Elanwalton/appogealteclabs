const { db } = require('./src/config/firebase');

const teamMembers = [
  {
    name: "David Omondi",
    role: "Founder & CEO",
    bio: "Full-stack developer with 8+ years of experience building scalable web applications. Passionate about creating solutions that make a difference.",
    image: "/team/david-omondi.jpg",
    skills: ["Leadership", "Full Stack", "Strategy"],
    social: { linkedin: "https://linkedin.com/in/davidomondi", twitter: "https://twitter.com/davidomondi", github: "https://github.com/davidomondi" },
    order_index: 1, is_active: true, created_at: new Date().toISOString()
  },
  {
    name: "Sarah Njeri",
    role: "Lead UI/UX Designer",
    bio: "Award-winning designer specializing in creating intuitive and beautiful user experiences that users love.",
    image: "/team/sarah-njeri.jpg",
    skills: ["UI/UX Design", "Figma", "User Research"],
    social: { linkedin: "https://linkedin.com/in/sarahnjeri", twitter: "https://twitter.com/sarahnjeri" },
    order_index: 2, is_active: true, created_at: new Date().toISOString()
  },
  {
    name: "Michael Kamau",
    role: "Senior Backend Developer",
    bio: "Backend specialist with expertise in building robust APIs and optimizing database performance for high-traffic applications.",
    image: "/team/michael-kamau.jpg",
    skills: ["Django", "PostgreSQL", "API Design"],
    social: { linkedin: "https://linkedin.com/in/michaelkamau", github: "https://github.com/michaelkamau" },
    order_index: 3, is_active: true, created_at: new Date().toISOString()
  },
  {
    name: "Grace Wangari",
    role: "Frontend Developer",
    bio: "React enthusiast focused on building fast, accessible, and delightful user interfaces with modern web technologies.",
    image: "/team/grace-wangari.jpg",
    skills: ["React", "Next.js", "TypeScript"],
    social: { linkedin: "https://linkedin.com/in/gracewangari", github: "https://github.com/gracewangari" },
    order_index: 4, is_active: true, created_at: new Date().toISOString()
  },
  {
    name: "James Mwangi",
    role: "Mobile Developer",
    bio: "Cross-platform mobile developer creating seamless experiences for iOS and Android applications.",
    image: "/team/james-mwangi.jpg",
    skills: ["React Native", "Flutter", "Mobile UX"],
    social: { linkedin: "https://linkedin.com/in/jamesmwangi", github: "https://github.com/jamesmwangi" },
    order_index: 5, is_active: true, created_at: new Date().toISOString()
  },
  {
    name: "Linda Akinyi",
    role: "Project Manager",
    bio: "Experienced project manager ensuring smooth delivery and client satisfaction on every project.",
    image: "/team/linda-akinyi.jpg",
    skills: ["Agile", "Client Relations", "Delivery"],
    social: { linkedin: "https://linkedin.com/in/lindaakinyi", twitter: "https://twitter.com/lindaakinyi" },
    order_index: 6, is_active: true, created_at: new Date().toISOString()
  }
];

const faqs = [
  // General FAQs (for /faq)
  { question: 'What services does AppogealTechLabs offer?', answer: 'We specialize in custom web application development, mobile app development, UI/UX design, cloud infrastructure setup, and technical consulting.', category: 'general', order_index: 1, is_active: true, created_at: new Date().toISOString() },
  { question: 'How do you price your projects?', answer: 'Pricing is project-based. After an initial consultation to understand your requirements, we provide a detailed proposal with transparent pricing and milestones. You can use our cost calculator for an initial estimate.', category: 'general', order_index: 2, is_active: true, created_at: new Date().toISOString() },
  { question: 'How long does a typical build take?', answer: 'A standard web application typically takes 4-8 weeks from design to deployment, depending on complexity. Enterprise platforms can take 3-6 months.', category: 'general', order_index: 3, is_active: true, created_at: new Date().toISOString() },
  { question: 'Do you offer ongoing maintenance?', answer: 'Yes! We offer monthly retainer packages for priority support, security updates, server maintenance, and feature enhancements.', category: 'general', order_index: 4, is_active: true, created_at: new Date().toISOString() },
  { question: 'What is your technology stack?', answer: 'We primarily build with modern, scalable technologies including Next.js, React, Node.js, Python/Django, Firebase, PostgreSQL, and AWS/GCP cloud services.', category: 'general', order_index: 5, is_active: true, created_at: new Date().toISOString() },
  
  // Service-specific FAQs (for /services)
  { question: "What's included in the support period?", answer: "Support includes bug fixes, minor updates, technical assistance, and guidance on using your new platform. We're here to ensure your success!", category: 'services', order_index: 10, is_active: true, created_at: new Date().toISOString() },
  { question: "Can I upgrade my plan later?", answer: "Absolutely! You can upgrade to a higher tier at any time. We'll credit your previous payment toward the upgrade.", category: 'services', order_index: 11, is_active: true, created_at: new Date().toISOString() },
  { question: "Do you offer custom solutions?", answer: "Yes! If our standard plans don't fit your needs, we can create a custom quote tailored specifically to your requirements.", category: 'services', order_index: 12, is_active: true, created_at: new Date().toISOString() },
  { question: "What technologies do you use?", answer: "We primarily use Next.js for frontend, Django for backend, PostgreSQL for databases, and deploy on platforms like Vercel and Railway for optimal performance.", category: 'services', order_index: 13, is_active: true, created_at: new Date().toISOString() }
];

async function seedData() {
  try {
    console.log('Seeding team members...');
    const tBatch = db.batch();
    for (const member of teamMembers) {
      tBatch.set(db.collection('team_members').doc(), member);
    }
    await tBatch.commit();

    console.log('Seeding FAQs...');
    const fBatch = db.batch();
    for (const faq of faqs) {
      fBatch.set(db.collection('faqs').doc(), faq);
    }
    await fBatch.commit();

    console.log('✅ Successfully seeded Team and FAQs to Firestore.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed:', error);
    process.exit(1);
  }
}

seedData();
