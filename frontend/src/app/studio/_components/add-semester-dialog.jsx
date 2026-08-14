'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/api-error';
import { AddSemesterDialogView } from './add-semester-dialog.view';

const semesterSchema = z.object({
  branchId: z.string().min(1, 'Please select a branch'),
  number: z
    .string()
    .transform((v) => parseInt(v, 10))
    .pipe(z.number().int().min(1).max(10)),
  title: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
});

export function AddSemesterDialog({
  branches = [],
  defaultBranchId = '',
  onAdd,
  isOpen,
  onOpenChange,
  trigger = true,
}) {
  'use no memo';
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen;

  const form = useForm({
    resolver: zodResolver(semesterSchema),
    defaultValues: {
      branchId: defaultBranchId || '',
      number: '',
      title: '',
      slug: '',
    },
  });

  const { reset, watch, setValue } = form;

  // Auto-generate slug and title based on number
  const number = watch('number');
  React.useEffect(() => {
    if (number) {
      setValue('slug', `semester-${number}`);
      setValue('title', `Semester ${number}`);
    }
  }, [number, setValue]);

  // Update branchId if default changes
  React.useEffect(() => {
    if (defaultBranchId) {
      setValue('branchId', defaultBranchId);
    }
  }, [defaultBranchId, setValue]);

  const onSubmit = async (data) => {
    try {
      await onAdd?.(data);
      toast.success(`Semester ${data.number} created successfully`);
      reset({ branchId: defaultBranchId });
      setOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to create semester'));
    }
  };

  return (
    <AddSemesterDialogView
      branches={branches}
      form={form}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
    />
  );
}
