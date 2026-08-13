'use client';

import * as React from 'react';
import { useApi } from '@/hooks/use-api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DeleteUniversityDialogView } from './delete-university-dialog-view';

export function DeleteUniversityDialog({ university, open, onOpenChange }) {
  const [loading, setLoading] = React.useState(false);
  const api = useApi();
  const router = useRouter();

  async function onDelete() {
    try {
      setLoading(true);
      await api.universities.deleteUniversity(university.id);
      toast.success('University deleted successfully');
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Failed to delete university'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DeleteUniversityDialogView
      university={university}
      open={open}
      onOpenChange={onOpenChange}
      onDelete={onDelete}
      loading={loading}
    />
  );
}
