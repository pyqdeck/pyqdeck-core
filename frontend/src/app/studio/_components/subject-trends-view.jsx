'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Award, TrendingUp, TrendingDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export function SubjectTrendsView({ subjects = [], loading = false }) {
  return (
    <Card className="border-border/50 border shadow-none">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="bg-success/10 dark:bg-success/10 rounded-full p-2">
          <Award className="text-success h-5 w-5" />
        </div>
        <div>
          <CardTitle>Top Subjects</CardTitle>
          <CardDescription>
            Highest engagement subjects this week.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-[150px]" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Skeleton className="h-4 w-[60px]" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Skeleton className="h-4 w-[40px]" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : subjects.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="text-right">{s.views}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {s.status === 'up' ? (
                          <TrendingUp className="text-success h-3 w-3" />
                        ) : (
                          <TrendingDown className="text-destructive h-3 w-3" />
                        )}
                        <span
                          className={
                            s.status === 'up'
                              ? 'text-success'
                              : 'text-destructive'
                          }
                        >
                          {s.trend}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
