'use client';
import { useEffect, useState } from 'react';
import { MailPlus } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import { adminFetch } from '@/lib/adminFetch';

interface Subscriber { id: string; email: string; isActive: boolean; subscribedAt: string; }

export default function AdminNewsletterPage() {
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSubs = async () => {
    setLoading(true); setError('');
    try {
      const res = await adminFetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter`, { });
      if (!res.ok) throw new Error('Failed to load subscribers');
      setSubs(await res.json());
    } catch (err: any) { setError(err.message || 'Something went wrong'); } finally { setLoading(false); }
  };
  useEffect(() => { fetchSubs(); }, []);

  const handleDelete = async (id: string, email: string) => {
    if (!window.confirm(`Remove "${email}" from the newsletter list?`)) return;
    try {
      const res = await adminFetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter/${id}`, { method: 'DELETE', });
      if (!res.ok) throw new Error('Failed to delete');
      fetchSubs();
    } catch (err: any) { alert(err.message || 'Something went wrong'); }
  };

  const activeCount = subs.filter((s) => s.isActive).length;

  return (
    <div>
      <PageHeader
        icon={MailPlus}
        title="Newsletter Subscribers"
        subtitle={`${activeCount} active of ${subs.length} total`}
        count={subs.length}
      />

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && subs.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-12 text-center text-sm text-gray-400">
          No subscribers yet.
        </div>
      )}

      {!loading && !error && subs.length > 0 && (
        <>
          {/* Mobile card view */}
          <div className="space-y-3 md:hidden">
            {subs.map((s) => (
              <div key={s.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-[#0075ff]/30 hover:shadow-md hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">{s.email}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{new Date(s.subscribedAt).toLocaleDateString()}</p>
                  </div>
                  {s.isActive ? <StatusBadge label="Active" tone="success" /> : <StatusBadge label="Unsubscribed" tone="neutral" />}
                </div>
                <div className="mt-3 flex justify-end">
                  <button onClick={() => handleDelete(s.id, s.email)} className="text-red-500 hover:text-red-700 transition-colors text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop horizontal card view */}
          <div className="hidden md:block space-y-3">
            {subs.map((s) => (
              <div key={s.id} className="flex items-center gap-6 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-all hover:border-[#0075ff]/30 hover:shadow-md hover:-translate-y-0.5">
                <p className="min-w-0 flex-1 truncate font-medium text-gray-900">{s.email}</p>
                <span className="shrink-0 text-sm text-gray-500">{new Date(s.subscribedAt).toLocaleDateString()}</span>
                <div className="shrink-0">{s.isActive ? <StatusBadge label="Active" tone="success" /> : <StatusBadge label="Unsubscribed" tone="neutral" />}</div>
                <button onClick={() => handleDelete(s.id, s.email)} className="shrink-0 text-sm text-red-500 hover:text-red-700 transition-colors">Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}