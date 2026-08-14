import { notFound } from 'next/navigation';
import { getApiServer } from '@/lib/api-server';
import { OfferingDetail } from '@/app/studio/_components/offering-detail';

export const metadata = { title: 'Subject Offering | PyqDeck Studio' };

export default async function OfferingDetailPage({ params, searchParams }) {
  const { universityId, branchId, semesterId, offeringId } = await params;
  const resolvedSearchParams = await searchParams;
  const tab = resolvedSearchParams?.tab === 'papers' ? 'papers' : 'syllabus';

  const api = await getApiServer();

  let university = null;
  let branch = null;
  let semester = null;
  let offering = null;
  let subject = null;
  let syllabus = null;
  let modules = [];
  let papers = [];

  try {
    const [uniRes, branchRes, semRes, offeringRes] = await Promise.all([
      api.universities.listUniversities({ limit: 100 }),
      api.branches.listAllBranches({ universityId, limit: 100 }),
      api.branches.listSemesters(branchId),
      api.subjectOfferings.getSubjectOfferingById(offeringId),
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
    offering = offeringRes.data.data;
    if (!university || !branch || !semester || !offering) return notFound();

    const subjectId = offering.subjectId?.id || offering.subjectId;
    const [subRes, papersRes, syllabusRes] = await Promise.all([
      api.subjects.listSubjects({ limit: 100 }),
      api.papers.listPapers({ subjectOfferingId: offeringId, limit: 100 }),
      api.subjectOfferings
        .getSyllabusBySubjectOffering(offeringId)
        .catch(() => null),
    ]);

    subject = (subRes.data.data.items || []).find(
      (s) => (s.id || s._id) === subjectId
    );
    papers = papersRes.data.data.items || [];
    syllabus = syllabusRes?.data.data || null;
    modules = syllabus?.modules || [];
  } catch (error) {
    console.error('Failed to fetch offering detail:', error);
    return notFound();
  }

  return (
    <div className="p-4">
      <OfferingDetail
        university={university}
        branch={branch}
        semester={semester}
        offering={offering}
        subject={subject}
        syllabus={syllabus}
        modules={modules}
        papers={papers}
        initialTab={tab}
      />
    </div>
  );
}
