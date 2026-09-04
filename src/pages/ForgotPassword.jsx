import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import Footer from '../components/Footer';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ACTION_CODE_SETTINGS = {
  // After password reset, Firebase redirects the user back to /login
  url: `${window.location.origin}/login`,
  handleCodeInApp: false,
};

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email, ACTION_CODE_SETTINGS);
      setEmailSent(true);
      toast.success('Password reset email sent!');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-email') {
        // For security, don't reveal whether the email exists
        // Just show the success state anyway (prevents email enumeration attacks)
        setEmailSent(true);
        return;
      } else {
        setError('Failed to send reset email. Please try again.');
      }
      toast.error('Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="auth-page">
        <div className="auth-card">
          <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted-fg)', marginBottom: '1.5rem', textDecoration: 'none', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Login
          </Link>
          
          {emailSent ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '2rem', marginBottom: '1.5rem' }}>
                  <CheckCircle size={48} color="#16a34a" />
                  <div>
                    <h3 style={{ color: '#15803d', marginBottom: '0.5rem' }}>Check your inbox</h3>
                    <p style={{ color: '#166534', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      We've sent a password reset link to<br/><strong>{email}</strong>
                    </p>
                    <p style={{ color: '#166534', fontSize: '0.85rem', marginTop: '0.75rem', lineHeight: '1.5' }}>
                      Click the link in the email to securely reset your password. You'll be redirected back to login when done.
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                      Didn't get it? Check your spam folder.
                    </p>
                  </div>
                </div>
              <button onClick={() => setEmailSent(false)} className="auth-submit" style={{ background: 'transparent', color: 'var(--foreground)', border: '1px solid var(--border)' }}>
                Try another email
              </button>
            </div>
          ) : (
            <>
              <h1>Reset Password</h1>
              <p className="sub">Enter your email to receive a password reset link</p>
              
              {error && <div style={{ color: 'red', fontSize: '0.85rem', marginBottom: '1rem', background: '#fee2e2', padding: '0.5rem', borderRadius: '4px' }}>{error}</div>}
              
              <form onSubmit={handleResetPassword}>
                <div className="form-group">
                  <label>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-fg)' }} />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                </div>
                <button type="submit" className="auth-submit" disabled={loading}>
                  {loading ? 'Sending Link...' : 'Send Reset Link'}
                </button>
              </form>
              
              <div className="auth-link">
                Remember your password? <Link to="/login">Sign In</Link>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}