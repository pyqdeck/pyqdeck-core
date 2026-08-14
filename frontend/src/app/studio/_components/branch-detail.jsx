'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { StudioBreadcrumb } from './studio-breadcrumb';
import { SemestersTable } from './semesters-table';
import { AddSemesterDialog } from './add-semester-dialog';

export function BranchDetail({ university, branch, semesters = [] }) {
  const router = useRouter();
  const api = useApi();
  const [addOpen, setAddOpen] = React.useState(false);

  const handleAdd = async (data) => {
    await api.branches.createSemester(branch.id, data);
    router.refresh();
  };

  const handleUpdate = async (branchId, semesterId, data) => {
    await api.branches.updateSemester(branchId, semesterId, data);
    router.refresh();
  };

  const handleDelete = async (branchId, semesterId) => {
    await api.branches.deleteSemester(branchId, semesterId);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6">
      <StudioBreadcrumb
        trail={[
          {
            label: university.name,
            href: `/studio/universities/${university.id}`,
          },
          { label: branch.name },
        ]}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
            {branch.name}
          </h1>
          <p className="text-muted-foreground font-roboto">
            Manage semesters offered in this branch.
          </p>
        </div>
        <Button
          onClick={() => setAddOpen(true)}
          className="font-roboto bg-primary hover:bg-primary/90 border font-bold shadow-none"
        >
          <Plus className="h-4 w-4" /> Add Semester
        </Button>
      </div>

      <SemestersTable
        semesters={semesters}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        universityId={university.id}
        branchId={branch.id}
      />

      <AddSemesterDialog
        branches={[branch]}
        defaultBranchId={branch.id}
        onAdd={handleAdd}
        isOpen={addOpen}
        onOpenChange={setAddOpen}
        trigger={false}
      />
    </div>
  );
}
