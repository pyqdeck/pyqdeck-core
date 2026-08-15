'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/api-error';
import { QuestionFormDialogView } from './question-form-dialog.view';
import {
  questionSchema,
  emptyValues,
  optionsFromQuestion,
  toQuestionPayload,
} from './question-form-schema';

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
    const payload = toQuestionPayload(data);
    try {
      await onSave(payload, question?.id);
      onOpenChange(false);
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          `Failed to ${isEdit ? 'update' : 'add'} question`
        )
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
