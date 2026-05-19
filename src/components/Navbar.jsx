import { Link, NavLink } from 'react-router-dom';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Mobile menu */}
        <button className="mobile-menu-btn" aria-label="Menu">
          <Menu size={22} />
        </button>

        {/* Logo */}
        <Link to="/" className="header-logo">
          <img src="/logo.png" alt="JD Good Hair Logo" />
        </Link>

        {/* Desktop nav */}
        <nav className="header-nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/shop" className={({ isActive }) => isActive ? 'active' : ''}>Shop</NavLink>
          <NavLink to="/shop?cat=bundles" className={({ isActive }) => isActive ? 'active' : ''}>Bundles</NavLink>
          <NavLink to="/shop?cat=wigs" className={({ isActive }) => isActive ? 'active' : ''}>Wigs</NavLink>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <Link to="/shop" aria-label="Search" className="icon-action-btn">
            <Search size={20} />
          </Link>
          <Link to="/login" className="icon-action-btn">
            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Login</span>
          </Link>
          <Link to="/register" className="icon-action-btn">
            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Register</span>
          </Link>
          <button className="cart-btn" aria-label="Cart">
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
