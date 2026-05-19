import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        {/* original uses /products — also keep /shop as alias */}
        <Route path="/products"      element={<Shop />} />
        <Route path="/products/:id"   element={<ProductDetail />} />
        <Route path="/shop"           element={<Shop />} />
        <Route path="/bundles"        element={<Shop />} />
        <Route path="/wigs"           element={<Shop />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/register"       element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
