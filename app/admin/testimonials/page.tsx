'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquareQuote } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import { adminFetch } from '@/lib/adminFetch';

interface Testimonial { id: string; name: string; company: string | null; rating: number; order: number; isActive: boolean; }

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    setLoading(true); setError('');
    try {
      const res = await adminFetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials/admin`, { });
      if (!res.ok) throw new Error('Failed to load testimonials');
      setItems(await res.json());
    } catch (err: any) { setError(err.message || 'Something went wrong'); } finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete testimonial from "${name}"? This cannot be undone.`)) return;
    try {
      const res = await adminFetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials/${id}`, { method: 'DELETE', });
      if (!res.ok) throw new Error('Failed to delete');
      fetchItems();
    } catch (err: any) { alert(err.message || 'Something went wrong'); }
  };

  return (
    <div>
      <PageHeader
        icon={MessageSquareQuote}
        title="Testimonials"
        subtitle="Manage client quotes shown across the site."
        count={items.length}
        action={
        <Link href="/admin/testimonials/new" data-cursor-hover className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary py-1.5 pl-2.5 pr-5 text-xs font-semibold text-white">
          <span aria-hidden className="absolute inset-y-0 left-2.5 z-0 my-auto h-7 w-7 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-20px)] group-active:w-[calc(100%-20px)]" />
          <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center"><ArrowRight className="h-3.5 w-3.5" /></span>
          <span className="relative z-10 ml-2.5">Add Testimonial</span>
        </Link>
        }
      />
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && items.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-12 text-center text-sm text-gray-400">
          No testimonials yet.
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <>
          {/* Mobile card view */}
          <div className="space-y-3 md:hidden">
            {items.map((t) => (
              <div key={t.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">{t.name}</p>
                    <p className="mt-0.5 text-xs text-gray-500 truncate">{t.company || '-'} &middot; {t.rating}/5</p>
                  </div>
                  {t.isActive ? <StatusBadge label="Active" tone="success" /> : <StatusBadge label="Inactive" tone="neutral" />}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Order {t.order}</span>
                  <div className="space-x-3">
                    <Link href={`/admin/testimonials/${t.id}`} className="text-primary hover:text-accent transition-colors text-sm">Edit</Link>
                    <button onClick={() => handleDelete(t.id, t.name)} className="text-red-500 hover:text-red-700 transition-colors text-sm">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop horizontal card view */}
          <div className="hidden md:block space-y-3">
            {items.map((t) => (
              <div key={t.id} className="flex items-center gap-6 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
                <span className="w-8 shrink-0 text-sm text-gray-400">{t.order}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{t.name}</p>
                  <p className="mt-0.5 text-sm text-gray-500 truncate">{t.company || '-'}</p>
                </div>
                <span className="w-14 shrink-0 text-sm text-gray-500">{t.rating}/5</span>
                <div className="shrink-0">{t.isActive ? <StatusBadge label="Active" tone="success" /> : <StatusBadge label="Inactive" tone="neutral" />}</div>
                <div className="flex shrink-0 items-center gap-4 pl-2">
                  <Link href={`/admin/testimonials/${t.id}`} className="text-sm text-primary hover:text-accent transition-colors">Edit</Link>
                  <button onClick={() => handleDelete(t.id, t.name)} className="text-sm text-red-500 hover:text-red-700 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
