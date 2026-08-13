import Link from 'next/link';
import { getApiServer } from '@/lib/api-server';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from '@/components/ui/empty';
import { GraduationCap } from 'lucide-react';

export const metadata = {
  title: 'Browse Universities | PyqDeck',
  description: 'Pick your university to start browsing past year questions.',
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
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Choose Your University
        </h1>
        <p className="text-muted-foreground mt-2">
          Browse past year questions organized by branch, semester, and
          subject.
        </p>
      </div>

      {universities.length === 0 ? (
        <Empty className="border rounded-xl">
          <EmptyHeader>
            <EmptyTitle>No universities available yet</EmptyTitle>
            <EmptyDescription>
              Check back soon — content is being added.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
