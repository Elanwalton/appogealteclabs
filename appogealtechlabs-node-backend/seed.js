const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { db } = require('./src/config/firebase');

// Path to Django database
const dbPath = path.join(__dirname, '../appogealtechlabs-backend/db.sqlite3');
const sqlite = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Error opening Django DB:', err);
    process.exit(1);
  }
});

const migrateTable = (tableName, firestoreCollection, processRow) => {
  return new Promise((resolve, reject) => {
    sqlite.all(`SELECT * FROM ${tableName}`, async (err, rows) => {
      if (err) {
        // Table might not exist, skip gracefully
        console.log(`Skipping ${tableName} (not found)`);
        return resolve();
      }
      
      console.log(`Migrating ${rows.length} rows from ${tableName} to ${firestoreCollection}...`);
      const batchSize = 400; // Firestore limits batches to 500
      let batch = db.batch();
      let count = 0;

      for (const row of rows) {
        let data = row;
        if (processRow) {
          data = await processRow(row);
        }
        
        const docRef = db.collection(firestoreCollection).doc(row.id.toString());
        batch.set(docRef, data);
        count++;

        if (count % batchSize === 0) {
          await batch.commit();
          batch = db.batch();
        }
      }

      if (count % batchSize !== 0) {
        await batch.commit();
      }

      console.log(`✅ Migrated ${tableName}`);
      resolve();
    });
  });
};

const runMigration = async () => {
  console.log('🚀 Starting SQLite to Firestore Migration...');

  // 1. Categories
  await migrateTable('blog_category', 'categories');

  // 2. Tags
  await migrateTable('blog_tag', 'tags');

  // 3. Posts (We need to resolve category/tag names/slugs but for simplicity we push raw data first, or we can fetch them)
  // Let's get categories and tags into memory
  const categoriesMap = {};
  await new Promise((resolve) => sqlite.all('SELECT id, slug, name FROM blog_category', (err, rows) => {
    if (!err) rows.forEach(r => categoriesMap[r.id] = r);
    resolve();
  }));

  const postTagsMap = {};
  await new Promise((resolve) => sqlite.all('SELECT post_id, tag_id FROM blog_post_tags', (err, rows) => {
    if (!err) {
      rows.forEach(r => {
        if (!postTagsMap[r.post_id]) postTagsMap[r.post_id] = [];
        postTagsMap[r.post_id].push(r.tag_id);
      });
    }
    resolve();
  }));

  await migrateTable('blog_post', 'posts', (row) => {
    const cat = categoriesMap[row.category_id];
    const tags = postTagsMap[row.id] || [];
    return {
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt || '',
      content: row.content,
      image: row.image || null,
      category_slug: cat ? cat.slug : null,
      category_name: cat ? cat.name : null,
      tags: tags, // just IDs for now, or we could look up slugs
      author_uid: 'admin', // placeholder
      featured: row.featured === 1,
      views: row.views || 0,
      read_time: row.read_time || 0,
      is_active: row.is_active === 1,
      published_at: row.published_at || new Date().toISOString(),
      updated_at: row.updated_at || new Date().toISOString()
    };
  });

  // 4. Services
  // Get packages
  const packagesMap = {};
  await new Promise((resolve) => sqlite.all('SELECT * FROM services_servicepackage', (err, rows) => {
    if (!err) {
      rows.forEach(r => {
        if (!packagesMap[r.service_id]) packagesMap[r.service_id] = [];
        packagesMap[r.service_id].push({
          tier: r.tier,
          price: r.price,
          timeline_days: r.timeline_days,
          description: r.description,
          features: JSON.parse(r.features || '[]'),
          is_popular: r.is_popular === 1
        });
      });
    }
    resolve();
  }));

  await migrateTable('services_service', 'services', (row) => ({
    name: row.name,
    slug: row.slug,
    description: row.description,
    icon: row.icon || '',
    packages: packagesMap[row.id] || [],
    is_active: row.is_active === 1,
    created_at: row.created_at || new Date().toISOString()
  }));

  // 5. Projects
  await migrateTable('projects_project', 'projects', (row) => ({
    title: row.title,
    slug: row.slug,
    description: row.description,
    image: row.image,
    tech_stack: row.tech_stack ? row.tech_stack.split(',') : [],
    live_url: row.live_url,
    repo_url: row.repo_url,
    featured: row.featured === 1,
    is_active: row.is_active === 1,
    created_at: row.created_at || new Date().toISOString()
  }));

  // 6. Testimonials
  await migrateTable('testimonials_testimonial', 'testimonials', (row) => ({
    client_name: row.client_name,
    client_title: row.client_title || '',
    client_company: row.client_company || '',
    content: row.content,
    rating: row.rating || 5,
    avatar: row.avatar,
    is_active: row.is_active === 1,
    created_at: row.created_at || new Date().toISOString()
  }));

  // 7. Newsletter
  await migrateTable('newsletter_subscriber', 'newsletter', (row) => ({
    email: row.email,
    subscribed_at: row.subscribed_at || new Date().toISOString(),
    is_active: row.is_active === 1
  }));

  // 8. Inquiries
  await migrateTable('inquiries_inquiry', 'inquiries', (row) => ({
    name: row.name,
    email: row.email,
    phone: row.phone,
    service: row.service,
    message: row.message,
    is_read: row.is_read === 1,
    submitted_at: row.submitted_at || new Date().toISOString()
  }));

  // 9. Calculator
  await migrateTable('calculator_calculatoroption', 'calculator_options', (row) => ({
    category: row.category,
    name: row.name,
    label: row.label,
    price: row.price,
    description: row.description,
    icon: row.icon,
    is_active: row.is_active === 1,
    created_at: row.created_at || new Date().toISOString()
  }));

  console.log('🎉 Migration Complete!');
  sqlite.close();
  process.exit(0);
};

runMigration().catch(console.error);
