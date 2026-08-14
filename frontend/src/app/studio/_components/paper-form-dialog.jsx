'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { PaperFormDialogView } from './paper-form-dialog.view';

const paperSchema = z.object({
  title: z.string().min(1, 'Title is required').max(300),
  examYear: z.coerce.number().int().min(2000).max(2100),
  examType: z.enum([
    'regular',
    're-exam',
    'supplementary',
    'end-sem',
    'internal',
  ]),
  session: z.string().max(50).optional(),
  regulation: z.string().max(20).optional(),
  duration: z.coerce.number().int().min(0).optional().or(z.literal('')),
  maxMarks: z.coerce.number().min(0).optional().or(z.literal('')),
  slug: z.string().min(1, 'Slug is required').max(200),
});

const emptyValues = {
  title: '',
  examYear: new Date().getFullYear(),
  examType: 'end-sem',
  session: '',
  regulation: '',
  duration: '',
  maxMarks: '',
  slug: '',
};

export function PaperFormDialog({
  paper = null,
  offering,
  existingPapers = [],
  open,
  onOpenChange,
  onSubmit: onSave,
  trigger,
}) {
  'use no memo';
  const isEdit = !!paper;

  const form = useForm({
    resolver: zodResolver(paperSchema),
    defaultValues: paper
      ? {
          title: paper.title || '',
          examYear: paper.examYear,
          examType: paper.examType,
          session: paper.session || '',
          regulation: paper.regulation || '',
          duration: paper.duration ?? '',
          maxMarks: paper.maxMarks ?? '',
          slug: paper.slug || '',
        }
      : emptyValues,
  });

  const { watch, setValue, reset } = form;
  const watched = watch();

  React.useEffect(() => {
    if (open) reset(paper ? form.getValues() : emptyValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Auto-generate slug from offering + exam type + year (+ session, when it
  // disambiguates two sittings of the same exam) -- create mode only.
  // Deduped against papers that already exist for this offering, since the
  // backend rejects a duplicate slug outright.
  React.useEffect(() => {
    if (isEdit || !offering) return;
    const { examType, examYear, session } = watched;
    if (examType && examYear) {
      const parts = [offering.slug, examType, examYear, session].filter(
        Boolean
      );
      const base = parts
        .join('-')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const takenSlugs = new Set(existingPapers.map((p) => p.slug));
      let candidate = base;
      let suffix = 2;
      while (takenSlugs.has(candidate)) {
        candidate = `${base}-${suffix}`;
        suffix += 1;
      }

      setValue('slug', candidate, { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    watched.examType,
    watched.examYear,
    watched.session,
    offering,
    isEdit,
    existingPapers,
  ]);

  const handleSubmit = async (data) => {
    const payload = {
      ...data,
      duration: data.duration === '' ? undefined : Number(data.duration),
      maxMarks: data.maxMarks === '' ? undefined : Number(data.maxMarks),
    };
    if (!isEdit) payload.subjectOfferingId = offering.id;

    try {
      await onSave(payload, paper?.id);
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          `Failed to ${isEdit ? 'update' : 'add'} paper`
      );
    }
  };

  return (
    <PaperFormDialogView
      form={form}
      isEdit={isEdit}
      existingPapers={existingPapers}
      onSubmit={handleSubmit}
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
    />
  );
}
