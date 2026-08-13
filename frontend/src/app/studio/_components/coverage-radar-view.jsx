'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Globe } from 'lucide-react';
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from 'recharts';

export function CoverageRadarView({ data, loading = false }) {
  return (
    <Card className="border-border/50 border shadow-none">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="bg-primary/10 dark:bg-primary/10 rounded-full p-2">
          <Globe className="text-primary h-5 w-5" />
        </div>
        <div>
          <CardTitle>Subject Coverage</CardTitle>
          <CardDescription>
            Syllabus completion rate across major subjects.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex h-[350px] items-center justify-center">
        {loading ? (
          <div className="flex h-full w-full items-center justify-center p-8">
            <Skeleton className="h-full w-full rounded-full" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 150]}
                tick={false}
                axisLine={false}
              />
              <Radar
                name="Coverage"
                dataKey="A"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
