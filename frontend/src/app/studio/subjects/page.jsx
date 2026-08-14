import { getApiServer } from '@/lib/api-server';
import { SubjectManagement } from '../_components/subject-management';

export const metadata = {
  title: 'Subject Management | PyqDeck Studio',
  description:
    'Manage academic subjects, curriculum codes, and syllabus content.',
};

export default async function SubjectsPage({ searchParams }) {
  const api = await getApiServer();

  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page || '1', 10);
  const limit = parseInt(resolvedSearchParams?.limit || '10', 10);

  let subjects = [];
  let pagination = { total: 0, pages: 1, current: 1 };

  try {
    const subRes = await api.subjects.listSubjects({ page, limit });

    subjects = subRes.data.data.items || [];
    const backendPagination = subRes.data.data.pagination;

    if (backendPagination) {
      pagination = {
        total: backendPagination.total,
        pages: backendPagination.totalPages,
        current: backendPagination.page,
      };
    }
  } catch (error) {
    console.error('Failed to fetch subjects data:', error);
  }

  return (
    <div className="p-4">
      <SubjectManagement initialSubjects={subjects} pagination={pagination} />
    </div>
  );
}
