import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { base44 } from '@/api/base44Client';

export default function ClientPortal() {
  const [user, setUser] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const me = await base44.auth.me();
        if (!me) return;
        setUser(me);
        const data = await base44.entities.Inquiry.filter({ email: me.email }, '-created_date', 50);
        setInquiries(data);
      } catch (e) {
        // not logged in
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const statusColors = {
    new: '#F9F9F9',
    read: '#888888',
    responded: '#4ade80',
  };

  const getCountdown = (dateStr) => {
    if (!dateStr) return null;
    const eventDate = new Date(dateStr);
    const now = new Date();
    const diff = eventDate - now;
    if (diff < 0) return 'Completed';
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days === 0 ? 'Today' : `${days} day${days > 1 ? 's' : ''} away`;
  };

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
      <Navbar />

      <section className="px-6 md:px-12 pt-36 pb-14" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-silver text-xs tracking-[0.3em] mb-4" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
          CLIENT AREA
        </p>
        <h1
          className="text-paper"
          style={{
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            fontSize: 'clamp(2rem, 6vw, 6rem)',
            textTransform: 'uppercase',
            lineHeight: 0.95,
          }}
        >
          {user ? `WELCOME, ${user.full_name?.split(' ')[0]?.toUpperCase() || 'BACK'}` : 'YOUR PORTAL'}
        </h1>
      </section>

      <section className="px-6 md:px-12 py-16 max-w-screen-xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-6 h-6 border-2 border-gray-700 border-t-gray-300 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Quick actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              <Link
                to="/contact"
                className="p-6 transition-all duration-300 group"
                style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}
              >
                <p className="text-silver text-xs tracking-[0.2em] mb-2" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>BOOK A CALL</p>
                <p className="text-paper text-sm group-hover:text-silver transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>Schedule a discovery consultation →</p>
              </Link>
              <Link
                to="/gallery"
                className="p-6 transition-all duration-300 group"
                style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}
              >
                <p className="text-silver text-xs tracking-[0.2em] mb-2" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>VIEW GALLERY</p>
                <p className="text-paper text-sm group-hover:text-silver transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>Browse our portfolio →</p>
              </Link>
              <Link
                to="/services"
                className="p-6 transition-all duration-300 group"
                style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}
              >
                <p className="text-silver text-xs tracking-[0.2em] mb-2" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>PACKAGES</p>
                <p className="text-paper text-sm group-hover:text-silver transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>Explore pricing & services →</p>
              </Link>
            </div>

            {/* Inquiries */}
            <div>
              <p className="text-silver text-xs tracking-[0.3em] mb-6" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
                YOUR INQUIRIES
              </p>

              {inquiries.length === 0 ? (
                <div className="text-center py-16" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-silver mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>You haven't submitted any inquiries yet.</p>
                  <Link to="/contact" className="btn-negative-fill text-xs tracking-[0.15em] px-6 py-3 inline-block" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
                    START AN INQUIRY
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq, idx) => (
                    <motion.div
                      key={inq.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="p-6"
                      style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-silver text-xs tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
                              {inq.event_type}
                            </span>
                            <span
                              className="px-2 py-0.5 text-xs"
                              style={{
                                color: statusColors[inq.status] || '#888',
                                border: `1px solid ${statusColors[inq.status] || '#888'}`,
                                fontFamily: 'Inter Tight, sans-serif',
                                fontWeight: 700,
                                fontSize: '0.65rem',
                                letterSpacing: '0.1em',
                              }}
                            >
                              {inq.status?.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-paper text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {inq.message?.slice(0, 100)}{inq.message?.length > 100 ? '...' : ''}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {inq.event_date && (
                            <>
                              <p className="text-silver text-xs mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                                Event date
                              </p>
                              <p className="text-paper text-sm" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
                                {new Date(inq.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </p>
                              <p className="text-silver text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {getCountdown(inq.event_date)}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}