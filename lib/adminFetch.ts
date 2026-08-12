/**
 * Wraps fetch for admin API calls.
 *
 * - Attaches the stored admin_token as a Bearer header automatically.
 * - If the server responds 401 (token missing/invalid/expired), it clears
 *   the stored token and redirects to /admin/login so the user gets a
 *   clear "please log in again" moment instead of a silent/broken page.
 *
 * Usage is a drop-in replacement for fetch:
 *   const res = await adminFetch(`${process.env.NEXT_PUBLIC_API_URL}/services/admin`);
 *   const res = await adminFetch(url, { method: 'DELETE' });
 *   const res = await adminFetch(url, {
 *     method: 'PATCH',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ status }),
 *   });
 */
export async function adminFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

  const res = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
    // Avoid redirect loops if we're already on the login page
    if (!window.location.pathname.startsWith('/admin/login')) {
      window.location.href = '/admin/login?expired=1';
    }
  }

  return res;
}
