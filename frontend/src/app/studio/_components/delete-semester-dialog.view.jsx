'use client';

import * as React from 'react';
import { AlertTriangle } from 'lucide-react';
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

export function DeleteSemesterDialogView({
  semester,
  open,
  onOpenChange,
  onDelete,
  loading = false,
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border shadow-none">
        <AlertDialogHeader>
          <div className="bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <AlertTriangle className="text-destructive h-6 w-6" />
          </div>
          <AlertDialogTitle className="font-roboto text-xl font-bold">
            Delete Semester?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-roboto">
            This will permanently delete{' '}
            <span className="text-foreground font-bold">
              Semester {semester?.number}
            </span>{' '}
            and all its associated subjects and question papers. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-roboto border font-bold shadow-none">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onDelete?.();
            }}
            disabled={loading}
            className="bg-destructive text-destructive-foreground font-roboto hover:bg-destructive/90 border border-transparent font-bold shadow-none"
          >
            {loading ? 'Deleting...' : 'Delete Semester'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
