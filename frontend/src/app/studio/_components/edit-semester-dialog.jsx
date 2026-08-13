'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { EditSemesterDialogView } from './edit-semester-dialog.view';

const semesterSchema = z.object({
  number: z
    .string()
    .transform((v) => parseInt(v, 10))
    .pipe(z.number().int().min(1).max(10)),
  title: z.string().optional().or(z.literal('')),
  slug: z.string().min(1, 'Slug is required'),
});

export function EditSemesterDialog({ semester, open, onOpenChange, onUpdate }) {
  const form = useForm({
    resolver: zodResolver(semesterSchema),
    defaultValues: {
      number: '',
      title: '',
      slug: '',
    },
  });

  const { reset } = form;

  // Reset form when semester changes
  React.useEffect(() => {
    if (semester) {
      reset({
        number: semester.number.toString(),
        title: semester.title || '',
        slug: semester.slug || '',
      });
    }
  }, [semester, reset]);

  const onSubmit = async (data) => {
    if (!semester?.id || !semester?.branchId) return;
    try {
      const branchId = semester.branchId.id || semester.branchId;
      await onUpdate?.(branchId, semester.id, data);
      toast.success('Semester updated successfully');
      onOpenChange(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update semester');
    }
  };

  return (
    <EditSemesterDialogView
      semester={semester}
      form={form}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}
