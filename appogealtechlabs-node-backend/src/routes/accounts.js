const express = require('express');
const router = express.Router();
const { auth, db } = require('../config/firebase');
const { authenticate, requireAdmin } = require('../middleware/auth');

// GET /api/accounts/me — Get current logged-in user's profile
router.get('/me', authenticate, async (req, res) => {
  try {
    const doc = await db.collection('users').doc(req.user.uid).get();
    if (!doc.exists) return res.status(404).json({ error: 'User profile not found.' });
    res.json({ uid: req.user.uid, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/accounts/users — List all users (Admin only)
router.get('/users', authenticate, requireAdmin, async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/accounts/users/:uid/role — Assign admin role (Admin only)
router.put('/users/:uid/role', authenticate, requireAdmin, async (req, res) => {
  try {
    const { role } = req.body; // e.g., { role: 'admin' }
    const isAdmin = role === 'admin';
    await auth.setCustomUserClaims(req.params.uid, { admin: isAdmin, role });
    await db.collection('users').doc(req.params.uid).update({ role, updated_at: new Date().toISOString() });
    res.json({ message: `User ${req.params.uid} role updated to ${role}.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/accounts/users/:uid (Admin only)
router.delete('/users/:uid', authenticate, requireAdmin, async (req, res) => {
  try {
    await auth.deleteUser(req.params.uid);
    await db.collection('users').doc(req.params.uid).delete();
    res.json({ message: 'User deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
