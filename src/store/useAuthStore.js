import { create } from 'zustand';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const useAuthStore = create((set) => ({
  user: null,
  isAdmin: false,
  loading: true,
  init: () => {
    onAuthStateChanged(auth, async (user) => {
      let isAdmin = false;
      let userData = null;

      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            userData = userDoc.data();
            isAdmin = userData.role === 'admin';
          }
        } catch (err) {
          console.error("Error fetching user role:", err);
        }
      }
      
      set({ 
        user, 
        userData,
        isAdmin,
        loading: false 
      });
    });
  },
  logout: async () => {
    await signOut(auth);
    set({ user: null, isAdmin: false });
  }
}));

export default useAuthStore;
