'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Careers</h1>
        <Link href="/admin/careers/new" data-cursor-hover className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary py-1.5 pl-2.5 pr-5 text-xs font-semibold text-white">
          <span aria-hidden className="absolute inset-y-0 left-2.5 z-0 my-auto h-7 w-7 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-20px)] group-active:w-[calc(100%-20px)]" />
          <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center"><ArrowRight className="h-3.5 w-3.5" /></span>
          <span className="relative z-10 ml-2.5">Add Job</span>
        </Link>
      </div>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Department</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Active</th><th className="px-4 py-3 text-right">Actions</th></tr>
            </thead>
            <tbody>
              {jobs.length === 0 && <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-400">No jobs yet.</td></tr>}
              {jobs.map((j) => (
                <tr key={j.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{j.title}</td>
                  <td className="px-4 py-3 text-gray-500">{j.department || '-'}</td>
                  <td className="px-4 py-3 text-gray-500">{j.location || '-'}</td>
                  <td className="px-4 py-3 text-gray-500">{j.type || '-'}</td>
                  <td className="px-4 py-3">{j.isActive ? <span className="text-green-600">Yes</span> : <span className="text-gray-400">No</span>}</td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <Link href={`/admin/careers/${j.id}`} className="text-blue-600 hover:underline">Edit</Link>
                    <Link href={`/admin/careers/${j.id}/applications`} className="text-purple-600 hover:underline">Applications</Link>
                    <button onClick={() => handleDelete(j.id, j.title)} className="text-red-600 hover:underline">Delete</button>
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
