import { Navigate, Outlet, NavLink, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import { Package, PlusCircle, LogOut, User, ClipboardList, Settings, X } from 'lucide-react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';

const sidebarLinkStyle = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  padding: '0.75rem 1rem',
  borderRadius: '0.5rem',
  color: isActive ? 'var(--primary)' : 'var(--foreground)',
  background: isActive ? 'hsl(340 72% 62% / .1)' : 'transparent',
  fontWeight: isActive ? '600' : '400',
  fontSize: '0.9rem',
  textDecoration: 'none',
  transition: 'background 0.2s, color 0.2s',
  borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
});

export default function AdminLayout() {
  const { user, isAdmin } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on every route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-layout-container">
      {/* Mobile Header — CSS controls visibility (.admin-mobile-header { display: flex } on mobile) */}
      <div className="admin-mobile-header" style={{ background: 'var(--card)', padding: '1rem', justifyContent: 'space-between', alignItems: 'center', zIndex: 20, borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--primary)', margin: 0 }}>
          Admin Panel
        </h2>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground)', display: 'flex', alignItems: 'center', padding: '0.4rem' }}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="admin-mobile-overlay"
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40, backdropFilter: 'blur(2px)' }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>
              Admin Panel
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted-fg)', wordBreak: 'break-all' }}>{user.email}</p>
          </div>
          <button
            className="admin-sidebar-close"
            onClick={() => setMobileMenuOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-fg)' }}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin" end onClick={() => setMobileMenuOpen(false)} style={({ isActive }) => sidebarLinkStyle(isActive)}>
            <Package size={18} /> Manage Products
          </NavLink>
          <NavLink to="/admin/orders" onClick={() => setMobileMenuOpen(false)} style={({ isActive }) => sidebarLinkStyle(isActive)}>
            <ClipboardList size={18} /> Customer Orders
          </NavLink>
          <NavLink to="/admin/new" onClick={() => setMobileMenuOpen(false)} style={({ isActive }) => sidebarLinkStyle(isActive)}>
            <PlusCircle size={18} /> Add Product
          </NavLink>
          <NavLink to="/admin/settings" onClick={() => setMobileMenuOpen(false)} style={({ isActive }) => sidebarLinkStyle(isActive)}>
            <Settings size={18} /> Site Settings
          </NavLink>
          <NavLink to="/profile" onClick={() => setMobileMenuOpen(false)} style={({ isActive }) => sidebarLinkStyle(isActive)}>
            <User size={18} /> My Profile
          </NavLink>
        </nav>

        <button
          onClick={async () => {
            await signOut(auth);
            toast.success('Signed out successfully');
          }}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.75rem 1rem', borderRadius: '0.5rem',
            color: 'hsl(340 72% 50%)', marginTop: '1rem',
            border: '1px solid hsl(340 72% 80%)', cursor: 'pointer',
            background: 'hsl(340 72% 62% / .05)',
            fontSize: '0.9rem', fontWeight: '500',
            width: '100%', transition: 'background 0.2s',
          }}
        >
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '1rem', overflowX: 'hidden' }}>
        <Outlet />
      </main>
    </div>
  );
}
