import { getApiServer } from '@/lib/api-server';
import { MyPermissions } from '../_components/my-permissions';

export const dynamic = 'force-dynamic';

export default async function MyPermissionsPage() {
  const api = await getApiServer();

  let role = 'normal';
  let grants = [];
  let requests = [];
  try {
    const [meRes, grantsRes, requestsRes] = await Promise.all([
      api.users.getCurrentUser(),
      api.users.listMyGrants(),
      api.users.listMyGrantRequests(),
    ]);
    role = meRes.data?.data?.user?.role || 'normal';
    grants = grantsRes.data?.data?.items || [];
    requests = requestsRes.data?.data?.items || [];
  } catch (error) {
    console.error('Failed to fetch my permissions:', error);
  }

  return (
    <MyPermissions role={role} grants={grants} initialRequests={requests} />
  );
}
