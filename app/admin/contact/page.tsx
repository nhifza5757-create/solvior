'use client';
import { useEffect, useState } from 'react';

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
      case 'NEW': return 'text-blue-600';
      case 'READ': return 'text-gray-600';
      case 'REPLIED': return 'text-green-600';
      case 'ARCHIVED': return 'text-gray-400';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
      </div>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Subject</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr>
            </thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">No messages yet.</td></tr>}
              {items.map((c) => (
                <tr key={c.id} className="border-t align-top">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-gray-500">{c.email}</td>
                  <td className="px-4 py-3 text-gray-500">{c.subject || '-'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={c.status}
                      onChange={(e) => handleStatusChange(c.id, e.target.value as ContactStatus)}
                      className={`rounded-md border border-gray-300 px-2 py-1 text-xs font-semibold ${statusColor(c.status)}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => handleDelete(c.id, c.name)} className="text-red-600 hover:underline">Delete</button>
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
