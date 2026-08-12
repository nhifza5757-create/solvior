'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { HeaderThemeProvider } from '@/context/HeaderThemeContext';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <HeaderThemeProvider>
      <Header />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </HeaderThemeProvider>
  );
}