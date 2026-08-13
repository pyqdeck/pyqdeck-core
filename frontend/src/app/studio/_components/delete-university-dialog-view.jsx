'use client';

import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function DeleteUniversityDialogView({
  university,
  open,
  onOpenChange,
  onDelete,
  loading,
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="font-roboto border shadow-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete{' '}
            <span className="text-foreground font-bold">
              {university?.name}
            </span>{' '}
            and remove all associated data. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border font-bold">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold"
          >
            {loading ? 'Deleting...' : 'Delete Institution'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
