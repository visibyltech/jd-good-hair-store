import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User, LogOut, Shield, Bell } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';
import toast from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';
import NotificationBell from './NotificationBell';
import './Navbar.css';

function fmt(n) {
  return '₦' + Math.ceil(n).toLocaleString('en-NG');
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, logout } = useAuthStore();
  const { getTotalItems, isCartSidebarOpen, toggleCartSidebar, items, removeFromCart, getInitialPaymentTotal } = useCartStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMobile();
  }, [location]);

  const handleLogout = async () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    await logout();
    toast.success('Signed out successfully');
    navigate('/');
    closeMobile();
    setShowLogoutConfirm(false);
  };

  const totalItems = getTotalItems();

  const navLinkClass = ({ isActive }) =>
    isActive ? 'mobile-nav-link active' : 'mobile-nav-link';

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Left Logo */}
          <NavLink to="/" className="header-logo" onClick={closeMobile}>
            <img src="/logo.png" alt="JD Good Hair Logo" />
          </NavLink>

          {/* Center Desktop Nav */}
          <nav className="header-nav desktop-only">
            <NavLink to="/" end className="nav-item">Home</NavLink>
            <NavLink to="/products" className="nav-item">Shop</NavLink>
            <NavLink to="/products?category=Bundles" className="nav-item">Bundles</NavLink>
            <NavLink to="/products?category=Wigs" className="nav-item">Wigs</NavLink>
          </nav>

          {/* Center Mobile Search Bar */}
          <div className="mobile-search-wrapper mobile-only">
            <NavLink to="/products" className="mobile-search-bar">
              <Search size={16} strokeWidth={2} />
              <span>Search...</span>
            </NavLink>
          </div>

          {/* Right Actions */}
          <div className="header-actions">
            <NavLink to="/products" aria-label="Search" className="action-icon desktop-only">
              <Search size={20} strokeWidth={1.5} />
            </NavLink>

            {user ? (
              <div className="user-actions desktop-only">
                {isAdmin && (
                  <NavLink to="/admin" className="action-icon" title="Admin Portal">
                    <Shield size={20} strokeWidth={1.5} />
                  </NavLink>
                )}
                <NavLink to="/profile" className="action-icon" title="Profile">
                  <User size={20} strokeWidth={1.5} />
                </NavLink>
                <NotificationBell />
                <button onClick={handleLogout} className="action-icon" title="Logout">
                  <LogOut size={20} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <div className="auth-actions desktop-only">
                <NavLink to="/login" className="auth-link">Login</NavLink>
                <NavLink to="/register" className="auth-btn">Register</NavLink>
              </div>
            )}

            {!isAdmin && (
              <button 
                onClick={() => toggleCartSidebar(true)} 
                className="action-icon cart-action" 
                aria-label="Cart"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </button>
            )}

            {/* Mobile menu button */}
            <button
              className="mobile-menu-btn"
              aria-label={mobileOpen ? 'Close menu' : 'Menu'}
              onClick={() => setMobileOpen(v => !v)}
            >
              {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-drawer-overlay ${mobileOpen ? 'open' : ''}`} onClick={closeMobile}></div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <img src="/logo.png" alt="JD Good Hair Logo" className="drawer-logo" />
          <button className="drawer-close" onClick={closeMobile}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-content">
          <nav className="mobile-nav-list">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/products" className={navLinkClass}>Shop All</NavLink>
            <NavLink to="/products?category=Bundles" className={navLinkClass}>Bundles</NavLink>
            <NavLink to="/products?category=Wigs" className={navLinkClass}>Wigs</NavLink>
            <NavLink to="/products?category=Closures" className={navLinkClass}>Closures</NavLink>
            <NavLink to="/products?category=Frontals" className={navLinkClass}>Frontals</NavLink>
          </nav>

          <div className="drawer-footer">
            {user ? (
              <div className="mobile-user-menu">
                {isAdmin && (
                  <NavLink to="/admin" className="drawer-btn outline">⚙️ Admin Portal</NavLink>
                )}
                <NavLink to="/profile" className="drawer-btn outline">👤 Profile</NavLink>
                <button onClick={handleLogout} className="drawer-btn danger">🚪 Logout</button>
              </div>
            ) : (
              <div className="mobile-auth-menu">
                <NavLink to="/login" className="drawer-btn outline">Login</NavLink>
                <NavLink to="/register" className="drawer-btn primary">Register</NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        confirmLabel="Sign Out"
        cancelLabel="Cancel"
      />

      {/* Mini-Cart Sidebar Overlay */}
      <div 
        className={`mobile-drawer-overlay ${isCartSidebarOpen ? 'open' : ''}`} 
        onClick={() => toggleCartSidebar(false)}
        style={{ zIndex: 999 }}
      ></div>

      {/* Mini-Cart Sidebar */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '400px',
          maxWidth: '90vw',
          background: 'var(--card-bg)',
          zIndex: 1000,
          boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
          transform: isCartSidebarOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'var(--font-display)', margin: 0 }}>Your Bag ({totalItems})</h2>
          <button onClick={() => toggleCartSidebar(false)} style={{ background: 'var(--muted)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--foreground)' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--muted-fg)' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
              <p>Your bag is empty.</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.cartItemId} style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                <div style={{ width: '80px', height: '80px', flexShrink: 0, background: 'var(--muted)', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.95rem', fontWeight: '700', lineHeight: 1.2 }}>{item.name}</h4>
                    <button onClick={() => removeFromCart(item.cartItemId)} style={{ background: 'none', border: 'none', color: 'var(--muted-fg)', cursor: 'pointer', padding: '2px' }}>
                      <X size={16} />
                    </button>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted-fg)', margin: '0 0 0.5rem' }}>Length: {item.length} • Qty: {item.quantity}</p>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', padding: '2px 6px', borderRadius: '4px', background: item.paymentChoice === 'installment' ? '#eff6ff' : '#f0fdf4', color: item.paymentChoice === 'installment' ? '#1d4ed8' : '#15803d' }}>
                      {item.paymentChoice === 'installment' ? 'Installment' : 'Full Pay'}
                    </span>
                    <strong style={{ fontSize: '1rem', fontWeight: '800' }}>
                      {item.paymentChoice === 'installment' ? fmt((item.periodPayment || item.monthlyPayment) * item.quantity) : fmt(item.price * item.quantity)}
                    </strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '800' }}>
              <span>Subtotal</span>
              <span>{fmt(getInitialPaymentTotal())}</span>
            </div>
            <button 
              onClick={() => { toggleCartSidebar(false); navigate('/cart'); }}
              style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer' }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
