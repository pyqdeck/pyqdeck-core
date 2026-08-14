'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { StudioBreadcrumb } from './studio-breadcrumb';
import { BranchesTable } from './branches-table';
import { AddBranchDialog } from './add-branch-dialog';

export function UniversityDetail({ university, branches = [] }) {
  const router = useRouter();
  const api = useApi();
  const [addOpen, setAddOpen] = React.useState(false);

  const handleAdd = async (data) => {
    await api.universities.createBranch(university.id, data);
    router.refresh();
  };

  const handleUpdate = async (universityId, branchId, data) => {
    await api.universities.updateBranch(universityId, branchId, data);
    router.refresh();
  };

  const handleDelete = async (universityId, branchId) => {
    await api.universities.deleteBranch(universityId, branchId);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6">
      <StudioBreadcrumb trail={[{ label: university.name }]} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
            {university.name}
          </h1>
          <p className="text-muted-foreground font-roboto">
            Manage branches offered at this university.
          </p>
        </div>
        <Button
          onClick={() => setAddOpen(true)}
          className="font-roboto bg-primary hover:bg-primary/90 border font-bold shadow-none"
        >
          <Plus className="h-4 w-4" /> Add Branch
        </Button>
      </div>

      <BranchesTable
        branches={branches}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <AddBranchDialog
        universities={[university]}
        defaultUniversityId={university.id}
        onAdd={handleAdd}
        isOpen={addOpen}
        onOpenChange={setAddOpen}
      />
    </div>
  );
}
