import { collection, addDoc, query, where, getDocs, updateDoc, doc, Timestamp, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import emailjs from '@emailjs/browser';

/**
 * OTP Service - Handles OTP generation, storage, and verification
 */

const OTP_COLLECTION = 'otp_codes';
const OTP_EXPIRATION_MINUTES = 10;

/**
 * Generate a random 6-digit OTP
 * @returns {string} 6-digit OTP
 */
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Hash OTP for secure storage using SHA-256
 * @param {string} otp - OTP to hash
 * @returns {Promise<string>} Hashed OTP
 */
export const hashOTP = async (otp) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(otp);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Verify OTP hash
 * @param {string} otp - Plain OTP
 * @param {string} hash - Hashed OTP
 * @returns {Promise<boolean>}
 */
export const verifyOTPHash = async (otp, hash) => {
  const computedHash = await hashOTP(otp);
  return computedHash === hash;
};

export const sendEmailViaEmailJS = async ({ email, otp, name, subject, order_id = '' }) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  console.log('[EmailJS] Attempting to send email to:', email);
  console.log('[EmailJS] Service ID:', serviceId, '| Template ID:', templateId, '| Public Key:', publicKey ? '✓ set' : '✗ MISSING');

  if (!serviceId || !templateId || !publicKey) {
    console.error('[EmailJS] ❌ Credentials missing from .env — did you restart the dev server after editing .env?');
    return false;
  }

  try {
    const templateParams = {
      email,
      otp,
      name,
      subject,
      order_id,
    };

    console.log('[EmailJS] Sending with params:', templateParams);
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log('[EmailJS] ✅ Email sent successfully! Status:', response.status, response.text);
    return response.status === 200;
  } catch (error) {
    console.error('[EmailJS] ❌ Failed to send email. Full error:', error);
    if (error?.text) console.error('[EmailJS] Error text:', error.text);
    return false;
  }
};

/**
 * Generate and store OTP for user registration/email verification
 * @param {string} email - User email
 * @param {string} type - OTP type ('registration' | 'password_reset' | 'email_verification')
 * @returns {Promise<string>} The generated OTP
 */
export const generateAndStoreOTP = async (email, type = 'registration', name = 'Customer') => {
  try {
    const otp = generateOTP();
    // For local development: print the OTP so the developer can log in
    console.log(`[DEV ONLY] Generated OTP for ${email}: %c${otp}`, 'font-size: 20px; font-weight: bold; color: #df4c89;');
    
    const hashedOTP = await hashOTP(otp);
    const expiresAt = Timestamp.fromDate(
      new Date(Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000)
    );

    await addDoc(collection(db, OTP_COLLECTION), {
      email,
      type,
      otp_hash: hashedOTP,
      created_at: Timestamp.now(),
      expires_at: expiresAt,
      verified: false,
      attempts: 0,
      max_attempts: 5
    });

    // Send email via EmailJS
    await sendEmailViaEmailJS({
      email: email,
      otp: otp,
      name: name,
      subject: 'Your OTP Code - JD Good Hair'
    });

    return otp;
  } catch (error) {
    console.error('Error generating OTP:', error);
    throw new Error('Failed to generate OTP');
  }
};

/**
 * Verify OTP for user
 * @param {string} email - User email
 * @param {string} otp - OTP to verify
 * @param {string} type - OTP type
 * @returns {Promise<boolean>}
 */
export const verifyOTP = async (email, otp, type = 'registration') => {
  try {
    const q = query(
      collection(db, OTP_COLLECTION),
      where('email', '==', email),
      where('type', '==', type),
      where('verified', '==', false)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error('No active OTP found for this email');
    }

    const otpDoc = snapshot.docs[0];
    const data = otpDoc.data();

    // Check if OTP has expired
    if (data.expires_at.toDate() < new Date()) {
      throw new Error('OTP has expired');
    }

    // Check max attempts
    if (data.attempts >= data.max_attempts) {
      await deleteDoc(otpDoc.ref);
      throw new Error('Maximum OTP attempts exceeded. Please request a new OTP');
    }

    // Verify OTP
    const isValid = await verifyOTPHash(otp, data.otp_hash);
    if (!isValid) {
      // Increment attempts
      await updateDoc(otpDoc.ref, {
        attempts: data.attempts + 1
      });
      throw new Error('Invalid OTP. Please try again');
    }

    // Mark as verified
    await updateDoc(otpDoc.ref, {
      verified: true,
      verified_at: Timestamp.now()
    });

    return true;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

/**
 * Generate OTP for delivery verification
 * @param {string} orderId - Order ID
 * @param {string} deliveryEmail - Delivery contact email
 * @returns {Promise<string>} Generated OTP
 */
export const generateDeliveryOTP = async (orderId, deliveryEmail) => {
  try {
    const otp = generateOTP();
    console.log(`[DEV ONLY] Generated Delivery OTP for Order ${orderId}: %c${otp}`, 'font-size: 20px; font-weight: bold; color: #df4c89;');
    
    const hashedOTP = await hashOTP(otp);
    const expiresAt = Timestamp.fromDate(
      new Date(Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000)
    );

    await addDoc(collection(db, OTP_COLLECTION), {
      order_id: orderId,
      email: deliveryEmail,
      type: 'delivery_verification',
      otp_hash: hashedOTP,
      created_at: Timestamp.now(),
      expires_at: expiresAt,
      verified: false,
      attempts: 0,
      max_attempts: 5
    });

    // Send the delivery confirmation email via EmailJS
    await sendEmailViaEmailJS({
      email: deliveryEmail,
      otp: otp,
      name: 'Customer',
      subject: `Delivery Confirmation Code for Order #${orderId}`,
      order_id: orderId
    });

    return otp;
  } catch (error) {
    console.error('Error generating delivery OTP:', error);
    throw new Error('Failed to generate delivery OTP');
  }
};

/**
 * Verify delivery OTP
 * @param {string} orderId - Order ID
 * @param {string} otp - OTP to verify
 * @returns {Promise<boolean>}
 */
export const verifyDeliveryOTP = async (orderId, otp) => {
  try {
    const q = query(
      collection(db, OTP_COLLECTION),
      where('order_id', '==', orderId),
      where('type', '==', 'delivery_verification'),
      where('verified', '==', false)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error('No active delivery OTP found for this order');
    }

    const otpDoc = snapshot.docs[0];
    const data = otpDoc.data();

    // Check if OTP has expired
    if (data.expires_at.toDate() < new Date()) {
      throw new Error('Delivery OTP has expired');
    }

    // Check max attempts
    if (data.attempts >= data.max_attempts) {
      await deleteDoc(otpDoc.ref);
      throw new Error('Maximum OTP attempts exceeded');
    }

    // Verify OTP
    const isValid = await verifyOTPHash(otp, data.otp_hash);
    if (!isValid) {
      await updateDoc(otpDoc.ref, {
        attempts: data.attempts + 1
      });
      throw new Error('Invalid OTP');
    }

    // Mark as verified
    await updateDoc(otpDoc.ref, {
      verified: true,
      verified_at: Timestamp.now()
    });

    return true;
  } catch (error) {
    console.error('Error verifying delivery OTP:', error);
    throw error;
  }
};

/**
 * Clean up expired OTPs
 * Should be run periodically (e.g., via Cloud Function)
 */
export const cleanupExpiredOTPs = async () => {
  try {
    const q = query(
      collection(db, OTP_COLLECTION),
      where('expires_at', '<', Timestamp.now())
    );

    const snapshot = await getDocs(q);
    const batch = [];

    snapshot.forEach((doc) => {
      batch.push(deleteDoc(doc.ref));
    });

    await Promise.all(batch);
    console.log(`Cleaned up ${batch.length} expired OTPs`);
  } catch (error) {
    console.error('Error cleaning up expired OTPs:', error);
  }
};

export default {
  generateOTP,
  generateAndStoreOTP,
  verifyOTP,
  generateDeliveryOTP,
  verifyDeliveryOTP,
  cleanupExpiredOTPs,
  OTP_EXPIRATION_MINUTES
};
