import { getApiServer } from '@/lib/api-server';
import { PapersManagement } from '../_components/papers-management';

export const metadata = {
  title: 'Papers | PyqDeck Studio',
  description:
    'Manage exam papers across every university, branch, and subject.',
};

export default async function PapersPage({ searchParams }) {
  const api = await getApiServer();

  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page || '1', 10);
  const limit = parseInt(resolvedSearchParams?.limit || '10', 10);
  const q = resolvedSearchParams?.q || undefined;

  let papers = [];
  let pagination = { total: 0, pages: 1, current: 1, limit };

  try {
    const res = await api.papers.listPapers({ page, limit, q });

    papers = res.data.data.items || [];
    const backendPagination = res.data.data.pagination;

    if (backendPagination) {
      pagination = {
        total: backendPagination.total,
        pages: backendPagination.totalPages,
        current: backendPagination.page,
        limit: backendPagination.limit || limit,
      };
    }
  } catch (error) {
    console.error('Failed to fetch papers data:', error);
  }

  return <PapersManagement initialPapers={papers} pagination={pagination} />;
}
