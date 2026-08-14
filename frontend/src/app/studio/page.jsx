import {
  Users,
  FileText,
  GraduationCap,
  Clock,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { getApiServer } from '@/lib/api-server';

import { VelocityChart } from './_components/velocity-chart';
import { PopularityChart } from './_components/popularity-chart';
import { PendingPapers } from './_components/pending-papers';
import { MetricCard } from './_components/metric-card';

export default async function StudioPage() {
  const api = await getApiServer();

  let dashboardData = null;
  let moderationQueue = { items: [], canModerate: false };
  try {
    const [overviewRes, moderationRes] = await Promise.all([
      api.analytics.studioOverviewList(),
      api.papers.getModerationQueue({ limit: 5 }),
    ]);
    dashboardData = overviewRes.data.data;
    moderationQueue = moderationRes.data?.data || moderationQueue;
  } catch (error) {
    console.error(
      'Failed to fetch studio overview data:',
      error?.message || error
    );
  }

  // Default to the personal scope on failure -- never fall back to
  // showing platform-wide numbers to someone we couldn't confirm is an
  // admin.
  const isGlobalScope = dashboardData?.scope === 'global';

  const globalMetrics = isGlobalScope
    ? dashboardData.metrics
    : {
        users: 0,
        papers: { total: 0, pending: 0 },
        questions: 0,
        academics: { universities: 0, branches: 0 },
      };

  const personalMetrics = !isGlobalScope
    ? dashboardData?.metrics || {
        papers: { total: 0, approved: 0, pending: 0 },
        questions: { total: 0 },
      }
    : null;

  const charts = dashboardData?.charts || {
    contentVelocity: [],
    subjectPopularity: [],
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-foreground text-4xl font-bold tracking-tight">
          Studio Overview
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          {isGlobalScope
            ? 'Welcome to the PyqDeck Admin Studio. Manage content, users, and academics from here.'
            : "Here's a summary of what you've contributed to PyqDeck."}
        </p>
      </div>

      {isGlobalScope ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Users"
            value={globalMetrics.users.toLocaleString()}
            subLabel="Registered users on the platform"
            icon={Users}
          />
          <MetricCard
            title="Papers & Questions"
            value={globalMetrics.papers.total.toLocaleString()}
            subLabel={`Contains ${globalMetrics.questions.toLocaleString()} questions`}
            icon={FileText}
          />
          <MetricCard
            title="Academics"
            value={globalMetrics.academics.universities.toLocaleString()}
            subLabel={`Supporting ${globalMetrics.academics.branches.toLocaleString()} branches`}
            icon={GraduationCap}
          />
          <MetricCard
            title="Pending Reviews"
            value={globalMetrics.papers.pending.toLocaleString()}
            subLabel="Papers require your attention"
            icon={Clock}
            tone="warning"
          />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Papers Added"
            value={personalMetrics.papers.total.toLocaleString()}
            subLabel="Papers you've uploaded"
            icon={FileText}
          />
          <MetricCard
            title="Approved"
            value={personalMetrics.papers.approved.toLocaleString()}
            subLabel="Of your papers, live on the platform"
            icon={CheckCircle2}
          />
          <MetricCard
            title="Pending Review"
            value={personalMetrics.papers.pending.toLocaleString()}
            subLabel="Your papers awaiting a decision"
            icon={Clock}
            tone="warning"
          />
          <MetricCard
            title="Questions Added"
            value={personalMetrics.questions.total.toLocaleString()}
            subLabel="Questions you've created"
            icon={HelpCircle}
          />
        </div>
      )}

      {isGlobalScope && (
        <div className="grid gap-6 md:grid-cols-2">
          <VelocityChart data={charts.contentVelocity} />
          <PopularityChart data={charts.subjectPopularity} />
        </div>
      )}

      {moderationQueue.canModerate && (
        <PendingPapers papers={moderationQueue.items} />
      )}
    </div>
  );
}
