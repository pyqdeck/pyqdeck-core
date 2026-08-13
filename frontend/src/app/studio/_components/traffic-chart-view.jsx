'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from '@/components/ui/empty';

export function TrafficChartView({ data, loading = false }) {
  const chartData = React.useMemo(() => data || [], [data]);

  return (
    <Card className="border-border/50 border shadow-none">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="bg-info/10 dark:bg-info/10 rounded-full p-2">
          <TrendingUp className="text-info h-5 w-5" />
        </div>
        <div>
          <CardTitle>Platform Traffic</CardTitle>
          <CardDescription>
            Daily views and active users over the last 7 days.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex h-[350px] flex-col items-center justify-center">
        {loading ? (
          <div className="flex h-full w-full items-center justify-center p-8">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        ) : chartData.length === 0 ? (
          <Empty className="border-none shadow-none">
            <EmptyMedia
              variant="icon"
              className="rounded-full bg-slate-50 dark:bg-slate-900/50"
            >
              <TrendingUp className="text-muted-foreground/50 h-6 w-6" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle className="text-base">No traffic data yet</EmptyTitle>
              <EmptyDescription>
                Wait for users to visit the platform to see traffic analytics.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ChartContainer
            config={{
              views: { label: 'Views', color: 'hsl(var(--primary))' },
              users: { label: 'Users', color: 'hsl(var(--chart-2))' },
            }}
            className="h-full w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--chart-2))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--chart-2))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
