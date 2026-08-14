'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/header';

export function MainLayoutWrapper({ children }) {
  const pathname = usePathname();

  // Hide the global Header for the Admin Studio and the branded auth pages
  const isStudio = pathname?.startsWith('/studio');
  const isAuthPage =
    pathname?.startsWith('/sign-in') ||
    pathname?.startsWith('/sign-up') ||
    pathname?.startsWith('/sso-callback');
  const hideHeader = isStudio || isAuthPage;

  return (
    <>
      {!hideHeader && <Header />}
      <main className={`flex-1 ${!hideHeader ? 'pt-16' : ''}`}>{children}</main>
    </>
  );
}
