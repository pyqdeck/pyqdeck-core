import { getApiServer } from '@/lib/api-server';
import { MyPermissionsView } from '../_components/my-permissions-view';

export const dynamic = 'force-dynamic';

export default async function MyPermissionsPage() {
  const api = await getApiServer();

  let role = 'normal';
  let grants = [];
  try {
    const [meRes, grantsRes] = await Promise.all([
      api.users.getCurrentUser(),
      api.users.listMyGrants(),
    ]);
    role = meRes.data?.data?.user?.role || 'normal';
    grants = grantsRes.data?.data?.items || [];
  } catch (error) {
    console.error('Failed to fetch my permissions:', error);
  }

  return <MyPermissionsView role={role} grants={grants} />;
}
