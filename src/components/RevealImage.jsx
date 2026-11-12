import { useEffect, useRef, useState } from 'react';

export default function RevealImage({ src, alt, className = '', style = {} }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="overflow-hidden" style={style}>
      <img
        src={src}
        alt={alt}
        className={`reveal-on-scroll ${revealed ? 'revealed' : ''} ${className}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}