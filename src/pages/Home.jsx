import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Footer from '../components/Footer';

const FEATURED = [
  { id: 1, name: 'Silky Straight Bundle', length: '18"', price: '₦129,900', pss: '₦150,000', img: '/product-straight.jpg' },
  { id: 2, name: 'Body Wave Bundle',       length: '20"', price: '₦149,900', pss: '₦170,000', img: '/product-bodywave.jpg' },
  { id: 4, name: 'HD Lace Front Wig',      length: '24"', price: '₦349,900', pss: '₦380,000', img: '/product-wig.jpg'      },
  { id: 6, name: '13x4 Lace Frontal',      length: '18"', price: '₦189,900', pss: '₦210,000', img: '/product-frontal.jpg' },
];

const CATEGORIES = [
  { label: 'Bundles',  href: '/products?category=Bundles' },
  { label: 'Wigs',     href: '/products?category=Wigs' },
  { label: 'Closures', href: '/products?category=Closures' },
  { label: 'Frontals', href: '/products?category=Frontals' },
];

export default function Home() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="hero-full">
        <div className="hero-full-bg">
          <img src="/hero-banner.jpg" alt="JD Good Hair luxury hair extensions" loading="eager" />
          <div className="hero-full-overlay" />
        </div>
        <div className="container hero-full-content">
          <motion.div
            className="hero-text-box"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <p className="hero-eyebrow">Premium Hair Extensions</p>
            <h1 className="hero-h1">Luxury for Less</h1>
            <p className="hero-sub">
              Discover our curated collection of 100% virgin human hair bundles, wigs, closures &amp; frontals.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn-hero-primary">Shop Now</Link>
              <Link to="/shop?cat=wigs" className="btn-hero-outline">Browse Wigs</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Shop by Category ── */}
      <section className="category-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Shop by Category</h2>
          <div className="category-pills">
            {CATEGORIES.map(cat => (
              <Link key={cat.label} to={cat.href} className="cat-pill">{cat.label}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="container featured-section">
        <div className="featured-header">
          <div>
            <p className="section-eyebrow">Curated Selection</p>
            <h2 className="section-title" style={{ margin: 0 }}>Featured Products</h2>
          </div>
          <Link to="/products" className="view-all-btn">View All →</Link>
        </div>

        <div className="feat-grid">
          {FEATURED.map((p, i) => (
            <motion.a
              key={p.id}
              href={`/products/${p.id}`}
              className="feat-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="feat-img-wrap">
                <img src={p.img} alt={p.name} loading="lazy" />
                <span className="feat-badge">Featured</span>
              </div>
              <div className="feat-info">
                <h3 className="feat-name">{p.name}</h3>
                <p className="feat-length">{p.length}</p>
                <div className="feat-prices">
                  <p className="feat-price">{p.price}</p>
                  <p className="feat-pss">Pay Small Small: {p.pss}</p>
                </div>
                <div className="feat-actions">
                  <button className="feat-cart-btn" aria-label={`Add ${p.name} to cart`}>
                    <ShoppingBag size={18} />
                  </button>
                  <button className="feat-pss-btn">Pay Small Small</button>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── Pay in Installments CTA ── */}
      <section className="pss-cta-section">
        <div className="container" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
          <p className="section-eyebrow" style={{ color: 'var(--secondary)' }}>Flexible Payments</p>
          <h2 className="section-title">Pay in Installments</h2>
          <p className="pss-cta-sub">Get the hair you love now and pay over time. Split your purchase into easy monthly payments.</p>
          <Link to="/products" className="btn-hero-primary">Start Shopping</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
