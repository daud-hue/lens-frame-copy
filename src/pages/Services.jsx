import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RevealImage from '@/components/RevealImage';
import BookingModal from '@/components/BookingModal';
import PricingCalculator from '@/components/PricingCalculator';
import FAQ from '@/components/FAQ';

const SERVICES = [
  {
    key: 'marriage',
    number: '01',
    title: 'MARRIAGE',
    tagline: 'The Architecture of Love',
    description: 'Every marriage is a singular event — a confluence of emotion, light, and human connection that will never occur again in precisely the same way. We document it with the gravity it deserves. From the intimate pre-ceremony moments to the final dance, our approach is unobtrusive and editorial.',
    includes: ['Full-day coverage (12+ hours)', 'Engagement session included', 'Second photographer', 'Online gallery with print release', 'Premium album design'],
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&q=85&fit=crop',
    wideImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=85&fit=crop',
  },
  {
    key: 'events',
    number: '02',
    title: 'EVENTS',
    tagline: 'Energy in Frame',
    description: 'Galas, product launches, community gatherings, award ceremonies — each event has its own rhythm and visual language. We embed ourselves in the energy, capturing both the choreographed moments and the spontaneous ones that define the evening\'s character.',
    includes: ['Minimum 4-hour coverage', 'Multi-room simultaneous coverage', 'Candid & editorial photography', 'Next-day highlight delivery', 'Commercial usage rights'],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=85&fit=crop',
    wideImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=85&fit=crop',
  },
  {
    key: 'corporate',
    number: '03',
    title: 'CORPORATE',
    tagline: 'Brand Through a Lens',
    description: 'Corporate photography is not documentation — it is brand construction. We work with companies to create imagery that communicates authority, trust, and vision. Headshots that humanize leadership. Environments that showcase culture. Events that prove impact.',
    includes: ['Executive headshots & team portraits', 'Office/environment photography', 'Brand campaign imagery', 'Conference & summit coverage', 'Full commercial licensing'],
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=85&fit=crop',
    wideImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85&fit=crop',
  },
];

export default function Services() {
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <section className="px-6 md:px-12 pt-36 pb-14" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-silver text-xs tracking-[0.3em] mb-4" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
          WHAT WE OFFER
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
          SERVICES
        </h1>
      </section>

      {/* Services */}
      {SERVICES.map((service, idx) => (
        <section key={service.key} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Wide image */}
          <div style={{ height: '60vh', overflow: 'hidden' }}>
            <RevealImage
              src={service.wideImage}
              alt={service.title}
              className="w-full h-full object-cover"
              style={{ height: '60vh', filter: 'brightness(0.6)' }}
            />
          </div>

          <div className="px-6 md:px-12 py-16 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
              <div>
                <p className="text-silver text-xs tracking-[0.3em] mb-3" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
                  {service.number}
                </p>
                <h2
                  className="text-paper mb-2"
                  style={{
                    fontFamily: 'Inter Tight, sans-serif',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
                    fontSize: 'clamp(2rem, 5vw, 5rem)',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                  }}
                >
                  {service.title}
                </h2>
                <p className="text-silver text-sm tracking-widest mb-8" style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic' }}>
                  {service.tagline}
                </p>
                <p
                  className="text-paper leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', fontWeight: 300 }}
                >
                  {service.description}
                </p>
              </div>

              <div>
                <p className="text-silver text-xs tracking-[0.3em] mb-6" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
                  INCLUDES
                </p>
                <ul className="space-y-4 mb-10">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="w-1 h-1 rounded-full bg-paper mt-2 flex-shrink-0" />
                      <p className="text-paper text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/contact?type=${service.key}`}
                  className="btn-negative-fill text-xs tracking-[0.15em] px-7 py-3 inline-block"
                  style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
                >
                  INQUIRE ABOUT {service.title}
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Pricing */}
      <section className="px-6 md:px-12 py-24" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-screen-xl mx-auto">
          <p className="text-silver text-xs tracking-[0.3em] mb-4" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
            INVESTMENT
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
            PACKAGES &<br />PRICING
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                number: '01',
                category: 'MARRIAGE',
                label: 'Wedding Photography',
                starting: '3,500',
                note: 'Starting investment',
                highlights: ['Full-day 12+ hr coverage', 'Engagement session', 'Second photographer', 'Premium album design'],
                key: 'marriage',
                accent: 'rgba(255,255,255,0.06)',
              },
              {
                number: '02',
                category: 'EVENTS',
                label: 'Event Photography',
                starting: '1,200',
                note: 'Starting investment',
                highlights: ['4-hour minimum coverage', 'Multi-room coverage', 'Next-day highlights', 'Commercial usage rights'],
                key: 'events',
                accent: 'rgba(255,255,255,0.04)',
              },
              {
                number: '03',
                category: 'CORPORATE',
                label: 'Corporate Photography',
                starting: '800',
                note: 'Starting investment',
                highlights: ['Executive headshots', 'Brand campaign imagery', 'Office environment shoot', 'Full commercial licensing'],
                key: 'corporate',
                accent: 'rgba(255,255,255,0.04)',
              },
            ].map((pkg) => (
              <div
                key={pkg.key}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0',
                }}
              >
                <div className="flex items-start justify-between mb-8">
                  <p className="text-silver text-xs tracking-[0.3em]" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
                    {pkg.number}
                  </p>
                  <p className="text-silver text-xs tracking-[0.2em]" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
                    {pkg.category}
                  </p>
                </div>

                <p className="text-paper mb-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 300 }}>
                  {pkg.label}
                </p>

                <div className="mb-1">
                  <span className="text-paper" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 900, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                    ${pkg.starting}
                  </span>
                </div>
                <p className="text-silver text-xs mb-10" style={{ fontFamily: 'Inter, sans-serif' }}>{pkg.note}</p>

                <ul className="space-y-3 mb-10 flex-1">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-silver mt-2 flex-shrink-0" />
                      <span className="text-silver text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{h}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/contact?type=${pkg.key}`}
                  className="btn-negative-fill text-xs tracking-[0.15em] px-6 py-3 text-center block"
                  style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
                >
                  GET A QUOTE
                </Link>
              </div>
            ))}
          </div>

          <p className="text-silver text-xs text-center mt-10" style={{ fontFamily: 'Inter, sans-serif' }}>
            All packages are fully customisable. Final pricing depends on coverage duration, location, and deliverables.
          </p>
        </div>
      </section>

      {/* Pricing Calculator */}
      <PricingCalculator />

      {/* Booking */}
      <BookingModal />

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section className="px-6 md:px-12 py-24 text-center max-w-screen-xl mx-auto">
        <p className="text-silver text-xs tracking-[0.3em] mb-6" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
          READY TO BEGIN?
        </p>
        <h2
          className="text-paper mb-10"
          style={{
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            fontSize: 'clamp(2rem, 5vw, 6rem)',
            textTransform: 'uppercase',
            lineHeight: 0.95,
          }}
        >
          EVERY SESSION<br />STARTS WITH<br />A CONVERSATION
        </h2>
        <Link
          to="/contact"
          className="btn-negative-fill text-sm tracking-[0.2em] px-10 py-4 inline-block"
          style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
        >
          BOOK SESSION
        </Link>
      </section>

      <Footer />
    </div>
  );
}