import { create } from 'zustand';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

let unsubscribeUser = null;

const useAuthStore = create((set) => ({
  user: null,
  isAdmin: false,
  loading: true,
  init: () => {
    onAuthStateChanged(auth, (user) => {
      // Clear previous listener if any
      if (unsubscribeUser) {
        unsubscribeUser();
        unsubscribeUser = null;
      }

      if (user) {
        // Use onSnapshot to immediately catch 'isAdmin' boolean changes from Firestore
        unsubscribeUser = onSnapshot(doc(db, 'users', user.uid), (userDoc) => {
          let isAdmin = false;
          let userData = null;

          if (userDoc.exists()) {
            userData = userDoc.data();
            // Explicitly check the isAdmin boolean from Firestore, or role
            isAdmin = userData?.isAdmin === true || String(userData?.isAdmin).toLowerCase() === 'true' || String(userData?.role).toLowerCase() === 'admin';
          }

          set({ 
            user, 
            userData,
            isAdmin,
            loading: false 
          });
        }, (err) => {
          console.error("Error fetching user data:", err);
          set({ user, userData: null, isAdmin: false, loading: false });
        });
      } else {
        set({ user: null, userData: null, isAdmin: false, loading: false });
      }
    });
  },
  logout: async () => {
    if (unsubscribeUser) {
      unsubscribeUser();
      unsubscribeUser = null;
    }
    await signOut(auth);
    set({ user: null, isAdmin: false, userData: null });
  }
}));

export default useAuthStore;
