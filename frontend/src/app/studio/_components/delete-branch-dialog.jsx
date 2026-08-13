'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { DeleteBranchDialogView } from './delete-branch-dialog.view';

export function DeleteBranchDialog({ branch, onDelete, open, onOpenChange }) {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    if (!branch?.id || !branch?.universityId) return;

    setLoading(true);
    try {
      const universityId = branch.universityId.id || branch.universityId;
      await onDelete?.(universityId, branch.id);
      toast.success(`Branch ${branch.name} deleted successfully`);
      onOpenChange(false);
    } catch (error) {
      toast.error(error.message || 'Failed to delete branch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DeleteBranchDialogView
      branch={branch}
      open={open}
      onOpenChange={onOpenChange}
      onDelete={handleDelete}
      loading={loading}
    />
  );
}
