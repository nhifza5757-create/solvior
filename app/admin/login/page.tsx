'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useHeaderTheme } from '@/context/HeaderThemeContext';

function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setForceLight } = useHeaderTheme();
  const sessionExpired = searchParams.get('expired') === '1';

  useEffect(() => {
    setForceLight(true);
    return () => setForceLight(false);
  }, [setForceLight]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await res.json();

      // Save token so we can use it for future admin requests
      localStorage.setItem('admin_token', data.accessToken);

      // Redirect to dashboard
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-[#0b0f1a] bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/images/hero/h4-hero-side.jpg')" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#0b0f1a]/90" />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/images/logo-2.png"
            alt="Solvior"
            width={44}
            height={44}
            className="mb-4 h-11 w-11 object-contain"
          />
          <h1 className="font-display text-xl font-semibold text-white">Solvior Admin</h1>
          <p className="mt-1 text-sm text-gray-500">Sign in to manage your site</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white p-7 shadow-xl">
          {sessionExpired && !error && (
            <p className="mb-4 rounded-lg border border-amber-100 bg-amber-50 px-3.5 py-2.5 text-sm text-amber-700">
              Your session expired. Please log in again.
            </p>
          )}
          {error && (
            <p className="mb-4 rounded-lg border border-red-100 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-400 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="admin@solvior.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-400 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              data-cursor-hover
              className="group relative mt-2 flex w-full items-center justify-center overflow-hidden rounded-full bg-primary py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          Solvior Business Consulting © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}