'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AddOfferingDialogView } from './add-offering-dialog.view';

const offeringSchema = z.object({
  universityId: z.string().min(1, 'University is required'),
  branchId: z.string().min(1, 'Branch is required'),
  semesterId: z.string().min(1, 'Semester is required'),
  subjectId: z.string().min(1, 'Subject is required'),
  regulation: z.string().min(1, 'Regulation is required').max(20),
  academicYear: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  isActive: z.boolean().default(true),
});

export function AddOfferingDialog({
  universities = [],
  branches = [],
  semesters = [],
  subjects = [],
  onAdd,
}) {
  'use no memo';
  const [open, setOpen] = React.useState(false);

  const university = universities[0];
  const branch = branches[0];
  const semester = semesters[0];

  const form = useForm({
    resolver: zodResolver(offeringSchema),
    defaultValues: {
      universityId: university?.id || '',
      branchId: branch?.id || '',
      semesterId: semester?.id || '',
      subjectId: '',
      regulation: '',
      academicYear: '',
      slug: '',
      isActive: true,
    },
  });

  // Context (university/branch/semester) is fixed by the page this dialog
  // opens from -- keep the form in sync if that context ever changes.
  React.useEffect(() => {
    form.setValue('universityId', university?.id || '');
    form.setValue('branchId', branch?.id || '');
    form.setValue('semesterId', semester?.id || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [university?.id, branch?.id, semester?.id]);

  const { watch, setValue } = form;
  const watched = watch();

  // Auto-generate slug: {uni}-{branch}-sem{num}-{subject}-{regulation}
  React.useEffect(() => {
    const { subjectId, regulation } = watched;

    if (university && branch && semester && subjectId && regulation) {
      const sub = subjects.find((s) => s.id === subjectId);

      if (sub) {
        const uniPart = (university.shortName || university.name)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-');
        const branchPart = (branch.shortName || branch.name)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-');
        const subPart =
          sub.slug || sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const regPart = regulation.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        const generatedSlug = `${uniPart}-${branchPart}-sem${semester.number}-${subPart}-${regPart}`;
        setValue('slug', generatedSlug, { shouldValidate: true });
      }
    }
  }, [
    watched.subjectId,
    watched.regulation,
    university,
    branch,
    semester,
    subjects,
    setValue,
  ]);

  const onSubmit = async (data) => {
    try {
      await onAdd(data);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error('Failed to create subject offering:', error);
    }
  };

  return (
    <AddOfferingDialogView
      university={university}
      branch={branch}
      semester={semester}
      subjects={subjects}
      form={form}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={setOpen}
    />
  );
}
