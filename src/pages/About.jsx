import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RevealImage from '@/components/RevealImage';

const DEFAULT_BIO = `I am a visual storyteller who believes that the most powerful photographs live in the space between moments — the exhale before the vow, the hands intertwined in anticipation, the quiet laughter shared between colleagues after a long day.

With over a decade behind the lens, I have documented weddings across three continents, corporate milestones for Fortune 500 brands, and events that shaped communities. My approach is architectural in its precision and intimate in its execution.

I do not take photographs. I make them.`;

export default function About() {
  const [content, setContent] = useState(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    base44.entities.SiteContent.list().then((data) => {
      if (data && data.length > 0) setContent(data[0]);
    }).catch(() => {});
    base44.entities.Testimonial.list().then(setTestimonials).catch(() => {});
  }, []);

  const bio = content?.bio_text || DEFAULT_BIO;
  const name = content?.photographer_name || 'Alex Mercer';
  const profileUrl = content?.profile_photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85&fit=crop&crop=face';

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <section className="px-6 md:px-12 pt-36 pb-14" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-silver text-xs tracking-[0.3em] mb-4" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
          THE ARTIST
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
          ABOUT
        </h1>
      </section>

      {/* Main about section */}
      <section className="px-6 md:px-12 py-20 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Portrait */}
          <div className="relative">
            <RevealImage
              src={profileUrl}
              alt={name}
              className="w-full object-cover"
              style={{ aspectRatio: '3/4', height: 'auto' }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-6"
              style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 60%)' }}
            >
              <p
                className="text-paper text-2xl"
                style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}
              >
                {name}
              </p>
              <p className="text-silver text-xs tracking-widest mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                PHOTOGRAPHER
              </p>
            </div>
          </div>

          {/* Bio text */}
          <div className="flex flex-col justify-center pt-8 md:pt-0">
            <div className="w-12 h-px bg-paper mb-10" />
            {bio.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="text-paper mb-6 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', fontWeight: 300 }}
              >
                {para}
              </p>
            ))}
            <div className="mt-10 flex gap-6">
              <Link
                to="/gallery"
                className="btn-negative-fill text-xs tracking-[0.15em] px-7 py-3"
                style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
              >
                VIEW WORK
              </Link>
              <Link
                to="/contact"
                className="text-xs tracking-[0.15em] text-silver hover:text-paper transition-colors flex items-center gap-2"
                style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
              >
                GET IN TOUCH
                <span className="inline-block w-6 h-px bg-current" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="px-6 md:px-12 py-20"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '10+', label: 'YEARS OF EXPERIENCE' },
            { num: '500+', label: 'WEDDINGS DOCUMENTED' },
            { num: '3', label: 'CONTINENTS' },
            { num: '1200+', label: 'EVENTS CAPTURED' },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="text-paper mb-2"
                style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.04em' }}
              >
                {stat.num}
              </p>
              <p className="text-silver text-xs tracking-widest" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="px-6 md:px-12 py-24 max-w-screen-xl mx-auto">
          <p className="text-silver text-xs tracking-[0.3em] mb-16" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
            CLIENT TESTIMONIALS
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {testimonials.map((t) => (
              <div key={t.id} className="border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <p
                  className="text-paper text-lg leading-relaxed mb-8"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  {t.photo_url && (
                    <img src={t.photo_url} alt={t.client_name} className="w-10 h-10 rounded-full object-cover" />
                  )}
                  <div>
                    <p className="text-paper text-sm" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
                      {t.client_name}
                    </p>
                    <p className="text-silver text-xs tracking-widest uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {t.event_type}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}