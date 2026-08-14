import { notFound } from 'next/navigation';
import { getApiServer } from '@/lib/api-server';
import { UniversityDetail } from '@/app/studio/_components/university-detail';

export async function generateMetadata({ params }) {
  const { universityId } = await params;
  return { title: `University | PyqDeck Studio` };
}

export default async function UniversityDetailPage({ params }) {
  const { universityId } = await params;
  const api = await getApiServer();

  let university = null;
  let branches = [];

  try {
    const uniRes = await api.universities.listUniversities({ limit: 100 });
    university = (uniRes.data.data.items || []).find(
      (u) => (u.id || u._id) === universityId
    );
    if (!university) return notFound();

    const branchRes = await api.branches.listAllBranches({
      universityId,
      limit: 100,
    });
    branches = branchRes.data.data.items || [];
  } catch (error) {
    console.error('Failed to fetch university detail:', error);
    return notFound();
  }

  return (
    <div className="p-4">
      <UniversityDetail university={university} branches={branches} />
    </div>
  );
}
