'use client';

import * as React from 'react';
import { DeleteSubjectDialogView } from './delete-subject-dialog.view';

export function DeleteSubjectDialog({ subject, open, onOpenChange, onDelete }) {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await onDelete(subject.id);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to delete subject:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DeleteSubjectDialogView
      subject={subject}
      open={open}
      onOpenChange={onOpenChange}
      onDelete={handleDelete}
      loading={loading}
    />
  );
}
