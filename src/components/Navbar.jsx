import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          aria-label={mobileOpen ? 'Close menu' : 'Menu'}
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <Link to="/" className="header-logo">
          <img src="/logo.png" alt="JD Good Hair Logo" />
        </Link>

        {/* Desktop nav */}
        <nav className="header-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
          <NavLink to="/products?category=Bundles">Bundles</NavLink>
          <NavLink to="/products?category=Wigs">Wigs</NavLink>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <Link to="/products" aria-label="Search" className="icon-action-btn">
            <Search size={20} />
          </Link>
          <Link to="/login" className="icon-action-btn">
            <span>Login</span>
          </Link>
          <Link to="/register" className="icon-action-btn">
            <span>Register</span>
          </Link>
          <button className="cart-btn" aria-label="Cart">
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <nav className="mobile-nav">
          <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setMobileOpen(false)}>Shop</Link>
          <Link to="/products?category=Bundles" onClick={() => setMobileOpen(false)}>Bundles</Link>
          <Link to="/products?category=Wigs" onClick={() => setMobileOpen(false)}>Wigs</Link>
          <Link to="/products?category=Closures" onClick={() => setMobileOpen(false)}>Closures</Link>
          <Link to="/products?category=Frontals" onClick={() => setMobileOpen(false)}>Frontals</Link>
          <hr />
          <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
          <Link to="/register" onClick={() => setMobileOpen(false)}>Register</Link>
        </nav>
      )}
    </header>
  );
}
