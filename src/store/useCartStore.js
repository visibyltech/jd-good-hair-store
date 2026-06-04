import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      _hydrated: false,
      isCartSidebarOpen: false, // For mini-cart sidebar

      setHydrated: () => set({ _hydrated: true }),
      
      toggleCartSidebar: (isOpen) => set({ isCartSidebarOpen: isOpen ?? !get().isCartSidebarOpen }),

      addToCart: (product, quantity = 1, paymentChoice = 'full', installments = 1, periodPayment = 0, paymentFrequency = 'monthly') => {
        let isNewItem = false;
        
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === product.id && item.paymentChoice === paymentChoice && item.installments === installments && item.paymentFrequency === paymentFrequency
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex] = {
              ...newItems[existingItemIndex],
              quantity: newItems[existingItemIndex].quantity + quantity
            };
            return { items: newItems };
          }

          isNewItem = true;
          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity,
                paymentChoice,
                installments,
                periodPayment,
                paymentFrequency,
                cartItemId: Math.random().toString(36).substr(2, 9)
              }
            ]
          };
        });

        // Outside set function to prevent double toasts in strict mode
        toast.success(isNewItem ? 'Added to cart' : 'Cart updated');
        // Open the mini-cart sidebar when an item is added
        set({ isCartSidebarOpen: true });
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId)
        }));
      },

      updateQuantity: (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
          )
        }));
      },

      clearCart: () => set({ items: [] }),

      unifyPaymentFrequency: (newFrequency) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.paymentChoice !== 'installment') return item;
            if (item.paymentFrequency === newFrequency) return item;
            
            let newPeriodPayment = item.periodPayment || item.monthlyPayment;
            if (newFrequency === 'weekly' && item.paymentFrequency === 'monthly') {
               newPeriodPayment = newPeriodPayment / 4;
            } else if (newFrequency === 'monthly' && item.paymentFrequency === 'weekly') {
               newPeriodPayment = newPeriodPayment * 4;
            }

            return {
              ...item,
              paymentFrequency: newFrequency,
              periodPayment: newPeriodPayment
            };
          })
        }));
      },

      // Computed properties (getters)
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getCartTotal: () => {
        return get().items.reduce((total, item) => {
          if (item.paymentChoice === 'full') {
            return total + (item.price * item.quantity);
          } else {
            const INTEREST = { 2: 5, 3: 10, 4: 10, 5: 20, 6: 20 };
            const rate = INTEREST[item.installments] / 100;
            const fullAmount = item.price * (1 + rate);
            return total + (fullAmount * item.quantity);
          }
        }, 0);
      },

      getInitialPaymentTotal: () => {
        return get().items.reduce((total, item) => {
          if (item.paymentChoice === 'full') {
            return total + (item.price * item.quantity);
          } else {
            return total + ((item.periodPayment || item.monthlyPayment || 0) * item.quantity);
          }
        }, 0);
      }
    }),
    {
      name: 'jd-good-hair-cart',
      partialize: (state) => ({ items: state.items }), // Only persist items, not _hydrated or isCartSidebarOpen
      onRehydrateStorage: () => (state) => {
        if (state) state.setHydrated();
      },
    }
  )
);

export default useCartStore;
