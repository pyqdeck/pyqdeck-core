'use client';

import * as React from 'react';
import { PapersTableView } from './papers-table-view';
import { PaperFormDialog } from './paper-form-dialog';
import { DeletePaperDialog } from './delete-paper-dialog';

export function PapersTable({
  papers = [],
  offering,
  onUpdate,
  onDelete,
  onSetStatus,
}) {
  const [editingPaper, setEditingPaper] = React.useState(null);
  const [deletingPaper, setDeletingPaper] = React.useState(null);

  return (
    <>
      <PapersTableView
        papers={papers}
        onEdit={setEditingPaper}
        onDelete={setDeletingPaper}
        onSetStatus={onSetStatus}
      />

      <PaperFormDialog
        paper={editingPaper}
        offering={offering}
        open={!!editingPaper}
        onOpenChange={(open) => !open && setEditingPaper(null)}
        onSubmit={async (data, id) => onUpdate(id, data)}
      />

      <DeletePaperDialog
        paper={deletingPaper}
        open={!!deletingPaper}
        onOpenChange={(open) => !open && setDeletingPaper(null)}
        onDelete={onDelete}
      />
    </>
  );
}
