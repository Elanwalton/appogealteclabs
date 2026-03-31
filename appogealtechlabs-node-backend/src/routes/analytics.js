const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const https = require('https');

const VISITS_DOC = 'site_analytics/visits';
const COUNTRIES_DOC = 'site_analytics/countries';

// Lightweight IP geolocation using the free ip-api.com (no key required)
function getCountryFromIp(ip) {
  return new Promise((resolve) => {
    // Skip private/local IPs
    if (!ip || ip === '::1' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return resolve('Local');
    }
    // Use the free ip-api.com JSON endpoint (2,500 free req/day)
    const url = `http://ip-api.com/json/${ip}?fields=country,countryCode`;
    require('http').get(url, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve(json.country || 'Unknown');
        } catch {
          resolve('Unknown');
        }
      });
    }).on('error', () => resolve('Unknown'));
  });
}

// POST /api/analytics/visit — Record a page visit (public)
router.post('/visit', async (req, res) => {
  try {
    const { page } = req.body;

    // Get real IP from proxy headers or socket
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress || '';
    const country = await getCountryFromIp(ip);

    // --- Update total visits + page breakdown ---
    const ref = db.doc(VISITS_DOC);
    const snap = await ref.get();
    const pageKey = (page || '/').replace(/\//g, '_').replace(/^_/, '') || 'home';

    if (!snap.exists) {
      await ref.set({ total: 1, pages: { [pageKey]: 1 }, updated_at: new Date().toISOString() });
    } else {
      const data = snap.data();
      await ref.update({
        total: (data.total || 0) + 1,
        [`pages.${pageKey}`]: (data.pages?.[pageKey] || 0) + 1,
        updated_at: new Date().toISOString(),
      });
    }

    // --- Update country breakdown ---
    const countryRef = db.doc(COUNTRIES_DOC);
    const countrySnap = await countryRef.get();
    const countryKey = (country || 'Unknown').replace(/[^a-zA-Z0-9 ]/g, '').trim() || 'Unknown';

    if (!countrySnap.exists) {
      await countryRef.set({ [countryKey]: 1, updated_at: new Date().toISOString() });
    } else {
      const cdata = countrySnap.data();
      await countryRef.update({
        [countryKey]: (cdata[countryKey] || 0) + 1,
        updated_at: new Date().toISOString(),
      });
    }

    res.json({ ok: true, country });
  } catch (error) {
    // Silently fail — never block page load for analytics
    res.json({ ok: false });
  }
});

// GET /api/analytics/stats — Get total visits (public)
router.get('/stats', async (req, res) => {
  try {
    const snap = await db.doc(VISITS_DOC).get();
    if (!snap.exists) return res.json({ total: 0, pages: {} });
    const { total, pages, updated_at } = snap.data();
    res.json({ total: total || 0, pages: pages || {}, updated_at });
  } catch (error) {
    res.json({ total: 0 });
  }
});

// GET /api/analytics/countries — Get country traffic breakdown (admin)
router.get('/countries', async (req, res) => {
  try {
    const snap = await db.doc(COUNTRIES_DOC).get();
    if (!snap.exists) return res.json([]);
    const data = snap.data();
    delete data.updated_at;
    const sorted = Object.entries(data)
      .map(([country, visits]) => ({ country, visits }))
      .sort((a, b) => b.visits - a.visits);
    res.json(sorted);
  } catch (error) {
    res.json([]);
  }
});

module.exports = router;
