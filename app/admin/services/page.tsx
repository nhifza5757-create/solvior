'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import StatusBadge from '@/components/admin/StatusBadge';

interface Service {
  id: string;
  title: string;
  slug: string;
  shortDesc: string | null;
  order: number;
  isActive: boolean;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchServices = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services/admin`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error('Failed to load services');
      const data = await res.json();
      setServices(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(`Delete "${title}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services/${id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error('Failed to delete');
      // Refresh list after delete
      fetchServices();
    } catch (err: any) {
      alert(err.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <PageHeader
        icon={Briefcase}
        title="Services"
        subtitle="Manage the services shown on your website."
        count={services.length}
        action={
          <Link
            href="/admin/services/new"
            data-cursor-hover
            className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary py-1.5 pl-2.5 pr-5 text-xs font-semibold text-white"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-2.5 z-0 my-auto h-7 w-7 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-20px)] group-active:w-[calc(100%-20px)]"
            />
            <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <span className="relative z-10 ml-2.5">Add Service</span>
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
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-400">
                    No services yet.
                  </td>
                </tr>
              )}
              {services.map((service) => (
                <tr key={service.id} className="border-t border-gray-100 hover:bg-primary/[0.03] transition-colors">
                  <td className="px-4 py-3">{service.order}</td>
                  <td className="px-4 py-3 font-medium">{service.title}</td>
                  <td className="px-4 py-3 text-gray-500">{service.slug}</td>
                  <td className="px-4 py-3">
                    {service.isActive ? <StatusBadge label="Active" tone="success" /> : <StatusBadge label="Inactive" tone="neutral" />}
                  </td>
                  <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                    <Link
                      href={`/admin/services/${service.id}`}
                      className="text-primary hover:text-accent transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(service.id, service.title)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
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