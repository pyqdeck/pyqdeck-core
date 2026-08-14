'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/api-error';
import { DeleteSemesterDialogView } from './delete-semester-dialog.view';

export function DeleteSemesterDialog({
  semester,
  open,
  onOpenChange,
  onDelete,
}) {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    if (!semester?.id || !semester?.branchId) return;
    setLoading(true);
    try {
      const branchId = semester.branchId.id || semester.branchId;
      await onDelete?.(branchId, semester.id);
      toast.success(`Semester ${semester.number} deleted successfully`);
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to delete semester'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <DeleteSemesterDialogView
      semester={semester}
      open={open}
      onOpenChange={onOpenChange}
      onDelete={handleDelete}
      loading={loading}
    />
  );
}
