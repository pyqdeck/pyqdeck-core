'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/api-error';
import { AddBranchDialogView } from './add-branch-dialog.view';

const branchSchema = z.object({
  universityId: z.string().min(1, 'Please select a university'),
  name: z.string().min(1, 'Branch name is required'),
  shortName: z.string().min(1, 'Short name is required'),
  branchCode: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
});

export function AddBranchDialog({
  universities = [],
  defaultUniversityId = '',
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
    resolver: zodResolver(branchSchema),
    defaultValues: {
      universityId: defaultUniversityId || '',
      name: '',
      shortName: '',
      branchCode: '',
      slug: '',
    },
  });

  const { reset, watch, setValue } = form;

  const name = watch('name');
  React.useEffect(() => {
    if (name) {
      const slug = name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
      setValue('slug', slug);

      const shortName = name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase();
      setValue('shortName', shortName);
    }
  }, [name, setValue]);

  React.useEffect(() => {
    if (defaultUniversityId) {
      setValue('universityId', defaultUniversityId);
    }
  }, [defaultUniversityId, setValue]);

  const onSubmit = async (data) => {
    try {
      await onAdd?.(data);
      toast.success(`Branch ${data.name} created successfully`);
      reset({ universityId: defaultUniversityId });
      setOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to create branch'));
    }
  };

  return (
    <AddBranchDialogView
      universities={universities}
      form={form}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
    />
  );
}
