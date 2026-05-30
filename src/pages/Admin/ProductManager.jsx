import { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import ConfirmModal from '../../components/ConfirmModal';
import toast from 'react-hot-toast';

const SkeletonRow = () => (
  <tr style={{ borderBottom: '1px solid var(--border)' }}>
    <td style={{ padding: '0.75rem' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        background: 'var(--muted)', 
        borderRadius: '4px',
        animation: 'shimmer 1.5s infinite'
      }} />
    </td>
    <td style={{ padding: '0.75rem' }}>
      <div style={{ height: '1rem', width: '80%', background: 'var(--muted)', borderRadius: '4px', animation: 'shimmer 1.5s infinite' }} />
    </td>
    <td style={{ padding: '0.75rem' }}>
      <div style={{ height: '0.85rem', width: '60%', background: 'var(--muted)', borderRadius: '4px', animation: 'shimmer 1.5s infinite' }} />
    </td>
    <td style={{ padding: '0.75rem' }}>
      <div style={{ height: '0.85rem', width: '50%', background: 'var(--muted)', borderRadius: '4px', animation: 'shimmer 1.5s infinite' }} />
    </td>
    <td style={{ padding: '0.75rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <div style={{ width: '18px', height: '18px', background: 'var(--muted)', borderRadius: '4px', animation: 'shimmer 1.5s infinite' }} />
        <div style={{ width: '18px', height: '18px', background: 'var(--muted)', borderRadius: '4px', animation: 'shimmer 1.5s infinite' }} />
      </div>
    </td>
  </tr>
);

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
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

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteDoc(doc(db, "products", productToDelete.id));
      setProducts(products.filter(p => p.id !== productToDelete.id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    setProductToDelete(null);
  };

  const handleToggleVisibility = async (product) => {
    try {
      const newHidden = !product.is_hidden;
      await updateDoc(doc(db, "products", product.id), { is_hidden: newHidden });
      setProducts(products.map(p => p.id === product.id ? { ...p, is_hidden: newHidden } : p));
      toast.success(newHidden ? 'Product hidden from shop.' : 'Product is now visible.');
    } catch (err) {
      console.error('Error toggling visibility:', err);
      toast.error('Failed to update visibility.');
    }
  };

  if (loading) return (
    <div style={{ background: 'var(--card)', padding: '1.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-card)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <div style={{ height: '2rem', width: '180px', background: 'var(--muted)', borderRadius: '6px', animation: 'shimmer 1.5s infinite' }} />
        <div style={{ height: '2.5rem', width: '140px', background: 'var(--muted)', borderRadius: '8px', animation: 'shimmer 1.5s infinite' }} />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--muted-fg)' }}>
            <th style={{ padding: '0.75rem' }}>Image</th>
            <th style={{ padding: '0.75rem' }}>Name</th>
            <th style={{ padding: '0.75rem' }}>Category</th>
            <th style={{ padding: '0.75rem' }}>Price</th>
            <th style={{ padding: '0.75rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map(i => <SkeletonRow key={i} />)}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <div style={{ background: 'var(--card)', padding: '1.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', margin: 0 }}>Manage Products</h1>
          <Link to="/admin/new" className="buy-once-btn" style={{ textDecoration: 'none', height: '2.5rem', fontSize: '0.85rem', padding: '0 1.25rem', flexShrink: 0 }}>
            Add New Product
          </Link>
        </div>

        {products.length === 0 ? (
          <p style={{ color: 'var(--muted-fg)' }}>No products found. Add some to get started!</p>
        ) : (
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--muted-fg)' }}>
                  <th style={{ padding: '0.75rem' }}>Image</th>
                  <th style={{ padding: '0.75rem' }}>Name</th>
                  <th style={{ padding: '0.75rem' }}>Category</th>
                  <th style={{ padding: '0.75rem' }}>Price</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem' }}>
                      <img src={product.img} alt={product.name} loading="lazy" decoding="async" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: 500 }}>
                      {product.name}
                      {product.is_hidden && <span style={{ marginLeft: '0.5rem', fontSize: '0.65rem', background: '#6b7280', color: 'white', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, letterSpacing: '0.05em' }}>HIDDEN</span>}
                    </td>
                    <td style={{ padding: '0.75rem' }}>{product.category}</td>
                    <td style={{ padding: '0.75rem' }}>₦{product.price.toLocaleString()}</td>
                    <td style={{ padding: '0.75rem' }}>
                      {product.inventory_status === 'out_of_stock' ? (
                        <span style={{ fontSize: '0.7rem', background: '#fee2e2', color: '#b91c1c', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>OUT OF STOCK</span>
                      ) : product.items_left !== null && product.items_left !== undefined ? (
                        <span style={{ fontSize: '0.7rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>{product.items_left} left</span>
                      ) : (
                        <span style={{ fontSize: '0.7rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>In Stock</span>
                      )}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Link to={`/admin/edit/${product.id}`} style={{ color: 'var(--primary)' }}><Edit size={18} /></Link>
                        <button onClick={() => handleToggleVisibility(product)} style={{ color: product.is_hidden ? '#6b7280' : '#10b981', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} title={product.is_hidden ? 'Show product' : 'Hide product'}>
                          {product.is_hidden ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <button onClick={() => handleDeleteClick(product)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => {
          setShowConfirm(false);
          setProductToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        danger
      />
    </>
  );
}