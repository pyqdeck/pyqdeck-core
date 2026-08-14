import { getApiServer } from '@/lib/api-server';
import { requireAdmin } from '@/lib/studio-auth';
import { AccessRequests } from '../_components/access-requests';

export const dynamic = 'force-dynamic';

export default async function AccessRequestsPage() {
  await requireAdmin();

  const api = await getApiServer();

  let requests = [];
  try {
    const res = await api.users.listGrantRequests();
    requests = res.data?.data?.items || [];
  } catch (error) {
    console.error('Failed to fetch access requests:', error);
  }

  return <AccessRequests initialRequests={requests} />;
}
