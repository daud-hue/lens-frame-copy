import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminGallery from '@/components/admin/AdminGallery';
import AdminInquiries from '@/components/admin/AdminInquiries';
import AdminTestimonials from '@/components/admin/AdminTestimonials';
import AdminContent from '@/components/admin/AdminContent';
import AdminBlog from '@/components/admin/AdminBlog';

const TABS = [
  { key: 'inquiries', label: 'Inquiries' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'content', label: 'Site Content' },
  { key: 'blog', label: 'Blog' },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('inquiries');
  const [newInquiries, setNewInquiries] = useState(0);

  useEffect(() => {
    base44.entities.Inquiry.filter({ status: 'new' })
      .then((data) => setNewInquiries(data.length))
      .catch(() => {});
  }, []);

  return (
    <div className="admin-panel min-h-screen" style={{ backgroundColor: '#F5F5F5', fontFamily: 'Inter, sans-serif' }}>
      {/* Admin Header */}
      <header
        className="sticky top-0 z-40 px-6 md:px-10 flex items-center justify-between"
        style={{ height: '56px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E5E5' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-sm font-bold tracking-[0.1em] text-gray-900"
            style={{ fontFamily: 'Inter Tight, sans-serif' }}
          >
            LENS & FRAME
          </span>
          <span className="text-xs text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
            / Admin
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="/wedding-folders"
            className="text-xs text-gray-500 hover:text-gray-900 transition-colors tracking-widest"
            style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 600 }}
          >
            📁 FOLDER GENERATOR
          </a>
          <a
            href="/"
            className="text-xs text-gray-500 hover:text-gray-900 transition-colors tracking-widest"
            style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 600 }}
          >
            VIEW SITE →
          </a>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-8">
        {/* Tab Nav */}
        <div className="flex gap-1 mb-8 bg-white rounded-lg p-1 w-fit border border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="relative px-5 py-2 text-xs tracking-wider transition-all duration-200 rounded-md"
              style={{
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 700,
                color: activeTab === tab.key ? '#111111' : '#888888',
                backgroundColor: activeTab === tab.key ? '#F0F0F0' : 'transparent',
              }}
            >
              {tab.label}
              {tab.key === 'inquiries' && newInquiries > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center"
                  style={{ fontSize: '9px', backgroundColor: '#111111' }}
                >
                  {newInquiries}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'inquiries' && <AdminInquiries onRefresh={() => {
          base44.entities.Inquiry.filter({ status: 'new' }).then((d) => setNewInquiries(d.length)).catch(() => {});
        }} />}
        {activeTab === 'gallery' && <AdminGallery />}
        {activeTab === 'testimonials' && <AdminTestimonials />}
        {activeTab === 'content' && <AdminContent />}
        {activeTab === 'blog' && <AdminBlog />}
      </div>
    </div>
  );
}