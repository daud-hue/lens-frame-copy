import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t px-6 md:px-12 py-12"
      style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: '#050505' }}
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <p
              className="font-display-tight text-paper text-2xl mb-2"
              style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 900 }}
            >
              LENS & FRAME
            </p>
            <p className="text-silver text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              Documenting what matters.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 text-xs tracking-[0.15em] text-silver" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
            <Link to="/gallery" className="hover:text-paper transition-colors">WORK</Link>
            <Link to="/about" className="hover:text-paper transition-colors">ABOUT</Link>
            <Link to="/services" className="hover:text-paper transition-colors">SERVICES</Link>
            <Link to="/blog" className="hover:text-paper transition-colors">BLOG</Link>
            <Link to="/client-portal" className="hover:text-paper transition-colors">PORTAL</Link>
            <Link to="/contact" className="hover:text-paper transition-colors">CONTACT</Link>
          </div>

          <div className="text-xs text-silver" style={{ fontFamily: 'Inter, sans-serif' }}>
            <p>&copy; {year} Lens & Frame. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}