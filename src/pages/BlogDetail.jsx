import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { base44 } from '@/api/base44Client';

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.BlogPost.filter({ slug, published: true })
      .then((data) => setPost(data[0] || null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
        <div className="flex items-center justify-center py-32">
          <div className="w-6 h-6 border-2 border-gray-700 border-t-gray-300 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-paper text-2xl mb-6" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 900 }}>
            POST NOT FOUND
          </p>
          <Link to="/blog" className="btn-negative-fill text-xs tracking-[0.15em] px-6 py-3" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
            ← BACK TO BLOG
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
      <Navbar />

      <section className="px-6 md:px-12 pt-36 pb-10">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="text-silver text-xs tracking-[0.2em] hover:text-paper transition-colors" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
            ← BACK TO BLOG
          </Link>
          <p className="text-silver text-xs tracking-[0.3em] mt-8 mb-4 uppercase" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
            {post.category?.replace('-', ' ')}
          </p>
          <h1
            className="text-paper mb-6"
            style={{
              fontFamily: 'Inter Tight, sans-serif',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.05,
            }}
          >
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-silver text-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {post.cover_image_url && (
        <div className="px-6 md:px-12 mb-12">
          <div className="max-w-5xl mx-auto overflow-hidden" style={{ maxHeight: '60vh' }}>
            <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" style={{ maxHeight: '60vh' }} />
          </div>
        </div>
      )}

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-paper" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', lineHeight: 1.8 }}>
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-paper mt-10 mb-4" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 900, fontSize: '1.8rem' }}>{children}</h1>,
                h2: ({ children }) => <h2 className="text-paper mt-8 mb-3" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 800, fontSize: '1.4rem' }}>{children}</h2>,
                h3: ({ children }) => <h3 className="text-paper mt-6 mb-3" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, fontSize: '1.2rem' }}>{children}</h3>,
                p: ({ children }) => <p className="text-paper mb-5" style={{ fontWeight: 300 }}>{children}</p>,
                ul: ({ children }) => <ul className="mb-5 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="mb-5 space-y-2 list-decimal list-inside">{children}</ol>,
                li: ({ children }) => <li className="text-silver" style={{ fontWeight: 300 }}>{children}</li>,
                blockquote: ({ children }) => <blockquote className="border-l-2 pl-6 my-8 italic text-silver" style={{ borderColor: 'rgba(249,249,249,0.3)' }}>{children}</blockquote>,
                img: ({ src, alt }) => <img src={src} alt={alt} className="w-full my-8" />,
                a: ({ href, children }) => <a href={href} className="text-paper underline" target="_blank" rel="noopener noreferrer">{children}</a>,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}