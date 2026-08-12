'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { adminFetch } from '@/lib/adminFetch';

type AppStatus = 'PENDING' | 'REVIEWED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED';

interface Application {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string | null;
  resumeUrl: string;
  coverLetter: string | null;
  status: AppStatus;
  createdAt: string;
}

const STATUS_OPTIONS: AppStatus[] = ['PENDING', 'REVIEWED', 'SHORTLISTED', 'REJECTED', 'HIRED'];

const statusColor = (s: AppStatus) => {
  switch (s) {
    case 'PENDING': return 'bg-primary/10 text-primary border-primary/20';
    case 'REVIEWED': return 'bg-gray-100 text-gray-600 border-gray-200';
    case 'SHORTLISTED': return 'bg-violet-50 text-violet-600 border-violet-100';
    case 'HIRED': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'REJECTED': return 'bg-red-50 text-red-500 border-red-100';
  }
};

export default function AdminJobApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchApps = async () => {
    setLoading(true); setError('');
    try {
      const res = await adminFetch(`${process.env.NEXT_PUBLIC_API_URL}/careers/applications`, { });
      if (!res.ok) throw new Error('Failed to load applications');
      setApps(await res.json());
    } catch (err: any) { setError(err.message || 'Something went wrong'); } finally { setLoading(false); }
  };
  useEffect(() => { fetchApps(); }, []);

  const handleStatusChange = async (id: string, status: AppStatus) => {
    try {
      const res = await adminFetch(`${process.env.NEXT_PUBLIC_API_URL}/careers/applications/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }) });
      if (!res.ok) throw new Error('Failed to update status');
      setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    } catch (err: any) { alert(err.message || 'Something went wrong'); }
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
        <Link href="/admin/careers" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-primary hover:text-primary hover:bg-primary/5"><ArrowLeft className="h-4 w-4" /></Link>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-display font-semibold text-gray-900 tracking-tight">Job Applications</h1>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">{apps.length}</span>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Applicants who applied to your job listings.</p>
        </div>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && apps.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-12 text-center text-sm text-gray-400">
          No applications yet.
        </div>
      )}

      {!loading && !error && apps.length > 0 && (
        <>
          {/* Mobile card view */}
          <div className="space-y-3 md:hidden">
            {apps.map((a) => (
              <div key={a.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <p className="font-medium text-gray-900 truncate">{a.name}</p>
                <p className="mt-0.5 text-xs text-gray-500 truncate">{a.email}</p>
                <p className="mt-0.5 text-xs text-gray-500 truncate">{a.phone || '-'}</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <a href={a.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors text-sm">View resume</a>
                  <select
                    value={a.status}
                    onChange={(e) => handleStatusChange(a.id, e.target.value as AppStatus)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColor(a.status)}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop horizontal card view */}
          <div className="hidden md:block space-y-3">
            {apps.map((a) => (
              <div key={a.id} className="flex items-center gap-6 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{a.name}</p>
                  <p className="mt-0.5 text-sm text-gray-500 truncate">{a.email}</p>
                </div>
                <span className="w-32 shrink-0 text-sm text-gray-500 truncate">{a.phone || '-'}</span>
                <a href={a.resumeUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm text-primary hover:text-accent transition-colors">View resume</a>
                <select
                  value={a.status}
                  onChange={(e) => handleStatusChange(a.id, e.target.value as AppStatus)}
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${statusColor(a.status)}`}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}