const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin using the existing service account
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath)
  });
} catch (e) {
  // Ignore re-initialization error if running in an existing context, though normally fine here.
}

const email = process.argv[2];

if (!email) {
  console.error("❌ Please provide the user's email address.");
  console.error("Usage: node create-admin.js <your-email@example.com>");
  process.exit(1);
}

async function grantAdminAccess() {
  try {
    let user;
    try {
      // Try to find existing user
      user = await admin.auth().getUserByEmail(email);
      console.log(`Found existing user for ${email}...`);
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        // Create user with specific password
        console.log(`User not found. Creating new Firebase account for ${email}...`);
        user = await admin.auth().createUser({
          email: email,
          password: "walker.W$_x865",
          displayName: "Platform Admin",
          emailVerified: true
        });
        console.log(`✅ Created user account with your confirmed password!`);
      } else {
        throw e;
      }
    }
    
    // 2. Grant them the 'admin: true' custom JWT claim
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    
    console.log(`✅ Success! [${email}] has been granted Super Admin privileges.`);
    console.log(`You can now log in at http://localhost:3000/login`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error setting custom claims:", error.message);
    process.exit(1);
  }
}

grantAdminAccess();
