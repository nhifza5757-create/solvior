'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, FolderKanban } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import { adminFetch } from '@/lib/adminFetch';

interface Portfolio { id: string; title: string; slug: string; category: string | null; order: number; isActive: boolean; }

export default function AdminPortfolioPage() {
  const router = useRouter();
  const [items, setItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    setLoading(true); setError('');
    try {
      const res = await adminFetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolios/admin`, { });
      if (!res.ok) throw new Error('Failed to load portfolio items');
      setItems(await res.json());
    } catch (err: any) { setError(err.message || 'Something went wrong'); } finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await adminFetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolios/${id}`, { method: 'DELETE', });
      if (!res.ok) throw new Error('Failed to delete');
      fetchItems();
    } catch (err: any) { alert(err.message || 'Something went wrong'); }
  };

  return (
    <div>
      <PageHeader
        icon={FolderKanban}
        title="Portfolio"
        subtitle="Manage the case studies shown in your Portfolio."
        count={items.length}
        action={
        <Link href="/admin/portfolio/new" data-cursor-hover className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary py-1.5 pl-2.5 pr-5 text-xs font-semibold text-white">
          <span aria-hidden className="absolute inset-y-0 left-2.5 z-0 my-auto h-7 w-7 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-20px)] group-active:w-[calc(100%-20px)]" />
          <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center"><ArrowRight className="h-3.5 w-3.5" /></span>
          <span className="relative z-10 ml-2.5">Add Project</span>
        </Link>
        }
      />
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && items.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-12 text-center text-sm text-gray-400">
          No portfolio items yet.
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <>
          {/* Mobile card view */}
          <div className="space-y-3 md:hidden">
            {items.map((p) => (
              <div key={p.id} onClick={() => router.push(`/admin/portfolio/${p.id}`)} className="cursor-pointer rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-[#0075ff]/30 hover:shadow-md hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">{p.title}</p>
                    <p className="mt-0.5 text-xs text-gray-500 truncate">{p.category || '-'}</p>
                  </div>
                  {p.isActive ? <StatusBadge label="Active" tone="success" /> : <StatusBadge label="Inactive" tone="neutral" />}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Order {p.order}</span>
                  <div className="space-x-3">
                    <Link href={`/admin/portfolio/${p.id}`} onClick={(e) => e.stopPropagation()} className="text-primary hover:text-accent transition-colors text-sm">Edit</Link>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(p.id, p.title); }} className="text-red-500 hover:text-red-700 transition-colors text-sm">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop horizontal card view */}
          <div className="hidden md:block space-y-3">
            {items.map((p) => (
              <div key={p.id} onClick={() => router.push(`/admin/portfolio/${p.id}`)} className="flex cursor-pointer items-center gap-6 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-all hover:border-[#0075ff]/30 hover:shadow-md hover:-translate-y-0.5">
                <span className="w-8 shrink-0 text-sm text-gray-400">{p.order}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{p.title}</p>
                  <p className="mt-0.5 text-sm text-gray-500 truncate">{p.category || '-'}</p>
                </div>
                <div className="shrink-0">{p.isActive ? <StatusBadge label="Active" tone="success" /> : <StatusBadge label="Inactive" tone="neutral" />}</div>
                <div className="flex shrink-0 items-center gap-4 pl-2">
                  <Link href={`/admin/portfolio/${p.id}`} onClick={(e) => e.stopPropagation()} className="text-sm text-primary hover:text-accent transition-colors">Edit</Link>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(p.id, p.title); }} className="text-sm text-red-500 hover:text-red-700 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}