import { useState, useRef, useEffect, useCallback } from 'react';

const TERMS_CONTENT = (
  <div className="legal-content">
    <div className="legal-disclaimer">
      <p>
        <strong>Disclaimer:</strong> This document is tailored to Nigerian consumer and cyber laws for informational
        purposes and does not constitute formal legal advice. E-commerce in Nigeria is governed by agencies like the{' '}
        <strong>FCCPC</strong> and <strong>NITDA</strong>.
      </p>
    </div>

    <p>Welcome to <strong>JD Good Hair!</strong> These Terms and Conditions ("Terms") govern your use of our website and the purchase of any products from us. By accessing the Site or purchasing a product, you agree to be bound by these Terms.</p>

    {[
      {
        n: '1', title: 'Eligibility & Account Security',
        body: 'By using this Site, you represent that you are at least 18 years of age or accessing the Site under the supervision of a parent or legal guardian. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.'
      },
      {
        n: '2', title: 'Product Information and Pricing',
        body: 'We strive to be as accurate as possible with product descriptions and images. However, JD Good Hair does not warrant that product descriptions are 100% accurate. In the event of a pricing error, JD Good Hair reserves the right to refuse or cancel orders, and if payment has been processed, a full refund will be issued.'
      },
      {
        n: '3', title: 'Payments and Billing',
        body: 'All payments are securely processed through Korapay. We accept Naira debit cards (Visa, MasterCard, Verve), bank transfers, and pay-with-bank options. Installment plans are subject to an interest charge as displayed on the product page. By submitting an order, you authorize JD Good Hair (via Korapay) to charge your designated payment method for the stated amount.'
      },
      {
        n: '4', title: 'Shipping, Delivery, and Risk of Loss',
        body: 'Delivery dates given at checkout are estimates only and cannot be guaranteed. JD Good Hair is not liable for delays caused by local dispatch services or factors beyond our control. Risk of loss and title for items pass to you upon our delivery to the courier/logistics partner.'
      },
    ].map(s => (
      <div key={s.n} className="legal-section">
        <h3 className="legal-section-title">
          <span className="legal-num">{s.n}</span>
          {s.title}
        </h3>
        <p>{s.body}</p>
      </div>
    ))}

    <div className="legal-highlight-box">
      <div className="legal-highlight-header">
        <span>⚠️</span>
        <h3>5. Return & Refund Policy for Hair Products</h3>
      </div>
      <div className="legal-highlight-body">
        <p><strong>Hygiene Policy:</strong> For hygiene and safety reasons, all hair extension products (bundles, wigs, closures, frontals) cannot be returned once removed from their original packaging or worn.</p>
        <p><strong>Installment Plans:</strong> Customers on installment plans must continue to honour all payment obligations regardless of any dissatisfaction, unless a product is proven to be materially defective upon delivery.</p>
        <p><strong>Inspection Upon Delivery:</strong> Customers are strongly advised to inspect their products thoroughly at the point of delivery before signing off with the courier.</p>
      </div>
    </div>

    {[
      {
        n: '6', title: 'Intellectual Property',
        body: 'All content on this Site — including text, graphics, logos, and images — is the property of JD Good Hair and is protected by Nigerian and international copyright laws.'
      },
      {
        n: '7', title: 'Limitation of Liability',
        body: 'To the maximum extent permitted by applicable Nigerian law, JD Good Hair shall not be liable for any indirect, incidental, or consequential damages. Our total liability shall not exceed the amount you paid for the specific product in question.'
      },
      {
        n: '8', title: 'Governing Law',
        body: 'These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any legal actions must be brought before courts of competent jurisdiction in Nigeria.'
      },
      {
        n: '9', title: 'Changes to These Terms',
        body: 'JD Good Hair reserves the right to update or modify these Terms at any time without prior notice. Your continued use of the Site following any changes constitutes your acceptance of the new Terms.'
      },
    ].map(s => (
      <div key={s.n} className="legal-section">
        <h3 className="legal-section-title">
          <span className="legal-num">{s.n}</span>
          {s.title}
        </h3>
        <p>{s.body}</p>
      </div>
    ))}

    <div className="legal-section">
      <h3 className="legal-section-title">
        <span className="legal-num">10</span>
        Contact Information
      </h3>
      <p>For any questions, please contact us at: support@jdgoodhair.com | Address: Nigeria</p>
    </div>

    <div className="legal-footer-note">
      End of Terms & Conditions — Last Updated May 29, 2026
    </div>
  </div>
);

const PRIVACY_CONTENT = (
  <div className="legal-content">
    <p>JD Good Hair ("we", "our", "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information. This policy is aligned with the <strong>Nigeria Data Protection Regulation (NDPR)</strong> issued by NITDA.</p>

    {[
      {
        n: '1', title: 'Information We Collect',
        body: 'We may collect: Identity Data (first name, last name), Contact Data (email address, phone number), Delivery Data (address, state, LGA, landmark), Payment Data (processed securely by Korapay — we do not store card details), Technical Data (IP address, browser type), and Transaction Data (products purchased, installment plans, and payment records).'
      },
      {
        n: '2', title: 'How We Use Your Information',
        body: 'We use your information to: process and fulfill your orders and payments, communicate with you via email and WhatsApp about order status, delivery updates, and installment payment reminders, send OTP verification codes during account creation, improve our website experience, comply with legal obligations under Nigerian law, and detect and prevent fraudulent transactions.'
      },
      {
        n: '3', title: 'Sharing Your Information',
        body: 'We do NOT sell your personal data to third parties. We may share your information only with: Korapay (to process payments), logistics and courier partners (to fulfill delivery), WhatsApp Business/Meta (to send order and OTP notifications), Firebase/Google (for secure data storage and authentication), and law enforcement or regulatory bodies (FCCPC, NITDA) if required by law.'
      },
      {
        n: '4', title: 'Data Security',
        body: 'We implement appropriate technical and organisational security measures to protect your personal data against accidental loss, unauthorised access, and disclosure. Your account password is hashed and never stored in plain text. Payment data is processed entirely through Korapay\'s PCI-DSS compliant infrastructure — JD Good Hair does not store your card details.'
      },
      {
        n: '5', title: 'Your Rights Under Nigerian Law (NDPR)',
        body: 'Under the NDPR, you have the right to: request access to the personal data we hold about you, request correction of inaccurate data, request erasure of your personal data, and lodge a complaint with NITDA if you believe your data rights have been violated. To exercise these rights, contact us at support@jdgoodhair.com.'
      },
      {
        n: '6', title: 'Cookies',
        body: 'Our website uses session-based storage and local storage to maintain your shopping cart and login state. We do not use tracking cookies for advertising purposes.'
      },
      {
        n: '7', title: "Children's Privacy",
        body: 'Our Site is not directed at children under 18. We do not knowingly collect personal information from minors. If you believe a child has provided us with personal data, please contact us immediately so we can delete it.'
      },
      {
        n: '8', title: 'Changes to This Policy',
        body: 'We may update this Privacy Policy from time to time. Continued use of the Site after any changes signifies your acceptance of the updated policy.'
      },
    ].map(s => (
      <div key={s.n} className="legal-section">
        <h3 className="legal-section-title">
          <span className="legal-num" style={{ background: 'var(--primary)' }}>{s.n}</span>
          {s.title}
        </h3>
        <p>{s.body}</p>
      </div>
    ))}

    <div className="legal-footer-note">
      End of Privacy Policy — Last Updated May 29, 2026
    </div>
  </div>
);

export default function LegalModal({ type, onClose, onAccept }) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);

  const isTerms = type === 'terms';
  const title = isTerms ? 'Terms & Conditions' : 'Privacy Policy';
  const content = isTerms ? TERMS_CONTENT : PRIVACY_CONTENT;

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const progress = Math.min(100, Math.round((scrollTop / (scrollHeight - clientHeight)) * 100));
    setScrollProgress(progress);
    if (progress >= 95) setHasScrolledToBottom(true);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', handleScroll, { passive: true });
    return () => { if (el) el.removeEventListener('scroll', handleScroll); };
  }, [handleScroll]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: 'white', borderRadius: '12px', width: '100%', maxWidth: '640px',
        display: 'flex', flexDirection: 'column', boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        maxHeight: '90vh', overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem', flexShrink: 0, borderBottom: '1px solid #e5e7eb',
          background: isTerms ? '#1f2937' : 'var(--primary)'
        }}>
          <div>
            <h2 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.1rem', margin: 0 }}>{title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', margin: 0 }}>Last Updated: May 29, 2026</p>
          </div>
          <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>✕</button>
        </div>

        {/* Progress Bar */}
        <div style={{ height: '4px', background: '#f3f4f6', flexShrink: 0 }}>
          <div style={{
            height: '100%', transition: 'width 0.3s',
            width: `${scrollProgress}%`,
            background: hasScrolledToBottom ? '#16a34a' : isTerms ? '#1f2937' : 'var(--primary)'
          }} />
        </div>

        {/* Scroll hint */}
        {!hasScrolledToBottom && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#fffbeb', borderBottom: '1px solid #fde68a', padding: '0.5rem 1.5rem', flexShrink: 0 }}>
            <span style={{ color: '#92400e', fontSize: '0.75rem', fontWeight: '700' }}>↓ Please scroll to the bottom to accept ↓</span>
          </div>
        )}

        {/* Content */}
        <div ref={scrollRef} style={{ flexGrow: 1, overflowY: 'auto', padding: '1.5rem', overscrollBehavior: 'contain' }}>
          {content}
        </div>

        {/* Footer */}
        <div style={{
          flexShrink: 0, borderTop: '1px solid #e5e7eb', padding: '1rem 1.5rem',
          background: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '0.75rem'
        }}>
          <div style={{ fontSize: '0.75rem', color: hasScrolledToBottom ? '#15803d' : '#6b7280', fontWeight: '600' }}>
            {hasScrolledToBottom ? '✅ You\'ve read the full document' : `${scrollProgress}% read — scroll to the bottom to accept`}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={onClose}
              style={{
                flex: 1, padding: '0.75rem', border: '1px solid #e5e7eb',
                borderRadius: '8px', background: 'white', cursor: 'pointer',
                fontSize: '0.85rem', fontWeight: '600', color: '#374151'
              }}
            >
              Decline
            </button>
            <button
              onClick={() => { onAccept(type); onClose(); }}
              disabled={!hasScrolledToBottom}
              style={{
                flex: 2, padding: '0.75rem', borderRadius: '8px', border: 'none',
                cursor: hasScrolledToBottom ? 'pointer' : 'not-allowed',
                fontSize: '0.85rem', fontWeight: '700',
                background: hasScrolledToBottom ? '#16a34a' : '#e5e7eb',
                color: hasScrolledToBottom ? 'white' : '#9ca3af',
                transition: 'all 0.2s'
              }}
            >
              {hasScrolledToBottom ? `✓ I Accept — ${title}` : '🔒 Scroll to Accept'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .legal-content { font-size: 0.875rem; color: #374151; line-height: 1.7; }
        .legal-disclaimer { background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 4px; padding: 0.75rem 1rem; margin-bottom: 1.25rem; font-size: 0.8rem; color: #92400e; }
        .legal-section { margin-bottom: 1.25rem; }
        .legal-section-title { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #111827; margin-bottom: 0.5rem; }
        .legal-num { width: 20px; height: 20px; background: #1f2937; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 900; flex-shrink: 0; }
        .legal-highlight-box { border: 2px solid #ef4444; border-radius: 8px; overflow: hidden; margin-bottom: 1.25rem; }
        .legal-highlight-header { background: #dc2626; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.5rem; }
        .legal-highlight-header h3 { color: white; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0; }
        .legal-highlight-body { padding: 1rem; background: #fef2f2; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.8rem; color: #991b1b; }
        .legal-footer-note { text-align: center; font-size: 0.7rem; color: #9ca3af; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-top: 1px solid #e5e7eb; padding-top: 1rem; margin-top: 1rem; }
      `}</style>
    </div>
  );
}
