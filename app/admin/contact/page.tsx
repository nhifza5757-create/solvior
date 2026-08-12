'use client';
import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';

type ContactStatus = 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: ContactStatus;
  createdAt: string;
}

const STATUS_OPTIONS: ContactStatus[] = ['NEW', 'READ', 'REPLIED', 'ARCHIVED'];

export default function AdminContactPage() {
  const [items, setItems] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    setLoading(true); setError('');
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to load messages');
      setItems(await res.json());
    } catch (err: any) { setError(err.message || 'Something went wrong'); } finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);

  const handleStatusChange = async (id: string, status: ContactStatus) => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    } catch (err: any) { alert(err.message || 'Something went wrong'); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete message from "${name}"? This cannot be undone.`)) return;
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to delete');
      fetchItems();
    } catch (err: any) { alert(err.message || 'Something went wrong'); }
  };

  const statusColor = (s: ContactStatus) => {
    switch (s) {
      case 'NEW': return 'bg-primary/10 text-primary border-primary/20';
      case 'READ': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'REPLIED': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'ARCHIVED': return 'bg-gray-50 text-gray-400 border-gray-100';
    }
  };

  return (
    <div>
      <PageHeader
        icon={Mail}
        title="Contact Messages"
        subtitle="Messages submitted through your Contact form."
        count={items.length}
      />
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && items.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-12 text-center text-sm text-gray-400">
          No messages yet.
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <>
          {/* Mobile card view */}
          <div className="space-y-3 md:hidden">
            {items.map((c) => (
              <div key={c.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <p className="font-medium text-gray-900 truncate">{c.name}</p>
                <p className="mt-0.5 text-xs text-gray-500 truncate">{c.email}</p>
                <p className="mt-0.5 text-xs text-gray-500 truncate">{c.subject || '-'}</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <select
                    value={c.status}
                    onChange={(e) => handleStatusChange(c.id, e.target.value as ContactStatus)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColor(c.status)}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button onClick={() => handleDelete(c.id, c.name)} className="text-red-500 hover:text-red-700 transition-colors text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop horizontal card view */}
          <div className="hidden md:block space-y-3">
            {items.map((c) => (
              <div key={c.id} className="flex items-center gap-6 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{c.name}</p>
                  <p className="mt-0.5 text-sm text-gray-500 truncate">{c.email}</p>
                </div>
                <span className="w-40 shrink-0 text-sm text-gray-500 truncate">{c.subject || '-'}</span>
                <select
                  value={c.status}
                  onChange={(e) => handleStatusChange(c.id, e.target.value as ContactStatus)}
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${statusColor(c.status)}`}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button onClick={() => handleDelete(c.id, c.name)} className="shrink-0 text-sm text-red-500 hover:text-red-700 transition-colors">Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
