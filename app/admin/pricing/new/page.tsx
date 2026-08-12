'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function AddPricingPlanPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', price: '', billingCycle: 'monthly', featuresText: '', isPopular: false, order: 0, isActive: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.price.trim()) { setError('Name and price are required.'); return; }
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const features = form.featuresText.split('\n').map((f) => f.trim()).filter(Boolean);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pricing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: form.name, price: Number(form.price), billingCycle: form.billingCycle,
          features, isPopular: form.isPopular, order: Number(form.order), isActive: form.isActive,
        }),
      });
      if (!res.ok) { const data = await res.json().catch(() => null); throw new Error(data?.message || 'Failed to create pricing plan'); }
      router.push('/admin/pricing');
    } catch (err: any) { setError(err.message || 'Something went wrong'); } finally { setLoading(false); }
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/pricing" className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100"><ArrowLeft className="h-4 w-4" /></Link>
        <h1 className="text-2xl font-bold">Add Pricing Plan</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-5 rounded-lg bg-white p-6 shadow">
        {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Plan Name</label>
          <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Price</label>
            <input type="number" step="0.01" value={form.price} onChange={(e) => set('price', e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Billing Cycle</label>
            <select value={form.billingCycle} onChange={(e) => set('billingCycle', e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Features (one per line)</label>
          <textarea value={form.featuresText} onChange={(e) => set('featuresText', e.target.value)} rows={5} placeholder={'Unlimited projects\n24/7 support\nCustom domain'} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div className="flex gap-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Order</label>
            <input type="number" value={form.order} onChange={(e) => set('order', Number(e.target.value))} className="w-28 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
          </div>
          <div className="flex items-end gap-4 pb-2">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={form.isPopular} onChange={(e) => set('isPopular', e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
              Popular
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
              Active
            </label>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={loading} data-cursor-hover className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary py-1.5 pl-2.5 pr-5 text-xs font-semibold text-white disabled:opacity-60">
            <span aria-hidden className="absolute inset-y-0 left-2.5 z-0 my-auto h-7 w-7 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-20px)] group-active:w-[calc(100%-20px)]" />
            <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center"><ArrowRight className="h-3.5 w-3.5" /></span>
            <span className="relative z-10 ml-2.5">{loading ? 'Saving...' : 'Save Plan'}</span>
          </button>
          <Link href="/admin/pricing" className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-100 hover:text-gray-900">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
