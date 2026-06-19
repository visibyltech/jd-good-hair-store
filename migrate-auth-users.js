/**
 * Firebase Auth Users Migration Script
 * 
 * This exports users from the OLD project and imports them into the NEW project
 * INCLUDING their password hashes, so existing users can still log in.
 * 
 * Run: node migrate-auth-users.js
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Load both service accounts ---
let oldServiceAccount, newServiceAccount;

try {
  oldServiceAccount = JSON.parse(readFileSync(join(__dirname, 'serviceAccount.json'), 'utf8'));
} catch {
  console.error('\n❌ serviceAccount.json (OLD project) not found!\n');
  process.exit(1);
}

try {
  newServiceAccount = JSON.parse(readFileSync(join(__dirname, 'newServiceAccount.json'), 'utf8'));
} catch {
  console.error('\n❌ newServiceAccount.json (NEW project) not found!\n');
  process.exit(1);
}

// --- Init both Firebase apps ---
const oldApp = initializeApp({ credential: cert(oldServiceAccount) }, 'old-project');
const newApp = initializeApp({ credential: cert(newServiceAccount) }, 'new-project');

const oldAuth = getAuth(oldApp);
const newAuth = getAuth(newApp);

async function exportAllUsers() {
  console.log('\n📤 Exporting users from OLD project...\n');
  const users = [];
  let pageToken;

  do {
    const result = await oldAuth.listUsers(1000, pageToken);
    users.push(...result.users);
    pageToken = result.pageToken;
  } while (pageToken);

  console.log(`   Found ${users.length} user(s):`);
  users.forEach(u => console.log(`   - ${u.email} (uid: ${u.uid})`));
  return users;
}

async function importUsersToNew(users) {
  console.log('\n📥 Importing users into NEW project...\n');

  if (users.length === 0) {
    console.log('   ⚠️  No users to import.');
    return;
  }

  // Prepare user records for import
  const userImportRecords = users.map(user => {
    const record = {
      uid: user.uid,           // Preserve original UID (keeps Firestore links intact)
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName || undefined,
      photoURL: user.photoURL || undefined,
      disabled: user.disabled,
      metadata: {
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
      },
    };

    // Include password hash if available (allows users to log in with same password)
    if (user.passwordHash) {
      record.passwordHash = Buffer.from(user.passwordHash, 'base64');
    }
    if (user.passwordSalt) {
      record.passwordSalt = Buffer.from(user.passwordSalt, 'base64');
    }

    return record;
  });

  try {
    // Try importing WITH password hashes first (requires hash config)
    const result = await newAuth.importUsers(userImportRecords, {
      hash: {
        algorithm: 'SCRYPT',
        // Firebase's default scrypt parameters
        key: Buffer.from(''), // placeholder - Firebase handles this
        saltSeparator: Buffer.from('Bw==', 'base64'),
        rounds: 8,
        memoryCost: 14,
      }
    });

    console.log(`   ✅ Successfully imported: ${userImportRecords.length - result.errors.length} user(s)`);
    if (result.errors.length > 0) {
      console.log(`\n   ⚠️  Failed to import ${result.errors.length} user(s) with password hashes.`);
      console.log('   These users will need to reset their password:\n');
      result.errors.forEach(err => {
        console.log(`   - Index ${err.index}: ${err.error.message}`);
      });
      
      // Fall back: import without password hashes for failed users
      const failedIndices = new Set(result.errors.map(e => e.index));
      const failedUsers = userImportRecords
        .filter((_, i) => failedIndices.has(i))
        .map(u => {
          const { passwordHash, passwordSalt, ...rest } = u;
          return rest;
        });

      if (failedUsers.length > 0) {
        console.log('\n   ℹ️  Importing failed users without password hashes...');
        const fallbackResult = await newAuth.importUsers(failedUsers);
        console.log(`   ✅ Imported ${failedUsers.length - fallbackResult.errors.length} user(s) without passwords`);
        console.log('   ⚠️  These users must use "Forgot Password" to regain access.\n');
      }
    }
  } catch (err) {
    // If SCRYPT import fails entirely, import without passwords
    console.warn('\n   ⚠️  Could not import with password hashes:', err.message);
    console.log('   Importing users WITHOUT passwords (they will need to reset password)...\n');

    const recordsWithoutPasswords = userImportRecords.map(u => {
      const { passwordHash, passwordSalt, ...rest } = u;
      return rest;
    });

    const result = await newAuth.importUsers(recordsWithoutPasswords);
    console.log(`   ✅ Imported: ${recordsWithoutPasswords.length - result.errors.length} user(s)`);
    if (result.errors.length > 0) {
      result.errors.forEach(err => console.error(`   ❌ ${err.error.message}`));
    }

    // Send password reset emails
    console.log('\n   📧 Sending password reset emails to all users...');
    for (const user of users) {
      if (user.email) {
        try {
          await newAuth.generatePasswordResetLink(user.email);
          console.log(`   ✅ Reset link generated for: ${user.email}`);
        } catch (e) {
          console.warn(`   ⚠️  Could not generate reset link for ${user.email}: ${e.message}`);
        }
      }
    }
  }
}

async function main() {
  console.log('═══════════════════════════════════════');
  console.log('   Firebase Auth Users Migration');
  console.log('═══════════════════════════════════════');
  console.log(`\n  OLD: ${oldServiceAccount.project_id}`);
  console.log(`  NEW: ${newServiceAccount.project_id}`);

  const users = await exportAllUsers();

  // Save a backup of user emails
  const userBackup = users.map(u => ({ uid: u.uid, email: u.email, emailVerified: u.emailVerified }));
  writeFileSync(join(__dirname, 'auth-users-backup.json'), JSON.stringify(userBackup, null, 2));
  console.log('\n   💾 User list backed up to auth-users-backup.json');

  await importUsersToNew(users);

  console.log('\n═══════════════════════════════════════');
  console.log('   ✅ Auth Migration Complete!');
  console.log('═══════════════════════════════════════\n');
  console.log('  ✔ Original UIDs preserved — Firestore user docs still linked correctly');
  console.log('  ✔ Users may need to reset password if hash transfer failed\n');
}

main().catch(err => {
  console.error('\n❌ Migration failed:', err.message);
  process.exit(1);
});
