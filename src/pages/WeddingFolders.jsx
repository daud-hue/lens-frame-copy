import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const FOLDER_STRUCTURE = [
  { name: '01 — RAW Files', children: [] },
  { name: '02 — Edited', children: ['High Resolution', 'Web Resolution', 'Black & White'] },
  { name: '03 — Ceremony', children: ['Getting Ready', 'Processional', 'Vows & Rings', 'Recessional'] },
  { name: '04 — Reception', children: ['Cocktail Hour', 'Speeches & Toasts', 'First Dances', 'Cake Cutting', 'Open Dancing'] },
  { name: '05 — Portraits', children: ['Couple', 'Bridal Party', 'Family Formals', 'Details & Decor'] },
  { name: '06 — Venue & Ambiance', children: [] },
  { name: '07 — Client Delivery', children: ['Online Gallery Link', 'Print Release'] },
  { name: '08 — Contracts & Docs', children: [] },
];

export default function WeddingFolders() {
  const [form, setForm] = useState({ coupleNames: '', weddingDate: '', venue: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.coupleNames || !form.weddingDate) {
      setError('Please fill in couple names and wedding date.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    const res = await base44.functions.invoke('createWeddingFolders', {
      coupleNames: form.coupleNames,
      weddingDate: form.weddingDate,
      venue: form.venue,
    });
    setResult(res.data);
    setLoading(false);
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
    transition: 'border-color 0.3s',
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

      <section className="px-6 md:px-12 pt-36 pb-10">
        <p className="text-silver text-xs tracking-[0.3em] mb-4" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
          GOOGLE DRIVE
        </p>
        <h1
          className="text-paper"
          style={{
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            fontSize: 'clamp(2.5rem, 7vw, 7rem)',
            textTransform: 'uppercase',
            lineHeight: 0.95,
          }}
        >
          WEDDING<br />FOLDER<br />GENERATOR
        </h1>
      </section>

      <div className="px-6 md:px-12 py-10 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left — Form */}
        <div>
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <label style={labelStyle}>COUPLE NAMES *</label>
                  <input
                    type="text"
                    value={form.coupleNames}
                    onChange={(e) => setForm({ ...form, coupleNames: e.target.value })}
                    placeholder="e.g. Alex & Jordan"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderBottomColor = '#F9F9F9'; }}
                    onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(249,249,249,0.2)'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>WEDDING DATE *</label>
                  <input
                    type="date"
                    value={form.weddingDate}
                    onChange={(e) => setForm({ ...form, weddingDate: e.target.value })}
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                    onFocus={(e) => { e.target.style.borderBottomColor = '#F9F9F9'; }}
                    onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(249,249,249,0.2)'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>VENUE (optional)</label>
                  <input
                    type="text"
                    value={form.venue}
                    onChange={(e) => setForm({ ...form, venue: e.target.value })}
                    placeholder="e.g. Rosewood Manor"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderBottomColor = '#F9F9F9'; }}
                    onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(249,249,249,0.2)'; }}
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
                      CREATING FOLDERS...
                    </span>
                  ) : 'GENERATE FOLDER STRUCTURE'}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <div className="p-8" style={{ border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0d0d0d' }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <p className="text-paper text-sm font-bold" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
                      FOLDERS CREATED SUCCESSFULLY
                    </p>
                  </div>

                  <p className="text-silver text-xs mb-2" style={{ fontFamily: 'Inter Tight, sans-serif', letterSpacing: '0.1em' }}>ROOT FOLDER</p>
                  <p className="text-paper mb-4" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
                    {result.rootFolder?.name}
                  </p>

                  <p className="text-silver text-xs mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {result.foldersCreated} folders created in your Google Drive
                  </p>

                  <a
                    href={result.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-negative-fill text-xs tracking-[0.15em] px-6 py-3 inline-block"
                    style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
                  >
                    OPEN IN GOOGLE DRIVE →
                  </a>
                </div>

                <button
                  onClick={() => { setResult(null); setForm({ coupleNames: '', weddingDate: '', venue: '' }); }}
                  className="text-silver hover:text-paper transition-colors text-xs tracking-[0.15em]"
                  style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
                >
                  ← CREATE ANOTHER
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right — Folder preview */}
        <div>
          <p className="text-silver text-xs tracking-[0.3em] mb-6" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
            FOLDER STRUCTURE PREVIEW
          </p>

          <div className="space-y-1">
            {/* Root */}
            <div className="flex items-center gap-3 py-2 px-3" style={{ backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '14px' }}>📁</span>
              <span className="text-paper text-sm font-bold" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
                {form.weddingDate || 'YYYY-MM-DD'} — {form.coupleNames || 'Couple Names'}{form.venue ? ` — ${form.venue}` : ''}
              </span>
            </div>

            {FOLDER_STRUCTURE.map((folder, i) => (
              <motion.div
                key={folder.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <div className="flex items-center gap-3 py-2 px-3 ml-5" style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '13px' }}>📂</span>
                  <span className="text-paper text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{folder.name}</span>
                </div>
                {folder.children.map((child) => (
                  <div key={child} className="flex items-center gap-3 py-1.5 px-3 ml-10" style={{ borderLeft: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ fontSize: '12px' }}>📄</span>
                    <span className="text-silver text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{child}</span>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}