import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
