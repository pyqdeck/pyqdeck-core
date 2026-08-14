import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Roboto } from 'next/font/google';

import { getApiServer } from '@/lib/api-server';

export const dynamic = 'force-dynamic';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default async function StudioLayout({ children }) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  let role = 'normal';
  let isSynced = false;

  try {
    const api = await getApiServer();
    const res = await api.users.getCurrentUser();
    const userData = res.data?.data?.user;

    if (userData) {
      role = userData.role || 'normal';
      isSynced = true;
    }
  } catch (error) {
    // If the API fails, we don't necessarily want to kick the admin out immediately
    // especially if it's just a 500 or network error.
    console.error(
      '❌ Studio Auth Error:',
      error?.response?.data || error?.message || error
    );

    // If it's a 401, they definitely need to log in again
    if (error?.response?.status === 401) {
      redirect('/sign-in');
    }
  }

  // Security Check: Redirect non-admins away from the Studio
  // We only redirect if we SUCCESSFULLY fetched a role and it's not authorized.
  // This prevents "accidental kicks" during backend restarts.
  if (isSynced && role !== 'admin' && role !== 'editor') {
    console.warn(
      `🚫 Access Denied: User has role "${role}". Redirecting to browse.`
    );
    redirect('/browse');
  }

  return (
    <SidebarProvider className={roboto.className}>
      <AppSidebar userRole={role} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/studio">Studio</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
