import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getApiServer } from '@/lib/api-server';
import { getSubjectMap } from '@/lib/browse-helpers';
import { BreadcrumbNav } from '@/components/browse/breadcrumb-nav';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from '@/components/ui/empty';
import { BookOpen } from 'lucide-react';

export default async function SemesterSubjectsPage({ params }) {
  const { universitySlug, branchSlug, semesterNumber } = await params;
  const api = await getApiServer();

  let university = null;
  let branch = null;
  let semester = null;
  let offerings = [];
  let subjectMap = new Map();

  try {
    const uniRes = await api.universities.getUniversityBySlug(universitySlug);
    university = uniRes.data?.data;
    if (!university) return notFound();

    const branchRes = await api.universities.getBranchBySlug(
      university.id,
      branchSlug
    );
    branch = branchRes.data?.data;
    if (!branch) return notFound();

    const semRes = await api.branches.getSemesterByNumber(
      branch.id,
      Number(semesterNumber)
    );
    semester = semRes.data?.data;
    if (!semester) return notFound();

    const [offeringRes, subjects] = await Promise.all([
      api.subjectOfferings.listSubjectOfferings({
        branchId: branch.id,
        semesterId: semester.id,
        limit: 100,
      }),
      getSubjectMap(api),
    ]);

    offerings = offeringRes.data?.data?.items || [];
    subjectMap = subjects;
  } catch (error) {
    console.error('Failed to fetch subjects:', error);
    return notFound();
  }

  const semesterLabel = semester.title || `Semester ${semester.number}`;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <BreadcrumbNav
        trail={[
          { label: university.name, href: `/browse/${universitySlug}` },
          {
            label: branch.name,
            href: `/browse/${universitySlug}/${branchSlug}`,
          },
          { label: semesterLabel },
        ]}
      />

      <div className="mt-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {branch.name} · {semesterLabel}
        </h1>
        <p className="text-muted-foreground mt-2">
          Choose a subject to see past papers and syllabus.
        </p>
      </div>

      {offerings.length === 0 ? (
        <Empty className="border rounded-xl">
          <EmptyHeader>
            <EmptyTitle>No subjects added yet</EmptyTitle>
            <EmptyDescription>
              This semester doesn&apos;t have any subjects published yet.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((offering) => {
            const subject = subjectMap.get(offering.subjectId);
            return (
              <Link
                key={offering.id}
                href={`/browse/${universitySlug}/${branchSlug}/${semesterNumber}/${offering.slug}`}
              >
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="bg-primary/10 text-primary mb-2 flex size-10 items-center justify-center rounded-lg">
                      <BookOpen className="size-5" />
                    </div>
                    <CardTitle>{subject?.name || 'Untitled Subject'}</CardTitle>
                    <CardDescription className="flex flex-wrap gap-1.5 pt-1">
                      {subject?.shortName && (
                        <Badge variant="secondary">{subject.shortName}</Badge>
                      )}
                      {offering.regulation && (
                        <Badge variant="outline">{offering.regulation}</Badge>
                      )}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
