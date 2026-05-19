import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ChevronDown } from 'lucide-react';
import Footer from '../components/Footer';

const PRODUCTS = [
  { id: 1, name: 'Silky Straight Bundle',  category: 'Bundles',  length: '18"',  price: '₦129,900', pss: '₦150,000', img: '/product-straight.jpg',  featured: true,  description: 'Premium 100% virgin human hair straight bundles. Soft, silky, and tangle-free with a natural shine. Can be dyed, bleached, and heat-styled repeatedly without losing quality.' },
  { id: 2, name: 'Body Wave Bundle',        category: 'Bundles',  length: '20"',  price: '₦149,900', pss: '₦170,000', img: '/product-bodywave.jpg', featured: true,  description: 'Gorgeous body wave pattern with natural movement. 100% virgin human hair that blends seamlessly with natural textures. Soft, bouncy, and full of volume.' },
  { id: 3, name: 'Deep Wave Bundle',        category: 'Bundles',  length: '22"',  price: '₦159,900', pss: '₦180,000', img: '/product-deepwave.jpg', featured: false, description: 'Deep wave bundles with luscious curls that hold their shape beautifully. 100% virgin hair, minimal shedding, and can be re-curled after washing.' },
  { id: 4, name: 'HD Lace Front Wig',       category: 'Wigs',     length: '24"',  price: '₦349,900', pss: '₦380,000', img: '/product-wig.jpg',      featured: true,  description: 'Ultra-thin HD lace that melts seamlessly into any skin tone. Pre-plucked hairline for a natural look. 100% virgin human hair for easy styling.' },
  { id: 5, name: 'Silk Base Closure',       category: 'Closures', length: '16"',  price: '₦89,900',  pss: '₦105,000', img: '/product-closure.jpg',  featured: false, description: '4x4 silk base closure with a natural scalp appearance. Perfectly matches the look of a real scalp for undetectable installs.' },
  { id: 6, name: '13x4 Lace Frontal',       category: 'Frontals', length: '18"',  price: '₦189,900', pss: '₦210,000', img: '/product-frontal.jpg',  featured: true,  description: '13x4 HD lace frontal covering ear to ear. Allows for versatile styling including ponytails and middle parts. Pre-plucked with baby hairs.' },
  { id: 7, name: 'Kinky Curly Bundle',      category: 'Bundles',  length: '20"',  price: '₦139,900', pss: '₦160,000', img: '/product-kinky.jpg',    featured: false, description: 'Natural kinky curly pattern that mimics afro-textured hair. 100% virgin human hair, full and thick with minimal shedding.' },
  { id: 8, name: 'Straight Lace Wig',       category: 'Wigs',     length: '26"',  price: '₦399,900', pss: '₦430,000', img: '/product-wig.jpg',      featured: false, description: 'Bone straight lace front wig with a silky smooth texture. Glueless option available. 100% virgin human hair with a pre-plucked natural hairline.' },
];

const FREQUENCIES = ['Daily', 'Every 3 Days', 'Every 4 Days', 'Weekly'];
const AMOUNTS     = ['₦1,000', '₦2,000', '₦3,000', '₦5,000', '₦10,000'];

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id));

  const [showInstallment, setShowInstallment] = useState(false);
  const [frequency, setFrequency]             = useState(FREQUENCIES[0]);
  const [amount, setAmount]                   = useState(AMOUNTS[0]);

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

  return (
    <main>
      <div className="container pd-container">
        {/* Breadcrumb */}
        <Link to="/products" className="pd-back-link">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        {/* Two-column layout */}
        <div className="pd-layout">
          {/* Left: Image */}
          <div className="pd-image-col">
            <div className="pd-img-wrap">
              <img src={product.img} alt={product.name} />
              {product.featured && <span className="feat-badge">Featured</span>}
            </div>
          </div>

          {/* Right: Info */}
          <div className="pd-info-col">
            <p className="pd-category">{product.category}</p>
            <h1 className="pd-title">{product.name}</h1>

            <span className="pd-length-badge">{product.length}</span>

            <p className="pd-description">{product.description}</p>

            {/* Pricing card */}
            <div className="pd-pricing-card">
              <div className="pd-pricing-row">
                <div>
                  <p className="pd-price-label">Full Payment</p>
                  <p className="pd-price">{product.price}</p>
                </div>
                <div className="pd-divider" />
                <div>
                  <p className="pd-price-label">Pay Small Small</p>
                  <p className="pd-pss-price">{product.pss}</p>
                </div>
              </div>
              <p className="pd-pss-note">
                Choose daily, every 3 days, every 4 days or weekly payments. Maximum duration: 30 days.
                Delivery only after full payment is completed.
              </p>
            </div>

            {/* Installment panel */}
            <div className="pd-installment-section">
              <button
                className="pd-installment-toggle"
                onClick={() => setShowInstallment(v => !v)}
              >
                Start Installment
                <ChevronDown
                  size={16}
                  style={{ transition: 'transform 0.2s', transform: showInstallment ? 'rotate(180deg)' : 'none' }}
                />
              </button>

              {showInstallment && (
                <div className="pd-installment-panel">
                  <div className="pd-select-group">
                    <label className="pd-select-label">Payment Frequency</label>
                    <div className="pd-select-wrap">
                      <select
                        value={frequency}
                        onChange={e => setFrequency(e.target.value)}
                        className="pd-select"
                      >
                        {FREQUENCIES.map(f => <option key={f}>{f}</option>)}
                      </select>
                      <ChevronDown size={14} className="pd-select-icon" />
                    </div>
                  </div>

                  <div className="pd-select-group">
                    <label className="pd-select-label">Payment Amount</label>
                    <div className="pd-select-wrap">
                      <select
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        className="pd-select"
                      >
                        {AMOUNTS.map(a => <option key={a}>{a}</option>)}
                      </select>
                      <ChevronDown size={14} className="pd-select-icon" />
                    </div>
                  </div>

                  <button className="pd-installment-btn">
                    Start Installment Plan
                  </button>
                </div>
              )}
            </div>

            {/* Full payment button */}
            <button className="pd-buy-btn">
              <ShoppingBag size={18} />
              Buy Full Payment
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
