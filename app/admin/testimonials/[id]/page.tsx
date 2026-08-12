'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MessageSquareQuote } from 'lucide-react';
import { adminFetch } from '@/lib/adminFetch';

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState({ name: '', position: '', company: '', content: '', rating: 5, image: '', order: 0, isActive: true });
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await adminFetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials/${id}`, { });
        if (!res.ok) throw new Error('Failed to load testimonial');
        const data = await res.json();
        setForm({
          name: data.name || '', position: data.position || '', company: data.company || '', content: data.content || '',
          rating: data.rating ?? 5, image: data.image || '', order: data.order ?? 0, isActive: data.isActive ?? true });
      } catch (err: any) { setError(err.message || 'Something went wrong'); } finally { setFetching(false); }
    };
    fetchItem();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.content.trim()) { setError('Name and content are required.'); return; }
    setLoading(true);
    try {
      const res = await adminFetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating: Number(form.rating), order: Number(form.order) }) });
      if (!res.ok) { const data = await res.json().catch(() => null); throw new Error(data?.message || 'Failed to update testimonial'); }
      router.push('/admin/testimonials');
    } catch (err: any) { setError(err.message || 'Something went wrong'); } finally { setLoading(false); }
  };

  if (fetching) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
        <Link href="/admin/testimonials" className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-primary hover:text-primary hover:bg-primary/5"><ArrowLeft className="h-4 w-4" /></Link>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <MessageSquareQuote className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-display font-semibold text-gray-900 tracking-tight">Edit Testimonial</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-5 rounded-xl bg-white p-4 shadow-sm border border-gray-100 sm:p-7">
        {error && <p className="rounded-lg bg-red-50 border border-red-100 px-3.5 py-2.5 text-sm text-red-600">{error}</p>}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600">Name</label>
          <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} className="w-full rounded-lg border border-gray-400 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">Position</label>
            <input type="text" value={form.position} onChange={(e) => set('position', e.target.value)} className="w-full rounded-lg border border-gray-400 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">Company</label>
            <input type="text" value={form.company} onChange={(e) => set('company', e.target.value)} className="w-full rounded-lg border border-gray-400 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600">Testimonial Content</label>
          <textarea value={form.content} onChange={(e) => set('content', e.target.value)} rows={4} className="w-full rounded-lg border border-gray-400 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600">Image URL</label>
          <input type="text" value={form.image} onChange={(e) => set('image', e.target.value)} className="w-full rounded-lg border border-gray-400 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
        <div className="flex flex-wrap gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">Rating (1-5)</label>
            <input type="number" min={1} max={5} value={form.rating} onChange={(e) => set('rating', Number(e.target.value))} className="w-28 rounded-lg border border-gray-400 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">Order</label>
            <input type="number" value={form.order} onChange={(e) => set('order', Number(e.target.value))} className="w-28 rounded-lg border border-gray-400 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} className="h-4 w-4 rounded border-gray-400 text-primary focus:ring-primary" />
              Active
            </label>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={loading} data-cursor-hover className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary py-1.5 pl-2.5 pr-5 text-xs font-semibold text-white disabled:opacity-60">
            <span aria-hidden className="absolute inset-y-0 left-2.5 z-0 my-auto h-7 w-7 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-20px)] group-active:w-[calc(100%-20px)]" />
            <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center"><ArrowRight className="h-3.5 w-3.5" /></span>
            <span className="relative z-10 ml-2.5">{loading ? 'Saving...' : 'Update Testimonial'}</span>
          </button>
          <Link href="/admin/testimonials" className="rounded-md border border-gray-400 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-100 hover:text-gray-900">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
