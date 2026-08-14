'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { PapersTable } from './papers-table';
import { AddPaperDialog } from './add-paper-dialog';
import { StudioSearch } from './studio-search';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'draft', label: 'Draft' },
];

export function PapersManagement({ initialPapers = [], pagination }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const api = useApi();

  const search = searchParams.get('q') || '';
  const status = searchParams.get('status') || 'all';

  const handleStatusChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('status');
    } else {
      params.set('status', value);
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
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
            Every exam paper on the platform, across every university.
          </p>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
          <StudioSearch
            placeholder="Search papers..."
            paramName="q"
            initialValue={search}
          />
          <AddPaperDialog onAdd={handleAdd} />
        </div>
      </div>

      <Tabs value={status} onValueChange={handleStatusChange}>
        <TabsList variant="pill" className="w-fit">
          {STATUS_FILTERS.map((filter) => (
            <TabsTrigger key={filter.value} value={filter.value}>
              {filter.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <PapersTable
        papers={initialPapers}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onSetStatus={handleSetStatus}
        showContext
        pagination={pagination}
      />
    </div>
  );
}
