/**
 * Firebase Firestore Import Script
 * 
 * INSTRUCTIONS:
 * 1. Create a NEW Firebase project at https://console.firebase.google.com/
 * 2. In the new project, go to:
 *    Project Settings → Service Accounts → Generate new private key
 * 3. Save the downloaded JSON as "newServiceAccount.json" in this folder
 * 4. Run: node import-firebase.js
 *
 * This will copy all your products, users, etc. into the new project.
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Load NEW project service account ---
let newServiceAccount;
try {
  newServiceAccount = JSON.parse(readFileSync(join(__dirname, 'newServiceAccount.json'), 'utf8'));
  console.log(`\n🎯 Target project: ${newServiceAccount.project_id}`);
} catch {
  console.error('\n❌ newServiceAccount.json not found!');
  console.error('   1. Create a new Firebase project at https://console.firebase.google.com/');
  console.error('   2. Go to: Project Settings → Service Accounts → Generate new private key');
  console.error('   3. Save the file as newServiceAccount.json in this folder\n');
  process.exit(1);
}

// --- Find the latest export file ---
let exportFile;
try {
  const files = readdirSync(__dirname).filter(f => f.startsWith('firebase-export-') && f.endsWith('.json'));
  if (files.length === 0) throw new Error('No export file found');
  // Use the most recent export
  exportFile = files.sort().reverse()[0];
  console.log(`📂 Using export file: ${exportFile}`);
} catch {
  console.error('\n❌ No firebase-export-*.json file found!');
  console.error('   Run "node export-firebase.js" first to create an export.\n');
  process.exit(1);
}

// --- Load export data ---
const exportData = JSON.parse(readFileSync(join(__dirname, exportFile), 'utf8'));

// --- Init Firebase Admin for NEW project ---
const newApp = initializeApp({ credential: cert(newServiceAccount) }, 'new-project');
const newDb = getFirestore(newApp);

async function importCollection(collectionName, docs) {
  const docIds = Object.keys(docs);
  if (docIds.length === 0) {
    console.log(`  ⏭️  "${collectionName}" — empty, skipping`);
    return;
  }

  console.log(`  📥 Importing "${collectionName}" (${docIds.length} docs)...`);

  // Firestore batch writes are limited to 500 operations each
  const BATCH_SIZE = 400;
  let count = 0;

  for (let i = 0; i < docIds.length; i += BATCH_SIZE) {
    const batch = newDb.batch();
    const chunk = docIds.slice(i, i + BATCH_SIZE);

    for (const docId of chunk) {
      const data = docs[docId];
      // Preserve original document IDs
      const ref = newDb.collection(collectionName).doc(docId);
      batch.set(ref, data);
      count++;
    }

    await batch.commit();
  }

  console.log(`     ✅ ${count} documents imported`);
}

async function main() {
  console.log('\n🔥 Firebase Firestore Import\n');
  console.log(`Source: ${exportData.project} (exported at ${exportData.exportedAt})`);
  console.log(`Target: ${newServiceAccount.project_id}`);
  console.log('\nStarting import...\n');

  const collections = exportData.collections;
  let totalDocs = 0;

  for (const [collectionName, docs] of Object.entries(collections)) {
    if (docs.error) {
      console.log(`  ⚠️  "${collectionName}" had an export error — skipping`);
      continue;
    }
    try {
      await importCollection(collectionName, docs);
      totalDocs += Object.keys(docs).length;
    } catch (err) {
      console.error(`  ❌ Failed to import "${collectionName}": ${err.message}`);
    }
  }

  console.log(`\n✅ Import complete! ${totalDocs} total documents written to "${newServiceAccount.project_id}"\n`);
  console.log('🔧 Next steps:');
  console.log('   1. Update src/firebase.js with the new project config');
  console.log('   2. Enable Email/Password auth in the new Firebase Console');
  console.log('   3. Set Firestore security rules in the new project\n');
}

main().catch((err) => {
  console.error('\n❌ Import failed:', err.message);
  process.exit(1);
});
