'use client';

import * as React from 'react';
import { ChartArea } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  papers: {
    label: 'Papers Uploaded',
    color: 'hsl(var(--chart-1))',
  },
};

export function VelocityChartView({ data, loading = false }) {
  return (
    <Card className="flex h-full flex-col shadow-none">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <div className="bg-info/10 dark:bg-info/10 rounded-full p-2">
          <ChartArea className="text-info h-5 w-5" />
        </div>
        <div>
          <CardTitle>Content Velocity</CardTitle>
          <CardDescription>
            Papers uploaded over the last 7 days
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {loading ? (
          <div className="flex h-[250px] w-full items-center justify-center">
            <Skeleton className="h-full w-full" />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart
              data={data}
              margin={{ left: 12, right: 12, top: 12, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillPapers" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-papers)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-papers)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                opacity={0.4}
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={30}
              />
              <ChartTooltip
                cursor={{ stroke: 'var(--color-papers)', strokeWidth: 2 }}
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="papers"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      });
                    }}
                  />
                }
              />
              <Area
                dataKey="papers"
                type="monotone"
                fill="url(#fillPapers)"
                stroke="var(--color-papers)"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: 'var(--color-papers)',
                  strokeWidth: 2,
                  stroke: '#fff',
                }}
                activeDot={{
                  r: 6,
                  strokeWidth: 0,
                }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
