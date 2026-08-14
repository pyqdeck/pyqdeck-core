'use client';

import * as React from 'react';
import { DeletePaperDialogView } from './delete-paper-dialog.view';

export function DeletePaperDialog({ paper, open, onOpenChange, onDelete }) {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await onDelete(paper.id);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to delete paper:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DeletePaperDialogView
      paper={paper}
      open={open}
      onOpenChange={onOpenChange}
      onDelete={handleDelete}
      loading={loading}
    />
  );
}
