import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Lightbox from '@/components/Lightbox';

const CATEGORIES = [
  { key: 'all', label: 'ALL' },
  { key: 'marriage', label: 'MARRIAGE' },
  { key: 'events', label: 'EVENTS' },
  { key: 'corporate', label: 'CORPORATE' },
];

const FALLBACK_PHOTOS = [
  { id: '1', image_url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=85&fit=crop', title: 'Wedding ceremony', category: 'marriage' },
  { id: '2', image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85&fit=crop', title: 'First dance', category: 'marriage' },
  { id: '3', image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=85&fit=crop', title: 'Gala evening', category: 'events' },
  { id: '4', image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85&fit=crop', title: 'Conference', category: 'events' },
  { id: '5', image_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=85&fit=crop', title: 'Corporate portrait', category: 'corporate' },
  { id: '6', image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85&fit=crop', title: 'Boardroom', category: 'corporate' },
  { id: '7', image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=85&fit=crop', title: 'Ring detail', category: 'marriage' },
  { id: '8', image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=85&fit=crop', title: 'Golden hour vows', category: 'marriage' },
  { id: '9', image_url: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=85&fit=crop', title: 'Gala night', category: 'events' },
  { id: '10', image_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=85&fit=crop', title: 'Modern workspace', category: 'corporate' },
];

export default function Gallery() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultCat = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(defaultCat);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    setLoading(true);
    base44.entities.Photo.list('-display_order', 100)
      .then((data) => {
        setPhotos(data.length > 0 ? data : FALLBACK_PHOTOS);
      })
      .catch(() => setPhotos(FALLBACK_PHOTOS))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'all'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <section className="px-6 md:px-12 pt-32 md:pt-36 pb-10 md:pb-14">
        <p className="text-silver text-xs tracking-[0.3em] mb-4" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
          THE ARCHIVE
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
          GALLERY
        </h1>
        {!loading && (
          <p className="text-silver text-sm mt-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            {filtered.length} {filtered.length === 1 ? 'photo' : 'photos'}
            {activeCategory !== 'all' && ` in ${activeCategory}`}
          </p>
        )}
      </section>

      {/* Category Filter — horizontal scroll on mobile */}
      <div
        className="sticky top-14 z-40 overflow-x-auto"
        style={{ backgroundColor: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex gap-3 px-6 md:px-12 py-4 min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="px-4 py-2 text-xs tracking-[0.15em] whitespace-nowrap transition-all duration-300 rounded-full"
              style={{
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 700,
                color: activeCategory === cat.key ? '#050505' : '#888888',
                backgroundColor: activeCategory === cat.key ? '#F9F9F9' : 'transparent',
                border: activeCategory === cat.key ? '1px solid #F9F9F9' : '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      {loading ? (
        <div className="flex justify-center py-32">
          <div className="w-6 h-6 border-2 border-silver border-t-paper rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-32">
          <p className="text-silver text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>No photos in this category yet.</p>
        </div>
      ) : (
        <div className="columns-2 md:columns-3 gap-2 px-3 md:px-6 py-6">
          {filtered.map((photo, idx) => (
            <motion.button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative overflow-hidden mb-2 break-inside-avoid block w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.4) }}
              aria-label={`View ${photo.title || 'photo'}`}
            >
              <img
                src={photo.image_url}
                alt={photo.title || 'Photography'}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6"
                style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 60%)' }}
              >
                {photo.title && (
                  <p className="text-paper text-xs md:text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {photo.title}
                  </p>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {selectedPhoto && (
        <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}

      <Footer />
    </div>
  );
}