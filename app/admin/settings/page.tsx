'use client';
import { useState } from 'react';
import { KeyRound, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { adminFetch } from '@/lib/adminFetch';

export default function AdminSettingsPage() {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [show, setShow] = useState({ old: false, next: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (form.newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }
    if (form.newPassword === form.oldPassword) {
      setError('New password must be different from the old password.');
      return;
    }

    setLoading(true);
    try {
      const res = await adminFetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || 'Failed to update password');
      }

      setSuccess(true);
      setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    'w-full rounded-lg border border-gray-400 px-3 py-2.5 pr-10 text-sm text-gray-900 placeholder:text-gray-400 transition-colors hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20';

  return (
    <div>
      <div
        className="relative mb-6 flex items-center gap-3.5 overflow-hidden rounded-2xl bg-cover bg-center px-5 py-4 sm:px-6"
        style={{ backgroundImage: "url('/images/hero/h4-hero-stat-bg.jpg')" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #0a1426E6 0%, #132038D9 55%, #0075ffB3 160%)' }}
        />
        <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/5" />
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#4da3ff] ring-1 ring-white/15">
          <KeyRound className="h-5 w-5" />
        </div>
        <h1 className="relative text-xl font-display font-semibold text-white tracking-tight">
          Change Password
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-md space-y-5 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-7"
      >
        {error && (
          <p className="rounded-lg border border-red-100 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
            {error}
          </p>
        )}
        {success && (
          <p className="flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-3.5 py-2.5 text-sm text-green-700">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Password updated successfully.
          </p>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600">
            Current Password
          </label>
          <div className="relative">
            <input
              type={show.old ? 'text' : 'password'}
              value={form.oldPassword}
              onChange={(e) => set('oldPassword', e.target.value)}
              className={fieldClass}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShow((s) => ({ ...s, old: !s.old }))}
              className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-gray-400 hover:text-gray-600"
              tabIndex={-1}
              aria-label={show.old ? 'Hide password' : 'Show password'}
            >
              {show.old ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600">New Password</label>
          <div className="relative">
            <input
              type={show.next ? 'text' : 'password'}
              value={form.newPassword}
              onChange={(e) => set('newPassword', e.target.value)}
              className={fieldClass}
              placeholder="At least 6 characters"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShow((s) => ({ ...s, next: !s.next }))}
              className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-gray-400 hover:text-gray-600"
              tabIndex={-1}
              aria-label={show.next ? 'Hide password' : 'Show password'}
            >
              {show.next ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={show.confirm ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={(e) => set('confirmPassword', e.target.value)}
              className={fieldClass}
              placeholder="Re-enter new password"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
              className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-gray-400 hover:text-gray-600"
              tabIndex={-1}
              aria-label={show.confirm ? 'Hide password' : 'Show password'}
            >
              {show.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            data-cursor-hover
            className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary py-1.5 pl-2.5 pr-5 text-xs font-semibold text-white disabled:opacity-60"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-2.5 z-0 my-auto h-7 w-7 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-20px)] group-active:w-[calc(100%-20px)]"
            />
            <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
              <KeyRound className="h-3.5 w-3.5" />
            </span>
            <span className="relative z-10 ml-2.5">
              {loading ? 'Updating...' : 'Update Password'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}