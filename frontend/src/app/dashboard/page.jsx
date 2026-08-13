import Link from 'next/link';

export default function DashboardComingSoonPage() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 py-6">
      <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-sm">
        <p className="text-primary mb-3 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
          Student Dashboard
        </p>

        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Start Practicing
        </h2>

        <p className="text-muted-foreground mt-3 max-w-2xl text-base sm:text-lg">
          Browse past year papers by university, branch, and semester. A
          personalized dashboard with progress tracking and smart
          recommendations is still coming soon.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            'Personalized study progress',
            'Smart paper recommendations',
            'Bookmarks and quick revision lists',
            'Upcoming exam preparation timeline',
          ].map((feature) => (
            <div
              key={feature}
              className="bg-background/80 text-sm text-foreground rounded-lg border px-3 py-2"
            >
              ✅ {feature}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/browse"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition"
          >
            Browse Papers
          </Link>
          <Link
            href="/browse/bookmarks"
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition"
          >
            My Bookmarks
          </Link>
        </div>
      </div>
    </section>
  );
}
