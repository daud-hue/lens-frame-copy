import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const CATEGORIES = ['marriage', 'events', 'corporate'];
const WIDTH_CLASSES = ['third', 'half', 'two-thirds'];

export default function AdminGallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filterCat, setFilterCat] = useState('all');
  const [form, setForm] = useState({ title: '', category: 'marriage', width_class: 'half', is_featured: false });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    base44.entities.Photo.list('-created_date', 200)
      .then(setPhotos)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file: imageFile });
    await base44.entities.Photo.create({ ...form, image_url: file_url });
    setForm({ title: '', category: 'marriage', width_class: 'half', is_featured: false });
    setImageFile(null);
    setPreviewUrl('');
    setShowForm(false);
    setUploading(false);
    load();
  };

  const toggleFeatured = async (photo) => {
    await base44.entities.Photo.update(photo.id, { is_featured: !photo.is_featured });
    load();
  };

  const deletePhoto = async (id) => {
    if (!confirm('Delete this photo?')) return;
    await base44.entities.Photo.delete(id);
    load();
  };

  const filtered = filterCat === 'all' ? photos : photos.filter((p) => p.category === filterCat);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
          Gallery
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2 text-xs text-white rounded-md transition-colors"
          style={{ backgroundColor: '#111111', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}
        >
          {showForm ? 'CANCEL' : '+ UPLOAD PHOTO'}
        </button>
      </div>

      {/* Upload Form */}
      {showForm && (
        <form onSubmit={handleUpload} className="bg-white rounded-xl border border-gray-200 p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-8 cursor-pointer hover:border-gray-500 transition-colors"
              htmlFor="photo-upload"
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded-md" />
              ) : (
                <>
                  <div className="text-3xl text-gray-300 mb-3">+</div>
                  <p className="text-xs text-gray-400 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Click to select image
                  </p>
                </>
              )}
              <input id="photo-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}>
                TITLE (optional)
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-500"
                placeholder="Photo title"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}>
                CATEGORY
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}>
                GRID WIDTH
              </label>
              <select
                value={form.width_class}
                onChange={(e) => setForm({ ...form, width_class: e.target.value })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none"
              >
                <option value="third">Narrow (1/3)</option>
                <option value="half">Medium (1/2)</option>
                <option value="two-thirds">Wide (2/3)</option>
              </select>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Feature on homepage</span>
            </label>

            <button
              type="submit"
              disabled={!imageFile || uploading}
              className="w-full py-2.5 text-xs text-white rounded-md transition-opacity disabled:opacity-50"
              style={{ backgroundColor: '#111111', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}
            >
              {uploading ? 'UPLOADING...' : 'UPLOAD PHOTO'}
            </button>
          </div>
        </form>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {['all', ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setFilterCat(c)}
            className="px-3 py-1.5 text-xs rounded-md"
            style={{
              fontFamily: 'Inter Tight, sans-serif',
              fontWeight: 700,
              backgroundColor: filterCat === c ? '#111111' : '#F0F0F0',
              color: filterCat === c ? '#FFFFFF' : '#555555',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((photo) => (
            <div key={photo.id} className="group relative rounded-lg overflow-hidden bg-gray-100" style={{ aspectRatio: '1' }}>
              <img src={photo.image_url} alt={photo.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center gap-2">
                <button
                  onClick={() => toggleFeatured(photo)}
                  className="opacity-0 group-hover:opacity-100 px-2 py-1 text-xs rounded transition-all"
                  style={{
                    backgroundColor: photo.is_featured ? '#F9F9F9' : 'rgba(255,255,255,0.2)',
                    color: photo.is_featured ? '#111111' : '#F9F9F9',
                    fontFamily: 'Inter Tight, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {photo.is_featured ? '★ FEAT' : '☆ FEAT'}
                </button>
                <button
                  onClick={() => deletePhoto(photo.id)}
                  className="opacity-0 group-hover:opacity-100 px-2 py-1 text-xs rounded bg-red-500 text-white transition-all"
                  style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
                >
                  DEL
                </button>
              </div>
              {photo.is_featured && (
                <div className="absolute top-2 left-2 px-1.5 py-0.5 text-xs bg-white text-black rounded" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>
                  ★
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-xs truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{photo.title || photo.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}