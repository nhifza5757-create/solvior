'use client';
import { useEffect, useState } from 'react';
import { MailPlus } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import StatusBadge from '@/components/admin/StatusBadge';

interface Subscriber { id: string; email: string; isActive: boolean; subscribedAt: string; }

export default function AdminNewsletterPage() {
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSubs = async () => {
    setLoading(true); setError('');
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to load subscribers');
      setSubs(await res.json());
    } catch (err: any) { setError(err.message || 'Something went wrong'); } finally { setLoading(false); }
  };
  useEffect(() => { fetchSubs(); }, []);

  const handleDelete = async (id: string, email: string) => {
    if (!window.confirm(`Remove "${email}" from the newsletter list?`)) return;
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
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

      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-primary/[0.04] text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
              <tr><th className="px-4 py-3">Email</th><th className="px-4 py-3">Subscribed At</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr>
            </thead>
            <tbody>
              {subs.length === 0 && <tr><td colSpan={4} className="px-4 py-12 text-center text-sm text-gray-400">No subscribers yet.</td></tr>}
              {subs.map((s) => (
                <tr key={s.id} className="border-t border-gray-100 hover:bg-primary/[0.03] transition-colors">
                  <td className="px-4 py-3 font-medium">{s.email}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(s.subscribedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{s.isActive ? <StatusBadge label="Active" tone="success" /> : <StatusBadge label="Unsubscribed" tone="neutral" />}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDelete(s.id, s.email)} className="text-red-500 hover:text-red-700 transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}