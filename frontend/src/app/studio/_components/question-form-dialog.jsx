'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { QuestionFormDialogView } from './question-form-dialog.view';

const questionSchema = z
  .object({
    mdText: z.string().min(1, 'Question text is required'),
    type: z.enum(['mcq', 'short', 'long', 'numerical', 'coding']),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional().or(z.literal('')),
    marks: z.coerce.number().min(0).optional().or(z.literal('')),
    estimatedTime: z.coerce.number().int().min(0).optional().or(z.literal('')),
    isVerified: z.boolean().default(false),
    options: z
      .array(z.object({ text: z.string().min(1, 'Option text is required') }))
      .default([]),
    correctOptionIndex: z.union([z.number(), z.literal('')]).optional(),
  })
  .refine(
    (data) => {
      if (data.type !== 'mcq') return true;
      return data.options.length >= 2;
    },
    { message: 'Add at least 2 options', path: ['options'] }
  )
  .refine(
    (data) => {
      if (data.type !== 'mcq') return true;
      return (
        typeof data.correctOptionIndex === 'number' &&
        data.correctOptionIndex >= 0 &&
        data.correctOptionIndex < data.options.length
      );
    },
    { message: 'Mark which option is correct', path: ['correctOptionIndex'] }
  );

const emptyValues = {
  mdText: '',
  type: 'long',
  difficulty: '',
  marks: '',
  estimatedTime: '',
  isVerified: false,
  options: [],
  correctOptionIndex: '',
};

function optionsFromQuestion(question) {
  if (!question?.options?.length)
    return { options: [], correctOptionIndex: '' };
  return {
    options: question.options.map((o) => ({ text: o.text || '' })),
    correctOptionIndex: question.options.findIndex((o) => o.isCorrect),
  };
}

export function QuestionFormDialog({
  question = null,
  open,
  onOpenChange,
  onSubmit: onSave,
}) {
  'use no memo';
  const isEdit = !!question;

  const form = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: question
      ? {
          mdText: question.mdText || '',
          type: question.type,
          difficulty: question.difficulty || '',
          marks: question.marks ?? '',
          estimatedTime: question.estimatedTime ?? '',
          isVerified: !!question.isVerified,
          ...optionsFromQuestion(question),
        }
      : emptyValues,
  });

  React.useEffect(() => {
    if (open) {
      form.reset(
        question
          ? {
              mdText: question.mdText || '',
              type: question.type,
              difficulty: question.difficulty || '',
              marks: question.marks ?? '',
              estimatedTime: question.estimatedTime ?? '',
              isVerified: !!question.isVerified,
              ...optionsFromQuestion(question),
            }
          : emptyValues
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, question]);

  const handleSubmit = async (data) => {
    const payload = {
      mdText: data.mdText,
      type: data.type,
      isVerified: data.isVerified,
      difficulty: data.difficulty === '' ? undefined : data.difficulty,
      marks: data.marks === '' ? undefined : Number(data.marks),
      estimatedTime:
        data.estimatedTime === '' ? undefined : Number(data.estimatedTime),
      options:
        data.type === 'mcq'
          ? data.options.map((o, i) => ({
              text: o.text,
              isCorrect: i === Number(data.correctOptionIndex),
            }))
          : [],
    };
    try {
      await onSave(payload, question?.id);
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          `Failed to ${isEdit ? 'update' : 'add'} question`
      );
    }
  };

  return (
    <QuestionFormDialogView
      form={form}
      isEdit={isEdit}
      onSubmit={handleSubmit}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}
