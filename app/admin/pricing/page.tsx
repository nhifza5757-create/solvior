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
      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm text-left">
            <thead className="bg-primary/[0.04] text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
              <tr><th className="px-4 py-3">Order</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Billing</th><th className="px-4 py-3">Popular</th><th className="px-4 py-3">Active</th><th className="px-4 py-3 text-right">Actions</th></tr>
            </thead>
            <tbody>
              {plans.length === 0 && <tr><td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400">No pricing plans yet.</td></tr>}
              {plans.map((p) => (
                <tr key={p.id} className="border-t border-gray-100 hover:bg-primary/[0.03] transition-colors">
                  <td className="px-4 py-3">{p.order}</td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">${p.price}</td>
                  <td className="px-4 py-3 text-gray-500">{p.billingCycle}</td>
                  <td className="px-4 py-3">{p.isPopular ? <StatusBadge label="Popular" tone="primary" /> : '-'}</td>
                  <td className="px-4 py-3">{p.isActive ? <StatusBadge label="Active" tone="success" /> : <StatusBadge label="Inactive" tone="neutral" />}</td>
                  <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                    <Link href={`/admin/pricing/${p.id}`} className="text-primary hover:text-accent transition-colors">Edit</Link>
                    <button onClick={() => handleDelete(p.id, p.name)} className="text-red-500 hover:text-red-700 transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
}
