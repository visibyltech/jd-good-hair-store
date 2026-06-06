import { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import toast from 'react-hot-toast';
import { Save, Plus, Trash2, Settings as SettingsIcon, LayoutTemplate, MessageSquare, Upload } from 'lucide-react';
import { uploadImage } from '../../utils/uploadImage';

const s = {
  page: { width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 1rem 4rem', boxSizing: 'border-box', overflowX: 'hidden' },
  header: { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '2rem' },
  title: { fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--foreground)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' },
  subtitle: { fontSize: '0.82rem', color: 'var(--muted-fg)', marginTop: '0.25rem' },
  saveBtn: (saving) => ({
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    background: saving ? 'var(--muted-fg)' : 'var(--gradient-primary)',
    color: 'white', border: 'none', borderRadius: 'var(--radius)',
    padding: '0.75rem 1.5rem', fontWeight: 700, fontSize: '0.9rem',
    cursor: saving ? 'not-allowed' : 'pointer', transition: 'opacity 0.2s',
    opacity: saving ? 0.7 : 1, whiteSpace: 'nowrap',
  }),
  grid: { display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' },
  card: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', background: 'var(--muted)', flexWrap: 'wrap', gap: '0.5rem' },
  cardTitle: { fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--foreground)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' },
  cardBody: { padding: '1.25rem' },
  addBtn: { display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', color: 'var(--foreground)', whiteSpace: 'nowrap' },
  tickerItem: { display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: 'var(--muted)', border: '1px solid var(--border)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '0.75rem' },
  textarea: { flex: 1, border: 'none', background: 'transparent', resize: 'vertical', minHeight: '56px', fontSize: '0.875rem', fontFamily: 'var(--font-body)', color: 'var(--foreground)', outline: 'none', lineHeight: 1.6 },
  deleteBtn: { background: 'none', border: 'none', color: 'var(--muted-fg)', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px', display: 'flex', alignItems: 'center', flexShrink: 0 },
  slideCard: { border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: '1.25rem' },
  slideHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'var(--muted)', borderBottom: '1px solid var(--border)' },
  slideBody: { padding: '1rem', display: 'grid', gridTemplateColumns: '1fr', gap: '0.85rem' },
  label: { display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-fg)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.3rem' },
  input: { width: '100%', padding: '0.65rem 0.9rem', border: '1px solid var(--border)', borderRadius: '0.5rem', fontSize: '0.875rem', fontFamily: 'var(--font-body)', color: 'var(--foreground)', background: 'var(--background)', outline: 'none', boxSizing: 'border-box' },
  imageRow: { display: 'flex', gap: '0.5rem', alignItems: 'center' },
  uploadLabel: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '0.5rem', cursor: 'pointer', background: 'var(--muted)', flexShrink: 0 },
  preview: { width: '100%', height: '120px', objectFit: 'cover', borderRadius: '0.5rem', border: '1px solid var(--border)', marginTop: '0.5rem', display: 'block' },
  emptyBox: { padding: '2rem', textAlign: 'center', color: 'var(--muted-fg)', fontSize: '0.875rem', border: '1px dashed var(--border)', borderRadius: 'var(--radius)' },
  deleteSlideBtn: { display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: 'none', color: 'hsl(0 72% 55%)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' },
  loading: { padding: '4rem 1rem', textAlign: 'center', color: 'var(--muted-fg)' },
};

export default function SiteSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tickerMessages, setTickerMessages] = useState([
    '⚡ Free Delivery on orders above ₦50,000 across Lagos!',
    '🎀 Premium Human Hair Extensions — Now in Stock!'
  ]);
  const [heroSlides, setHeroSlides] = useState([
    { title: 'Luxury Hair For Less', subtitle: 'Shop premium human hair extensions, wigs, and bundles.', buttonText: 'Shop Now', link: '/shop', image: '' }
  ]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'site_settings'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.tickerMessages) setTickerMessages(data.tickerMessages);
        if (data.heroSlides) setHeroSlides(data.heroSlides);
      }
      setLoading(false);
    }, (err) => {
      console.error(err);
      toast.error('Failed to load settings.');
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'site_settings'), { tickerMessages, heroSlides }, { merge: true });
      toast.success('Settings saved!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const addTicker = () => setTickerMessages([...tickerMessages, '']);
  const updateTicker = (i, v) => { const a = [...tickerMessages]; a[i] = v; setTickerMessages(a); };
  const removeTicker = (i) => setTickerMessages(tickerMessages.filter((_, idx) => idx !== i));

  const addSlide = () => {
    if (heroSlides.length >= 7) { toast.error('Max 7 slides allowed.'); return; }
    setHeroSlides([...heroSlides, { title: '', subtitle: '', buttonText: '', link: '', image: '' }]);
  };
  const updateSlide = (i, field, val) => { const a = [...heroSlides]; a[i] = { ...a[i], [field]: val }; setHeroSlides(a); };
  const removeSlide = (i) => setHeroSlides(heroSlides.filter((_, idx) => idx !== i));

  const handleImageUpload = async (idx, file) => {
    if (!file) return;
    const t = toast.loading('Uploading image…');
    try {
      const url = await uploadImage(file);
      updateSlide(idx, 'image', url);
      toast.success('Image uploaded!', { id: t });
    } catch {
      toast.error('Upload failed.', { id: t });
    }
  };

  if (loading) return <div style={s.loading}>Loading settings…</div>;

  return (
    <div style={s.page}>
      {/* Page Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.title}><SettingsIcon size={22} color="var(--primary)" /> Site Settings</h1>
          <p style={s.subtitle}>Manage homepage content and announcement ticker.</p>
        </div>
        <button style={s.saveBtn(saving)} onClick={handleSave} disabled={saving}>
          <Save size={16} /> {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </div>

      {/* Responsive grid — stack on mobile, 3-col on desktop */}
      <div style={{ ...s.grid, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>

        {/* ── Ticker Messages ── */}
        <div style={{ ...s.card, gridColumn: 'span 1' }}>
          <div style={s.cardHeader}>
            <h3 style={s.cardTitle}><MessageSquare size={16} color="var(--primary)" /> Ticker Messages</h3>
            <button style={s.addBtn} onClick={addTicker}><Plus size={14} /> Add</button>
          </div>
          <div style={s.cardBody}>
            <p style={{ fontSize: '0.78rem', color: 'var(--muted-fg)', marginBottom: '1rem' }}>
              Scrolling announcements shown at the top of the page.
            </p>
            {tickerMessages.length === 0
              ? <div style={s.emptyBox}>No messages — click Add to create one.</div>
              : tickerMessages.map((msg, i) => (
                <div key={i} style={s.tickerItem}>
                  <textarea
                    style={s.textarea}
                    value={msg}
                    onChange={(e) => updateTicker(i, e.target.value)}
                    placeholder="Enter ticker message…"
                  />
                  <button style={s.deleteBtn} onClick={() => removeTicker(i)} title="Remove">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            }
          </div>
        </div>

        {/* ── Hero Carousel ── */}
        <div style={{ ...s.card, gridColumn: 'span 2' }}>
          <div style={s.cardHeader}>
            <h3 style={s.cardTitle}><LayoutTemplate size={16} color="var(--primary)" /> Hero Carousel Slides</h3>
            <button style={s.addBtn} onClick={addSlide}><Plus size={14} /> Add Slide ({heroSlides.length}/7)</button>
          </div>
          <div style={s.cardBody}>
            <p style={{ fontSize: '0.78rem', color: 'var(--muted-fg)', marginBottom: '1rem' }}>
              Up to 7 slides are shown in the homepage hero banner.
            </p>
            {heroSlides.length === 0 && <div style={s.emptyBox}>No slides — click Add Slide to get started.</div>}
            {heroSlides.map((slide, idx) => (
              <div key={idx} style={s.slideCard}>
                <div style={s.slideHeader}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--muted-fg)' }}>Slide #{idx + 1}</span>
                  <button style={s.deleteSlideBtn} onClick={() => removeSlide(idx)}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
                <div style={s.slideBody}>
                  {/* Title */}
                  <div>
                    <label style={s.label}>Title</label>
                    <input style={s.input} value={slide.title} onChange={e => updateSlide(idx, 'title', e.target.value)} placeholder="e.g. Luxury Hair For Less" />
                  </div>
                  {/* Subtitle */}
                  <div>
                    <label style={s.label}>Subtitle</label>
                    <textarea
                      style={{ ...s.input, minHeight: '70px', resize: 'vertical' }}
                      value={slide.subtitle}
                      onChange={e => updateSlide(idx, 'subtitle', e.target.value)}
                      placeholder="A brief description…"
                    />
                  </div>
                  {/* Button Text + Link */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={s.label}>Button Text</label>
                      <input style={s.input} value={slide.buttonText} onChange={e => updateSlide(idx, 'buttonText', e.target.value)} placeholder="Shop Now" />
                    </div>
                    <div>
                      <label style={s.label}>Button Link</label>
                      <input style={s.input} value={slide.link} onChange={e => updateSlide(idx, 'link', e.target.value)} placeholder="/shop" />
                    </div>
                  </div>
                  {/* Image */}
                  <div>
                    <label style={s.label}>Image (URL or Upload)</label>
                    <div style={s.imageRow}>
                      <input style={{ ...s.input, flex: 1 }} value={slide.image} onChange={e => updateSlide(idx, 'image', e.target.value)} placeholder="https://…" />
                      <label style={s.uploadLabel} title="Upload image">
                        <Upload size={16} color="var(--muted-fg)" />
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleImageUpload(idx, e.target.files[0])} />
                      </label>
                    </div>
                    {slide.image && (
                      <img src={slide.image} alt="preview" style={s.preview}
                        onError={e => { e.target.style.display = 'none'; }} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating save on mobile */}
      <div style={{ position: 'sticky', bottom: '1rem', display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
        <button style={{ ...s.saveBtn(saving), boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }} onClick={handleSave} disabled={saving}>
          <Save size={16} /> {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
