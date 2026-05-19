import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ChevronDown } from 'lucide-react';
import Footer from '../components/Footer';

const PRODUCTS = [
  { id: 1, name: 'Silky Straight Bundle', category: 'Bundles',  length: '18"',  price: 129900, pss: 150000, img: '/product-straight.jpg',  featured: true  },
  { id: 2, name: 'Body Wave Bundle',       category: 'Bundles',  length: '20"',  price: 149900, pss: 170000, img: '/product-bodywave.jpg', featured: true  },
  { id: 3, name: 'Deep Wave Bundle',       category: 'Bundles',  length: '22"',  price: 159900, pss: 180000, img: '/product-deepwave.jpg', featured: false },
  { id: 4, name: 'HD Lace Front Wig',      category: 'Wigs',     length: '24"',  price: 349900, pss: 380000, img: '/product-wig.jpg',      featured: true  },
  { id: 5, name: 'Silk Base Closure',      category: 'Closures', length: '16"',  price:  89900, pss: 105000, img: '/product-closure.jpg',  featured: false },
  { id: 6, name: '13x4 Lace Frontal',      category: 'Frontals', length: '18"',  price: 189900, pss: 210000, img: '/product-frontal.jpg',  featured: true  },
  { id: 7, name: 'Kinky Curly Bundle',     category: 'Bundles',  length: '20"',  price: 139900, pss: 160000, img: '/product-kinky.jpg',    featured: false },
  { id: 8, name: 'Straight Lace Wig',      category: 'Wigs',     length: '26"',  price: 399900, pss: 430000, img: '/product-wig.jpg',      featured: false },
];

// Interest rate by number of installments
const INTEREST = { 2: 0, 3: 10, 4: 10, 5: 20, 6: 20 };

function fmt(n) {
  return '₦' + Math.ceil(n).toLocaleString('en-NG');
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id));

  const [showInstallment, setShowInstallment] = useState(false);
  const [installments, setInstallments] = useState(2);

  if (!product) {
    return (
      <main>
        <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Product Not Found</h2>
          <Link to="/products" className="pd-back-link">← Back to Shop</Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Installment calculations
  const rate        = INTEREST[installments] / 100;
  const total       = product.price * (1 + rate);
  const monthly     = total / installments;
  const interestAmt = total - product.price;

  return (
    <main>
      <div className="container pd-container">
        <Link to="/products" className="pd-back-link">
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="pd-layout">
          {/* Image */}
          <div className="pd-image-col">
            <div className="pd-img-wrap">
              <img src={product.img} alt={product.name} />
              {product.featured && <span className="feat-badge">Featured</span>}
            </div>
          </div>

          {/* Info */}
          <div className="pd-info-col">
            <p className="pd-category">{product.category}</p>
            <h1 className="pd-title">{product.name}</h1>
            <span className="pd-length-badge">{product.length}</span>

            {/* Pricing card */}
            <div className="pd-pricing-card">
              <p className="pd-price-label">Full Payment</p>
              <p className="pd-price">{fmt(product.price)}</p>
              <p className="pd-pss-note" style={{ marginTop: '0.5rem' }}>
                Delivery is only made after full payment is completed.
              </p>
            </div>

            {/* Installment panel */}
            <div className="pd-installment-section">
              <button
                className="pd-installment-toggle"
                onClick={() => setShowInstallment(v => !v)}
              >
                Pay in Installments
                <ChevronDown
                  size={16}
                  style={{ transition: 'transform 0.2s', transform: showInstallment ? 'rotate(180deg)' : 'none' }}
                />
              </button>

              {showInstallment && (
                <div className="pd-installment-panel">
                  {/* Installment count selector */}
                  <div className="pd-select-group">
                    <label className="pd-select-label">Number of Monthly Installments</label>
                    <div className="pd-installment-pills">
                      {[2, 3, 4, 5, 6].map(n => (
                        <button
                          key={n}
                          className={`pd-inst-pill${installments === n ? ' active' : ''}`}
                          onClick={() => setInstallments(n)}
                        >
                          {n}×
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="pd-breakdown">
                    <div className="pd-breakdown-row">
                      <span>Interest rate</span>
                      <span className={INTEREST[installments] > 0 ? 'pd-highlight' : 'pd-zero'}>
                        {INTEREST[installments]}%
                        {INTEREST[installments] === 0 && ' 🎉'}
                      </span>
                    </div>
                    {interestAmt > 0 && (
                      <div className="pd-breakdown-row">
                        <span>Interest added</span>
                        <span className="pd-highlight">{fmt(interestAmt)}</span>
                      </div>
                    )}
                    <div className="pd-breakdown-row">
                      <span>Total to pay</span>
                      <span><strong>{fmt(total)}</strong></span>
                    </div>
                    <div className="pd-breakdown-row pd-monthly-row">
                      <span>Monthly payment</span>
                      <span className="pd-monthly-amt">{fmt(monthly)} / month</span>
                    </div>
                    <p className="pd-inst-note">
                      × {installments} monthly payments of {fmt(monthly)}{' '}
                      {interestAmt > 0 ? `(includes ${INTEREST[installments]}% interest)` : '(0% interest)'}
                    </p>
                  </div>

                  <button className="pd-installment-btn">
                    Start Installment Plan — {fmt(monthly)}/mo
                  </button>
                </div>
              )}
            </div>

            {/* Buy once button */}
            <button className="pd-buy-btn">
              <ShoppingBag size={18} />
              Buy Once — {fmt(product.price)}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
