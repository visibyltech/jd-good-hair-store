import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import useAuthStore from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';
import ReturnToTopButton from './components/ReturnToTopButton';
import './index.css';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const VerifyOTP = lazy(() => import('./pages/VerifyOTP'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Profile = lazy(() => import('./pages/Profile'));
const Cart = lazy(() => import('./pages/Cart'));

// Admin pages
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout'));
const ProductManager = lazy(() => import('./pages/Admin/ProductManager'));
const ProductForm = lazy(() => import('./pages/Admin/ProductForm'));
const AdminOrders = lazy(() => import('./pages/Admin/AdminOrders'));
const SiteSettings = lazy(() => import('./pages/Admin/SiteSettings'));

// Other pages
const DeliveryPortal = lazy(() => import('./pages/DeliveryPortal'));
const Notifications = lazy(() => import('./pages/Notifications'));

function App() {
  const { user, init, loading } = useAuthStore();

  useEffect(() => {
    init();
  }, [init]);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--primary)' }}>Loading JD Good Hair...</div>;
  }

  return (
    <Router>
      <ScrollToTop />
      <ReturnToTopButton />
      <Navbar />
      <Toaster position="top-center" toastOptions={{ style: { background: '#333', color: '#fff', borderRadius: '8px' } }} />
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--muted-fg)' }}>Loading...</div>}>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/products"      element={<Shop />} />
          <Route path="/products/:id"   element={<ProductDetail />} />
          <Route path="/shop"           element={<Shop />} />
          <Route path="/bundles"        element={<Shop />} />
          <Route path="/wigs"           element={<Shop />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/register"  element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile"   element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/cart"           element={<Cart />} />
          <Route path="/delivery"        element={<DeliveryPortal />} />
          <Route path="/notifications"   element={user ? <Notifications /> : <Navigate to="/login" />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<ProductManager />} />
            <Route path="new" element={<ProductForm />} />
            <Route path="edit/:id" element={<ProductForm />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="settings" element={<SiteSettings />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
