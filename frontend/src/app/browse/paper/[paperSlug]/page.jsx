import { notFound } from 'next/navigation';
import { getApiServer } from '@/lib/api-server';
import { getSubjectMap, formatExamType } from '@/lib/browse-helpers';
import { BreadcrumbNav } from '@/components/browse/breadcrumb-nav';
import { PaperQuestions } from '@/components/browse/paper-questions';
import { Badge } from '@/components/ui/badge';
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from '@/components/ui/empty';

export default async function PaperPage({ params }) {
  const { paperSlug } = await params;
  const api = await getApiServer();

  let paper = null;
  let offering = null;
  let subject = null;
  let questions = [];
  let breadcrumbTrail = [];

  try {
    const paperRes = await api.papers.getPaperBySlug(paperSlug);
    paper = paperRes.data?.data;
    if (!paper) return notFound();

    const [offeringRes, questionsRes] = await Promise.all([
      api.subjectOfferings.getSubjectOfferingById(paper.subjectOfferingId),
      api.papers.listQuestionsForPaper(paper.id, { limit: 100 }),
    ]);

    offering = offeringRes.data?.data;
    questions = questionsRes.data?.data?.items || [];

    if (offering) {
      const [subjectMap, universitiesRes, branchesRes, semestersRes] =
        await Promise.all([
          getSubjectMap(api),
          api.universities.listUniversities({ limit: 100 }),
          api.branches.listAllBranches({
            universityId: offering.universityId,
            limit: 100,
          }),
          api.branches.listSemesters(offering.branchId),
        ]);

      subject = subjectMap.get(offering.subjectId);
      const university = (universitiesRes.data?.data?.items || []).find(
        (u) => u.id === offering.universityId
      );
      const branch = (branchesRes.data?.data?.items || []).find(
        (b) => b.id === offering.branchId
      );
      const semester = (semestersRes.data?.data?.items || []).find(
        (s) => s.id === offering.semesterId
      );

      if (university && branch && semester) {
        breadcrumbTrail = [
          { label: university.name, href: `/browse/${university.slug}` },
          {
            label: branch.name,
            href: `/browse/${university.slug}/${branch.slug}`,
          },
          {
            label: semester.title || `Semester ${semester.number}`,
            href: `/browse/${university.slug}/${branch.slug}/${semester.number}`,
          },
          {
            label: subject?.name || 'Subject',
            href: `/browse/${university.slug}/${branch.slug}/${semester.number}/${offering.slug}`,
          },
        ];
      }
    }
  } catch (error) {
    console.error('Failed to fetch paper:', error);
    return notFound();
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <BreadcrumbNav trail={[...breadcrumbTrail, { label: paper.title }]} />

      <div className="mt-4 mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {paper.title}
        </h1>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Badge variant="outline">{paper.examYear}</Badge>
          <Badge variant="outline">{formatExamType(paper.examType)}</Badge>
          {paper.session && <Badge variant="outline">{paper.session}</Badge>}
          {paper.duration && (
            <Badge variant="outline">{paper.duration} min</Badge>
          )}
          {paper.maxMarks && (
            <Badge variant="outline">{paper.maxMarks} marks</Badge>
          )}
        </div>
      </div>

      {questions.length === 0 ? (
        <Empty className="border rounded-xl">
          <EmptyHeader>
            <EmptyTitle>No questions added yet</EmptyTitle>
            <EmptyDescription>
              This paper doesn&apos;t have any questions published yet.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <PaperQuestions questions={questions} />
      )}
    </div>
  );
}
