const admin = require('firebase-admin');
const path = require('path');
const { getFirestore } = require('firebase-admin/firestore');

// Path to your downloaded Firebase service account JSON key
const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

const db = getFirestore(admin.app(), 'default');
const auth = admin.auth();

module.exports = { admin, db, auth };
