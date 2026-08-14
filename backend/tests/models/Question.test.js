import { describe, it, expect } from 'vitest';
import {
  questionCreateZodSchema,
  questionUpdateZodSchema,
} from '../../src/models/Question.js';

describe('Question zod schemas', () => {
  const base = { text: 'What is the capital of France?' };

  describe('questionCreateZodSchema', () => {
    it('accepts a non-mcq question with no options', () => {
      expect(() =>
        questionCreateZodSchema.parse({ ...base, type: 'short' })
      ).not.toThrow();
    });

    it('accepts an mcq question with exactly one correct option', () => {
      const result = questionCreateZodSchema.parse({
        ...base,
        type: 'mcq',
        options: [
          { text: 'Paris', isCorrect: true },
          { text: 'Lyon', isCorrect: false },
        ],
      });
      expect(result.options).toHaveLength(2);
    });

    it('rejects an mcq question with no options', () => {
      expect(() =>
        questionCreateZodSchema.parse({ ...base, type: 'mcq' })
      ).toThrow(/at least 2 options/);
    });

    it('rejects an mcq question with only one option', () => {
      expect(() =>
        questionCreateZodSchema.parse({
          ...base,
          type: 'mcq',
          options: [{ text: 'Paris', isCorrect: true }],
        })
      ).toThrow(/at least 2 options/);
    });

    it('rejects an mcq question with no correct option', () => {
      expect(() =>
        questionCreateZodSchema.parse({
          ...base,
          type: 'mcq',
          options: [
            { text: 'Paris', isCorrect: false },
            { text: 'Lyon', isCorrect: false },
          ],
        })
      ).toThrow(/exactly one marked correct/);
    });

    it('rejects an mcq question with more than one correct option', () => {
      expect(() =>
        questionCreateZodSchema.parse({
          ...base,
          type: 'mcq',
          options: [
            { text: 'Paris', isCorrect: true },
            { text: 'Lyon', isCorrect: true },
          ],
        })
      ).toThrow(/exactly one marked correct/);
    });

    it('rejects an mcq option with empty text', () => {
      expect(() =>
        questionCreateZodSchema.parse({
          ...base,
          type: 'mcq',
          options: [
            { text: '', isCorrect: true },
            { text: 'Lyon', isCorrect: false },
          ],
        })
      ).toThrow();
    });
  });

  describe('questionUpdateZodSchema', () => {
    it('allows a partial update that omits type entirely', () => {
      expect(() => questionUpdateZodSchema.parse({ marks: 5 })).not.toThrow();
    });

    it('enforces the mcq rule when type is included in the update', () => {
      expect(() =>
        questionUpdateZodSchema.parse({ type: 'mcq', options: [] })
      ).toThrow(/at least 2 options/);
    });

    it('accepts a valid mcq update', () => {
      expect(() =>
        questionUpdateZodSchema.parse({
          type: 'mcq',
          options: [
            { text: 'Paris', isCorrect: true },
            { text: 'Lyon', isCorrect: false },
          ],
        })
      ).not.toThrow();
    });
  });
});
