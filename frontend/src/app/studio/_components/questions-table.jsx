'use client';

import * as React from 'react';
import { QuestionsTableView } from './questions-table-view';
import { QuestionFormDialog } from './question-form-dialog';
import { DeleteQuestionDialog } from './delete-question-dialog';

export function QuestionsTable({ questions = [], onUpdate, onDelete }) {
  const [editingQuestion, setEditingQuestion] = React.useState(null);
  const [deletingQuestion, setDeletingQuestion] = React.useState(null);

  return (
    <>
      <QuestionsTableView
        questions={questions}
        onEdit={setEditingQuestion}
        onDelete={setDeletingQuestion}
      />

      <QuestionFormDialog
        question={editingQuestion}
        open={!!editingQuestion}
        onOpenChange={(open) => !open && setEditingQuestion(null)}
        onSubmit={async (data, id) => onUpdate(id, data)}
      />

      <DeleteQuestionDialog
        question={deletingQuestion}
        open={!!deletingQuestion}
        onOpenChange={(open) => !open && setDeletingQuestion(null)}
        onDelete={onDelete}
      />
    </>
  );
}
