'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { BranchesTable } from './branches-table';
import { AddBranchDialog } from './add-branch-dialog';
import { StudioSearch } from './studio-search';
import { BranchFilters } from './branch-filters';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { DropdownAction } from '@/components/dropdown-action';
import { ImportBranchesDialog } from './import-branches-dialog';
import { FileSpreadsheet, Plus } from 'lucide-react';

export function BranchManagement({
  initialBranches = [],
  universities = [],
  pagination,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const api = useApi();

  const search = searchParams.get('search') || '';
  const universityId = searchParams.get('universityId');
  const [importOpen, setImportOpen] = React.useState(false);

  const selectedUniversity = React.useMemo(
    () => universities.find((u) => u.id === universityId),
    [universities, universityId]
  );

  const handleAdd = async (data) => {
    const universityId = data.universityId;
    await api.universities.createBranch(universityId, data);
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
            Branches
          </h1>
          <p className="text-muted-foreground font-roboto">
            Manage academic courses and specializations.
          </p>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
          <StudioSearch
            placeholder="Search branches..."
            initialValue={search}
          />
          <BranchFilters universities={universities} />
          <DropdownAction label="Management" tooltip="Branch Actions">
            <AddBranchDialog
              universities={universities}
              defaultUniversityId={universityId || ''}
              onAdd={handleAdd}
              trigger={
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="cursor-pointer rounded-md py-2.5 focus:bg-transparent"
                >
                  <Plus className="text-muted-foreground mr-3 size-4 transition-colors" />
                  <span className="font-medium">Add Branch</span>
                </DropdownMenuItem>
              }
            />
            {universityId && universityId !== 'all' && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setImportOpen(true)}
                  className="cursor-pointer rounded-md py-2.5"
                >
                  <FileSpreadsheet className="text-muted-foreground mr-3 size-4 transition-colors" />
                  <span className="font-medium">Import Branches</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownAction>

          {universityId && (
            <ImportBranchesDialog
              open={importOpen}
              onOpenChange={setImportOpen}
              universityId={universityId}
              universityName={selectedUniversity?.name}
            />
          )}
        </div>
      </div>

      <BranchesTable
        branches={initialBranches}
        pagination={pagination}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
