'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { StudioBreadcrumb } from './studio-breadcrumb';
import { OfferingsTable } from './offerings-table';
import { AddOfferingDialog } from './add-offering-dialog';

export function SemesterDetail({
  university,
  branch,
  semester,
  offerings = [],
  subjects = [],
}) {
  const router = useRouter();
  const api = useApi();

  const handleAdd = async (data) => {
    await api.subjectOfferings.createSubjectOffering(data);
    router.refresh();
  };

  const handleDelete = async (id) => {
    await api.subjectOfferings.deleteSubjectOffering(id);
    router.refresh();
  };

  const semesterLabel = semester.title || `Semester ${semester.number}`;

  return (
    <div className="flex flex-col gap-6">
      <StudioBreadcrumb
        trail={[
          {
            label: university.name,
            href: `/studio/universities/${university.id}`,
          },
          {
            label: branch.name,
            href: `/studio/universities/${university.id}/branches/${branch.id}`,
          },
          { label: semesterLabel },
        ]}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
            {branch.name} · {semesterLabel}
          </h1>
          <p className="text-muted-foreground font-roboto">
            Manage which subjects are offered this semester.
          </p>
        </div>
        <AddOfferingDialog
          subjects={subjects}
          universities={[university]}
          branches={[branch]}
          semesters={[semester]}
          onAdd={handleAdd}
        />
      </div>

      <OfferingsTable offerings={offerings} onDelete={handleDelete} />
    </div>
  );
}
