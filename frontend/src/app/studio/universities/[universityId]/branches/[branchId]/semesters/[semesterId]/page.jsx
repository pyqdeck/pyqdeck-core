import { notFound } from 'next/navigation';
import { getApiServer } from '@/lib/api-server';
import { SemesterDetail } from '@/app/studio/_components/semester-detail';

export const metadata = { title: 'Semester | PyqDeck Studio' };

export default async function SemesterDetailPage({ params }) {
  const { universityId, branchId, semesterId } = await params;
  const api = await getApiServer();

  let university = null;
  let branch = null;
  let semester = null;
  let offerings = [];
  let subjects = [];

  try {
    const [uniRes, branchRes, semRes, subRes] = await Promise.all([
      api.universities.listUniversities({ limit: 100 }),
      api.branches.listAllBranches({ universityId, limit: 100 }),
      api.branches.listSemesters(branchId),
      api.subjects.listSubjects({ limit: 100 }),
    ]);

    university = (uniRes.data.data.items || []).find(
      (u) => (u.id || u._id) === universityId
    );
    branch = (branchRes.data.data.items || []).find(
      (b) => (b.id || b._id) === branchId
    );
    semester = (semRes.data.data.items || []).find(
      (s) => (s.id || s._id) === semesterId
    );
    if (!university || !branch || !semester) return notFound();

    subjects = subRes.data.data.items || [];

    const offRes = await api.subjectOfferings.listSubjectOfferings({
      universityId,
      branchId,
      semesterId,
      limit: 100,
    });
    offerings = offRes.data.data.items || [];
  } catch (error) {
    console.error('Failed to fetch semester detail:', error);
    return notFound();
  }

  return (
    <div className="p-4">
      <SemesterDetail
        university={university}
        branch={branch}
        semester={semester}
        offerings={offerings}
        subjects={subjects}
      />
    </div>
  );
}
