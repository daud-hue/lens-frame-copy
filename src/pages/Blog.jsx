import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { base44 } from '@/api/base44Client';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.BlogPost.filter({ published: true }, '-created_date', 50)
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
      <Navbar />

      <section className="px-6 md:px-12 pt-36 pb-14" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-silver text-xs tracking-[0.3em] mb-4" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
          STORIES & INSIGHTS
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
          THE BLOG
        </h1>
      </section>

      <section className="px-6 md:px-12 py-16 max-w-screen-xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-6 h-6 border-2 border-gray-700 border-t-gray-300 rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-silver text-center py-32" style={{ fontFamily: 'Inter, sans-serif' }}>
            No blog posts yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block">
                  {post.cover_image_url && (
                    <div className="overflow-hidden mb-6" style={{ aspectRatio: '3 / 2' }}>
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <p className="text-silver text-xs tracking-[0.2em] mb-3 uppercase" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
                    {post.category?.replace('-', ' ')}
                  </p>
                  <h2
                    className="text-paper mb-3 group-hover:text-silver transition-colors"
                    style={{
                      fontFamily: 'Inter Tight, sans-serif',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                      lineHeight: 1.1,
                    }}
                  >
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-silver text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}