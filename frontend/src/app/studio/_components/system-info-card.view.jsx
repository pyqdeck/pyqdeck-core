'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ActivityIcon,
  ServerIcon,
  DatabaseIcon,
  CpuIcon,
  ClockIcon,
  RefreshCwIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function formatUptime(seconds) {
  if (!seconds) return 'N/A';
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 || parts.length === 0) parts.push(`${s}s`);

  return parts.join(' ');
}

function formatBytes(bytes) {
  if (!bytes) return 'N/A';
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function SystemInfoCardView({ health, isRefreshing, onRefresh }) {
  return (
    <Card className="font-roboto flex h-full flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex flex-col gap-1.5">
          <CardTitle className="flex items-center gap-2">
            <ServerIcon className="text-primary h-5 w-5" />
            System Information
          </CardTitle>
          <CardDescription>
            Real-time health and operational status of the platform.
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="h-8 w-8"
        >
          <RefreshCwIcon
            className={cn('h-4 w-4', isRefreshing && 'animate-spin')}
          />
          <span className="sr-only">Refresh</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="flex justify-between text-sm">
          <div className="text-muted-foreground flex items-center gap-2">
            <ActivityIcon className="h-4 w-4" />
            <span>System Status</span>
          </div>
          <Badge
            variant={health?.status === 'healthy' ? 'success' : 'destructive'}
            className="capitalize"
          >
            {health?.status || 'Unknown'}
          </Badge>
        </div>

        <div className="flex justify-between text-sm">
          <div className="text-muted-foreground flex items-center gap-2">
            <CpuIcon className="h-4 w-4" />
            <span>Environment</span>
          </div>
          <span className="font-medium uppercase">
            {health?.environment || 'Development'}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <div className="text-muted-foreground flex items-center gap-2">
            <DatabaseIcon className="h-4 w-4" />
            <span>Database</span>
          </div>
          <span
            className={`font-medium ${health?.database?.isConnected ? 'text-green-600' : 'text-red-600'}`}
          >
            {health?.database?.isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <div className="text-muted-foreground flex items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            <span>Uptime</span>
          </div>
          <span className="font-medium">{formatUptime(health?.uptime)}</span>
        </div>

        {health?.memory && (
          <div className="flex justify-between text-sm">
            <div className="text-muted-foreground flex items-center gap-2">
              <ActivityIcon className="h-4 w-4" />
              <span>Memory Usage (RSS)</span>
            </div>
            <span className="font-medium">
              {formatBytes(health.memory.rss)}
            </span>
          </div>
        )}

        <div className="text-muted-foreground flex justify-between border-t pt-2 text-[10px]">
          <span>Last Check</span>
          <span suppressHydrationWarning>
            {health?.timestamp
              ? new Date(health.timestamp).toLocaleString()
              : 'Never'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
