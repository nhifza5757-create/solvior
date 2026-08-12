'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function AddBlogPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', image: '', category: '', author: '', isPublished: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const handleTitleChange = (value: string) => {
    set('title', value);
    const slug = value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    set('slug', slug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) { setError('Title, slug and content are required.'); return; }
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (!res.ok) { const data = await res.json().catch(() => null); throw new Error(data?.message || 'Failed to create blog post'); }
      router.push('/admin/blog');
    } catch (err: any) { setError(err.message || 'Something went wrong'); } finally { setLoading(false); }
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/blog" className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100"><ArrowLeft className="h-4 w-4" /></Link>
        <h1 className="text-2xl font-bold">Add Blog Post</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-5 rounded-lg bg-white p-6 shadow">
        {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
          <input type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Slug</label>
          <input type="text" value={form.slug} onChange={(e) => set('slug', e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Excerpt</label>
          <textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={2} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Content</label>
          <textarea value={form.content} onChange={(e) => set('content', e.target.value)} rows={8} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Image URL</label>
          <input type="text" value={form.image} onChange={(e) => set('image', e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
            <input type="text" value={form.category} onChange={(e) => set('category', e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Author</label>
            <input type="text" value={form.author} onChange={(e) => set('author', e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={form.isPublished} onChange={(e) => set('isPublished', e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
          <label className="text-sm text-gray-700">Publish immediately</label>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={loading} data-cursor-hover className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary py-1.5 pl-2.5 pr-5 text-xs font-semibold text-white disabled:opacity-60">
            <span aria-hidden className="absolute inset-y-0 left-2.5 z-0 my-auto h-7 w-7 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-20px)] group-active:w-[calc(100%-20px)]" />
            <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center"><ArrowRight className="h-3.5 w-3.5" /></span>
            <span className="relative z-10 ml-2.5">{loading ? 'Saving...' : 'Save Post'}</span>
          </button>
          <Link href="/admin/blog" className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-100 hover:text-gray-900">Cancel</Link>
        </div>
      </form>
    </div>
  );
}