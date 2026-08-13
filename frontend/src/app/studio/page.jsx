import { Users, FileText, GraduationCap, Clock } from 'lucide-react';
import { getApiServer } from '@/lib/api-server';

import { VelocityChart } from './_components/velocity-chart';
import { PopularityChart } from './_components/popularity-chart';
import { PendingPapers } from './_components/pending-papers';
import { MetricCard } from './_components/metric-card';

export default async function StudioPage() {
  const api = await getApiServer();

  let dashboardData = null;
  try {
    const res = await api.analytics.studioOverviewList();
    dashboardData = res.data.data;
  } catch (error) {
    console.error(
      'Failed to fetch studio overview data:',
      error?.message || error
    );
  }

  // Fallback values if API fails
  const metrics = dashboardData?.metrics || {
    users: 0,
    papers: { total: 0, pending: 0 },
    questions: 0,
    academics: { universities: 0, branches: 0 },
  };

  const charts = dashboardData?.charts || {
    contentVelocity: [],
    subjectPopularity: [],
  };

  const queues = dashboardData?.queues || {
    pendingPapers: [],
  };

  return (
    <div className="flex flex-col gap-8 p-4 lg:p-6">
      <div className="space-y-2">
        <h1 className="text-foreground text-4xl font-bold tracking-tight">
          Studio Overview
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Welcome to the PyqDeck Admin Studio. Manage content, users, and
          academics from here.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={metrics.users.toLocaleString()}
          subLabel="Registered users on the platform"
          icon={Users}
        />
        <MetricCard
          title="Papers & Questions"
          value={metrics.papers.total.toLocaleString()}
          subLabel={`Contains ${metrics.questions.toLocaleString()} questions`}
          icon={FileText}
        />
        <MetricCard
          title="Academics"
          value={metrics.academics.universities.toLocaleString()}
          subLabel={`Supporting ${metrics.academics.branches.toLocaleString()} branches`}
          icon={GraduationCap}
        />
        <MetricCard
          title="Pending Reviews"
          value={metrics.papers.pending.toLocaleString()}
          subLabel="Papers require your attention"
          icon={Clock}
          tone="warning"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <VelocityChart data={charts.contentVelocity} />
        <PopularityChart data={charts.subjectPopularity} />
      </div>

      <PendingPapers papers={queues.pendingPapers} />
    </div>
  );
}
