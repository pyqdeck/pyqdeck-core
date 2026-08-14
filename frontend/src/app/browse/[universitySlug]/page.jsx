import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getApiServer } from '@/lib/api-server';
import { BreadcrumbNav } from '@/components/browse/breadcrumb-nav';
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

export default async function UniversityBranchesPage({ params }) {
  const { universitySlug } = await params;
  const api = await getApiServer();

  let university = null;
  let branches = [];

  try {
    const uniRes = await api.universities.getUniversityBySlug(universitySlug);
    university = uniRes.data?.data;
    if (!university) return notFound();

    const branchRes = await api.universities.listBranches(university.id, {
      limit: 100,
    });
    branches = branchRes.data?.data?.items || [];
  } catch (error) {
    console.error('Failed to fetch branches:', error);
    return notFound();
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <BreadcrumbNav trail={[{ label: university.name }]} />

      <div className="mt-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{university.name}</h1>
        <p className="text-muted-foreground mt-2">
          Choose your branch to see available semesters.
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
