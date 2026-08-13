'use client';

import * as React from 'react';
import { Users, Eye, Search, Target } from 'lucide-react';
import { MetricCard } from '../_components/metric-card';
import { TrafficChart } from '../_components/traffic-chart';
import { CoverageRadar } from '../_components/coverage-radar';
import { SubjectTrends } from '../_components/subject-trends';
import { SearchGaps } from '../_components/search-gaps';

// Mock Data for Analytics
const trafficData = [
  { name: 'Mon', views: 2400, users: 400 },
  { name: 'Tue', views: 1398, users: 300 },
  { name: 'Wed', views: 9800, users: 2000 },
  { name: 'Thu', views: 3908, users: 1200 },
  { name: 'Fri', views: 4800, users: 1100 },
  { name: 'Sat', views: 3800, users: 800 },
  { name: 'Sun', views: 4300, users: 900 },
];

const coverageData = [
  { subject: 'Math', A: 120, B: 110, fullMark: 150 },
  { subject: 'Physics', A: 98, B: 130, fullMark: 150 },
  { subject: 'Coding', A: 86, B: 130, fullMark: 150 },
  { subject: 'AI', A: 99, B: 100, fullMark: 150 },
  { subject: 'Data', A: 85, B: 90, fullMark: 150 },
  { subject: 'Cloud', A: 65, B: 85, fullMark: 150 },
];

const trendingSubjects = [
  {
    id: 1,
    name: 'Data Structures',
    views: '12.4k',
    trend: '+14%',
    status: 'up',
  },
  {
    id: 2,
    name: 'Operating Systems',
    views: '8.2k',
    trend: '+8%',
    status: 'up',
  },
  {
    id: 3,
    name: 'Database Systems',
    views: '7.1k',
    trend: '-2%',
    status: 'down',
  },
  {
    id: 4,
    name: 'Computer Networks',
    views: '6.5k',
    trend: '+12%',
    status: 'up',
  },
  {
    id: 5,
    name: 'Theory of Computation',
    views: '5.2k',
    trend: '+5%',
    status: 'up',
  },
];

const zeroResultSearches = [
  { query: 'Advanced Quantum Computing', count: 142 },
  { query: 'Bioinformatics 2025 Paper', count: 86 },
  { query: 'Ethical Hacking Mumbai University', count: 64 },
  { query: 'Machine Learning Semester 8', count: 42 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Deep dive into platform engagement and content performance.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Views"
          value="45.2k"
          subLabel="+20.1% from last month"
          icon={Eye}
        />
        <MetricCard
          title="Active Users"
          value="2,350"
          subLabel="+180.1% from last month"
          icon={Users}
        />
        <MetricCard
          title="Search Success"
          value="84%"
          subLabel="+4% from last month"
          icon={Search}
        />
        <MetricCard
          title="Extraction Rate"
          value="98.2%"
          subLabel="+0.2% from last month"
          icon={Target}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <TrafficChart data={trafficData} />
        </div>
        <div className="lg:col-span-3">
          <CoverageRadar data={coverageData} />
        </div>
      </div>

      {/* Detailed Data Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <SubjectTrends subjects={trendingSubjects} />
        <SearchGaps gaps={zeroResultSearches} />
      </div>
    </div>
  );
}
