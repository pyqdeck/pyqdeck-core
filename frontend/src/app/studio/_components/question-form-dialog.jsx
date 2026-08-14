'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { QuestionFormDialogView } from './question-form-dialog.view';

const questionSchema = z.object({
  text: z.string().min(1, 'Question text is required'),
  type: z.enum(['mcq', 'short', 'long', 'numerical', 'coding']),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional().or(z.literal('')),
  marks: z.coerce.number().min(0).optional().or(z.literal('')),
  estimatedTime: z.coerce.number().int().min(0).optional().or(z.literal('')),
  isVerified: z.boolean().default(false),
});

const emptyValues = {
  text: '',
  type: 'long',
  difficulty: '',
  marks: '',
  estimatedTime: '',
  isVerified: false,
};

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
          text: question.text || '',
          type: question.type,
          difficulty: question.difficulty || '',
          marks: question.marks ?? '',
          estimatedTime: question.estimatedTime ?? '',
          isVerified: !!question.isVerified,
        }
      : emptyValues,
  });

  React.useEffect(() => {
    if (open) {
      form.reset(
        question
          ? {
              text: question.text || '',
              type: question.type,
              difficulty: question.difficulty || '',
              marks: question.marks ?? '',
              estimatedTime: question.estimatedTime ?? '',
              isVerified: !!question.isVerified,
            }
          : emptyValues
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, question]);

  const handleSubmit = async (data) => {
    const payload = {
      ...data,
      difficulty: data.difficulty === '' ? undefined : data.difficulty,
      marks: data.marks === '' ? undefined : Number(data.marks),
      estimatedTime:
        data.estimatedTime === '' ? undefined : Number(data.estimatedTime),
    };
    await onSave(payload, question?.id);
    onOpenChange(false);
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
