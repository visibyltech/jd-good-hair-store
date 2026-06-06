import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { verifyOTP as serviceVerifyOTP, generateAndStoreOTP } from '../utils/otpService';
import toast from 'react-hot-toast';
import Footer from '../components/Footer';

export default function VerifyOTP() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const navigate = useNavigate();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  };

  const verifyOTPHandler = async (e) => {
    e.preventDefault();
    const enteredCode = otp.join('');
    if (enteredCode.length !== 6) {
      setError('Please enter the 6-digit code.');
      toast.error('Please enter the 6-digit code.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Verify via OTP Service
      await serviceVerifyOTP(email, enteredCode, 'email_verification');

      // 2. Mark user doc as verified using the authenticated user's UID (not email query)
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.email === email) {
        await updateDoc(doc(db, 'users', currentUser.uid), {
          isEmailVerified: true
        });
      } else {
        // Fallback: query by email but only update if doc email matches exactly
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          if (userDoc.data().email === email) {
            await updateDoc(doc(db, 'users', userDoc.id), {
              isEmailVerified: true
            });
          }
        }
      }

      toast.success('Email successfully verified!');
      navigate('/login');

    } catch (err) {
      console.error(err);
      const msg = err.message || 'Failed to verify OTP.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        if (userData.isEmailVerified) {
          toast.success('Email is already verified.');
          navigate('/login');
          return;
        }

        // Generate and store new OTP, passing user's name for the email template
        const userName = userData.firstName || 'Customer';
        await generateAndStoreOTP(email, 'email_verification', userName);
      } else {
        await generateAndStoreOTP(email, 'email_verification');
      }

      toast.success('A new OTP has been sent to your email.');
      setOtp(['', '', '', '', '', '']);
    } catch (err) {
      console.error(err);
      setError('Failed to resend OTP. Please try again later.');
      toast.error('Failed to resend OTP.');
    } finally {
      setResending(false);
    }
  };

  return (
    <main>
      <div className="auth-page">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <h1>Verify Your Email</h1>
          <p className="sub" style={{ marginBottom: '2rem' }}>
            We sent a 6-digit code to <strong>{email}</strong>. <br />
            Enter it below to confirm your email address.
          </p>

          {error && <div style={{ color: 'red', fontSize: '0.85rem', marginBottom: '1.5rem', background: '#fee2e2', padding: '0.75rem', borderRadius: '8px' }}>{error}</div>}

          <form onSubmit={verifyOTPHandler}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  style={{
                    width: '3rem',
                    height: '3.5rem',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--card-bg)',
                    color: 'var(--fg)',
                    fontWeight: 'bold'
                  }}
                />
              ))}
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--muted-fg)' }}>
            Didn't receive the code?{' '}
            <button 
              onClick={handleResend} 
              disabled={resending}
              style={{ 
                background: 'none', border: 'none', color: 'var(--primary)', 
                fontWeight: '600', cursor: resending ? 'not-allowed' : 'pointer',
                textDecoration: 'underline'
              }}
            >
              {resending ? 'Sending...' : 'Resend Code'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
