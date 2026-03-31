const { db } = require('./src/config/firebase');

const testimonials = [
  {
    client_name: "David Kimani",
    client_title: "CEO",
    client_company: "TechFlow Solutions",
    avatar: "/testimonials/david-kimani.jpg",
    rating: 5,
    content: "Appogealtechlabs transformed our outdated system into a modern, efficient platform. Their attention to detail and technical expertise exceeded our expectations. The team delivered on time and within budget.",
    project: "Custom ERP System",
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    client_name: "Sarah Wanjiku",
    client_title: "Founder & Director",
    client_company: "Bloom Fashion Kenya",
    avatar: "/testimonials/sarah-wanjiku.jpg",
    rating: 5,
    content: "Working with Appogealtechlabs was a game-changer for our e-commerce business. They built a beautiful, fast, and user-friendly platform that increased our sales by 250% in just three months. Highly recommended!",
    project: "E-commerce Platform",
    is_active: true,
    created_at: new Date(Date.now() - 1000).toISOString()
  },
  {
    client_name: "Michael Odhiambo",
    client_title: "CTO",
    client_company: "FinEdge Analytics",
    avatar: "/testimonials/michael-odhiambo.jpg",
    rating: 5,
    content: "The level of professionalism and technical knowledge was outstanding. They not only built what we asked for but suggested improvements that made our product even better. True partners in innovation.",
    project: "Financial Dashboard",
    is_active: true,
    created_at: new Date(Date.now() - 2000).toISOString()
  },
  {
    client_name: "Grace Mutua",
    client_title: "Marketing Director",
    client_company: "Urban Living Properties",
    avatar: "/testimonials/grace-mutua.jpg",
    rating: 5,
    content: "Our new website is absolutely stunning! The design is modern, the functionality is seamless, and our clients love it. The team was responsive, creative, and delivered beyond expectations.",
    project: "Real Estate Website",
    is_active: true,
    created_at: new Date(Date.now() - 3000).toISOString()
  },
  {
    client_name: "James Mwangi",
    client_title: "Operations Manager",
    client_company: "Cargo Express East Africa",
    avatar: "/testimonials/james-mwangi.jpg",
    rating: 5,
    content: "The logistics platform they developed has streamlined our entire operation. Real-time tracking, automated reporting, and an intuitive interface - everything we needed and more. Exceptional work!",
    project: "Logistics Management System",
    is_active: true,
    created_at: new Date(Date.now() - 4000).toISOString()
  },
  {
    client_name: "Linda Achieng",
    client_title: "Head of Digital",
    client_company: "EduBright Academy",
    avatar: "/testimonials/linda-achieng.jpg",
    rating: 5,
    content: "Our internal management dashboard is now incredibly fast and intuitive. The team understood our vision perfectly and created a solution that our staff absolutely loves. Worth every shilling!",
    project: "Internal CRM Dashboard",
    is_active: true,
    created_at: new Date(Date.now() - 5000).toISOString()
  }
];

async function seedTestimonials() {
  try {
    console.log('Seeding ' + testimonials.length + ' testimonials to Firestore...');
    const batch = db.batch();
    for (const t of testimonials) {
      const ref = db.collection('testimonials').doc();
      batch.set(ref, t);
    }
    await batch.commit();
    console.log('✅ Successfully seeded testimonials to Firestore.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed:', error);
    process.exit(1);
  }
}

seedTestimonials();
