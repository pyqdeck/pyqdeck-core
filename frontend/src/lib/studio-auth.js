import { redirect } from 'next/navigation';
import { getApiServer } from '@/lib/api-server';

/**
 * Server-side guard for studio pages restricted to admins (User Directory,
 * Settings). StudioLayout already keeps non-admin/editor roles out of
 * /studio entirely, but editors can still reach these admin-only pages by
 * URL -- without this, the page renders with its data fetch silently
 * failed (403) instead of redirecting.
 */
export async function requireAdmin() {
  const api = await getApiServer();

  let role;
  try {
    const res = await api.users.getCurrentUser();
    role = res.data?.data?.user?.role;
  } catch (error) {
    if (error?.response?.status === 401) {
      redirect('/sign-in');
    }
    // Fail open on transient errors (e.g. a 500), consistent with
    // StudioLayout's own role check -- don't kick someone out over a
    // backend hiccup.
    return;
  }

  if (role !== 'admin') {
    redirect('/studio');
  }
}
