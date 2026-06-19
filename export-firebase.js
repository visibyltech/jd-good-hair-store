/**
 * Firebase Firestore Full Export Script
 * 
 * INSTRUCTIONS:
 * 1. Download your service account key from Firebase Console:
 *    https://console.firebase.google.com/project/jd-good-hair/settings/serviceaccounts/adminsdk
 * 2. Save the downloaded JSON as "serviceAccount.json" in this folder
 * 3. Run: node export-firebase.js
 *
 * Output: firebase-export-<timestamp>.json in this folder
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Load service account ---
let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync(join(__dirname, 'serviceAccount.json'), 'utf8'));
} catch {
  console.error('\n❌ serviceAccount.json not found!');
  console.error('   Download it from: https://console.firebase.google.com/project/jd-good-hair/settings/serviceaccounts/adminsdk');
  console.error('   Save it as serviceAccount.json in this folder\n');
  process.exit(1);
}

// --- Init Firebase Admin ---
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// Collections to export (add more if you have others)
const COLLECTIONS = [
  'products',
  'users',
  'orders',
  'otp_codes',
  'notifications',
  'settings',
];

async function exportCollection(collectionName) {
  console.log(`  📦 Exporting "${collectionName}"...`);
  const snapshot = await db.collection(collectionName).get();

  if (snapshot.empty) {
    console.log(`     ⚠️  "${collectionName}" is empty or doesn't exist — skipping`);
    return {};
  }

  const docs = {};
  snapshot.forEach((doc) => {
    docs[doc.id] = doc.data();
  });

  console.log(`     ✅ ${snapshot.size} documents exported`);
  return docs;
}

async function main() {
  console.log('\n🔥 Firebase Firestore Export\n');
  console.log('Project: jd-good-hair');
  console.log('Starting export...\n');

  const exportData = {
    exportedAt: new Date().toISOString(),
    project: 'jd-good-hair',
    collections: {}
  };

  for (const col of COLLECTIONS) {
    try {
      exportData.collections[col] = await exportCollection(col);
    } catch (err) {
      console.warn(`  ⚠️  Failed to export "${col}": ${err.message}`);
      exportData.collections[col] = { error: err.message };
    }
  }

  const filename = `firebase-export-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  const outputPath = join(__dirname, filename);
  writeFileSync(outputPath, JSON.stringify(exportData, null, 2), 'utf8');

  console.log(`\n✅ Export complete!`);
  console.log(`📄 Saved to: ${outputPath}\n`);

  // Summary
  for (const [col, data] of Object.entries(exportData.collections)) {
    const count = Object.keys(data).length;
    console.log(`   ${col}: ${count} documents`);
  }
  console.log('');
}

main().catch((err) => {
  console.error('\n❌ Export failed:', err.message);
  process.exit(1);
});
