import { useState, useEffect } from 'react';
import { useSearchParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Footer from '../components/Footer';
import { isProductInStock, getStockDisplayText } from '../utils/inventoryService';

const CATEGORIES = ['All', 'Bundles', 'Wigs', 'Closures', 'Frontals'];

function pathToCategory(pathname) {
  if (pathname.includes('bundles')) return 'Bundles';
  if (pathname.includes('wigs'))    return 'Wigs';
  return null;
}

export default function Shop() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const urlCat =
    searchParams.get('category') ||
    searchParams.get('cat') ||
    pathToCategory(location.pathname);

  const initial = CATEGORIES.find(
    c => c.toLowerCase() === (urlCat || '').toLowerCase()
  ) || 'All';

  const [active, setActive] = useState(initial);
  const [search, setSearch] = useState('');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setProducts(items);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync category state with URL
  useEffect(() => {
    const cat =
      searchParams.get('category') ||
      searchParams.get('cat') ||
      pathToCategory(location.pathname);
    const match = CATEGORIES.find(c => c.toLowerCase() === (cat || '').toLowerCase());
    setActive(match || 'All');
  }, [location.search, location.pathname]);

  const filtered = products.filter(p => {
    if (p.is_hidden) return false;
    const matchCat    = active === 'All' || p.category === active;
    const searchTerms = search.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const searchableText = `${p.name || ''} ${p.category || ''} ${p.description || ''} ${p.tag || ''}`.toLowerCase();
    const matchSearch = searchTerms.length === 0 || searchTerms.every(term => searchableText.includes(term));
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
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search hair bundles, wigs, closures..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

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

        {loading ? (
          <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--primary)' }}>Loading products...</div>
        ) : (
          <div className="products-grid">
            {filtered.length === 0 && (
              <p style={{ color: 'var(--muted-fg)', gridColumn: '1/-1', padding: '2rem 0' }}>
                No products found.
              </p>
            )}
            {filtered.map(p => (
              <div 
                key={p.id} 
                className="product-card" 
                onClick={() => navigate(`/products/${p.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <Link to={`/products/${p.id}`} onClick={e => e.stopPropagation()} className="img-wrap">
                  <img src={p.img} alt={p.name} loading="lazy" decoding="async" />
                  {p.featured && <span className="feat-badge">Featured</span>}
                </Link>

                <div className="info">
                  <Link to={`/products/${p.id}`} onClick={e => e.stopPropagation()} style={{ textDecoration: 'none' }}>
                    <h3>{p.name}</h3>
                  </Link>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <p className="feat-length" style={{ margin: 0 }}>{p.length}</p>
                    <span style={{ 
                      fontSize: '0.65rem', 
                      fontWeight: '700', 
                      color: isProductInStock(p) ? '#16a34a' : '#dc2626',
                      background: isProductInStock(p) ? '#dcfce7' : '#fee2e2',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '0.5rem',
                      textTransform: 'uppercase'
                    }}>
                      {getStockDisplayText(p)}
                    </span>
                  </div>
                  <div className="price">₦{Number(p.price).toLocaleString()}</div>

                  <div className="card-actions">
                    {isProductInStock(p) ? (
                      <>
                        <button 
                          className="pss-btn"
                          onClick={(e) => { e.stopPropagation(); navigate(`/products/${p.id}`); }}
                        >
                          Pay Small Small
                        </button>
                        <button 
                          className="buy-once-btn"
                          onClick={(e) => { e.stopPropagation(); navigate(`/products/${p.id}`); }}
                        >
                          <ShoppingBag size={14} />
                          Buy Once
                        </button>
                      </>
                    ) : (
                      <button 
                        className="buy-once-btn"
                        disabled
                        style={{ width: '100%', opacity: 0.5, cursor: 'not-allowed', background: 'var(--muted)', color: 'var(--muted-fg)' }}
                        onClick={(e) => { e.stopPropagation(); navigate(`/products/${p.id}`); }}
                      >
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


      </div>

      <Footer />
    </main>
  );
}
