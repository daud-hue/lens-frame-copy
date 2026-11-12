import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

const CALCOM_USERNAME = 'your-cal-username';

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [calReady, setCalReady] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (document.getElementById('calcom-embed-script')) {
      if (window.Cal) setCalReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cal.com/embed.js';
    script.id = 'calcom-embed-script';
    script.async = true;
    script.onload = () => setCalReady(true);
    document.body.appendChild(script);

    return () => {
      // Clean up the global Cal namespace listener when unmounted
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      if (window.Cal && containerRef.current) {
        containerRef.current.innerHTML = '';
        window.Cal('inline', {
          calLink: `${CALCOM_USERNAME}/30min`,
          elementOrSelector: containerRef.current,
          layout: 'month_view',
        });
      }
    }, 200);
  };

  const handleClose = () => {
    setOpen(false);
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
  };

  return (
    <section className="px-6 md:px-12 py-20 md:py-24" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-screen-xl mx-auto text-center">
        <p className="text-silver text-xs tracking-[0.3em] mb-4" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
          SCHEDULE A CONSULTATION
        </p>
        <h2
          className="text-paper mb-6"
          style={{
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            fontSize: 'clamp(2rem, 5vw, 6rem)',
            textTransform: 'uppercase',
            lineHeight: 0.95,
          }}
        >
          BOOK A<br />DISCOVERY CALL
        </h2>
        <p className="text-silver mb-10 max-w-xl mx-auto px-4" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
          Pick a time that works for you. We'll talk through your vision, timeline, and how we can bring it to life.
        </p>
        <button
          onClick={handleOpen}
          className="btn-negative-fill text-sm tracking-[0.2em] px-8 md:px-10 py-3 md:py-4"
          style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
        >
          VIEW AVAILABILITY
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
              style={{ backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-paper text-sm font-bold tracking-widest" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
                  BOOK A DISCOVERY CALL
                </p>
                <button onClick={handleClose} className="text-silver hover:text-paper transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="overflow-y-auto flex-1" style={{ maxHeight: 'calc(90vh - 60px)' }}>
                <div ref={containerRef} style={{ width: '100%', minHeight: '600px' }} />
                {!calReady && (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-6 h-6 border-2 border-gray-700 border-t-gray-300 rounded-full animate-spin" />
                    <a
                      href={`https://cal.com/${CALCOM_USERNAME}/30min`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-silver hover:text-paper text-xs tracking-widest flex items-center gap-2 transition-colors"
                      style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
                    >
                      OPEN IN NEW TAB <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}