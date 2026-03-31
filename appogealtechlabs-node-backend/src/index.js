require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// --- Middleware ---
app.use(cors({
  origin: ['http://localhost:3000', 'https://appogealtechlabs.com', 'https://www.appogealtechlabs.com'],
  credentials: true
}));
app.use(express.json());

// --- Routes ---
app.use('/api/blog', require('./routes/blog'));
app.use('/api/services', require('./routes/services'));
app.use('/api/accounts', require('./routes/accounts'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/faqs', require('./routes/faqs'));
app.use('/api/team', require('./routes/team'));
app.use('/api/popular-projects', require('./routes/popular_projects'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/calculator', require('./routes/calculator'));
app.use('/api/case-studies', require('./routes/case_studies'));
app.use('/api/tutorials', require('./routes/tutorials'));
app.use('/api/documentation', require('./routes/documentation'));

// --- Health Check ---
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// --- 404 Handler ---
app.use((req, res) => res.status(404).json({ error: 'Route not found.' }));

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error.' });
});

const PORT = process.env.PORT || 5000;

// When deployed on Vercel, we export the Express app for Serverless function support.
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
