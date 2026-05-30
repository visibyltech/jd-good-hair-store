import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import Footer from '../components/Footer';
import ConfirmModal from '../components/ConfirmModal';
import toast from 'react-hot-toast';
import { initializeOrderTracking } from '../utils/orderTrackingService';
import { decreaseInventory } from '../utils/inventoryService';
import { createOrderPlacedNotification, createPaymentSuccessNotification } from '../utils/notificationService';
import { nigeriaData } from '../data/locations';

function fmt(n) {
  return '₦' + Math.ceil(n).toLocaleString('en-NG');
}

const INTEREST_RATES = { 2: 0, 3: 0.1, 4: 0.1, 5: 0.2, 6: 0.2 };

export default function Cart() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuthStore();
  const { items, _hydrated, removeFromCart, updateQuantity, getInitialPaymentTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState({ address: '', city: '', state: '', phone: '', instructions: '' });
  const [showPreview, setShowPreview] = useState(false);
  const [conflictDismissed, setConflictDismissed] = useState(false);
  const [splitMode, setSplitMode] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [expandedItems, setExpandedItems] = useState([]);
  const [itemGroups, setItemGroups] = useState({});

  useEffect(() => {
    if (user && isAdmin) {
      toast.error('Admin accounts cannot access the shopping cart');
      navigate('/');
    }
  }, [user, isAdmin, navigate]);


  const recalcPeriodPayment = (item, targetFreq, targetDur) => {
    const rate = INTEREST_RATES[targetDur] ?? 0.2;
    const fullAmount = item.price * (1 + rate);
    return targetFreq === 'weekly' ? fullAmount / (targetDur * 4) : fullAmount / targetDur;
  };

  const getPaymentSignature = (item) => item.paymentChoice === 'full' ? 'full' : `${item.paymentFrequency}-${item.installments}`;

  const getGroupConflicts = (groups) => {
    const conflicts = {};
    Object.entries(groups).forEach(([gId, groupItems]) => {
      const installmentSigs = groupItems.filter(i => i.paymentChoice !== 'full').map(i => getPaymentSignature(i));
      const uniqueSigs = new Set(installmentSigs);
      if (uniqueSigs.size > 1) conflicts[gId] = [...uniqueSigs];
    });
    return conflicts;
  };

  const buildGroupMap = (expItems) => expItems.reduce((acc, item) => {
    const gId = itemGroups[item.splitId] || 1;
    if (!acc[gId]) acc[gId] = [];
    acc[gId].push(item);
    return acc;
  }, {});

  const enterSplitMode = () => {
    const expanded = [];
    const sigToGroup = {};
    let groupCounter = 1;
    items.forEach(item => {
      const sig = getPaymentSignature(item);
      if (!sigToGroup[sig]) sigToGroup[sig] = groupCounter++;
      for (let i = 0; i < item.quantity; i++) {
        expanded.push({ ...item, quantity: 1, splitId: `${item.cartItemId}_${i}` });
      }
    });
    const newGroups = {};
    groupCounter = 1;
    expanded.forEach(unit => {
      const sig = getPaymentSignature(unit);
      if (!sigToGroup[sig]) sigToGroup[sig] = groupCounter++;
      newGroups[unit.splitId] = sigToGroup[sig];
    });
    setExpandedItems(expanded);
    setItemGroups(newGroups);
    setSplitMode(true);
  };

  const exitSplitMode = () => { setSplitMode(false); setExpandedItems([]); setItemGroups({}); };

  if (!_hydrated) {
    return (
      <main>
        <div className="container" style={{ padding: '6rem 1rem 4rem', minHeight: '60vh', textAlign: 'center' }}>
          <h1 style={{ marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>Your Cart</h1>
          <p style={{ color: 'var(--muted-fg)' }}>Loading cart...</p>
        </div>
        <Footer />
      </main>
    );
  }

  const totalToPayNow = getInitialPaymentTotal();

  const saveOrder = async (itemsToSave, paymentRef, splitPayment = false) => {
    const totalAmount = itemsToSave.reduce((acc, i) => acc + (i.paymentChoice === 'full' ? i.price * i.quantity : (i.price * (1 + (INTEREST_RATES[i.installments] ?? 0.2))) * i.quantity), 0);
    const amountPaid = itemsToSave.reduce((acc, i) => acc + (i.paymentChoice === 'full' ? i.price * i.quantity : (i.periodPayment || i.monthlyPayment || 0) * i.quantity), 0);
    
    for (const item of itemsToSave) {
      try {
        await decreaseInventory(item.id, Number(item.quantity));
      } catch (inventoryErr) {
        console.error('Error updating inventory for item:', item.id, inventoryErr);
      }
    }

    const orderRef = await addDoc(collection(db, "orders"), initializeOrderTracking({
      userId: user.uid,
      items: itemsToSave,
      deliveryInfo,
      totalAmount,
      amountPaid,
      status: 'Processing',
      paymentRef,
      createdAt: new Date(),
    }));

    try {
      await createOrderPlacedNotification(user.uid, orderRef.id, itemsToSave.length);
      await createPaymentSuccessNotification(user.uid, orderRef.id, amountPaid);
    } catch (notifErr) {
      console.error('Error creating notifications:', notifErr);
    }
  };

  const handleKorapayPayment = () => {
    const koraKey = import.meta.env.VITE_KORA_PUBLIC_KEY;
    if (!koraKey || !window.Korapay) {
      toast.error('Payment gateway is not configured properly.');
      return;
    }
    window.Korapay.initialize({
      key: koraKey,
      reference: `JD_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      amount: totalToPayNow,
      currency: 'NGN',
      customer: {
        name: user?.displayName || user?.email?.split('@')[0] || 'Customer',
        email: user?.email || ''
      },
      onSuccess: async (response) => {
        setLoading(true);
        try {
          if (splitMode) {
            const groups = buildGroupMap(expandedItems);
            for (const [gId, groupUnits] of Object.entries(groups)) {
              if (groupUnits.length === 0) continue;
              const merged = {};
              groupUnits.forEach(unit => {
                if (!merged[unit.cartItemId]) merged[unit.cartItemId] = { ...unit, quantity: 0 };
                merged[unit.cartItemId].quantity += 1;
              });
              const groupItems = Object.values(merged);
              await saveOrder(groupItems, response.reference || `JD_${Date.now()}_G${gId}`);
            }
          } else {
            await saveOrder(items, response.reference || `JD_${Date.now()}`);
          }
          clearCart();
          toast.success('Payment successful! Order placed.');
          setShowPreview(false);
          navigate('/profile');
        } catch (err) {
          console.error('Error saving order:', err);
          setError('Payment was successful but failed to save order. Please contact support.');
        } finally {
          setLoading(false);
        }
      },
      onFailed: (err) => {
        toast.error('Payment failed: ' + (err?.message || 'Please try again'));
        console.error('Korapay payment failed:', err);
      },
      onClose: () => console.log('Korapay widget closed')
    });
  };

  const handleRemoveConfirm = () => {
    if (itemToRemove) removeFromCart(itemToRemove.cartItemId);
    setItemToRemove(null);
    setShowRemoveConfirm(false);
  };

  if (items.length === 0) {
    return (
      <main>
        <div className="container" style={{ padding: '6rem 1rem 4rem', minHeight: '60vh', textAlign: 'center' }}>
          <h1 style={{ marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>Your Cart</h1>
          <div style={{ padding: '4rem', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--muted-fg)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Your shopping bag is empty.</p>
            <Link to="/products" className="buy-once-btn" style={{ display: 'inline-flex', textDecoration: 'none' }}>Continue Shopping</Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <>
      <main>
        <div className="container" style={{ padding: '4rem 1rem', minHeight: '60vh' }}>
          <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted-fg)', marginBottom: '2rem', textDecoration: 'none', fontWeight: '500' }}>
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
          <h1 style={{ marginBottom: '2rem', fontFamily: 'var(--font-display)', fontSize: '2rem' }}>Shopping Bag</h1>
          {error && <div style={{ color: 'red', background: '#fee2e2', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>{error}</div>}
          <div className="cart-layout">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {items.map((item) => (
                <div key={item.cartItemId} className="cart-item-card">
                  <img src={item.img} alt={item.name} loading="lazy" decoding="async" className="cart-item-img" />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{item.name}</h3>
                        <p style={{ color: 'var(--muted-fg)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Length: {item.length}</p>
                      </div>
                      <button onClick={() => { setItemToRemove(item); setShowRemoveConfirm(true); }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }} aria-label="Remove item">
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {item.paymentChoice === 'installment' ? (
                          items.filter(i => i.paymentChoice === 'installment').length > 1 ? (
                            <div style={{ color: '#1e40af', fontSize: '0.75rem', background: '#eff6ff', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #bfdbfe', maxWidth: '300px', lineHeight: '1.4' }}>
                              <span style={{ display: 'block', fontWeight: '700', marginBottom: '0.15rem' }}>ℹ️ Multiple Installment Items Detected</span>
                              Your installment payments will be combined into a single schedule and calculated together during order review.
                            </div>
                          ) : (
                            <div style={{ color: 'var(--muted-fg)', fontSize: '0.85rem', fontWeight: '500' }}>Installment: {item.paymentFrequency === 'weekly' ? item.installments * 4 + ' Weeks' : item.installments + ' Months'}</div>
                          )
                        ) : (
                          <div style={{ color: 'var(--muted-fg)', fontSize: '0.85rem', fontWeight: '500' }}>Full Payment</div>
                        )}
                        <div className="cart-qty-ctrl">
                          <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} style={{ background: 'none', border: 'none', padding: '0.25rem 0.75rem', cursor: 'pointer', fontSize: '1.2rem' }}>-</button>
                          <span style={{ fontWeight: '500' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} style={{ background: 'none', border: 'none', padding: '0.25rem 0.75rem', cursor: 'pointer', fontSize: '1.2rem' }}>+</button>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        {item.paymentChoice === 'installment' ? (
                          <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{fmt((item.periodPayment || item.monthlyPayment || 0) * item.quantity)} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--muted-fg)' }}>/ {item.paymentFrequency === 'weekly' ? 'wk' : 'mo'}</span></div>
                        ) : (
                          <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{fmt(item.price * item.quantity)}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)', position: 'sticky', top: '100px' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Delivery Information</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  <input type="text" placeholder="Full Address" value={deliveryInfo.address} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', outline: 'none' }} />
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 120px', display: 'flex', flexDirection: 'column' }}>
                      <select value={deliveryInfo.state} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, state: e.target.value, city: '' })} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', outline: 'none', appearance: 'auto' }}>
                        <option value="">Select State</option>
                        {(nigeriaData || []).map(s => <option key={s.state} value={s.state}>{s.state}</option>)}
                      </select>
                    </div>
                    <div style={{ flex: '1 1 120px', display: 'flex', flexDirection: 'column' }}>
                      <input type="text" list="lga-list" placeholder="Local Government Area (Select or Type)" value={deliveryInfo.city} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', outline: 'none' }} />
                      <datalist id="lga-list">
                        {((nigeriaData || []).find(s => s.state === deliveryInfo.state)?.lgas || []).map(lga => (
                          <option key={lga.name} value={lga.name} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                  <div>
                    <input type="tel" placeholder="WhatsApp Number (e.g. +234...)" value={deliveryInfo.phone} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', outline: 'none' }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted-fg)', marginTop: '0.25rem', display: 'block' }}>Required for WhatsApp delivery updates. Please include country code (+234).</span>
                  </div>
                  <textarea placeholder="Additional Instructions (Optional)" value={deliveryInfo.instructions} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, instructions: e.target.value })} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', outline: 'none', resize: 'vertical', minHeight: '80px' }}></textarea>
                </div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Order Summary</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--muted-fg)' }}>
                  <span>Subtotal ({items.reduce((a, b) => a + b.quantity, 0)} items)</span>
                  <span>{fmt(totalToPayNow)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--muted-fg)' }}>
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1.5rem 0', paddingTop: '1.5rem', borderTop: '1px dashed var(--border)', fontSize: '1.25rem', fontWeight: '700' }}>
                  <span>Total Due Today</span>
                  <span>{fmt(totalToPayNow)}</span>
                </div>
                {!user && (
                  <div style={{ background: '#fef3c7', color: '#92400e', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    You must be logged in to checkout.
                  </div>
                )}
                <button
                  onClick={() => {
                    if (!user) { navigate('/login'); return; }
                    if (items.length === 0) return;
                    if (!deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.state || !deliveryInfo.phone) {
                      toast.error('Please fill out all required delivery fields.');
                      setError('Please fill out all required delivery fields.');
                      return;
                    }
                    setError('');
                    setShowPreview(true);
                  }}
                  disabled={loading}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', background: 'var(--primary)', color: 'white', border: 'none', padding: '1rem', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
                >
                  Review & Confirm Order
                </button>
                <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--muted-fg)' }}>
                  Secure checkout powered by Korapay.
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        {/* Confirm Order Preview Modal */}
        {showPreview && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
            <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-display)', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>Confirm Your Order</h2>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--muted-fg)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Delivery Info</h3>
                <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>{deliveryInfo.address}</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--foreground)' }}>{deliveryInfo.city}, {deliveryInfo.state}</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--foreground)' }}>Phone: {deliveryInfo.phone}</p>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
                  <span style={{ color: '#92400e', fontWeight: '600', fontSize: '0.85rem' }}>⚠️ This will charge your card ₦{fmt(totalToPayNow)}</span>
                </div>
                {items.map(item => (
                  <div key={item.cartItemId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.95rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: '600' }}>{item.quantity}×</span>
                      <span>{item.name} <span style={{ fontSize: '0.8rem', color: 'var(--muted-fg)' }}>({item.paymentChoice === 'full' ? 'Full' : `${item.installments} ${item.paymentFrequency === 'weekly' ? 'Wks' : 'Mos'}`})</span></span>
                    </div>
                    <span style={{ fontWeight: '600' }}>{fmt((item.paymentChoice === 'full' ? item.price : item.periodPayment || item.monthlyPayment) * item.quantity)}</span>
                  </div>
                ))}
                <div style={{ marginBottom: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1rem', background: 'var(--muted)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    <span>Total Due Today</span>
                    <span style={{ color: 'var(--primary)' }}>{fmt(totalToPayNow)}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => setShowPreview(false)} disabled={loading}
                    style={{ flex: 1, padding: '0.85rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', color: 'var(--foreground)' }}>
                    Cancel
                  </button>
                  <button onClick={handleKorapayPayment} disabled={loading}
                    style={{ flex: 1, padding: '0.85rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    <CreditCard size={18} />
                    {loading ? 'Processing...' : 'Proceed to Pay'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Conflict Popup Modal */}
        {(() => {
          const uniqueSignatures = new Set(items.map(i => i.paymentChoice === 'full' ? 'full' : `${i.paymentChoice}-${i.paymentFrequency}-${i.installments}`)).size;
          const conflict = uniqueSignatures > 1;
          if (conflict && !conflictDismissed) {
            return (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
                <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: '700', color: '#92400e' }}>Multiple Payment Plans Detected</h3>
                      <p style={{ fontSize: '0.9rem', color: '#78350f', lineHeight: '1.5' }}>
                        Your cart contains a mix of different payment plans. During order review, you can choose to merge these into a single combined order, or split them into separate orders to maintain their distinct payment schedules.
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setConflictDismissed(true)} style={{ width: '100%', padding: '0.85rem', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                    I Understand
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })()}
      </main>

      <ConfirmModal
        isOpen={showRemoveConfirm}
        onClose={() => setShowRemoveConfirm(false)}
        onConfirm={handleRemoveConfirm}
        title="Remove Item"
        message={`Remove "${itemToRemove?.name}" from your cart?`}
        confirmLabel="Remove"
        cancelLabel="Cancel"
        danger
      />
    </>
  );
}