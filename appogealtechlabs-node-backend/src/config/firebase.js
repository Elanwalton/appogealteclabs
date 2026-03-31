const admin = require('firebase-admin');
const path = require('path');
const { getFirestore } = require('firebase-admin/firestore');

if (!admin.apps.length) {
  if (process.env.FIREBASE_PROJECT_ID) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace escaped literal \n with actual newline characters so Firebase can parse the key
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  } else {
    // Path to your downloaded Firebase service account JSON key (fallback for local dev without .env)
    const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
    });
  }
}

const db = getFirestore(admin.app(), 'default');
const auth = admin.auth();

module.exports = { admin, db, auth };
