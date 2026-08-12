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
      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-primary/[0.04] text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
              <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Subject</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr>
            </thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-400">No messages yet.</td></tr>}
              {items.map((c) => (
                <tr key={c.id} className="border-t border-gray-100 align-top hover:bg-primary/[0.03] transition-colors">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-gray-500">{c.email}</td>
                  <td className="px-4 py-3 text-gray-500">{c.subject || '-'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={c.status}
                      onChange={(e) => handleStatusChange(c.id, e.target.value as ContactStatus)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColor(c.status)}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => handleDelete(c.id, c.name)} className="text-red-500 hover:text-red-700 transition-colors">Delete</button>
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
