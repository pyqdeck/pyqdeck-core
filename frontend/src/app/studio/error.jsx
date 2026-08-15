'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

export default function StudioError({ error, reset }) {
  useEffect(() => {
    console.error('Studio route error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Empty className="border-border/50 max-w-lg rounded-xl border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertTriangle className="text-destructive" />
          </EmptyMedia>
          <EmptyTitle className="font-roboto text-base font-bold">
            Something went wrong
          </EmptyTitle>
          <EmptyDescription className="font-roboto">
            {error?.message || 'This page hit an unexpected error.'}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            onClick={() => reset()}
            className="font-roboto h-10 border font-bold shadow-none"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Try again
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
