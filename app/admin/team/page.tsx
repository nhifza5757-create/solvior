'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import StatusBadge from '@/components/admin/StatusBadge';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  order: number;
  isActive: boolean;
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMembers = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to load team members');
      setMembers(await res.json());
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete');
      fetchMembers();
    } catch (err: any) {
      alert(err.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <PageHeader
        icon={Users}
        title="Team"
        subtitle="Manage the people featured on your Team page."
        count={members.length}
        action={
          <Link href="/admin/team/new" data-cursor-hover className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary py-1.5 pl-2.5 pr-5 text-xs font-semibold text-white">
            <span aria-hidden className="absolute inset-y-0 left-2.5 z-0 my-auto h-7 w-7 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-20px)] group-active:w-[calc(100%-20px)]" />
            <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center"><ArrowRight className="h-3.5 w-3.5" /></span>
            <span className="relative z-10 ml-2.5">Add Member</span>
          </Link>
        }
      />

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-primary/[0.04] text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Position</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-400">No team members yet.</td></tr>
              )}
              {members.map((m) => (
                <tr key={m.id} className="border-t border-gray-100 hover:bg-primary/[0.03] transition-colors">
                  <td className="px-4 py-3">{m.order}</td>
                  <td className="px-4 py-3 font-medium">{m.name}</td>
                  <td className="px-4 py-3 text-gray-500">{m.position}</td>
                  <td className="px-4 py-3">{m.isActive ? <StatusBadge label="Active" tone="success" /> : <StatusBadge label="Inactive" tone="neutral" />}</td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <Link href={`/admin/team/${m.id}`} className="text-primary hover:text-accent transition-colors">Edit</Link>
                    <button onClick={() => handleDelete(m.id, m.name)} className="text-red-500 hover:text-red-700 transition-colors">Delete</button>
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
