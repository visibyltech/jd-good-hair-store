import { X } from 'lucide-react';

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  message = "", 
  confirmLabel = "Confirm", 
  cancelLabel = "Cancel",
  danger = false 
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.6)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: 'var(--card-bg)',
        padding: '2rem',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--muted-fg)',
            padding: '0.25rem'
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <h3 style={{ 
          fontSize: '1.25rem', 
          marginBottom: '0.75rem', 
          fontWeight: '600',
          color: danger ? '#b91c1c' : 'var(--foreground)'
        }}>
          {title}
        </h3>
        
        {message && (
          <p style={{ 
            color: 'var(--muted-fg)', 
            marginBottom: '1.5rem',
            lineHeight: '1.5'
          }}>
            {message}
          </p>
        )}
        
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.65rem 1.25rem',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontWeight: '500',
              cursor: 'pointer',
              color: 'var(--foreground)'
            }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{
              padding: '0.65rem 1.25rem',
              background: danger ? '#ef4444' : 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}