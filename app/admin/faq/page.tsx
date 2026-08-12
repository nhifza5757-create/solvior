'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import StatusBadge from '@/components/admin/StatusBadge';

interface Faq { id: string; question: string; category: string | null; order: number; isActive: boolean; }

export default function AdminFaqPage() {
  const [items, setItems] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    setLoading(true); setError('');
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faq/admin`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to load FAQs');
      setItems(await res.json());
    } catch (err: any) { setError(err.message || 'Something went wrong'); } finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id: string, question: string) => {
    if (!window.confirm(`Delete "${question}"? This cannot be undone.`)) return;
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faq/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to delete');
      fetchItems();
    } catch (err: any) { alert(err.message || 'Something went wrong'); }
  };

  return (
    <div>
      <PageHeader
        icon={HelpCircle}
        title="FAQ"
        subtitle="Manage frequently asked questions."
        count={items.length}
        action={
        <Link href="/admin/faq/new" data-cursor-hover className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary py-1.5 pl-2.5 pr-5 text-xs font-semibold text-white">
          <span aria-hidden className="absolute inset-y-0 left-2.5 z-0 my-auto h-7 w-7 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-20px)] group-active:w-[calc(100%-20px)]" />
          <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center"><ArrowRight className="h-3.5 w-3.5" /></span>
          <span className="relative z-10 ml-2.5">Add FAQ</span>
        </Link>
        }
      />
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-primary/[0.04] text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
              <tr><th className="px-4 py-3">Order</th><th className="px-4 py-3">Question</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Active</th><th className="px-4 py-3 text-right">Actions</th></tr>
            </thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-400">No FAQs yet.</td></tr>}
              {items.map((f) => (
                <tr key={f.id} className="border-t border-gray-100 hover:bg-primary/[0.03] transition-colors">
                  <td className="px-4 py-3">{f.order}</td>
                  <td className="px-4 py-3 font-medium">{f.question}</td>
                  <td className="px-4 py-3 text-gray-500">{f.category || '-'}</td>
                  <td className="px-4 py-3">{f.isActive ? <StatusBadge label="Active" tone="success" /> : <StatusBadge label="Inactive" tone="neutral" />}</td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <Link href={`/admin/faq/${f.id}`} className="text-primary hover:text-accent transition-colors">Edit</Link>
                    <button onClick={() => handleDelete(f.id, f.question)} className="text-red-500 hover:text-red-700 transition-colors">Delete</button>
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
