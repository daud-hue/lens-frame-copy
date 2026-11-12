import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ client_name: '', quote: '', event_type: 'marriage', is_featured: true });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    base44.entities.Testimonial.list('-created_date', 50)
      .then(setTestimonials)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.client_name || !form.quote) return;
    setSaving(true);
    await base44.entities.Testimonial.create(form);
    setForm({ client_name: '', quote: '', event_type: 'marriage', is_featured: true });
    setShowForm(false);
    setSaving(false);
    load();
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    await base44.entities.Testimonial.delete(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
          Testimonials
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2 text-xs text-white rounded-md"
          style={{ backgroundColor: '#111111', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}
        >
          {showForm ? 'CANCEL' : '+ ADD TESTIMONIAL'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="bg-white rounded-xl border border-gray-200 p-6 mb-8 space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>CLIENT NAME</label>
            <input
              type="text"
              value={form.client_name}
              onChange={(e) => setForm({ ...form, client_name: e.target.value })}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
              placeholder="Client's name"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>QUOTE</label>
            <textarea
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              rows={4}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-500 resize-none"
              placeholder="Client's testimonial"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}>EVENT TYPE</label>
            <select
              value={form.event_type}
              onChange={(e) => setForm({ ...form, event_type: e.target.value })}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none"
            >
              <option value="marriage">Marriage</option>
              <option value="events">Events</option>
              <option value="corporate">Corporate</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 text-xs text-white rounded-md disabled:opacity-50"
            style={{ backgroundColor: '#111111', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}
          >
            {saving ? 'SAVING...' : 'SAVE TESTIMONIAL'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-gray-700 italic mb-4 leading-relaxed text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                "{t.quote}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 font-bold text-sm" style={{ fontFamily: 'Inter Tight, sans-serif' }}>{t.client_name}</p>
                  <p className="text-gray-400 text-xs uppercase tracking-wider" style={{ fontFamily: 'Inter Tight, sans-serif' }}>{t.event_type}</p>
                </div>
                <button
                  onClick={() => deleteItem(t.id)}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}