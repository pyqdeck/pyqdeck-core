import { cache } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getApiServer } from '@/lib/api-server';
import { BreadcrumbNav } from '@/components/browse/breadcrumb-nav';
import { BreadcrumbJsonLd } from '@/components/browse/breadcrumb-json-ld';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty';
import { CalendarDays } from 'lucide-react';

const getUniversityAndBranch = cache(async (universitySlug, branchSlug) => {
  const api = await getApiServer();
  const uniRes = await api.universities.getUniversityBySlug(universitySlug);
  const university = uniRes.data?.data;
  if (!university) return { university: null, branch: null };

  const branchRes = await api.universities.getBranchBySlug(
    university.id,
    branchSlug
  );
  return { university, branch: branchRes.data?.data || null };
});

export async function generateMetadata({ params }) {
  const { universitySlug, branchSlug } = await params;
  const { university, branch } = await getUniversityAndBranch(
    universitySlug,
    branchSlug
  ).catch(() => ({ university: null, branch: null }));
  if (!university || !branch) return {};

  return {
    title: `${branch.name} at ${university.name} — Semesters`,
    description: `Browse semesters and past year question papers for ${branch.name} at ${university.name}.`,
  };
}

export default async function BranchSemestersPage({ params }) {
  const { universitySlug, branchSlug } = await params;

  let university = null;
  let branch = null;
  let semesters = [];

  try {
    ({ university, branch } = await getUniversityAndBranch(
      universitySlug,
      branchSlug
    ));
    if (!university) return notFound();
    if (!branch) return notFound();

    const api = await getApiServer();
    const semRes = await api.branches.listSemesters(branch.id);
    semesters = (semRes.data?.data?.items || []).sort(
      (a, b) => a.number - b.number
    );
  } catch (error) {
    console.error('Failed to fetch semesters:', error);
    return notFound();
  }

  const trail = [
    { label: university.name, href: `/browse/${universitySlug}` },
    { label: branch.name },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd trail={trail} />
      <BreadcrumbNav trail={trail} />

      <div className="mt-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{branch.name}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Semester-wise subjects and past year question papers for {branch.name}{' '}
          at {university.name}.
        </p>
      </div>

      {semesters.length === 0 ? (
        <Empty className="rounded-xl border">
          <EmptyHeader>
            <EmptyTitle>No semesters added yet</EmptyTitle>
            <EmptyDescription>
              This branch doesn&apos;t have any semesters published yet.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {semesters.map((semester) => (
            <Link
              key={semester.id}
              href={`/browse/${universitySlug}/${branchSlug}/${semester.number}`}
            >
              <Card className="h-full text-center transition-shadow hover:shadow-md">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 text-primary mb-2 flex size-10 items-center justify-center rounded-lg">
                    <CalendarDays className="size-5" />
                  </div>
                  <CardTitle>
                    {semester.title || `Semester ${semester.number}`}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
