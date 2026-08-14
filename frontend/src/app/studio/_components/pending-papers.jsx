'use client';

import * as React from 'react';
import { PendingPapersView } from './pending-papers-view';
import { toast } from 'sonner';
import { useApi } from '@/hooks/use-api';

export function PendingPapers({ papers: initialPapers, loading }) {
  const api = useApi();
  const [papers, setPapers] = React.useState(initialPapers || []);
  const [prevInitialPapers, setPrevInitialPapers] =
    React.useState(initialPapers);

  if (initialPapers !== prevInitialPapers) {
    setPrevInitialPapers(initialPapers);
    setPapers(initialPapers || []);
  }

  const updateStatus = async (paper, status, verb) => {
    try {
      await api.papers.updatePaperStatus(paper._id, { status });
      setPapers((prev) => prev.filter((p) => p._id !== paper._id));
      toast.success(`${verb} paper: ${paper.title}`);
    } catch (error) {
      console.error(`Failed to ${status} paper:`, error);
      toast.error(`Could not ${status} "${paper.title}". Please try again.`);
    }
  };

  const handleApprove = (paper) => updateStatus(paper, 'approved', 'Approved');
  const handleReject = (paper) => updateStatus(paper, 'rejected', 'Rejected');

  return (
    <PendingPapersView
      papers={papers}
      onApprove={handleApprove}
      onReject={handleReject}
      loading={loading}
    />
  );
}
