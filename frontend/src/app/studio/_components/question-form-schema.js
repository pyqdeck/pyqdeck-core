import { z } from 'zod';

export const questionSchema = z
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

export const emptyValues = {
  mdText: '',
  type: 'long',
  difficulty: '',
  marks: '',
  estimatedTime: '',
  isVerified: false,
  options: [],
  correctOptionIndex: '',
};

export function optionsFromQuestion(question) {
  if (!question?.options?.length)
    return { options: [], correctOptionIndex: '' };
  return {
    options: question.options.map((o) => ({ text: o.text || '' })),
    correctOptionIndex: question.options.findIndex((o) => o.isCorrect),
  };
}

export function toQuestionPayload(data) {
  return {
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
}
