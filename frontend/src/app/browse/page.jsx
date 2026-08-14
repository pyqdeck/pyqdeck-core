import Link from 'next/link';
import { getApiServer } from '@/lib/api-server';
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
import { GraduationCap } from 'lucide-react';

export const metadata = {
  title: 'Browse Universities',
  description:
    'Browse free past year question papers by university. Pick your university to drill down into branches, semesters, and subjects, and find exam papers organized for focused revision.',
};

export default async function BrowseUniversitiesPage() {
  const api = await getApiServer();

  let universities = [];
  try {
    const res = await api.universities.listUniversities({ limit: 100 });
    universities = res.data?.data?.items || [];
  } catch (error) {
    console.error('Failed to fetch universities:', error);
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Choose Your University
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          PyqDeck collects free past year question papers for engineering and
          university exams, organized by university, branch, semester, and
          subject. Pick your university below to start browsing past papers and
          question banks built for focused exam prep.
        </p>
      </div>

      {universities.length === 0 ? (
        <Empty className="rounded-xl border">
          <EmptyHeader>
            <EmptyTitle>No universities available yet</EmptyTitle>
            <EmptyDescription>
              Check back soon — content is being added.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {universities.map((university) => (
            <Link key={university.id} href={`/browse/${university.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="bg-primary/10 text-primary mb-2 flex size-10 items-center justify-center rounded-lg">
                    <GraduationCap className="size-5" />
                  </div>
                  <CardTitle>{university.name}</CardTitle>
                  <CardDescription>
                    {university.shortName}
                    {university.state ? ` · ${university.state}` : ''}
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
