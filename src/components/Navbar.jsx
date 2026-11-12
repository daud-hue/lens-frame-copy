import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', path: '/gallery' },
    { label: 'ABOUT', path: '/about' },
    { label: 'SERVICES', path: '/services' },
    { label: 'BLOG', path: '/blog' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        opacity: scrolled ? 0.85 : 1,
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        backgroundColor: scrolled ? 'rgba(5,5,5,0.9)' : 'transparent',
      }}
    >
      <nav className="flex items-center justify-between px-6 md:px-12" style={{ height: '56px' }}>
        <Link
          to="/"
          className="font-display-tight text-paper text-sm tracking-[0.2em]"
          style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 900, letterSpacing: '0.2em' }}
        >
          LENS & FRAME
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link-hover text-xs tracking-[0.15em] transition-colors duration-300 ${
                isActive(link.path) ? 'text-paper' : 'text-silver hover:text-paper'
              }`}
              style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="btn-negative-fill text-xs tracking-[0.15em] px-5 py-2"
            style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
          >
            BOOK SESSION
          </Link>
        </div>

        {/* Mobile nav */}
        <MobileNav navLinks={navLinks} />
      </nav>
    </header>
  );
}

function MobileNav({ navLinks }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-px bg-paper transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-px bg-paper transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-px bg-paper transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: '#050505', top: 0 }}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-6 text-silver text-xs tracking-widest"
            style={{ fontFamily: 'Inter Tight, sans-serif' }}
          >
            CLOSE
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className="font-display-tight text-paper text-3xl"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="btn-negative-fill text-sm tracking-[0.15em] px-8 py-3 mt-4"
            style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
          >
            BOOK SESSION
          </Link>
        </div>
      )}
    </div>
  );
}