'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import StatusBadge from '@/components/admin/StatusBadge';

interface Job { id: string; title: string; department: string | null; location: string | null; type: string | null; isActive: boolean; }

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchJobs = async () => {
    setLoading(true); setError('');
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/careers/jobs/admin`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to load jobs');
      setJobs(await res.json());
    } catch (err: any) { setError(err.message || 'Something went wrong'); } finally { setLoading(false); }
  };
  useEffect(() => { fetchJobs(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/careers/jobs/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to delete');
      fetchJobs();
    } catch (err: any) { alert(err.message || 'Something went wrong'); }
  };

  return (
    <div>
      <PageHeader
        icon={GraduationCap}
        title="Careers"
        subtitle="Manage open job listings."
        count={jobs.length}
        action={
        <Link href="/admin/careers/new" data-cursor-hover className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary py-1.5 pl-2.5 pr-5 text-xs font-semibold text-white">
          <span aria-hidden className="absolute inset-y-0 left-2.5 z-0 my-auto h-7 w-7 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-20px)] group-active:w-[calc(100%-20px)]" />
          <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center"><ArrowRight className="h-3.5 w-3.5" /></span>
          <span className="relative z-10 ml-2.5">Add Job</span>
        </Link>
        }
      />
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && jobs.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-12 text-center text-sm text-gray-400">
          No jobs yet.
        </div>
      )}

      {!loading && !error && jobs.length > 0 && (
        <>
          {/* Mobile card view */}
          <div className="space-y-3 md:hidden">
            {jobs.map((j) => (
              <div key={j.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">{j.title}</p>
                    <p className="mt-0.5 text-xs text-gray-500 truncate">{j.department || '-'} &middot; {j.location || '-'} &middot; {j.type || '-'}</p>
                  </div>
                  {j.isActive ? <StatusBadge label="Active" tone="success" /> : <StatusBadge label="Inactive" tone="neutral" />}
                </div>
                <div className="mt-3 flex justify-end space-x-3">
                  <Link href={`/admin/careers/${j.id}`} className="text-primary hover:text-accent transition-colors text-sm">Edit</Link>
                  <Link href={`/admin/careers/${j.id}/applications`} className="text-violet-600 hover:text-violet-700 transition-colors text-sm">Applications</Link>
                  <button onClick={() => handleDelete(j.id, j.title)} className="text-red-500 hover:text-red-700 transition-colors text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop horizontal card view */}
          <div className="hidden md:block space-y-3">
            {jobs.map((j) => (
              <div key={j.id} className="flex items-center gap-6 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{j.title}</p>
                  <p className="mt-0.5 text-sm text-gray-500 truncate">{j.department || '-'} &middot; {j.location || '-'} &middot; {j.type || '-'}</p>
                </div>
                <div className="shrink-0">{j.isActive ? <StatusBadge label="Active" tone="success" /> : <StatusBadge label="Inactive" tone="neutral" />}</div>
                <div className="flex shrink-0 items-center gap-4 pl-2">
                  <Link href={`/admin/careers/${j.id}`} className="text-sm text-primary hover:text-accent transition-colors">Edit</Link>
                  <Link href={`/admin/careers/${j.id}/applications`} className="text-sm text-violet-600 hover:text-violet-700 transition-colors">Applications</Link>
                  <button onClick={() => handleDelete(j.id, j.title)} className="text-sm text-red-500 hover:text-red-700 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
