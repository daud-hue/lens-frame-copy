import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const FAQS = [
  {
    q: 'How far in advance should I book?',
    a: 'We recommend booking 6–12 months in advance for weddings, and 2–4 weeks for events and corporate sessions. However, we always try to accommodate last-minute requests when our schedule allows.',
  },
  {
    q: 'Do you travel for weddings and events?',
    a: 'Absolutely. We photograph across India and internationally. Travel and accommodation costs are included in custom destination packages — just let us know where your event is taking place.',
  },
  {
    q: 'How many photos will I receive?',
    a: 'For weddings, you can expect 400–600 edited photos. Events typically receive 100–200 photos depending on coverage duration. Corporate sessions vary based on scope. All delivered through a private online gallery.',
  },
  {
    q: 'What is the turnaround time?',
    a: 'Weddings: 4–6 weeks for the full gallery. Events: 5–7 business days. Corporate sessions: 3–5 business days. Rush delivery is available for an additional fee.',
  },
  {
    q: 'Do you offer albums and prints?',
    a: 'Yes. We design and produce premium flush-mount albums, fine art prints, and custom photo books. These can be added to any package or ordered separately after your gallery is delivered.',
  },
  {
    q: 'What happens if the event date changes?',
    a: 'We understand plans shift. Date changes are accommodated based on our new availability. If we are unavailable on the rescheduled date, your deposit is transferable to another event within 12 months.',
  },
  {
    q: 'Do you require a deposit to reserve a date?',
    a: 'Yes, a 25% retainer secures your date. The remaining balance is due in two installments — 50% thirty days before the event, and the final 25% on the day of the event.',
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="px-6 md:px-12 py-24" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-3xl mx-auto">
        <p className="text-silver text-xs tracking-[0.3em] mb-4" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
          CLIENT FAQS
        </p>
        <h2
          className="text-paper mb-12"
          style={{
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            fontSize: 'clamp(2rem, 5vw, 6rem)',
            textTransform: 'uppercase',
            lineHeight: 0.95,
          }}
        >
          QUESTIONS &<br />ANSWERS
        </h2>

        <div>
          {FAQS.map((faq, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full flex items-center justify-between py-5 md:py-6 text-left gap-4"
              >
                <span
                  className="flex-1"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                    color: openIdx === idx ? '#F9F9F9' : '#888888',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIdx === idx ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                  style={{ color: openIdx === idx ? '#F9F9F9' : '#888888' }}
                >
                  <Plus size={18} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p
                      className="text-silver text-sm md:text-base leading-relaxed pb-5 md:pb-6 pr-8"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}