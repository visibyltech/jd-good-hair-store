import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// NEW project config
const firebaseConfig = {
  apiKey: "AIzaSyCC4_WRP5Z0o7Z0upm0A5NvcfZR2ljz6O0",
  authDomain: "jd-good-hair-de68c.firebaseapp.com",
  projectId: "jd-good-hair-de68c",
  storageBucket: "jd-good-hair-de68c.firebasestorage.app",
  messagingSenderId: "35124256373",
  appId: "1:35124256373:web:cdba9712aeaa6819e9623c",
  measurementId: "G-8PSR8RDC55"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Find the latest export file ---
let exportFile;
try {
  const files = readdirSync(__dirname).filter(f => f.startsWith('firebase-export-') && f.endsWith('.json'));
  if (files.length === 0) throw new Error('No export file found');
  exportFile = files.sort().reverse()[0];
  console.log(`📂 Using export file: ${exportFile}`);
} catch {
  console.error('\n❌ No firebase-export-*.json file found!');
  process.exit(1);
}

const exportData = JSON.parse(readFileSync(join(__dirname, exportFile), 'utf8'));

async function importCollection(collectionName, docs) {
  const docIds = Object.keys(docs);
  if (docIds.length === 0) {
    console.log(`  ⏭️  "${collectionName}" — empty, skipping`);
    return 0;
  }

  console.log(`  📥 Importing "${collectionName}" (${docIds.length} docs)...`);
  let count = 0;

  for (const docId of docIds) {
    const data = docs[docId];
    
    // Convert timestamp objects back to native JS Dates so Firestore client handles them
    // (The export script exported them as {_seconds, _nanoseconds})
    const parsedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (value && typeof value === 'object' && '_seconds' in value && '_nanoseconds' in value) {
        return new Date(value._seconds * 1000 + value._nanoseconds / 1000000);
      }
      return value;
    });

    try {
      await setDoc(doc(db, collectionName, docId), parsedData);
      count++;
    } catch (err) {
      console.error(`     ❌ Failed to write doc ${docId}:`, err.message);
    }
  }

  console.log(`     ✅ ${count} documents imported`);
  return count;
}

async function main() {
  console.log('\n🔥 Firebase Client SDK Import\n');
  const collections = exportData.collections;
  let totalDocs = 0;

  for (const [collectionName, docs] of Object.entries(collections)) {
    if (docs.error) continue;
    totalDocs += await importCollection(collectionName, docs);
  }

  console.log(`\n✅ Import complete! ${totalDocs} total documents written.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('\n❌ Import failed:', err.message);
  process.exit(1);
});
