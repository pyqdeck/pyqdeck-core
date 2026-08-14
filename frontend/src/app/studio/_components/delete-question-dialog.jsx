'use client';

import * as React from 'react';
import { DeleteQuestionDialogView } from './delete-question-dialog.view';

export function DeleteQuestionDialog({ question, open, onOpenChange, onDelete }) {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await onDelete(question.id);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to delete question:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DeleteQuestionDialogView
      question={question}
      open={open}
      onOpenChange={onOpenChange}
      onDelete={handleDelete}
      loading={loading}
    />
  );
}
