'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { SubjectsTable } from './subjects-table';
import { AddSubjectDialog } from './add-subject-dialog';
import { StudioSearch } from './studio-search';
import { Plus } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DropdownAction } from '@/components/dropdown-action';

export function SubjectManagement({ initialSubjects = [], pagination }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const api = useApi();

  const search = searchParams.get('q') || '';

  const handleAdd = async (data) => {
    await api.subjects.createSubject(data);
    router.refresh();
  };

  const handleUpdate = async (id, data) => {
    await api.subjects.updateSubject(id, data);
    router.refresh();
  };

  const handleDelete = async (id) => {
    await api.subjects.deleteSubject(id);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
            Subject Repository
          </h1>
          <p className="text-muted-foreground font-roboto">
            Central database for academic subjects and curriculum mapping.
          </p>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
          <StudioSearch
            placeholder="Search subjects..."
            paramName="q"
            initialValue={search}
          />
          <DropdownAction label="Management" tooltip="Subject Actions">
            <AddSubjectDialog
              onAdd={handleAdd}
              trigger={
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="cursor-pointer rounded-md py-2.5 focus:bg-transparent"
                >
                  <Plus className="text-muted-foreground mr-3 size-4 transition-colors" />
                  <span className="font-medium">Add Subject</span>
                </DropdownMenuItem>
              }
            />
          </DropdownAction>
        </div>
      </div>

      <SubjectsTable
        subjects={initialSubjects}
        pagination={pagination}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
