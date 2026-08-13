'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useApi } from '@/hooks/use-api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { EditUniversityDialogView } from './edit-university-dialog-view';

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

export function EditUniversityDialog({ university, open, onOpenChange }) {
  const api = useApi();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(universitySchema),
    defaultValues: {
      name: university?.name || '',
      shortName: university?.shortName || '',
      slug: university?.slug || '',
      websiteUrl: university?.websiteUrl || '',
      state: university?.state || '',
      country: university?.country || 'India',
      logo: university?.logo || '',
      description: university?.description || '',
      isActive: university?.isActive ?? true,
    },
  });

  // Update form values when university prop changes
  React.useEffect(() => {
    if (university) {
      form.reset({
        name: university.name,
        shortName: university.shortName,
        slug: university.slug,
        websiteUrl: university.websiteUrl || '',
        state: university.state || '',
        country: university.country || 'India',
        logo: university.logo || '',
        description: university.description || '',
        isActive: university.isActive ?? true,
      });
    }
  }, [university, form]);

  async function onSubmit(values) {
    try {
      await api.universities.updateUniversity(university.id, values);
      toast.success('University updated successfully!');
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Failed to update university'
      );
    }
  }

  return (
    <EditUniversityDialogView
      university={university}
      open={open}
      onOpenChange={onOpenChange}
      form={form}
      onSubmit={onSubmit}
    />
  );
}
