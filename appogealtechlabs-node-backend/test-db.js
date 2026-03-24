const admin = require('firebase-admin');
const path = require('path');
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccountPath) });
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore(admin.app(), 'default');

db.collection('test').add({ hello: 'world' })
  .then(() => { console.log('✅ Firestore works'); process.exit(0); })
  .catch(err => { console.error('❌ Firestore Error:', err.message); console.error(err); process.exit(1); });
