import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';

const STATUS_COLORS = {
  new: { bg: '#111111', text: '#FFFFFF' },
  read: { bg: '#E5E5E5', text: '#555555' },
  responded: { bg: '#D4EDDA', text: '#1A5C2A' },
};

export default function AdminInquiries({ onRefresh }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const load = () => {
    setLoading(true);
    base44.entities.Inquiry.list('-created_date', 100)
      .then(setInquiries)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await base44.entities.Inquiry.update(id, { status });
    load();
    onRefresh?.();
    if (selected?.id === id) setSelected((prev) => ({ ...prev, status }));
  };

  const filtered = filter === 'all' ? inquiries : inquiries.filter((i) => i.status === filter);

  const daysUntilEvent = (dateStr) => {
    if (!dateStr) return null;
    const diff = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
          Inquiries
        </h2>
        <div className="flex gap-2">
          {['all', 'new', 'read', 'responded'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="px-3 py-1.5 text-xs rounded-md transition-colors"
              style={{
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 700,
                backgroundColor: filter === s ? '#111111' : '#F0F0F0',
                color: filter === s ? '#FFFFFF' : '#555555',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-sm">No inquiries found.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((inq) => {
            const days = daysUntilEvent(inq.event_date);
            return (
              <button
                key={inq.id}
                onClick={() => setSelected(inq)}
                className="text-left bg-white rounded-lg p-5 border transition-all hover:shadow-md"
                style={{ borderColor: selected?.id === inq.id ? '#111111' : '#E5E5E5' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900 text-sm" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
                      {inq.name}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {inq.email}
                    </p>
                  </div>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      fontFamily: 'Inter Tight, sans-serif',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      backgroundColor: STATUS_COLORS[inq.status]?.bg,
                      color: STATUS_COLORS[inq.status]?.text,
                    }}
                  >
                    {inq.status?.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <span
                    className="text-xs uppercase tracking-wider text-gray-500"
                    style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
                  >
                    {inq.event_type}
                  </span>
                  {inq.event_date && (
                    <span className="text-xs text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {format(new Date(inq.event_date), 'MMM d, yyyy')}
                      {days !== null && days > 0 && (
                        <span
                          className="ml-2 px-1.5 py-0.5 rounded text-xs"
                          style={{
                            backgroundColor: days < 30 ? '#FFF3CD' : '#F0F0F0',
                            color: days < 30 ? '#856404' : '#555',
                          }}
                        >
                          {days}d
                        </span>
                      )}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-xs line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {inq.message}
                </p>

                <p className="text-gray-400 text-xs mt-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {format(new Date(inq.created_date), 'MMM d, yyyy — h:mm a')}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {/* Detail Panel */}
      {selected && (
        <div
          className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 overflow-y-auto"
          style={{ borderLeft: '1px solid #E5E5E5' }}
        >
          <div className="sticky top-0 bg-white px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #E5E5E5' }}>
            <p className="font-bold text-gray-900 text-sm" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
              Inquiry Detail
            </p>
            <button onClick={() => setSelected(null)} className="text-gray-400 text-xs hover:text-gray-900">
              CLOSE
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}>NAME</p>
              <p className="text-gray-900 font-medium">{selected.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}>EMAIL</p>
              <a href={`mailto:${selected.email}`} className="text-gray-900 hover:underline">{selected.email}</a>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}>EVENT TYPE</p>
              <p className="text-gray-900 uppercase text-sm font-bold" style={{ fontFamily: 'Inter Tight, sans-serif' }}>{selected.event_type}</p>
            </div>
            {selected.event_date && (
              <div>
                <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}>EVENT DATE</p>
                <p className="text-gray-900">{format(new Date(selected.event_date), 'MMMM d, yyyy')}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}>MESSAGE</p>
              <p className="text-gray-700 leading-relaxed">{selected.message}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-3" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}>STATUS</p>
              <div className="flex gap-2">
                {['new', 'read', 'responded'].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    className="px-3 py-1.5 text-xs rounded-md transition-colors"
                    style={{
                      fontFamily: 'Inter Tight, sans-serif',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      backgroundColor: selected.status === s ? '#111111' : '#F0F0F0',
                      color: selected.status === s ? '#FFFFFF' : '#555555',
                      textTransform: 'uppercase',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <a
              href={`mailto:${selected.email}?subject=Re: ${selected.event_type} Photography Inquiry`}
              className="block w-full text-center py-3 text-sm tracking-wider text-white rounded-none transition-colors"
              style={{ backgroundColor: '#111111', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700 }}
              onClick={() => updateStatus(selected.id, 'responded')}
            >
              REPLY VIA EMAIL
            </a>
          </div>
        </div>
      )}
    </div>
  );
}