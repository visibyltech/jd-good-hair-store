import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Register() {
  return (
    <main>
      <div className="auth-page">
        <div className="auth-card">
          <h1>Create Account</h1>
          <p className="sub">Join JD Good Hair today</p>
          <form onSubmit={e => e.preventDefault()}>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="First name" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Last name" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="Phone number" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Create a password" />
            </div>
            <button type="submit" className="auth-submit">Sign Up</button>
          </form>
          <div className="auth-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
