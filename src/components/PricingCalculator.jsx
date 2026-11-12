import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PACKAGES = [
  { key: 'marriage', label: 'WEDDING', base: 3500 },
  { key: 'events', label: 'EVENTS', base: 1200 },
  { key: 'corporate', label: 'CORPORATE', base: 800 },
];

const ADDONS = [
  { key: 'engagement', label: 'Engagement Session', price: 500 },
  { key: 'second_shooter', label: 'Second Photographer', price: 400 },
  { key: 'album', label: 'Premium Album Design', price: 600 },
  { key: 'extra_hours', label: 'Additional Hours (per hr)', price: 200 },
  { key: 'prints', label: 'Print Release & Rights', price: 150 },
  { key: 'rush', label: 'Rush Delivery (48hr)', price: 300 },
];

export default function PricingCalculator() {
  const [selectedPackage, setSelectedPackage] = useState('marriage');
  const [addons, setAddons] = useState({});

  const toggleAddon = (key) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const pkg = PACKAGES.find((p) => p.key === selectedPackage);
  const addonTotal = ADDONS.reduce((sum, a) => sum + (addons[a.key] ? a.price : 0), 0);
  const total = pkg.base + addonTotal;

  return (
    <section className="px-6 md:px-12 py-24" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-screen-xl mx-auto">
        <p className="text-silver text-xs tracking-[0.3em] mb-4" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
          BUILD YOUR PACKAGE
        </p>
        <h2
          className="text-paper mb-16"
          style={{
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            fontSize: 'clamp(2rem, 5vw, 6rem)',
            textTransform: 'uppercase',
            lineHeight: 0.95,
          }}
        >
          INVESTMENT<br />CALCULATOR
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — selections */}
          <div>
            <p className="text-silver text-xs tracking-[0.3em] mb-6" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
              01 — SELECT A PACKAGE
            </p>
            <div className="space-y-3 mb-12">
              {PACKAGES.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setSelectedPackage(p.key)}
                  className="w-full flex items-center justify-between px-6 py-4 transition-all duration-300"
                  style={{
                    border: selectedPackage === p.key ? '1px solid #F9F9F9' : '1px solid rgba(255,255,255,0.08)',
                    backgroundColor: selectedPackage === p.key ? 'rgba(255,255,255,0.04)' : 'transparent',
                  }}
                >
                  <span
                    className="text-sm tracking-[0.15em]"
                    style={{
                      fontFamily: 'Inter Tight, sans-serif',
                      fontWeight: 700,
                      color: selectedPackage === p.key ? '#F9F9F9' : '#888888',
                    }}
                  >
                    {p.label}
                  </span>
                  <span className="text-silver text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    ${p.base.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-silver text-xs tracking-[0.3em] mb-6" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
              02 — ADD EXTRAS
            </p>
            <div className="space-y-2">
              {ADDONS.map((addon) => (
                <button
                  key={addon.key}
                  onClick={() => toggleAddon(addon.key)}
                  className="w-full flex items-center justify-between px-4 py-3 transition-all duration-200"
                  style={{
                    border: addons[addon.key] ? '1px solid rgba(249,249,249,0.3)' : '1px solid transparent',
                    backgroundColor: addons[addon.key] ? 'rgba(255,255,255,0.03)' : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex items-center justify-center w-4 h-4 border transition-all"
                      style={{
                        borderColor: addons[addon.key] ? '#F9F9F9' : '#888888',
                        backgroundColor: addons[addon.key] ? '#F9F9F9' : 'transparent',
                      }}
                    >
                      {addons[addon.key] && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 5L4 8L9 2" stroke="#050505" strokeWidth="2" />
                        </svg>
                      )}
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: addons[addon.key] ? '#F9F9F9' : '#888888',
                      }}
                    >
                      {addon.label}
                    </span>
                  </div>
                  <span className="text-silver text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    +${addon.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right — total */}
          <div>
            <div
              className="p-8 sticky top-24"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.09)',
              }}
            >
              <p className="text-silver text-xs tracking-[0.3em] mb-6" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
                YOUR ESTIMATE
              </p>

              <p className="text-paper mb-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                {pkg.label} PACKAGE
              </p>

              <div className="space-y-2 mb-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex justify-between text-silver text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span>Base package</span>
                  <span>${pkg.base.toLocaleString()}</span>
                </div>
                {ADDONS.filter((a) => addons[a.key]).map((a) => (
                  <div key={a.key} className="flex justify-between text-silver text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <span>{a.label}</span>
                    <span>+${a.price}</span>
                  </div>
                ))}
              </div>

              <motion.div
                key={total}
                initial={{ opacity: 0.5, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <p className="text-silver text-xs mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Estimated total</p>
                <p
                  className="text-paper"
                  style={{
                    fontFamily: 'Inter Tight, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  ${total.toLocaleString()}
                </p>
              </motion.div>

              <Link
                to={`/contact?type=${selectedPackage}`}
                className="btn-negative-fill text-xs tracking-[0.15em] px-6 py-3 block text-center"
                style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
              >
                REQUEST THIS PACKAGE
              </Link>

              <p className="text-silver text-xs mt-4 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                Estimate only. Final pricing depends on location, duration, and deliverables.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}