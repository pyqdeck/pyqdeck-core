'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { EditBranchDialogView } from './edit-branch-dialog.view';

const branchSchema = z.object({
  name: z.string().min(1, 'Branch name is required'),
  shortName: z.string().min(1, 'Short name is required'),
  branchCode: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
});

export function EditBranchDialog({ branch, onUpdate, open, onOpenChange }) {
  const form = useForm({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: branch?.name || '',
      shortName: branch?.shortName || '',
      branchCode: branch?.branchCode || '',
      slug: branch?.slug || '',
    },
  });

  const { reset } = form;

  React.useEffect(() => {
    if (branch && open) {
      reset({
        name: branch.name,
        shortName: branch.shortName,
        branchCode: branch.branchCode || '',
        slug: branch.slug,
      });
    }
  }, [branch, open, reset]);

  const onSubmit = async (data) => {
    try {
      const universityId = branch.universityId?.id || branch.universityId;
      await onUpdate?.(universityId, branch.id, data);
      toast.success(`Branch ${data.name} updated successfully`);
      onOpenChange(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update branch');
    }
  };

  return (
    <EditBranchDialogView
      branch={branch}
      form={form}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}
