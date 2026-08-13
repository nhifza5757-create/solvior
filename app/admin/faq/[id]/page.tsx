'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';
import { adminFetch } from '@/lib/adminFetch';

export default function EditFaqPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState({ question: '', answer: '', category: '', order: 0, isActive: true });
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await adminFetch(`${process.env.NEXT_PUBLIC_API_URL}/faq/admin`, { });
        if (!res.ok) throw new Error('Failed to load FAQ');
        const list = await res.json();
        const data = list.find((f: any) => f.id === id);
        if (!data) throw new Error('FAQ not found');
        setForm({
          question: data.question || '', answer: data.answer || '', category: data.category || '',
          order: data.order ?? 0, isActive: data.isActive ?? true });
      } catch (err: any) { setError(err.message || 'Something went wrong'); } finally { setFetching(false); }
    };
    fetchItem();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.question.trim() || !form.answer.trim()) { setError('Question and answer are required.'); return; }
    setLoading(true);
    try {
      const res = await adminFetch(`${process.env.NEXT_PUBLIC_API_URL}/faq/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, order: Number(form.order) }) });
      if (!res.ok) { const data = await res.json().catch(() => null); throw new Error(data?.message || 'Failed to update FAQ'); }
      router.push('/admin/faq');
    } catch (err: any) { setError(err.message || 'Something went wrong'); } finally { setLoading(false); }
  };

  if (fetching) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
        <Link href="/admin/faq" className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-primary hover:text-primary hover:bg-primary/5"><ArrowLeft className="h-4 w-4" /></Link>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <HelpCircle className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-display font-semibold text-gray-900 tracking-tight">Edit FAQ</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-5 rounded-xl bg-white p-4 shadow-sm border border-gray-100 sm:p-7">
        {error && <p className="rounded-lg bg-red-50 border border-red-100 px-3.5 py-2.5 text-sm text-red-600">{error}</p>}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600">Question</label>
          <input type="text" value={form.question} onChange={(e) => set('question', e.target.value)} className="w-full rounded-lg border border-gray-400 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600">Answer</label>
          <textarea value={form.answer} onChange={(e) => set('answer', e.target.value)} rows={4} className="w-full rounded-lg border border-gray-400 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600">Category</label>
          <input type="text" value={form.category} onChange={(e) => set('category', e.target.value)} className="w-full rounded-lg border border-gray-400 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
        <div className="flex flex-wrap gap-5">
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
            <span className="relative z-10 ml-2.5">{loading ? 'Saving...' : 'Update FAQ'}</span>
          </button>
          <Link href="/admin/faq" className="rounded-md border border-gray-400 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-100 hover:text-gray-900">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
