import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const EVENT_TYPES = [
  { key: 'marriage', label: 'MARRIAGE', desc: 'Ceremonies, receptions, elopements' },
  { key: 'events', label: 'EVENTS', desc: 'Galas, launches, gatherings' },
  { key: 'corporate', label: 'CORPORATE', desc: 'Headshots, conferences, campaigns' },
  { key: 'other', label: 'OTHER', desc: 'Something unique — tell us' },
];

const BG_TINTS = {
  marriage: 'radial-gradient(ellipse at 80% 50%, rgba(20,10,8,0.6) 0%, #050505 70%)',
  events: 'radial-gradient(ellipse at 80% 50%, rgba(8,15,20,0.6) 0%, #050505 70%)',
  corporate: 'radial-gradient(ellipse at 80% 50%, rgba(8,10,20,0.6) 0%, #050505 70%)',
  other: 'radial-gradient(ellipse at 80% 50%, rgba(15,15,8,0.6) 0%, #050505 70%)',
};

export default function Contact() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultType = searchParams.get('type') || '';

  const [form, setForm] = useState({
    name: '',
    email: '',
    event_type: defaultType || 'marriage',
    event_date: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError('');
    await base44.entities.Inquiry.create({
      ...form,
      status: 'new',
    });
    setSubmitted(true);
    setLoading(false);
  };

  const inputStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(249,249,249,0.25)',
    color: '#F9F9F9',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    padding: '12px 0',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const labelStyle = {
    fontFamily: 'Inter Tight, sans-serif',
    fontWeight: 700,
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    color: '#888888',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '4px',
  };

  return (
    <div
      style={{
        backgroundColor: '#050505',
        minHeight: '100vh',
        background: BG_TINTS[form.event_type] || '#050505',
        transition: 'background 1.2s ease',
      }}
    >
      <Navbar />

      {/* Header */}
      <section className="px-6 md:px-12 pt-36 pb-10">
        <p className="text-silver text-xs tracking-[0.3em] mb-4" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
          START HERE
        </p>
        <h1
          className="text-paper"
          style={{
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            fontSize: 'clamp(2.5rem, 7vw, 8rem)',
            textTransform: 'uppercase',
            lineHeight: 0.95,
          }}
        >
          CONTACT
        </h1>
      </section>

      {submitted ? (
        <div className="px-6 md:px-12 py-28 flex flex-col items-start max-w-xl">
          <div className="w-12 h-px bg-paper mb-10" />
          <h2
            className="text-paper mb-6"
            style={{
              fontFamily: 'Inter Tight, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
            }}
          >
            MESSAGE<br />RECEIVED
          </h2>
          <p className="text-silver leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            Thank you for reaching out. Every inquiry receives our personal attention. We will be in touch within 24 hours.
          </p>
          <div className="mt-10 w-12 h-px bg-silver" />
        </div>
      ) : (
        <div className="px-6 md:px-12 py-14 max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: Services list */}
            <div>
              <p className="text-silver text-xs tracking-[0.3em] mb-8" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
                AVAILABLE SERVICES
              </p>
              <div className="space-y-0">
                {EVENT_TYPES.map((type) => (
                  <button
                    key={type.key}
                    onClick={() => handleChange('event_type', type.key)}
                    className="w-full text-left py-6 group"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className="transition-colors duration-200"
                          style={{
                            fontFamily: 'Inter Tight, sans-serif',
                            fontWeight: 900,
                            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                            letterSpacing: '-0.04em',
                            textTransform: 'uppercase',
                            color: form.event_type === type.key ? '#F9F9F9' : '#888888',
                          }}
                        >
                          {type.label}
                        </p>
                        <p className="text-silver text-xs tracking-widest mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {type.desc}
                        </p>
                      </div>
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300"
                        style={{ backgroundColor: form.event_type === type.key ? '#F9F9F9' : 'transparent', border: '1px solid #888' }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <p className="text-silver text-xs tracking-[0.3em] mb-8" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
                YOUR DETAILS
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderBottomColor = '#F9F9F9'; }}
                    onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(249,249,249,0.25)'; }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderBottomColor = '#F9F9F9'; }}
                    onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(249,249,249,0.25)'; }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Event Date</label>
                  <input
                    type="date"
                    value={form.event_date}
                    onChange={(e) => handleChange('event_date', e.target.value)}
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                    onFocus={(e) => { e.target.style.borderBottomColor = '#F9F9F9'; }}
                    onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(249,249,249,0.25)'; }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Your Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us about your vision, location, and any specific requirements..."
                    rows={5}
                    style={{ ...inputStyle, resize: 'none', paddingTop: '12px' }}
                    onFocus={(e) => { e.target.style.borderBottomColor = '#F9F9F9'; }}
                    onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(249,249,249,0.25)'; }}
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-400" style={{ fontFamily: 'Inter, sans-serif' }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-negative-fill text-sm tracking-[0.2em] px-10 py-4 w-full"
                  style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, opacity: loading ? 0.6 : 1 }}
                >
                  {loading ? 'SENDING...' : 'SEND INQUIRY'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}