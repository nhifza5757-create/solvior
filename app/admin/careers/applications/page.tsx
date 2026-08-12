'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, GraduationCap } from 'lucide-react';

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
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/careers/applications`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to load applications');
      setApps(await res.json());
    } catch (err: any) { setError(err.message || 'Something went wrong'); } finally { setLoading(false); }
  };
  useEffect(() => { fetchApps(); }, []);

  const handleStatusChange = async (id: string, status: AppStatus) => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/careers/applications/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
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

      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-primary/[0.04] text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
              <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Phone</th><th className="px-4 py-3">Resume</th><th className="px-4 py-3">Status</th></tr>
            </thead>
            <tbody>
              {apps.length === 0 && <tr><td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-400">No applications yet.</td></tr>}
              {apps.map((a) => (
                <tr key={a.id} className="border-t border-gray-100 align-top hover:bg-primary/[0.03] transition-colors">
                  <td className="px-4 py-3 font-medium">{a.name}</td>
                  <td className="px-4 py-3 text-gray-500">{a.email}</td>
                  <td className="px-4 py-3 text-gray-500">{a.phone || '-'}</td>
                  <td className="px-4 py-3">
                    <a href={a.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">View</a>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={a.status}
                      onChange={(e) => handleStatusChange(a.id, e.target.value as AppStatus)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColor(a.status)}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
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