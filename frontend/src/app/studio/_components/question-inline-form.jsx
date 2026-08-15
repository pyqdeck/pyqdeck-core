'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/api-error';
import { QuestionInlineFormView } from './question-inline-form.view';
import {
  questionSchema,
  emptyValues,
  toQuestionPayload,
} from './question-form-schema';

export function QuestionInlineForm({ onAdd }) {
  'use no memo';

  const form = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: emptyValues,
  });

  const handleSubmit = async (data) => {
    const payload = toQuestionPayload(data);
    try {
      await onAdd(payload);
      toast.success('Question added');
      // Keep type/difficulty selected so the next question of the same
      // kind is just type-and-add, no re-picking from the dropdowns.
      form.reset({
        ...emptyValues,
        type: data.type,
        difficulty: data.difficulty,
      });
      form.setFocus('mdText');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to add question'));
    }
  };

  return <QuestionInlineFormView form={form} onSubmit={handleSubmit} />;
}
