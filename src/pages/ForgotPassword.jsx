import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Footer from '../components/Footer';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Check if user exists in Firestore
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('No account found with this email address.');
        toast.error('No account found.');
        setLoading(false);
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      // 2. Generate OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      // 3. Save OTP to Firestore
      await updateDoc(doc(db, 'users', userDoc.id), {
        resetOtp: otpCode,
        resetOtpExpiresAt: otpExpiresAt
      });

      // 4. Send via WhatsApp/SMS (if phone exists)
      if (userData.phone) {
        try {
          await addDoc(collection(db, 'otp_requests'), {
            phone: userData.phone,
            otpCode: otpCode,
            status: 'pending',
            createdAt: new Date()
          });
        } catch (waErr) {
          console.error('WhatsApp OTP error:', waErr);
        }
      }

      // 5. Send via EmailJS
      try {
        await emailjs.send(
          'service_mcu3hnj', // JD EmailJS Service ID
          'template_643qpnq', // JD template ID
          {
            email: email,
            name: userData.firstName || 'Customer',
            otp: otpCode,
            code: otpCode
          },
          'A7Sq--0D6K2sijujF' // JD EmailJS Public Key
        );
      } catch (emailErr) {
        console.error('EmailJS error:', emailErr);
      }

      // Redirect to Verify Reset OTP page
      toast.success('Password reset code sent!');
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);

    } catch (err) {
      console.error(err);
      setError('Failed to process reset request. Please try again.');
      toast.error('Failed to send reset code.');
    } finally {
      setLoading(false);
    }
  };

  // emailSent state is removed since we navigate to /reset-password
  return (
    <main>
      <div className="auth-page">
        <div className="auth-card">
          <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted-fg)', marginBottom: '1.5rem', textDecoration: 'none', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Login
          </Link>
          <h1>Reset Password</h1>
          <p className="sub">Enter your email to receive a password reset code</p>
          
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
              {loading ? 'Sending Code...' : 'Send Reset Code'}
            </button>
          </form>
          
          <div className="auth-link">
            Remember your password? <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}