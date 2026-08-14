import { cache } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getApiServer } from '@/lib/api-server';
import { getSubjectMap, formatExamType } from '@/lib/browse-helpers';
import { BreadcrumbNav } from '@/components/browse/breadcrumb-nav';
import { BreadcrumbJsonLd } from '@/components/browse/breadcrumb-json-ld';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { FileText } from 'lucide-react';

const EMPTY_SUBJECT_OFFERING = {
  university: null,
  branch: null,
  semester: null,
  offering: null,
  subject: null,
};

const getSubjectOfferingContext = cache(
  async (universitySlug, branchSlug, semesterNumber, subjectSlug) => {
    const api = await getApiServer();

    const uniRes = await api.universities.getUniversityBySlug(universitySlug);
    const university = uniRes.data?.data;
    if (!university) return EMPTY_SUBJECT_OFFERING;

    const branchRes = await api.universities.getBranchBySlug(
      university.id,
      branchSlug
    );
    const branch = branchRes.data?.data;
    if (!branch) return { ...EMPTY_SUBJECT_OFFERING, university };

    const semRes = await api.branches.getSemesterByNumber(
      branch.id,
      Number(semesterNumber)
    );
    const semester = semRes.data?.data;
    if (!semester) return { ...EMPTY_SUBJECT_OFFERING, university, branch };

    const offeringRes =
      await api.subjectOfferings.getSubjectOfferingBySlug(subjectSlug);
    const offering = offeringRes.data?.data;
    if (!offering) {
      return { ...EMPTY_SUBJECT_OFFERING, university, branch, semester };
    }

    const subjectMap = await getSubjectMap(api);
    const subject = subjectMap.get(offering.subjectId);

    return { university, branch, semester, offering, subject };
  }
);

export async function generateMetadata({ params }) {
  const { universitySlug, branchSlug, semesterNumber, subjectSlug } =
    await params;
  const { university, branch, semester, subject } =
    await getSubjectOfferingContext(
      universitySlug,
      branchSlug,
      semesterNumber,
      subjectSlug
    ).catch(() => EMPTY_SUBJECT_OFFERING);
  if (!university || !branch || !semester || !subject) return {};

  const semesterLabel = semester.title || `Semester ${semester.number}`;
  return {
    title: `${subject.name} Past Papers — ${university.name}, ${semesterLabel}`,
    description:
      subject.description ||
      `Past year question papers and syllabus for ${subject.name}, ${branch.name} ${semesterLabel} at ${university.name}.`,
  };
}

export default async function SubjectOfferingPage({ params }) {
  const { universitySlug, branchSlug, semesterNumber, subjectSlug } =
    await params;

  let university = null;
  let branch = null;
  let semester = null;
  let offering = null;
  let subject = null;
  let papers = [];
  let syllabus = null;

  try {
    ({ university, branch, semester, offering, subject } =
      await getSubjectOfferingContext(
        universitySlug,
        branchSlug,
        semesterNumber,
        subjectSlug
      ));
    if (!university) return notFound();
    if (!branch) return notFound();
    if (!semester) return notFound();
    if (!offering) return notFound();

    const api = await getApiServer();
    const [papersRes, syllabusRes] = await Promise.all([
      api.papers.listPapers({ subjectOfferingId: offering.id, limit: 100 }),
      api.subjectOfferings
        .getSyllabusBySubjectOffering(offering.id)
        .catch(() => null),
    ]);

    papers = (papersRes.data?.data?.items || []).sort(
      (a, b) => b.examYear - a.examYear
    );
    syllabus = syllabusRes?.data?.data || null;
  } catch (error) {
    console.error('Failed to fetch subject offering:', error);
    return notFound();
  }

  const semesterLabel = semester.title || `Semester ${semester.number}`;
  const basePath = `/browse/${universitySlug}/${branchSlug}/${semesterNumber}`;
  const trail = [
    { label: university.name, href: `/browse/${universitySlug}` },
    {
      label: branch.name,
      href: `/browse/${universitySlug}/${branchSlug}`,
    },
    { label: semesterLabel, href: basePath },
    { label: subject?.name || 'Subject' },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd trail={trail} />
      <BreadcrumbNav trail={trail} />

      <div className="mt-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {subject?.name || 'Untitled Subject'}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {subject?.shortName && (
            <Badge variant="secondary">{subject.shortName}</Badge>
          )}
          {offering.regulation && (
            <Badge variant="outline">{offering.regulation}</Badge>
          )}
          {offering.academicYear && (
            <Badge variant="outline">{offering.academicYear}</Badge>
          )}
        </div>
        {subject?.description && (
          <p className="text-muted-foreground mt-3 max-w-2xl">
            {subject.description}
          </p>
        )}
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">Past Papers</h2>
        {papers.length === 0 ? (
          <Empty className="rounded-xl border">
            <EmptyHeader>
              <EmptyTitle>No papers uploaded yet</EmptyTitle>
              <EmptyDescription>
                Check back soon — papers for this subject are being added.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {papers.map((paper) => (
              <Link key={paper.id} href={`/browse/paper/${paper.slug}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
                        <FileText className="size-4" />
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        {paper.examYear}
                      </Badge>
                    </div>
                    <CardTitle className="text-base">{paper.title}</CardTitle>
                    <CardDescription>
                      {formatExamType(paper.examType)}
                      {paper.session ? ` · ${paper.session}` : ''}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {syllabus?.modules?.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold">Syllabus</h2>
          <Accordion type="multiple" className="rounded-xl border px-4">
            {syllabus.modules
              .sort((a, b) => (a.moduleNumber || 0) - (b.moduleNumber || 0))
              .map((module) => (
                <AccordionItem key={module.id} value={module.id}>
                  <AccordionTrigger>
                    {module.moduleNumber
                      ? `Module ${module.moduleNumber}: `
                      : ''}
                    {module.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    {module.topics?.length > 0 ? (
                      <ul className="text-muted-foreground list-inside list-disc space-y-1">
                        {module.topics.map((topic) => (
                          <li key={topic.id}>{topic.title}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">
                        No topics added yet.
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </section>
      )}
    </div>
  );
}
