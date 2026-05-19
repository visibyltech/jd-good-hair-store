import { useState, useEffect } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { ShoppingBag, Search } from 'lucide-react';
import Footer from '../components/Footer';

const PRODUCTS = [
  { id: 1, name: 'Silky Straight Bundle', category: 'Bundles',  length: '18"',  price: '₦129,900', pss: '₦150,000', img: '/product-straight.jpg',  featured: true  },
  { id: 2, name: 'Body Wave Bundle',       category: 'Bundles',  length: '20"',  price: '₦149,900', pss: '₦170,000', img: '/product-bodywave.jpg', featured: true  },
  { id: 3, name: 'Deep Wave Bundle',       category: 'Bundles',  length: '22"',  price: '₦159,900', pss: '₦180,000', img: '/product-deepwave.jpg', featured: false },
  { id: 4, name: 'HD Lace Front Wig',      category: 'Wigs',     length: '24"',  price: '₦349,900', pss: '₦380,000', img: '/product-wig.jpg',      featured: true  },
  { id: 5, name: 'Silk Base Closure',      category: 'Closures', length: '16"',  price: '₦89,900',  pss: '₦105,000', img: '/product-closure.jpg',  featured: false },
  { id: 6, name: '13x4 Lace Frontal',      category: 'Frontals', length: '18"',  price: '₦189,900', pss: '₦210,000', img: '/product-frontal.jpg',  featured: true  },
  { id: 7, name: 'Kinky Curly Bundle',     category: 'Bundles',  length: '20"',  price: '₦139,900', pss: '₦160,000', img: '/product-kinky.jpg',    featured: false },
  { id: 8, name: 'Straight Lace Wig',      category: 'Wigs',     length: '26"',  price: '₦399,900', pss: '₦430,000', img: '/product-wig.jpg',      featured: false },
];

const CATEGORIES = ['All', 'Bundles', 'Wigs', 'Closures', 'Frontals'];

function pathToCategory(pathname) {
  if (pathname.includes('bundles')) return 'Bundles';
  if (pathname.includes('wigs'))    return 'Wigs';
  return null;
}

export default function Shop() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const urlCat =
    searchParams.get('category') ||
    searchParams.get('cat') ||
    pathToCategory(location.pathname);

  const initial = CATEGORIES.find(
    c => c.toLowerCase() === (urlCat || '').toLowerCase()
  ) || 'All';

  const [active, setActive] = useState(initial);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const cat =
      searchParams.get('category') ||
      searchParams.get('cat') ||
      pathToCategory(location.pathname);
    const match = CATEGORIES.find(c => c.toLowerCase() === (cat || '').toLowerCase());
    setActive(match || 'All');
  }, [location.search, location.pathname]);

  const filtered = PRODUCTS.filter(p => {
    const matchCat    = active === 'All' || p.category === active;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>JD Good Hair</h1>
          <p className="tagline">Luxury for Less</p>
          <p>Shop premium hair and enjoy flexible "Pay Small Small" options.</p>
        </div>
      </div>

      <div className="container">
        {/* PSS Banner */}
        <div className="pss-banner">
          <div className="left">
            <strong>Pay Small Small Available</strong>
            <p>Choose daily, every 3 days, every 4 days, or weekly payments. Maximum duration: 30 days.</p>
          </div>
          <button className="learn-more">Learn More</button>
        </div>

        {/* Search */}
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search hair bundles, wigs, closures..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Pills */}
        <div className="filter-pills">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`pill${active === cat ? ' active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="products-grid">
          {filtered.length === 0 && (
            <p style={{ color: 'var(--muted-fg)', gridColumn: '1/-1', padding: '2rem 0' }}>
              No products found.
            </p>
          )}
          {filtered.map(p => (
            <div key={p.id} className="product-card">
              {/* Clickable image → product detail */}
              <Link to={`/products/${p.id}`} className="img-wrap">
                <img src={p.img} alt={p.name} loading="lazy" />
                {p.featured && <span className="feat-badge">Featured</span>}
              </Link>

              <div className="info">
                <Link to={`/products/${p.id}`}>
                  <h3>{p.name}</h3>
                </Link>
                <p className="feat-length">{p.length}</p>
                <div className="price">{p.price}</div>

                {/* Two action buttons */}
                <div className="card-actions">
                  <button className="pss-btn">Pay Small Small</button>
                  <button className="buy-once-btn">
                    <ShoppingBag size={14} />
                    Buy Once
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PSS note */}
        <p className="pss-note">
          Note: Orders under installment plans are delivered only after full payment is completed.
        </p>
      </div>

      <Footer />
    </main>
  );
}
