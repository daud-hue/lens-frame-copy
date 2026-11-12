import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function AdminContent() {
  const [content, setContent] = useState(null);
  const [form, setForm] = useState({
    photographer_name: '',
    hero_headline: '',
    hero_subtext: '',
    bio_text: '',
    tagline: '',
    email: '',
    phone: '',
    instagram_url: '',
    profile_photo_url: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState('');

  useEffect(() => {
    base44.entities.SiteContent.list().then((data) => {
      if (data && data.length > 0) {
        setContent(data[0]);
        setForm(data[0]);
        setProfilePreview(data[0].profile_photo_url || '');
      }
    }).catch(() => {});
  }, []);

  const handleProfileFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    let profileUrl = form.profile_photo_url;
    if (profileFile) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file: profileFile });
      profileUrl = file_url;
    }
    const dataToSave = { ...form, profile_photo_url: profileUrl };
    if (content?.id) {
      await base44.entities.SiteContent.update(content.id, dataToSave);
    } else {
      const created = await base44.entities.SiteContent.create(dataToSave);
      setContent(created);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass = "w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-500";
  const labelClass = "block text-xs text-gray-500 mb-1";
  const labelStyle = { fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, letterSpacing: '0.1em' };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
          Site Content
        </h2>
        {saved && (
          <span className="text-xs text-green-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
            Saved successfully
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6 max-w-2xl">
        {/* Profile Photo */}
        <div>
          <label className={labelClass} style={labelStyle}>PROFILE PHOTO</label>
          <div className="flex items-center gap-4">
            {profilePreview && (
              <img src={profilePreview} alt="Profile" className="w-16 h-16 rounded-full object-cover border border-gray-200" />
            )}
            <label className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-xs text-gray-600 hover:border-gray-500 transition-colors" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
              CHOOSE PHOTO
              <input type="file" accept="image/*" onChange={handleProfileFile} className="hidden" />
            </label>
          </div>
        </div>

        <div>
          <label className={labelClass} style={labelStyle}>PHOTOGRAPHER NAME</label>
          <input type="text" value={form.photographer_name} onChange={(e) => setForm({ ...form, photographer_name: e.target.value })} className={inputClass} placeholder="Alex Mercer" />
        </div>

        <div>
          <label className={labelClass} style={labelStyle}>TAGLINE</label>
          <input type="text" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className={inputClass} placeholder="Documenting what matters." />
        </div>

        <div>
          <label className={labelClass} style={labelStyle}>HERO HEADLINE</label>
          <input type="text" value={form.hero_headline} onChange={(e) => setForm({ ...form, hero_headline: e.target.value })} className={inputClass} placeholder="LENS & FRAME" />
        </div>

        <div>
          <label className={labelClass} style={labelStyle}>HERO SUBTEXT</label>
          <input type="text" value={form.hero_subtext} onChange={(e) => setForm({ ...form, hero_subtext: e.target.value })} className={inputClass} placeholder="Marriage — Events — Corporate" />
        </div>

        <div>
          <label className={labelClass} style={labelStyle}>BIO TEXT</label>
          <textarea
            value={form.bio_text}
            onChange={(e) => setForm({ ...form, bio_text: e.target.value })}
            rows={6}
            className={inputClass + ' resize-none'}
            placeholder="Your full biography..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} style={labelStyle}>EMAIL</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="hello@lensandframe.com" />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>PHONE</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="+1 (555) 000-0000" />
          </div>
        </div>

        <div>
          <label className={labelClass} style={labelStyle}>INSTAGRAM URL</label>
          <input type="url" value={form.instagram_url} onChange={(e) => setForm({ ...form, instagram_url: e.target.value })} className={inputClass} placeholder="https://instagram.com/lensandframe" />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-8 py-2.5 text-xs text-white rounded-md disabled:opacity-50"
          style={{ backgroundColor: '#111111', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}
        >
          {saving ? 'SAVING...' : 'SAVE CHANGES'}
        </button>
      </form>
    </div>
  );
}