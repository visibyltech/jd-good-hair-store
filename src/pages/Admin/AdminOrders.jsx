import { useState, useEffect } from 'react';
import {
  collection, doc, updateDoc, query, orderBy,
  getDoc, onSnapshot, getDocs
} from 'firebase/firestore';
import { db } from '../../firebase';
import {
  Package, CheckCircle, Clock, Bell, Users, AlertCircle,
  Search, ChevronDown, ChevronUp, SlidersHorizontal,
  Truck, Link as LinkIcon, Copy, X, UserCheck, Mail, Phone
} from 'lucide-react';
import { shipOrder } from '../../utils/orderTrackingService';

/* ─── Helpers ─────────────────────────────────────── */
function fmt(n) { return '₦' + Math.ceil(n).toLocaleString('en-NG'); }

const STATUS_COLORS = {
  Completed: { bg: '#dcfce7', color: '#15803d', dot: '#16a34a' },
  'Processing (Installments)': { bg: '#fef3c7', color: '#b45309', dot: '#d97706' },
  default: { bg: '#f1f5f9', color: '#475569', dot: '#94a3b8' },
};

const TRACKING_COLORS = {
  Delivered: { bg: '#f3e8ff', color: '#6d28d9' },
  Shipped:   { bg: '#dbeafe', color: '#1d4ed8' },
  default:   { bg: '#f1f5f9', color: '#475569' },
};

/* ─── Stat Card ────────────────────────────────────── */
function StatCard({ label, value, icon, accent }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '1.1rem 1.25rem',
      display: 'flex', alignItems: 'center', gap: '1rem',
      boxShadow: 'var(--shadow-card)',
    }}>
      <div style={{
        width: '44px', height: '44px', borderRadius: '50%',
        background: `${accent}18`, display: 'flex', alignItems: 'center',
        justifyContent: 'center', color: accent, flexShrink: 0,
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted-fg)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.2rem' }}>{label}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--foreground)', lineHeight: 1 }}>{value}</div>
      </div>
    </div>
  );
}

/* ─── Badge ────────────────────────────────────────── */
function Badge({ label, colors }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
      padding: '0.25rem 0.65rem', borderRadius: '9999px',
      fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
      background: colors.bg, color: colors.color, whiteSpace: 'nowrap',
    }}>{label}</span>
  );
}

/* ─── Main Component ───────────────────────────────── */
export default function AdminOrders() {
  const [tab, setTab] = useState('orders'); // 'orders' | 'users'
  const [orders, setOrders] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const [newlyCompleted, setNewlyCompleted] = useState(new Set());
  const [userCache, setUserCache] = useState({});
  const [selectedCustomerProfile, setSelectedCustomerProfile] = useState(null);

  /* Search / filter / sort */
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [expandedOrders, setExpandedOrders] = useState(new Set());

  /* Users search */
  const [userSearch, setUserSearch] = useState('');

  /* ── Orders listener ── */
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, async (snap) => {
      try {
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setOrders(data);
        const uids = [...new Set(data.map(o => o.userId).filter(Boolean))];
        const cache = { ...userCache };
        await Promise.all(uids.filter(u => !cache[u]).map(async uid => {
          try {
            const s = await getDoc(doc(db, 'users', uid));
            if (s.exists()) cache[uid] = s.data();
          } catch { /* skip */ }
        }));
        setUserCache(cache);
        setLoading(false);
      } catch (e) { console.error(e); setError('Failed to load orders'); setLoading(false); }
    }, (e) => {
      setError('Failed to fetch orders — check connection.');
      setLoading(false);
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Fetch registered users when tab is switched ── */
  useEffect(() => {
    if (tab !== 'users' || registeredUsers.length > 0) return;
    setUsersLoading(true);
    getDocs(collection(db, 'users')).then(snap => {
      setRegisteredUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setUsersLoading(false);
    }).catch(() => setUsersLoading(false));
  }, [tab, registeredUsers.length]);

  /* ── Handlers ── */
  const handleUpdateAmountPaid = async (orderId, newAmount, totalAmount) => {
    setUpdating(true);
    try {
      const updates = { amountPaid: Number(newAmount) };
      if (Number(newAmount) >= totalAmount) {
        updates.status = 'Completed';
        setNewlyCompleted(prev => new Set([...prev, orderId]));
      } else if (Number(newAmount) > 0) {
        updates.status = 'Processing (Installments)';
      }
      await updateDoc(doc(db, 'orders', orderId), updates);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, ...updates } : o));
    } catch { alert('Failed to update payment amount'); } finally { setUpdating(false); }
  };

  const handleShipOrder = async (orderId, email) => {
    if (!window.confirm('Mark this order as Shipped? A rider token will be generated.')) return;
    setUpdating(true);
    try {
      const { tracking_status, delivery_token } = await shipOrder(orderId, email);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, tracking_status, delivery_token } : o));
      toast?.success?.('Order shipped!') || alert('Order marked as Shipped!');
    } catch (e) { alert('Failed to ship: ' + e.message); } finally { setUpdating(false); }
  };

  const toggleExpand = (id) => setExpandedOrders(prev => {
    const s = new Set(prev);
    s.has(id) ? s.delete(id) : s.add(id);
    return s;
  });

  /* ── Derived data ── */
  const filteredOrders = orders.filter(o => {
    if (statusFilter === 'Completed' && o.status !== 'Completed') return false;
    if (statusFilter === 'Pending' && o.status === 'Completed') return false;
    if (searchTerm) {
      const t = searchTerm.toLowerCase();
      if (o.id.toLowerCase().includes(t)) return true;
      const u = userCache[o.userId];
      if (u) {
        if (`${u.firstName} ${u.lastName}`.toLowerCase().includes(t)) return true;
        if (u.email?.toLowerCase().includes(t)) return true;
        if (u.phone?.includes(t)) return true;
      }
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'newest') return (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0);
    if (sortBy === 'oldest') return (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0);
    if (sortBy === 'high') return b.totalAmount - a.totalAmount;
    if (sortBy === 'low') return a.totalAmount - b.totalAmount;
    return 0;
  });

  const filteredUsers = registeredUsers.filter(u => {
    if (!userSearch) return true;
    const t = userSearch.toLowerCase();
    return (
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(t) ||
      u.email?.toLowerCase().includes(t) ||
      u.phone?.includes(t)
    );
  });

  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  const pendingOrders = totalOrders - completedOrders;

  /* ── Styles ── */
  const inputStyle = {
    padding: '0.6rem 0.9rem', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', fontSize: '0.875rem',
    fontFamily: 'var(--font-body)', color: 'var(--foreground)',
    background: 'var(--background)', outline: 'none', width: '100%',
  };

  /* ── Loading / Error ── */
  if (loading) return (
    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--muted-fg)' }}>
      <Clock size={36} style={{ margin: '0 auto 1rem', display: 'block', color: 'var(--primary)', opacity: 0.6 }} />
      Loading orders…
    </div>
  );
  if (error) return (
    <div style={{ margin: '2rem', padding: '1rem 1.25rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius)', color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <AlertCircle size={18} /> {error}
    </div>
  );

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1rem 4rem', boxSizing: 'border-box', overflowX: 'hidden' }}>

      {/* ── Page title + tab switcher ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: 0 }}>
          {tab === 'orders' ? 'Customer Orders' : 'Registered Users'}
        </h1>
        {/* Tab buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--muted)', borderRadius: 'var(--radius)', padding: '0.3rem' }}>
          {[
            { key: 'orders', label: 'Orders', icon: <Package size={15} /> },
            { key: 'users',  label: 'Users',  icon: <Users size={15} /> },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.5rem 1.1rem', borderRadius: 'calc(var(--radius) - 2px)',
              border: 'none', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
              background: tab === t.key ? 'var(--card)' : 'transparent',
              color: tab === t.key ? 'var(--primary)' : 'var(--muted-fg)',
              boxShadow: tab === t.key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s',
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          ORDERS TAB
      ════════════════════════════════════════════════ */}
      {tab === 'orders' && (
        <>
          {/* Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.65rem', marginBottom: '1.25rem' }}>
            <StatCard label="Total Orders" value={totalOrders} icon={<Package size={20} />} accent="#3b82f6" />
            <StatCard label="Pending" value={pendingOrders} icon={<Clock size={20} />} accent="#f59e0b" />
            <StatCard label="Completed" value={completedOrders} icon={<CheckCircle size={20} />} accent="#22c55e" />
          </div>

          {/* Newly-completed banner */}
          {newlyCompleted.size > 0 && (
            <div style={{ marginBottom: '1rem', padding: '0.85rem 1.25rem', background: '#dcfce7', border: '1px solid #86efac', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#15803d', fontWeight: 700, fontSize: '0.9rem' }}>
              <Bell size={18} /> 🎉 {newlyCompleted.size} order{newlyCompleted.size > 1 ? 's' : ''} fully paid and ready to ship!
            </div>
          )}

          {/* Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '1.25rem', background: 'var(--card)', padding: '0.85rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: '1 1 180px', minWidth: '160px' }}>
              <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-fg)' }} />
              <input style={{ ...inputStyle, paddingLeft: '2.2rem' }} placeholder="Search orders…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            {/* Status */}
            <select style={{ ...inputStyle, flex: '0 1 auto', width: 'auto' }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="All">All Orders</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
            {/* Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flex: '0 1 auto' }}>
              <SlidersHorizontal size={14} color="var(--muted-fg)" />
              <select style={{ ...inputStyle, width: 'auto' }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="high">Amount: High → Low</option>
                <option value="low">Amount: Low → High</option>
              </select>
            </div>
          </div>

          {/* Order List */}
          {filteredOrders.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--muted-fg)', background: 'var(--card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <Package size={40} style={{ margin: '0 auto 0.75rem', display: 'block', opacity: 0.3 }} />
              No orders match your criteria.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredOrders.map(order => {
                const customer = userCache[order.userId];
                const isNewly = newlyCompleted.has(order.id);
                const isComplete = order.amountPaid >= order.totalAmount;
                const isExpanded = expandedOrders.has(order.id);

                const combinedPeriod = order.items?.reduce((acc, i) =>
                  acc + (i.paymentChoice === 'installment' ? (i.periodPayment || i.monthlyPayment) * i.quantity : 0), 0) || 0;
                const isWeekly = order.items?.some(i => i.paymentFrequency === 'weekly');
                const periodsPaid = combinedPeriod > 0 ? Math.floor(order.amountPaid / combinedPeriod) : 0;
                const excessPaid = combinedPeriod > 0 ? order.amountPaid % combinedPeriod : 0;

                let nextDate = null, timerText = '', isOverdue = false;
                if (!isComplete && order.createdAt) {
                  nextDate = new Date(order.createdAt.toMillis());
                  isWeekly ? nextDate.setDate(nextDate.getDate() + (periodsPaid + 1) * 7)
                           : nextDate.setMonth(nextDate.getMonth() + (periodsPaid + 1));
                  const diff = Math.ceil((nextDate - new Date()) / 86400000);
                  if (diff < 0) { isOverdue = true; timerText = `Overdue by ${Math.abs(diff)} days`; }
                  else if (diff === 0) { isOverdue = true; timerText = 'Due today!'; }
                  else { timerText = `Due in ${diff} days`; }
                }

                const balance = order.totalAmount - order.amountPaid;
                let defAmt = Math.min(balance, excessPaid > 0 ? combinedPeriod - excessPaid : combinedPeriod);

                const sc = STATUS_COLORS[order.status] || STATUS_COLORS.default;

                return (
                  <div key={order.id} style={{
                    background: 'var(--card)', border: `1px solid ${isNewly ? '#86efac' : 'var(--border)'}`,
                    borderRadius: 'var(--radius)', overflow: 'hidden',
                    boxShadow: isNewly ? '0 0 0 2px #bbf7d0' : 'var(--shadow-card)',
                  }}>
                    {isNewly && (
                      <div style={{ padding: '0.4rem 1rem', background: '#dcfce7', borderBottom: '1px solid #86efac', fontSize: '0.78rem', fontWeight: 700, color: '#15803d', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Bell size={13} /> Payment complete — ready to ship!
                      </div>
                    )}

                    {/* Order Row Header (clickable to expand) */}
                    <div
                      onClick={() => toggleExpand(order.id)}
                      style={{
                        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem 1rem',
                        padding: '0.9rem 1.1rem', cursor: 'pointer',
                        background: isExpanded ? 'var(--muted)' : 'var(--card)',
                        transition: 'background 0.2s',
                      }}
                    >
                      {/* Order ID */}
                      <div style={{ minWidth: '110px' }}>
                        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--muted-fg)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Order</div>
                        <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', fontWeight: 700 }}>#{order.id.slice(0, 10)}</div>
                      </div>

                      {/* Date */}
                      <div style={{ minWidth: '90px' }}>
                        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--muted-fg)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Date</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                          {order.createdAt?.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>

                      {/* Customer */}
                      <div
                        style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: '1 1 160px', cursor: 'pointer' }}
                        onClick={e => { e.stopPropagation(); setSelectedCustomerProfile(order.userId); }}
                      >
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                          background: 'var(--gradient-primary)', color: 'white',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 800, fontSize: '0.9rem',
                        }}>
                          {customer?.firstName?.[0]?.toUpperCase() || <Users size={14} />}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown'}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--muted-fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {customer?.email || order.userId}
                          </div>
                        </div>
                      </div>

                      {/* Amount */}
                      <div style={{ textAlign: 'right', minWidth: '80px' }}>
                        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--muted-fg)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Total</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem' }}>{fmt(order.totalAmount)}</div>
                      </div>

                      {/* Status */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                        <Badge label={order.status} colors={sc} />
                        {order.tracking_status && order.tracking_status !== 'Pending' && (
                          <Badge label={order.tracking_status} colors={TRACKING_COLORS[order.tracking_status] || TRACKING_COLORS.default} />
                        )}
                      </div>

                      {/* Expand toggle */}
                      <div style={{ marginLeft: 'auto', color: 'var(--muted-fg)', flexShrink: 0 }}>
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>

                    {/* ── Expanded Detail ── */}
                    {isExpanded && (
                      <div style={{
                        borderTop: '1px solid var(--border)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '1.25rem',
                        padding: '1.25rem',
                        overflow: 'hidden',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}>

                        {/* Items */}
                        <div>
                          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted-fg)', marginBottom: '0.85rem' }}>Items Ordered</div>
                          {order.items?.map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: '0.75rem', paddingBottom: '0.85rem', marginBottom: '0.85rem', borderBottom: i < order.items.length - 1 ? '1px solid var(--border)' : 'none' }}>
                              <div style={{ width: '56px', height: '56px', flexShrink: 0, borderRadius: '0.5rem', overflow: 'hidden', background: 'var(--muted)', border: '1px solid var(--border)' }}>
                                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                              <div>
                                <div style={{ fontWeight: 700, fontSize: '0.875rem', lineHeight: 1.3, marginBottom: '0.2rem' }}>{item.name} <span style={{ color: 'var(--muted-fg)', fontWeight: 400 }}>×{item.quantity}</span></div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--muted-fg)' }}>Length: {item.length}</div>
                                <span style={{
                                  display: 'inline-block', marginTop: '0.3rem',
                                  padding: '0.15rem 0.6rem', borderRadius: '9999px',
                                  fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase',
                                  background: item.paymentChoice === 'installment' ? '#dbeafe' : '#dcfce7',
                                  color: item.paymentChoice === 'installment' ? '#1d4ed8' : '#15803d',
                                }}>
                                  {item.paymentChoice === 'installment'
                                    ? `${item.installments} ${item.paymentFrequency === 'weekly' ? 'Weekly' : 'Monthly'} Payments`
                                    : 'Full Payment'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Delivery Info */}
                        {order.deliveryInfo && (
                          <div style={{ background: 'var(--muted)', borderRadius: 'var(--radius)', padding: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted-fg)', marginBottom: '0.85rem' }}>Delivery Info</div>
                            <div style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                              <div style={{ fontWeight: 700 }}>{order.deliveryInfo.address}</div>
                              <div>{order.deliveryInfo.city}, {order.deliveryInfo.state}</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem', color: 'var(--muted-fg)' }}>
                                <Phone size={13} /> {order.deliveryInfo.phone}
                              </div>
                              {order.deliveryInfo.instructions && (
                                <div style={{ marginTop: '0.75rem', padding: '0.6rem', background: 'var(--card)', borderRadius: '0.5rem', fontSize: '0.8rem', color: 'var(--muted-fg)', fontStyle: 'italic' }}>
                                  "{order.deliveryInfo.instructions}"
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Payment Tracker */}
                        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1rem' }}>
                          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted-fg)', marginBottom: '0.85rem' }}>Payment Tracker</div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                            <span style={{ color: 'var(--muted-fg)' }}>Total:</span>
                            <strong>{fmt(order.totalAmount)}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.875rem' }}>
                            <span style={{ color: 'var(--muted-fg)' }}>Amount Paid:</span>
                            <div style={{ position: 'relative' }}>
                              <span style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-fg)', fontWeight: 700, pointerEvents: 'none' }}>₦</span>
                              <input
                                type="number"
                                defaultValue={order.amountPaid}
                                disabled={updating}
                                onBlur={e => {
                                  if (e.target.value !== String(order.amountPaid))
                                    handleUpdateAmountPaid(order.id, e.target.value, order.totalAmount);
                                }}
                                style={{ width: '130px', paddingLeft: '1.6rem', paddingRight: '0.5rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', border: '1.5px solid var(--border)', borderRadius: '0.5rem', fontWeight: 800, color: 'var(--primary)', fontSize: '0.9rem', textAlign: 'right', fontFamily: 'var(--font-body)', outline: 'none', background: 'var(--background)' }}
                              />
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div style={{ height: '6px', background: 'var(--border)', borderRadius: '9999px', overflow: 'hidden', marginBottom: '0.35rem' }}>
                            <div style={{
                              height: '100%', borderRadius: '9999px',
                              background: isComplete ? '#22c55e' : 'var(--primary)',
                              width: `${Math.min(100, (order.amountPaid / order.totalAmount) * 100)}%`,
                              transition: 'width 0.6s ease',
                            }} />
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--muted-fg)', textAlign: 'center', marginBottom: '0.75rem' }}>
                            {Math.round((order.amountPaid / order.totalAmount) * 100)}% paid
                            {!isComplete && <span> · Balance: <strong style={{ color: 'hsl(0 72% 55%)' }}>{fmt(balance)}</strong></span>}
                          </div>

                          {/* Next payment */}
                          {!isComplete && nextDate && (
                            <div style={{ background: isOverdue ? '#fef2f2' : '#eff6ff', border: `1px solid ${isOverdue ? '#fecaca' : '#bfdbfe'}`, borderRadius: '0.5rem', padding: '0.75rem', textAlign: 'center', marginBottom: '0.75rem' }}>
                              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: isOverdue ? '#b91c1c' : '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.3rem' }}>Next Payment</div>
                              <div style={{ fontWeight: 800, color: isOverdue ? '#b91c1c' : '#1e40af', marginBottom: '0.2rem' }}>
                                {nextDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </div>
                              <span style={{ display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.68rem', fontWeight: 700, background: isOverdue ? '#fecaca' : '#bfdbfe', color: isOverdue ? '#b91c1c' : '#1d4ed8' }}>{timerText}</span>
                              <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', fontWeight: 700 }}>Expected: {fmt(defAmt)}</div>
                            </div>
                          )}

                          {/* Ship button */}
                          {isComplete && (!order.tracking_status || order.tracking_status === 'Pending') && (
                            <button onClick={() => handleShipOrder(order.id, customer?.email)} disabled={updating} style={{
                              width: '100%', padding: '0.65rem', background: '#2563eb', color: 'white',
                              border: 'none', borderRadius: '0.5rem', fontWeight: 700, cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                              fontSize: '0.875rem', marginBottom: '0.5rem',
                            }}>
                              <Truck size={15} /> Mark as Shipped
                            </button>
                          )}

                          {/* Delivery token */}
                          {order.tracking_status === 'Shipped' && order.delivery_token && (
                            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem', padding: '0.75rem', marginTop: '0.5rem' }}>
                              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <LinkIcon size={11} /> Rider Link
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'white', padding: '0.4rem 0.6rem', borderRadius: '0.4rem', border: '1px solid #bfdbfe' }}>
                                <input type="text" readOnly value={`${window.location.origin}/delivery?order=${order.id}&token=${order.delivery_token}`}
                                  style={{ flex: 1, fontSize: '0.72rem', border: 'none', background: 'transparent', outline: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
                                <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/delivery?order=${order.id}&token=${order.delivery_token}`); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2563eb', padding: '0.2rem' }}>
                                  <Copy size={14} />
                                </button>
                              </div>
                            </div>
                          )}

                          {order.paymentRef && (
                            <div style={{ marginTop: '0.75rem', fontSize: '0.65rem', fontFamily: 'monospace', color: 'var(--muted-fg)', wordBreak: 'break-all', textAlign: 'center' }}>
                              Ref: {order.paymentRef}
                            </div>
                          )}
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════════
          REGISTERED USERS TAB
      ════════════════════════════════════════════════ */}
      {tab === 'users' && (
        <>
          {/* Users Search */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.85rem', marginBottom: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 200px' }}>
              <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-fg)' }} />
              <input style={{ ...inputStyle, paddingLeft: '2.2rem' }} placeholder="Search by name, email or phone…" value={userSearch} onChange={e => setUserSearch(e.target.value)} />
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--muted-fg)', whiteSpace: 'nowrap' }}>
              {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
            </div>
          </div>

          {usersLoading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--muted-fg)' }}>Loading users…</div>
          ) : filteredUsers.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--muted-fg)', background: 'var(--card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <Users size={40} style={{ margin: '0 auto 0.75rem', display: 'block', opacity: 0.3 }} />
              No users found.
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div style={{ overflowX: 'auto', borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'none' }} className="users-table-desktop">
              </div>

              {/* Responsive card list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {filteredUsers.map((u, i) => {
                  const userOrders = orders.filter(o => o.userId === u.id);
                  const totalSpent = userOrders.reduce((s, o) => s + (o.amountPaid || 0), 0);
                  const isVerified = u.isEmailVerified === true;

                  return (
                    <div key={u.id} style={{
                      background: 'var(--card)', border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)', padding: '0.9rem 1.1rem',
                      display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem 1.25rem',
                    }}>
                      {/* Avatar */}
                      <div style={{
                        width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                        background: 'var(--gradient-primary)', color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 800, fontSize: '1rem',
                      }}>
                        {u.firstName?.[0]?.toUpperCase() || '?'}
                      </div>

                      {/* Name + Email */}
                      <div style={{ flex: '1 1 160px', minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {u.firstName} {u.lastName}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'var(--muted-fg)', marginTop: '0.1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          <Mail size={11} /> {u.email || '—'}
                        </div>
                        {u.phone && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--muted-fg)', marginTop: '0.1rem' }}>
                            <Phone size={11} /> {u.phone}
                          </div>
                        )}
                      </div>

                      {/* Verified badge */}
                      <div>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                          padding: '0.2rem 0.6rem', borderRadius: '9999px',
                          fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
                          background: isVerified ? '#dcfce7' : '#fef3c7',
                          color: isVerified ? '#15803d' : '#b45309',
                        }}>
                          <UserCheck size={11} />
                          {isVerified ? 'Verified' : 'Unverified'}
                        </span>
                      </div>

                      {/* Orders & Spent */}
                      <div style={{ textAlign: 'right', minWidth: '100px' }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--muted-fg)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Orders</div>
                        <div style={{ fontWeight: 800, fontFamily: 'var(--font-display)', fontSize: '1rem' }}>{userOrders.length}</div>
                      </div>

                      <div style={{ textAlign: 'right', minWidth: '110px' }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--muted-fg)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Total Paid</div>
                        <div style={{ fontWeight: 800, fontFamily: 'var(--font-display)', fontSize: '1rem', color: totalSpent > 0 ? '#15803d' : 'var(--muted-fg)' }}>
                          {totalSpent > 0 ? fmt(totalSpent) : '—'}
                        </div>
                      </div>

                      {/* Joined */}
                      <div style={{ textAlign: 'right', minWidth: '80px' }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--muted-fg)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Joined</div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                          {u.createdAt?.toDate?.().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }) || '—'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════════
          CUSTOMER PROFILE MODAL
      ════════════════════════════════════════════════ */}
      {selectedCustomerProfile && (() => {
        const pu = userCache[selectedCustomerProfile];
        const uOrders = orders.filter(o => o.userId === selectedCustomerProfile).sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
        const ltTotal = uOrders.reduce((s, o) => s + o.totalAmount, 0);
        const ltPaid  = uOrders.reduce((s, o) => s + o.amountPaid, 0);
        const ltOwed  = ltTotal - ltPaid;

        return (
          <div onClick={() => setSelectedCustomerProfile(null)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem', backdropFilter: 'blur(4px)',
          }}>
            <div onClick={e => e.stopPropagation()} style={{
              background: 'var(--card)', borderRadius: 'calc(var(--radius) + 4px)',
              width: '100%', maxWidth: '680px', maxHeight: '90vh',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
            }}>
              {/* Modal Header */}
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--gradient-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', flexShrink: 0 }}>
                    {pu?.firstName?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem' }}>{pu ? `${pu.firstName} ${pu.lastName}` : 'Unknown'}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted-fg)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Mail size={12} />{pu?.email}</div>
                    {pu?.phone && <div style={{ fontSize: '0.75rem', color: 'var(--muted-fg)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.1rem' }}><Phone size={11} />{pu.phone}</div>}
                  </div>
                </div>
                <button onClick={() => setSelectedCustomerProfile(null)} style={{ background: 'var(--muted)', border: 'none', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted-fg)' }}>
                  <X size={18} />
                </button>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
                {[
                  { label: 'Total Ordered', value: fmt(ltTotal), accent: '#3b82f6', bg: '#eff6ff' },
                  { label: 'Total Paid',    value: fmt(ltPaid),  accent: '#22c55e', bg: '#f0fdf4' },
                  { label: 'Outstanding',   value: fmt(ltOwed),  accent: ltOwed > 0 ? '#f59e0b' : '#94a3b8', bg: ltOwed > 0 ? '#fffbeb' : '#f8fafc' },
                ].map(s => (
                  <div key={s.label} style={{ background: s.bg, borderRadius: 'var(--radius)', padding: '0.75rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: s.accent, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.3rem' }}>{s.label}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: s.accent }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Order history */}
              <div style={{ overflow: 'auto', flex: 1, padding: '1rem 1.5rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted-fg)', marginBottom: '0.85rem' }}>
                  Order History ({uOrders.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {uOrders.map(o => (
                    <div key={o.id} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1rem', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--muted)', borderRadius: 'var(--radius)', fontSize: '0.875rem' }}>
                      <div>
                        <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: 'var(--muted-fg)' }}>#{o.id.slice(0, 12)}</div>
                        <div style={{ fontWeight: 600 }}>{o.createdAt?.toDate().toLocaleDateString('en-GB')}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800 }}>{fmt(o.totalAmount)}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted-fg)' }}>{fmt(o.amountPaid)} paid</div>
                      </div>
                      <Badge label={o.status} colors={STATUS_COLORS[o.status] || STATUS_COLORS.default} />
                    </div>
                  ))}
                  {uOrders.length === 0 && <div style={{ color: 'var(--muted-fg)', textAlign: 'center', padding: '1.5rem' }}>No orders yet.</div>}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
