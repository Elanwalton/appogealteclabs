const { db } = require('./src/config/firebase');

const popularProjects = [
  { name: "E-Commerce multi-vendor Platform", description: "A scalable platform for multiple sellers to manage inventory, process payments, and ship goods.", approximate_price: "Ksh 150,000", order_index: 1 },
  { name: "School Management / ERP System", description: "Comprehensive system for student records, grading, fee collection, and parent-teacher portals.", approximate_price: "Ksh 250,000", order_index: 2 },
  { name: "Sacco / Microfinance Core Banking", description: "Secure platform handling deposits, lending, interest calculations, and member statements.", approximate_price: "Ksh 350,000", order_index: 3 },
  { name: "Hospital Management System", description: "Integrates patient records, pharmacy stock, billing, and doctor appointment scheduling.", approximate_price: "Ksh 300,000", order_index: 4 },
  { name: "Logistics & Fleet Management", description: "Real-time tracking of vehicles, fuel monitoring, dispatch routing, and driver management.", approximate_price: "Ksh 200,000", order_index: 5 },
  { name: "Real Estate Property Portal", description: "Platform for agents to list properties and buyers to filter homes, complete with maps integration.", approximate_price: "Ksh 120,000", order_index: 6 },
  { name: "Ride Hailing / Delivery App", description: "Mobile apps for drivers/riders with live GPS tracking, dynamic pricing, and mobile money.", approximate_price: "Ksh 450,000", order_index: 7 },
  { name: "Custom CRM & Lead Management", description: "Internal tool for sales teams to track funnels, automate outreach, and manage client relations.", approximate_price: "Ksh 180,000", order_index: 8 },
  { name: "Hotel Booking & Reservation Engine", description: "Direct booking engine with room availability calendars, payment gateway, and channel manager.", approximate_price: "Ksh 130,000", order_index: 9 },
  { name: "Digital Lending Mobile App", description: "Automated loan disbursement app with CRB integration, risk profiling, and M-Pesa payouts.", approximate_price: "Ksh 280,000", order_index: 10 }
];

async function seedPopularProjects() {
  try {
    console.log('Seeding top 10 popular projects...');
    const batch = db.batch();
    for (const project of popularProjects) {
      project.is_active = true;
      project.created_at = new Date().toISOString();
      batch.set(db.collection('popular_projects').doc(), project);
    }
    await batch.commit();

    console.log('✅ Successfully seeded Top 10 Popular Projects to Firestore.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed:', error);
    process.exit(1);
  }
}

seedPopularProjects();
