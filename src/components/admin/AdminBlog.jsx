import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const CATEGORIES = [
  { key: 'marriage', label: 'Marriage' },
  { key: 'events', label: 'Events' },
  { key: 'corporate', label: 'Corporate' },
  { key: 'behind-the-lens', label: 'Behind the Lens' },
];

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image_url: '',
    category: 'marriage',
    published: false,
  });

  const loadPosts = () => {
    base44.entities.BlogPost.list('-created_date', 100)
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadPosts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    setSaving(true);
    const slug = form.slug || slugify(form.title);
    try {
      await base44.entities.BlogPost.create({ ...form, slug });
      setForm({ title: '', slug: '', excerpt: '', content: '', cover_image_url: '', category: 'marriage', published: false });
      setShowForm(false);
      loadPosts();
    } catch (err) {
      alert('Failed to create post: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    await base44.entities.BlogPost.delete(id);
    loadPosts();
  };

  const togglePublished = async (post) => {
    await base44.entities.BlogPost.update(post.id, { published: !post.published });
    loadPosts();
  };

  const labelStyle = {
    fontFamily: 'Inter Tight, sans-serif',
    fontWeight: 700,
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    color: '#888',
    display: 'block',
    marginBottom: '4px',
  };
  const inputStyle = {
    background: '#fff',
    border: '1px solid #E5E5E5',
    color: '#111',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    padding: '8px 12px',
    width: '100%',
    outline: 'none',
    borderRadius: '4px',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
          Blog Posts
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 text-xs tracking-wider transition-all rounded-md"
          style={{
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 700,
            backgroundColor: '#111',
            color: '#fff',
          }}
        >
          {showForm ? '← CANCEL' : '+ NEW POST'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 mb-8 border border-gray-200 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label style={labelStyle}>TITLE *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={inputStyle}
                placeholder="Behind the Lens: A Rosewood Wedding"
              />
            </div>
            <div>
              <label style={labelStyle}>SLUG (auto if empty)</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                style={inputStyle}
                placeholder="behind-the-lens-rosewood"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label style={labelStyle}>CATEGORY</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                style={inputStyle}
              >
                {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>COVER IMAGE URL</label>
              <input
                type="text"
                value={form.cover_image_url}
                onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
                style={inputStyle}
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>EXCERPT</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }}
              placeholder="A short summary for the blog list..."
            />
          </div>

          <div>
            <label style={labelStyle}>CONTENT (MARKDOWN) *</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              style={{ ...inputStyle, minHeight: '300px', resize: 'vertical', fontFamily: 'ui-monospace, monospace', fontSize: '0.85rem' }}
              placeholder="# Heading&#10;&#10;Write your post in markdown..."
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>Publish immediately</span>
          </label>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 text-xs tracking-wider rounded-md disabled:opacity-50"
            style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, backgroundColor: '#111', color: '#fff' }}
          >
            {saving ? 'SAVING...' : 'CREATE POST'}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>No blog posts yet.</p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg p-4 border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {post.cover_image_url ? (
                  <img src={post.cover_image_url} alt="" className="w-12 h-12 object-cover rounded" />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">N/A</div>
                )}
                <div>
                  <p className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Inter Tight, sans-serif' }}>{post.title}</p>
                  <p className="text-xs text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                    /blog/{post.slug} · {post.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => togglePublished(post)}
                  className="px-3 py-1 text-xs rounded transition-all"
                  style={{
                    fontFamily: 'Inter Tight, sans-serif',
                    fontWeight: 700,
                    border: '1px solid #E5E5E5',
                    color: post.published ? '#16a34a' : '#888',
                    backgroundColor: post.published ? '#f0fdf4' : 'transparent',
                  }}
                >
                  {post.published ? 'PUBLISHED' : 'DRAFT'}
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-3 py-1 text-xs rounded transition-all"
                  style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, border: '1px solid #E5E5E5', color: '#dc2626' }}
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}