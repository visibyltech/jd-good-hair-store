import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Login() {
  return (
    <main>
      <div className="auth-page">
        <div className="auth-card">
          <h1>Welcome Back</h1>
          <p className="sub">Sign in to your account</p>
          <form onSubmit={e => e.preventDefault()}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
            <button type="submit" className="auth-submit">Sign In</button>
          </form>
          <div className="auth-link">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
