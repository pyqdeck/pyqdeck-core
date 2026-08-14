import { cache } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getApiServer } from '@/lib/api-server';
import { BreadcrumbNav } from '@/components/browse/breadcrumb-nav';
import { BreadcrumbJsonLd } from '@/components/browse/breadcrumb-json-ld';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty';
import { Layers } from 'lucide-react';

const getUniversity = cache(async (universitySlug) => {
  const api = await getApiServer();
  const res = await api.universities.getUniversityBySlug(universitySlug);
  return res.data?.data || null;
});

export async function generateMetadata({ params }) {
  const { universitySlug } = await params;
  const university = await getUniversity(universitySlug).catch(() => null);
  if (!university) return {};

  return {
    title: `${university.name} — Browse by Branch`,
    description:
      university.description ||
      `Browse branches and past year question papers for ${university.name}${university.state ? ` (${university.state})` : ''}.`,
  };
}

export default async function UniversityBranchesPage({ params }) {
  const { universitySlug } = await params;

  let university = null;
  let branches = [];

  try {
    university = await getUniversity(universitySlug);
    if (!university) return notFound();

    const api = await getApiServer();
    const branchRes = await api.universities.listBranches(university.id, {
      limit: 100,
    });
    branches = branchRes.data?.data?.items || [];
  } catch (error) {
    console.error('Failed to fetch branches:', error);
    return notFound();
  }

  const trail = [{ label: university.name }];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd trail={trail} />
      <BreadcrumbNav trail={trail} />

      <div className="mt-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{university.name}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          {university.description ||
            `Explore branches, semesters, and subjects at ${university.name}${university.state ? ` (${university.state})` : ''}, and find free past year question papers for each.`}
        </p>
      </div>

      {branches.length === 0 ? (
        <Empty className="rounded-xl border">
          <EmptyHeader>
            <EmptyTitle>No branches added yet</EmptyTitle>
            <EmptyDescription>
              This university doesn&apos;t have any branches published yet.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {branches.map((branch) => (
            <Link
              key={branch.id}
              href={`/browse/${universitySlug}/${branch.slug}`}
            >
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="bg-primary/10 text-primary mb-2 flex size-10 items-center justify-center rounded-lg">
                    <Layers className="size-5" />
                  </div>
                  <CardTitle>{branch.name}</CardTitle>
                  <CardDescription>
                    {branch.shortName}
                    {branch.branchCode ? ` · Code ${branch.branchCode}` : ''}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
