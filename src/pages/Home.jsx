import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ─── DATA ────────────────────────────────────────────────────────────────────

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=90',
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=90',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=90',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=90',
];

const CATEGORIES = [
  {
    key: 'marriage',
    label: 'MARRIAGE',
    num: '01',
    description: 'Intimate moments, eternal memories. We capture the quiet glances, the texture of emotion, and the architecture of love.',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&q=90',
    accent: '#c8a97e',
  },
  {
    key: 'events',
    label: 'EVENTS',
    num: '02',
    description: 'High energy, candid authenticity. From gala nights to intimate gatherings, every moment documented with precision.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=90',
    accent: '#7ea8c8',
  },
  {
    key: 'corporate',
    label: 'CORPORATE',
    num: '03',
    description: 'Architectural symmetry, executive presence. Brand imagery built on trust, clarity, and purposeful composition.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=90',
    accent: '#a0c87e',
  },
];

const CLIENT_GALLERY = [
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
  'https://images.unsplash.com/photo-1519741347686-c1e331fcde05?w=600&q=80',
  'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
  'https://images.unsplash.com/photo-1478146059778-26c80c66a3a9?w=600&q=80',
  'https://images.unsplash.com/photo-1639628735078-ed2f038a193e?w=600&q=80',
  'https://images.unsplash.com/photo-1543157145-f78c636d023d?w=600&q=80',
  'https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=600&q=80',
];

const STATS = [
  { num: '10+', label: 'Years behind the lens' },
  { num: '500+', label: 'Weddings documented' },
  { num: '1,200+', label: 'Events captured' },
  { num: '3', label: 'Continents covered' },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useCounter(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(end.replace(/\D/g, ''));
    const step = Math.ceil(num / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, num);
      setCount(current);
      if (current >= num) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [start, end, duration]);
  return end.replace(/\d+/, count);
}

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function StatCard({ num, label, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const animated = useCounter(num, 1800, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="border-l pl-4 md:pl-8"
      style={{ borderColor: 'rgba(255,255,255,0.1)' }}
    >
      <p
        className="text-paper"
        style={{
          fontFamily: 'Inter Tight, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        {animated}
      </p>
      <p className="text-silver text-xs tracking-widest mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
        {label}
      </p>
    </motion.div>
  );
}

function CategoryCard({ cat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/gallery?category=${cat.key}`}
        className="group relative overflow-hidden block"
        style={{ aspectRatio: '3/4' }}
      >
        {/* Image */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={cat.image}
            alt={cat.label}
            className="w-full h-full object-cover"
            style={{ scale: 1 }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
          style={{ background: 'linear-gradient(160deg, rgba(5,5,5,0.1) 0%, rgba(5,5,5,0.75) 60%, rgba(5,5,5,0.95) 100%)', opacity: 0.7 }}
        />

        {/* Number watermark */}
        <div
          className="absolute top-6 right-6 text-paper opacity-10 group-hover:opacity-20 transition-opacity duration-500"
          style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 900, fontSize: '5rem', letterSpacing: '-0.04em', lineHeight: 1 }}
        >
          {cat.num}
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          {/* Accent line */}
          <motion.div
            className="mb-4 h-px"
            style={{ backgroundColor: cat.accent, width: '32px' }}
            animate={{ width: '32px' }}
            whileHover={{ width: '64px' }}
            transition={{ duration: 0.4 }}
          />

          <p
            className="text-paper mb-3"
            style={{
              fontFamily: 'Inter Tight, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
            }}
          >
            {cat.label}
          </p>

          <motion.p
            className="text-silver text-sm leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {cat.description}
          </motion.p>

          <div className="flex items-center gap-2 mt-5 overflow-hidden">
            <span className="text-paper text-xs tracking-[0.2em]" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
              VIEW WORK
            </span>
            <motion.div
              className="h-px"
              style={{ backgroundColor: '#F9F9F9', width: '20px' }}
              whileHover={{ width: '48px' }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function InfiniteStrip({ images, direction = 1, speed = 40 }) {
  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
      <motion.div
        className="flex gap-3"
        animate={{ x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        style={{ width: 'max-content' }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 overflow-hidden"
            style={{ width: '280px', height: '380px', borderRadius: '2px' }}
          >
            <motion.img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function TestimonialCard({ t, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-8 overflow-hidden"
      style={{
        backgroundColor: '#0d0d0d',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Quote mark */}
      <div
        className="absolute top-4 right-6 text-paper opacity-5"
        style={{ fontFamily: 'Georgia, serif', fontSize: '8rem', lineHeight: 1, userSelect: 'none' }}
      >
        "
      </div>

      <p
        className="text-paper leading-relaxed mb-8 relative z-10"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '1.05rem' }}
      >
        "{t.quote}"
      </p>

      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '50%' }}
        >
          <span className="text-silver text-sm font-bold" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
            {t.client_name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-paper text-sm font-bold" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
            {t.client_name}
          </p>
          <p className="text-silver text-xs tracking-widest uppercase mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
            {t.event_type}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 160]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.08]);

  useEffect(() => {
    base44.entities.Testimonial.filter({ is_featured: true }).then(setTestimonials).catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(heroIndex);
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroIndex]);

  const statsRef = useRef(null);

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
        {/* Parallax image stack */}
        <AnimatePresence>
          <motion.div
            key={heroIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: heroY }}
          >
            <motion.img
              src={HERO_IMAGES[heroIndex]}
              alt="Featured photography"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.5)', scale: heroScale }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.6) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.0) 30%, rgba(5,5,5,0.6) 85%, rgba(5,5,5,1) 100%)' }} />

        {/* Hero Title */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: heroOpacity }}
        >
          <div className="text-center px-4">
            <motion.p
              initial={{ opacity: 0, y: 20, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.3em' }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-silver text-xs mb-6"
              style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
            >
              PHOTOGRAPHY STUDIO
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-paper"
              style={{
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                fontSize: 'clamp(2.5rem, 12vw, 14rem)',
                lineHeight: 0.85,
              }}
            >
              LENS<br />& FRAME
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-8"
              style={{ height: '1px', backgroundColor: 'rgba(249,249,249,0.3)', width: '120px', transformOrigin: 'left' }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="text-silver text-xs tracking-[0.3em] mt-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              MARRIAGE — EVENTS — CORPORATE
            </motion.p>
          </div>
        </motion.div>

        {/* Bottom strip */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-8 md:px-14 pb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <div className="flex items-center gap-4">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                className="transition-all duration-500"
                style={{
                  width: i === heroIndex ? '32px' : '6px',
                  height: '2px',
                  backgroundColor: i === heroIndex ? '#F9F9F9' : 'rgba(249,249,249,0.3)',
                }}
              />
            ))}
          </div>
          <Link
            to="/contact"
            className="btn-negative-fill text-xs tracking-[0.15em] px-5 py-2 md:px-7 md:py-3"
            style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
          >
            BOOK SESSION
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <motion.div
            className="w-px bg-silver"
            animate={{ height: ['12px', '32px', '12px'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: '12px' }}
          />
        </motion.div>
      </section>

      {/* ── INTRO MARQUEE ────────────────────────────────────── */}
      <div
        className="overflow-hidden py-5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', backgroundColor: '#080808' }}
      >
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {Array(8).fill(0).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              <span className="text-paper text-xs tracking-[0.3em]" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>MARRIAGE PHOTOGRAPHY</span>
              <span className="text-silver text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>✦</span>
              <span className="text-paper text-xs tracking-[0.3em]" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>EVENTS & GALAS</span>
              <span className="text-silver text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>✦</span>
              <span className="text-paper text-xs tracking-[0.3em]" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>CORPORATE IMAGERY</span>
              <span className="text-silver text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>✦</span>
              <span className="text-paper text-xs tracking-[0.3em]" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>EDITORIAL PORTRAITS</span>
              <span className="text-silver text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-24" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {STATS.map((s, i) => <StatCard key={s.num} {...s} index={i} />)}
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-24 max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.p
              className="text-silver text-xs tracking-[0.3em] mb-4"
              style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              SPECIALTIES
            </motion.p>
            <motion.h2
              className="text-paper"
              style={{
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                textTransform: 'uppercase',
                lineHeight: 0.95,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              THE WORK
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link
              to="/gallery"
              className="text-silver hover:text-paper transition-colors text-xs tracking-[0.2em] flex items-center gap-3"
              style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
            >
              VIEW ALL WORK
              <span className="inline-block w-8 h-px bg-current" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <CategoryCard key={cat.key} cat={cat} index={idx} />
          ))}
        </div>
      </section>

      {/* ── CLIENT IMAGE LIBRARY ─────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '80px', paddingBottom: '80px', overflow: 'hidden' }}>
        <div className="px-6 md:px-16 mb-12 flex items-end justify-between max-w-screen-xl mx-auto">
          <div>
            <motion.p
              className="text-silver text-xs tracking-[0.3em] mb-3"
              style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              CLIENT ARCHIVE
            </motion.p>
            <motion.h2
              className="text-paper"
              style={{
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                fontSize: 'clamp(2rem, 5vw, 5rem)',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              MOMENTS<br />PRESERVED
            </motion.h2>
          </div>
          <motion.p
            className="text-silver text-sm max-w-xs text-right hidden md:block"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            A glimpse into the archive — hundreds of stories told through light, shadow, and silence.
          </motion.p>
        </div>

        <div className="space-y-4">
          <InfiniteStrip images={CLIENT_GALLERY} direction={1} speed={55} />
          <InfiniteStrip images={[...CLIENT_GALLERY].reverse()} direction={-1} speed={65} />
        </div>

        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="btn-negative-fill text-xs tracking-[0.2em] px-8 py-3 inline-block"
            style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
          >
            EXPLORE FULL GALLERY
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="px-6 md:px-16 py-24" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-screen-xl mx-auto">
            <div className="mb-14">
              <motion.p
                className="text-silver text-xs tracking-[0.3em] mb-3"
                style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                WHAT CLIENTS SAY
              </motion.p>
              <motion.h2
                className="text-paper"
                style={{
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  fontSize: 'clamp(2rem, 5vw, 5rem)',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                CLIENT WORDS
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map((t, i) => (
                <TestimonialCard key={t.id} t={t} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PROCESS STRIP ────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#080808' }}>
        <div className="max-w-screen-xl mx-auto">
          <motion.p
            className="text-silver text-xs tracking-[0.3em] mb-12 text-center"
            style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            HOW IT WORKS
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              { step: '01', title: 'INQUIRY', desc: 'Tell us your vision, date, and goals. Every session begins with understanding your story.' },
              { step: '02', title: 'CAPTURE', desc: 'On the day, we blend into the moment. Invisible, present, deliberate in every frame.' },
              { step: '03', title: 'DELIVER', desc: 'Curated gallery delivered within 2 weeks. Prints and albums available on request.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className={`p-6 md:p-10 relative ${i < 2 ? 'border-b md:border-b-0 md:border-r' : ''}`}
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-silver text-xs tracking-widest mb-6" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
                  {item.step}
                </p>
                <p
                  className="text-paper mb-4"
                  style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.03em', textTransform: 'uppercase' }}
                >
                  {item.title}
                </p>
                <p className="text-silver text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 md:px-16 py-20 md:py-36 flex flex-col items-center text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=70"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.2)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #050505 0%, transparent 20%, transparent 80%, #050505 100%)' }} />
        </div>

        <div className="relative z-10">
          <motion.p
            className="text-silver text-xs tracking-[0.3em] mb-6"
            style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            LET'S CREATE TOGETHER
          </motion.p>
          <motion.h2
            className="text-paper mb-12"
            style={{
              fontFamily: 'Inter Tight, sans-serif',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              fontSize: 'clamp(2.5rem, 8vw, 9rem)',
              textTransform: 'uppercase',
              lineHeight: 0.9,
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            YOUR STORY<br />DESERVES<br />THE FRAME
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link
              to="/contact"
              className="btn-negative-fill text-sm tracking-[0.2em] px-12 py-5 inline-block"
              style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
            >
              START A CONVERSATION
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}