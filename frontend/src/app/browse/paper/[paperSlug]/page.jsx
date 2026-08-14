import { cache } from 'react';
import { notFound } from 'next/navigation';
import { getApiServer } from '@/lib/api-server';
import { getSubjectMap, formatExamType } from '@/lib/browse-helpers';
import { BreadcrumbNav } from '@/components/browse/breadcrumb-nav';
import { BreadcrumbJsonLd } from '@/components/browse/breadcrumb-json-ld';
import { PaperQuestions } from '@/components/browse/paper-questions';
import { Badge } from '@/components/ui/badge';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty';

const getPaperContext = cache(async (paperSlug) => {
  const api = await getApiServer();

  const paperRes = await api.papers.getPaperBySlug(paperSlug);
  const paper = paperRes.data?.data;
  if (!paper) return { paper: null, subject: null, breadcrumbTrail: [] };

  const offeringRes = await api.subjectOfferings.getSubjectOfferingById(
    paper.subjectOfferingId
  );
  const offering = offeringRes.data?.data;

  let subject = null;
  let breadcrumbTrail = [];

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

  return { paper, subject, breadcrumbTrail };
});

export async function generateMetadata({ params }) {
  const { paperSlug } = await params;
  const { paper, subject, breadcrumbTrail } = await getPaperContext(
    paperSlug
  ).catch(() => ({ paper: null, subject: null, breadcrumbTrail: [] }));
  if (!paper) return {};

  const universityName = breadcrumbTrail[0]?.label;
  const subjectName = subject?.name || breadcrumbTrail[3]?.label;
  const descriptionParts = [
    subjectName && `${subjectName} past paper`,
    paper.examYear,
    formatExamType(paper.examType),
    universityName && `— ${universityName}`,
  ].filter(Boolean);

  return {
    title: paper.title,
    description:
      descriptionParts.length > 0
        ? descriptionParts.join(', ')
        : `Download and practice the ${paper.title} past year question paper.`,
  };
}

export default async function PaperPage({ params }) {
  const { paperSlug } = await params;

  let paper = null;
  let questions = [];
  let breadcrumbTrail = [];

  try {
    const context = await getPaperContext(paperSlug);
    paper = context.paper;
    breadcrumbTrail = context.breadcrumbTrail;
    if (!paper) return notFound();

    const api = await getApiServer();
    const questionsRes = await api.papers.listQuestionsForPaper(paper.id, {
      limit: 100,
    });
    questions = questionsRes.data?.data?.items || [];
  } catch (error) {
    console.error('Failed to fetch paper:', error);
    return notFound();
  }

  const trail = [...breadcrumbTrail, { label: paper.title }];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd trail={trail} />
      <BreadcrumbNav trail={trail} />

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
        <Empty className="rounded-xl border">
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
