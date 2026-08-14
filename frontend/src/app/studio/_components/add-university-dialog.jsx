'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useApi } from '@/hooks/use-api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/api-error';
import { AddUniversityDialogView } from './add-university-dialog-view';

const universitySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  shortName: z
    .string()
    .min(2, 'Short name must be at least 2 characters')
    .max(10, 'Too long'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  websiteUrl: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  state: z.string().min(2, 'State is required'),
  country: z.string().default('India'),
  logo: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});
export function AddUniversityDialog({ trigger }) {
  const [open, setOpen] = React.useState(false);
  const api = useApi();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(universitySchema),
    defaultValues: {
      name: '',
      shortName: '',
      slug: '',
      websiteUrl: '',
      state: '',
      country: 'India',
      logo: '',
      description: '',
      isActive: true,
    },
  });

  async function onSubmit(values) {
    try {
      await api.universities.createUniversity(values);
      toast.success('University added successfully!');
      setOpen(false);
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to add university'));
    }
  }

  return (
    <AddUniversityDialogView
      open={open}
      onOpenChange={setOpen}
      form={form}
      onSubmit={onSubmit}
      trigger={trigger}
    />
  );
}
