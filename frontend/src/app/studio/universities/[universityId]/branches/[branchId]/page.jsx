import { notFound } from 'next/navigation';
import { getApiServer } from '@/lib/api-server';
import { BranchDetail } from '@/app/studio/_components/branch-detail';

export const metadata = { title: 'Branch | PyqDeck Studio' };

export default async function BranchDetailPage({ params }) {
  const { universityId, branchId } = await params;
  const api = await getApiServer();

  let university = null;
  let branch = null;
  let semesters = [];

  try {
    const [uniRes, branchRes] = await Promise.all([
      api.universities.listUniversities({ limit: 100 }),
      api.branches.listAllBranches({ universityId, limit: 100 }),
    ]);

    university = (uniRes.data.data.items || []).find(
      (u) => (u.id || u._id) === universityId
    );
    branch = (branchRes.data.data.items || []).find(
      (b) => (b.id || b._id) === branchId
    );
    if (!university || !branch) return notFound();

    const semRes = await api.branches.listSemesters(branchId);
    semesters = (semRes.data.data.items || []).sort(
      (a, b) => a.number - b.number
    );
  } catch (error) {
    console.error('Failed to fetch branch detail:', error);
    return notFound();
  }

  return (
    <div className="p-4">
      <BranchDetail
        university={university}
        branch={branch}
        semesters={semesters}
      />
    </div>
  );
}
