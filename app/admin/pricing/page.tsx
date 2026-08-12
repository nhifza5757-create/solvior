'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, DollarSign } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import StatusBadge from '@/components/admin/StatusBadge';

interface PricingPlan { id: string; name: string; price: string; billingCycle: string; isPopular: boolean; order: number; isActive: boolean; }

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPlans = async () => {
    setLoading(true); setError('');
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pricing/admin`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to load pricing plans');
      setPlans(await res.json());
    } catch (err: any) { setError(err.message || 'Something went wrong'); } finally { setLoading(false); }
  };
  useEffect(() => { fetchPlans(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pricing/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to delete');
      fetchPlans();
    } catch (err: any) { alert(err.message || 'Something went wrong'); }
  };

  return (
    <div>
      <PageHeader
        icon={DollarSign}
        title="Pricing Plans"
        subtitle="Manage the plans shown on your Pricing page."
        count={plans.length}
        action={
        <Link href="/admin/pricing/new" data-cursor-hover className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary py-1.5 pl-2.5 pr-5 text-xs font-semibold text-white">
          <span aria-hidden className="absolute inset-y-0 left-2.5 z-0 my-auto h-7 w-7 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-20px)] group-active:w-[calc(100%-20px)]" />
          <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center"><ArrowRight className="h-3.5 w-3.5" /></span>
          <span className="relative z-10 ml-2.5">Add Plan</span>
        </Link>
        }
      />
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && plans.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-12 text-center text-sm text-gray-400">
          No pricing plans yet.
        </div>
      )}

      {!loading && !error && plans.length > 0 && (
        <>
          {/* Mobile card view */}
          <div className="space-y-3 md:hidden">
            {plans.map((p) => (
              <div key={p.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 truncate">{p.name}</p>
                      {p.isPopular && <StatusBadge label="Popular" tone="primary" />}
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500 truncate">${p.price} / {p.billingCycle}</p>
                  </div>
                  {p.isActive ? <StatusBadge label="Active" tone="success" /> : <StatusBadge label="Inactive" tone="neutral" />}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Order {p.order}</span>
                  <div className="space-x-3">
                    <Link href={`/admin/pricing/${p.id}`} className="text-primary hover:text-accent transition-colors text-sm">Edit</Link>
                    <button onClick={() => handleDelete(p.id, p.name)} className="text-red-500 hover:text-red-700 transition-colors text-sm">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop horizontal card view */}
          <div className="hidden md:block space-y-3">
            {plans.map((p) => (
              <div key={p.id} className="flex items-center gap-6 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
                <span className="w-8 shrink-0 text-sm text-gray-400">{p.order}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 truncate">{p.name}</p>
                    {p.isPopular && <StatusBadge label="Popular" tone="primary" />}
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500 truncate">${p.price} / {p.billingCycle}</p>
                </div>
                <div className="shrink-0">{p.isActive ? <StatusBadge label="Active" tone="success" /> : <StatusBadge label="Inactive" tone="neutral" />}</div>
                <div className="flex shrink-0 items-center gap-4 pl-2">
                  <Link href={`/admin/pricing/${p.id}`} className="text-sm text-primary hover:text-accent transition-colors">Edit</Link>
                  <button onClick={() => handleDelete(p.id, p.name)} className="text-sm text-red-500 hover:text-red-700 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
