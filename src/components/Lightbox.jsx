import { useEffect } from 'react';

export default function Lightbox({ photo, onClose }) {
  useEffect(() => {
    document.body.classList.add('lightbox-open');
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.classList.remove('lightbox-open');
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: '#050505' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-silver text-xs tracking-[0.2em] hover:text-paper transition-colors z-10"
        style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
      >
        CLOSE
      </button>

      <img
        src={photo.image_url}
        alt={photo.title || 'Photography'}
        className="max-w-full max-h-screen object-contain"
        style={{ maxWidth: '95vw', maxHeight: '95vh' }}
        onClick={(e) => e.stopPropagation()}
      />

      {photo.title && (
        <div className="absolute bottom-6 left-8">
          <p className="text-silver text-xs tracking-[0.15em]" style={{ fontFamily: 'Inter, sans-serif' }}>
            {photo.title}
          </p>
        </div>
      )}
    </div>
  );
}