'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';
import { PapersTable } from './papers-table';
import { PaperFormDialog } from './paper-form-dialog';
import { StudioSearch } from './studio-search';
import { cn } from '@/lib/utils';

export function PaperManagement({
  offerings = [],
  currentOfferingId,
  currentOffering,
  papers = [],
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const api = useApi();

  const [addOpen, setAddOpen] = React.useState(false);
  const search = searchParams.get('q') || '';

  const filteredOfferings = offerings.filter((off) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      off.subjectId?.name?.toLowerCase().includes(searchLower) ||
      off.universityId?.shortName?.toLowerCase().includes(searchLower) ||
      off.branchId?.shortName?.toLowerCase().includes(searchLower)
    );
  });

  const handleOfferingChange = (id) => {
    const params = new URLSearchParams(searchParams);
    if (id) params.set('offeringId', id);
    else params.delete('offeringId');
    router.push(`?${params.toString()}`);
  };

  const handleAdd = async (data) => {
    await api.papers.createPaper(data);
    router.refresh();
  };

  const handleUpdate = async (id, data) => {
    await api.papers.updatePaper(id, data);
    router.refresh();
  };

  const handleDelete = async (id) => {
    await api.papers.deletePaper(id);
    router.refresh();
  };

  const handleSetStatus = async (paper, status) => {
    await api.papers.updatePaperStatus(paper.id, { status });
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
            Papers
          </h1>
          <p className="text-muted-foreground font-roboto">
            Add and moderate exam papers for each subject offering.
          </p>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
          <StudioSearch
            placeholder="Filter offerings..."
            paramName="q"
            initialValue={search}
          />
          {currentOffering && (
            <Button
              onClick={() => setAddOpen(true)}
              className="font-roboto bg-primary hover:bg-primary/90 border font-bold shadow-none"
            >
              <Plus className="h-4 w-4" /> Add Paper
            </Button>
          )}
        </div>
      </div>

      {/* Offering Pill Filters */}
      <div className="hide-scrollbar flex flex-wrap items-center gap-1.5 overflow-x-auto pb-2">
        <Button
          variant={!currentOfferingId ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleOfferingChange(null)}
          className={cn(
            'font-roboto h-8 rounded-full border px-3.5 text-xs font-bold transition-all',
            currentOfferingId && 'text-muted-foreground hover:text-foreground'
          )}
        >
          Select Offering
        </Button>
        {filteredOfferings.map((off) => {
          const id = off.id || off._id;
          const isActive = currentOfferingId === id;
          return (
            <Button
              key={id}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleOfferingChange(id)}
              className={cn(
                'font-roboto h-8 shrink-0 rounded-full border px-3.5 text-xs font-bold transition-all',
                !isActive && 'text-muted-foreground hover:text-foreground'
              )}
            >
              {off.subjectId?.name} (Sem {off.semesterId?.number})
            </Button>
          );
        })}
      </div>

      {currentOfferingId ? (
        <PapersTable
          papers={papers}
          offering={currentOffering}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onSetStatus={handleSetStatus}
        />
      ) : (
        <div className="border-border/50 bg-muted/5 flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed py-20">
          <div className="bg-muted text-muted-foreground flex h-16 w-16 items-center justify-center rounded-2xl">
            <FileText className="h-8 w-8" />
          </div>
          <div className="space-y-1 text-center">
            <h3 className="font-roboto text-lg font-bold">Get Started</h3>
            <p className="text-muted-foreground font-roboto mx-auto max-w-xs text-sm">
              Select a subject offering from the filters above to manage its
              papers.
            </p>
          </div>
        </div>
      )}

      {currentOffering && (
        <PaperFormDialog
          offering={currentOffering}
          open={addOpen}
          onOpenChange={setAddOpen}
          onSubmit={handleAdd}
        />
      )}
    </div>
  );
}
