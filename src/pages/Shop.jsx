import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Search } from 'lucide-react';
import Footer from '../components/Footer';

const PRODUCTS = [
  { id: 1, name: 'Silky Straight Bundle',  category: 'bundles',  length: '18"', price: '₦129,900', pss: '₦150,000', img: '/product-straight.jpg' },
  { id: 2, name: 'Body Wave Bundle',        category: 'bundles',  length: '20"', price: '₦149,900', pss: '₦170,000', img: '/product-bodywave.jpg' },
  { id: 3, name: 'Deep Wave Bundle',        category: 'bundles',  length: '16"', price: '₦119,900', pss: '₦140,000', img: '/product-bodywave.jpg' },
  { id: 4, name: 'HD Lace Front Wig',       category: 'wigs',     length: '24"', price: '₦349,900', pss: '₦380,000', img: '/product-wig.jpg' },
  { id: 5, name: 'Kinky Curly Wig',         category: 'wigs',     length: '18"', price: '₦299,900', pss: '₦340,000', img: '/product-wig.jpg' },
  { id: 6, name: '13x4 Lace Frontal',       category: 'frontals', length: '18"', price: '₦189,900', pss: '₦210,000', img: '/product-frontal.jpg' },
  { id: 7, name: 'HD Lace Closure',         category: 'closures', length: '4×4"', price: '₦89,900', pss: '₦100,000', img: '/product-frontal.jpg' },
  { id: 8, name: 'Brazilian Curly Bundle',  category: 'bundles',  length: '24"', price: '₦159,900', pss: '₦180,000', img: '/product-straight.jpg' },
];

const CATEGORIES = ['All', 'Bundles', 'Wigs', 'Closures', 'Frontals'];

export default function Shop({ category }) {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(
    category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All'
  );

  const filtered = PRODUCTS.filter(p => {
    const matchCat = active === 'All' || p.category === active.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main>
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
            <p>Choose daily, every 3 days, every 4 days, or weekly payments. Maximum duration: 30 days. Delivery only after full payment.</p>
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
              className={`pill ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="products-grid">
          {filtered.map(p => (
            <div key={p.id} className="product-card">
              <div className="img-wrap">
                <img src={p.img} alt={p.name} loading="lazy" />
              </div>
              <div className="info">
                <div className="tag">{p.length}</div>
                <h3>{p.name}</h3>
                <div className="price">{p.price}</div>
                <div className="pss-price">Pay Small Small: {p.pss}</div>
                <div className="card-actions">
                  <button className="add-cart" aria-label={`Add ${p.name} to cart`}>
                    <ShoppingBag size={18} />
                  </button>
                  <button className="pss-btn">Pay Small Small</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
