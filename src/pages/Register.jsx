import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Footer from '../components/Footer';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import LegalModal from '../components/LegalModal';
import { generateAndStoreOTP } from '../utils/otpService';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [activeLegal, setActiveLegal] = useState(null); // 'terms' | 'privacy' | null

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'phone') {
      value = value.replace(/\D/g, ''); // only allow digits
    }
    setFormData(prev => ({ ...prev, [e.target.name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    if (!agreedToTerms || !agreedToPrivacy) {
      setError('You must read and accept both the Terms & Conditions and Privacy Policy to continue.');
      toast.error('Please accept both legal documents to proceed.');
      return;
    }

    // +234 Nigerian phone formatting
    let formattedPhone = formData.phone;
    if (formattedPhone.startsWith('0')) {
      formattedPhone = formattedPhone.substring(1);
    }
    if (formattedPhone.length !== 10) {
      setError('Please enter a valid 10-digit phone number (e.g. 8012345678).');
      toast.error('Invalid phone number length.');
      return;
    }
    const finalPhone = '+234' + formattedPhone;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Sign out immediately so they must verify OTP first
      await auth.signOut();

      await setDoc(doc(db, 'users', user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: finalPhone,
        email: formData.email,
        isEmailVerified: false,
        isPhoneVerified: false,
        createdAt: new Date()
      });

      // Send OTP for all users — admin access is granted via Firestore role, not registration bypass
      try {
        await generateAndStoreOTP(formData.email, 'email_verification');
      } catch (otpErr) {
        console.error('OTP generation error:', otpErr);
        toast.error('Failed to send verification email. You can resend it on the next page.');
      }

      navigate(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please login instead.');
        toast.error('This email is already registered.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please use at least 6 characters.');
        toast.error('Password is too weak.');
      } else if (err.message && err.message.toLowerCase().includes('offline')) {
        setError('Please check your internet connection and try again.');
        toast.error('Check your internet connection.');
      } else {
        setError('Failed to register. Please try again later.');
        toast.error('Failed to register. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="auth-page">
        <div className="auth-card">
          <h1>Create Account</h1>
          <p className="sub">Join JD Good Hair today</p>

          {error && (
            <div style={{ color: 'red', fontSize: '0.85rem', marginBottom: '1rem', background: '#fee2e2', padding: '0.5rem 1rem', borderRadius: '8px' }}>
              {error}
            </div>
          )}

          {successMessage ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', border: '1px solid #86efac', borderRadius: '12px', padding: '2rem' }}>
                <CheckCircle size={48} color="#16a34a" strokeWidth={1.5} />
                <div>
                  <h3 style={{ color: '#15803d', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Account Created!</h3>
                  <p style={{ color: '#166534', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{successMessage}</p>
                  <p style={{ color: '#166534', fontSize: '0.85rem' }}>
                    A verification OTP has been sent to your phone and email.<br />Please check your WhatsApp or inbox.
                  </p>
                </div>
              </div>
              <Link to="/login" className="auth-submit" style={{ display: 'inline-block', textDecoration: 'none', marginTop: '1.5rem' }}>
                Go to Login →
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} placeholder="First name" required onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} placeholder="Last name" required onChange={handleChange} />
                </div>

                {/* Phone with +234 prefix */}
                <div className="form-group">
                  <label>Phone Number</label>
                  <div style={{ display: 'flex' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', padding: '0 0.75rem',
                      border: '1px solid var(--border)', borderRight: 'none',
                      borderRadius: 'var(--radius) 0 0 var(--radius)',
                      background: 'var(--muted)', color: 'var(--foreground)',
                      fontSize: '0.875rem', fontWeight: '700', whiteSpace: 'nowrap'
                    }}>
                      +234
                    </span>
                    <input
                      type="tel" name="phone" value={formData.phone}
                      placeholder="800 000 0000" required onChange={handleChange} maxLength="11"
                      style={{ borderRadius: '0 var(--radius) var(--radius) 0', flex: 1 }}
                    />
                  </div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--muted-fg)', marginTop: '0.25rem' }}>
                    Enter your number without the leading zero (e.g. 8012345678)
                  </p>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} placeholder="you@example.com" required onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password" value={formData.password}
                      placeholder="Create a password" minLength="6" required onChange={handleChange}
                      style={{ width: '100%', paddingRight: '44px' }}
                    />
                    <button type="button" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888', display: 'flex', alignItems: 'center' }}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword" value={formData.confirmPassword}
                      placeholder="Confirm your password" minLength="6" required onChange={handleChange}
                      style={{ width: '100%', paddingRight: '44px' }}
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(v => !v)} aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888', display: 'flex', alignItems: 'center' }}>
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Legal Agreement Checkboxes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1rem 0' }}>
                  {/* Terms */}
                  <div
                    onClick={() => !agreedToTerms && setActiveLegal('terms')}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                      border: `1px solid ${agreedToTerms ? '#86efac' : 'var(--border)'}`,
                      borderRadius: 'var(--radius)', padding: '0.75rem',
                      background: agreedToTerms ? '#f0fdf4' : 'var(--muted)',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0, marginTop: '2px',
                      border: `2px solid ${agreedToTerms ? '#16a34a' : 'var(--border)'}`,
                      background: agreedToTerms ? '#16a34a' : 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {agreedToTerms && <span style={{ color: 'white', fontSize: '10px', fontWeight: '900' }}>✓</span>}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--foreground)', lineHeight: 1.5 }}>
                      I have read and accept the{' '}
                      <button type="button" onClick={(e) => { e.stopPropagation(); setActiveLegal('terms'); }}
                        style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit' }}>
                        Terms & Conditions
                      </button>
                    </p>
                  </div>

                  {/* Privacy */}
                  <div
                    onClick={() => !agreedToPrivacy && setActiveLegal('privacy')}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                      border: `1px solid ${agreedToPrivacy ? '#86efac' : 'var(--border)'}`,
                      borderRadius: 'var(--radius)', padding: '0.75rem',
                      background: agreedToPrivacy ? '#f0fdf4' : 'var(--muted)',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0, marginTop: '2px',
                      border: `2px solid ${agreedToPrivacy ? '#16a34a' : 'var(--border)'}`,
                      background: agreedToPrivacy ? '#16a34a' : 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {agreedToPrivacy && <span style={{ color: 'white', fontSize: '10px', fontWeight: '900' }}>✓</span>}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--foreground)', lineHeight: 1.5 }}>
                      I have read and accept the{' '}
                      <button type="button" onClick={(e) => { e.stopPropagation(); setActiveLegal('privacy'); }}
                        style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit' }}>
                        Privacy Policy
                      </button>
                      {' '}and consent to data processing under Nigerian NDPR.
                    </p>
                  </div>
                </div>

                <button type="submit" className="auth-submit" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </form>
              <div className="auth-link">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />

      {/* Legal Modals */}
      {activeLegal && (
        <LegalModal
          type={activeLegal}
          onClose={() => setActiveLegal(null)}
          onAccept={(type) => {
            if (type === 'terms') setAgreedToTerms(true);
            if (type === 'privacy') setAgreedToPrivacy(true);
          }}
        />
      )}
    </main>
  );
}
