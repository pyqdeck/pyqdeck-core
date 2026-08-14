import { UsersTable } from '../_components/users-table';
import { StudioSearch } from '../_components/studio-search';
import { getApiServer } from '@/lib/api-server';

export const dynamic = 'force-dynamic';

export default async function UsersPage({ searchParams }) {
  const params = await searchParams;
  const search = params.search || '';
  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 10;
  const role = params.role || undefined;
  const sortBy = params.sortBy || 'createdAt';
  const sortOrder = params.sortOrder || 'desc';
  const isActive =
    params.isActive === 'true'
      ? true
      : params.isActive === 'false'
        ? false
        : undefined;

  let users = [];
  let pagination = { total: 0, page, limit, pages: 1 };

  try {
    const api = await getApiServer();
    const res = await api.users.listUsers({
      search,
      page,
      limit,
      role,
      sortBy,
      sortOrder,
      isActive,
    });
    users = res.data.data.items;
    pagination = {
      total: res.data.data.total,
      page: res.data.data.page,
      limit: res.data.data.limit,
      pages: Math.ceil(res.data.data.total / res.data.data.limit),
    };
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
            User Management
          </h1>
          <p className="text-muted-foreground font-roboto">
            View and manage platform users and their roles.
          </p>
        </div>
        <StudioSearch placeholder="Search users..." initialValue={search} />
      </div>

      <UsersTable initialUsers={users} pagination={pagination} />
    </div>
  );
}
