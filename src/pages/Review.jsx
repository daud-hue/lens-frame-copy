import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { base44 } from '@/api/base44Client';

const EVENT_TYPES = [
  { key: 'marriage', label: 'MARRIAGE' },
  { key: 'events', label: 'EVENTS' },
  { key: 'corporate', label: 'CORPORATE' },
];

export default function Review() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    client_name: params.get('name') || '',
    event_type: 'marriage',
    quote: '',
    photo_url: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.client_name || !form.quote || !form.event_type) {
      setError('Please fill in your name, event type, and testimonial.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await base44.entities.Testimonial.create({ ...form, is_featured: false });
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(249,249,249,0.2)',
    color: '#F9F9F9',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    padding: '10px 0',
    width: '100%',
    outline: 'none',
  };
  const labelStyle = {
    fontFamily: 'Inter Tight, sans-serif',
    fontWeight: 700,
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    color: '#888888',
    display: 'block',
    marginBottom: '4px',
  };

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
      <Navbar />

      <section className="px-6 md:px-12 pt-36 pb-14" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-silver text-xs tracking-[0.3em] mb-4" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
          SHARE YOUR EXPERIENCE
        </p>
        <h1
          className="text-paper"
          style={{
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            textTransform: 'uppercase',
            lineHeight: 0.95,
          }}
        >
          LEAVE A<br />REVIEW
        </h1>
      </section>

      <section className="px-6 md:px-12 py-16 max-w-2xl mx-auto">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 mx-auto mb-6" />
            <h2 className="text-paper text-2xl mb-4" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 900 }}>
              THANK YOU
            </h2>
            <p className="text-silver mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Your testimonial means the world to us. It will appear on our site once approved.
            </p>
            <Link to="/" className="btn-negative-fill text-xs tracking-[0.15em] px-6 py-3 inline-block" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
              BACK TO HOME
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label style={labelStyle}>YOUR NAME *</label>
              <input
                type="text"
                value={form.client_name}
                onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                style={inputStyle}
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label style={labelStyle}>EVENT TYPE *</label>
              <div className="flex gap-3 mt-2">
                {EVENT_TYPES.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setForm({ ...form, event_type: t.key })}
                    className="flex-1 px-4 py-3 text-xs tracking-[0.15em] transition-all"
                    style={{
                      fontFamily: 'Inter Tight, sans-serif',
                      fontWeight: 700,
                      border: form.event_type === t.key ? '1px solid #F9F9F9' : '1px solid rgba(255,255,255,0.15)',
                      color: form.event_type === t.key ? '#F9F9F9' : '#888888',
                      backgroundColor: form.event_type === t.key ? 'rgba(255,255,255,0.05)' : 'transparent',
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>YOUR TESTIMONIAL *</label>
              <textarea
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                placeholder="Tell us about your experience working with Lens & Frame..."
                rows={5}
              />
            </div>

            <div>
              <label style={labelStyle}>PHOTO URL (OPTIONAL)</label>
              <input
                type="text"
                value={form.photo_url}
                onChange={(e) => setForm({ ...form, photo_url: e.target.value })}
                style={inputStyle}
                placeholder="https://..."
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-negative-fill text-sm tracking-[0.2em] px-10 py-4 w-full disabled:opacity-50"
              style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
                  SUBMITTING...
                </span>
              ) : 'SUBMIT REVIEW'}
            </button>
          </form>
        )}
      </section>

      <Footer />
    </div>
  );
}