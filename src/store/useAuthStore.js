import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const useAuthStore = create((set) => ({
  user: null,
  isAdmin: false,
  loading: true,
  init: () => {
    onAuthStateChanged(auth, (user) => {
      // Hardcode admin check for this specific email
      const isAdmin = user?.email === 'zenobianewworld@gmail.com';
      
      set({ 
        user, 
        isAdmin,
        loading: false 
      });
    });
  },
}));

export default useAuthStore;
