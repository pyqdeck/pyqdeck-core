import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - mdText
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           example: 65a12345b67890cdef123456
 *         mdText:
 *           type: string
 *           description: Question text, in Markdown
 *           example: "Explain the architecture of a compiler in detail."
 *         normalizedText:
 *           type: string
 *           description: Cleaned text used for deduplication and search
 *           example: "explain the architecture of a compiler in detail"
 *         type:
 *           type: string
 *           enum: [mcq, short, long, numerical, coding]
 *           example: long
 *         difficulty:
 *           type: string
 *           enum: [easy, medium, hard]
 *           example: medium
 *         bloomLevel:
 *           type: string
 *           enum: [remember, understand, apply, analyze, evaluate, create]
 *           example: understand
 *         marks:
 *           type: number
 *           example: 10
 *         estimatedTime:
 *           type: integer
 *           description: Estimated solving time in minutes
 *           example: 15
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: References to Tag documents
 *           example: ["compiler-design", "architecture"]
 *         options:
 *           type: array
 *           description: Answer choices -- only meaningful when type is "mcq"; exactly one must have isCorrect true
 *           items:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               isCorrect:
 *                 type: boolean
 *                 default: false
 *           example: [{ "text": "O(n log n)", "isCorrect": true }, { "text": "O(n^2)", "isCorrect": false }]
 *         slug:
 *           type: string
 *           example: explain-compiler-architecture
 *         language:
 *           type: string
 *           default: en
 *           example: en
 *         createdBy:
 *           type: string
 *           description: Reference to User
 *           example: 65b98765a43210fedcba9876
 *         isVerified:
 *           type: boolean
 *           default: false
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export const QuestionType = z.enum([
  'mcq',
  'short',
  'long',
  'numerical',
  'coding',
]);

export const DifficultyLevel = z.enum(['easy', 'medium', 'hard']);

export const BloomLevel = z.enum([
  'remember',
  'understand',
  'apply',
  'analyze',
  'evaluate',
  'create',
]);

const questionSchema = new mongoose.Schema(
  {
    mdText: {
      type: String,
      required: true,
      trim: true,
    },
    normalizedText: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['mcq', 'short', 'long', 'numerical', 'coding'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
    },
    bloomLevel: {
      type: String,
      enum: [
        'remember',
        'understand',
        'apply',
        'analyze',
        'evaluate',
        'create',
      ],
    },
    marks: {
      type: Number,
      min: 0,
    },
    estimatedTime: {
      type: Number,
      min: 0,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    options: {
      type: [
        new mongoose.Schema(
          {
            text: { type: String, trim: true },
            isCorrect: { type: Boolean, default: false },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    language: {
      type: String,
      default: 'en',
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  }
);

questionSchema.index({ mdText: 'text', normalizedText: 'text' });
questionSchema.index({ tags: 1 });
questionSchema.index({ type: 1, difficulty: 1 });
questionSchema.index({ isVerified: 1 });

export const Question = mongoose.model('Question', questionSchema);
export default Question;

export const questionOptionZodSchema = z.object({
  text: z.string().min(1, 'Option text is required'),
  isCorrect: z.boolean().default(false),
});

export const questionZodSchema = z.object({
  mdText: z.string().min(1, 'Question text is required'),
  normalizedText: z.string().optional(),
  slug: z.string().max(300).optional(),
  type: QuestionType,
  difficulty: DifficultyLevel.optional(),
  bloomLevel: BloomLevel.optional(),
  marks: z.number().min(0).optional(),
  estimatedTime: z.number().int().min(0).optional(),
  tags: z.array(z.string()).default([]),
  options: z.array(questionOptionZodSchema).default([]),
  language: z.string().default('en'),
  createdBy: z.string().optional(),
  isVerified: z.boolean().default(false),
});

/**
 * MCQ questions need at least 2 options with exactly one marked correct.
 * A no-op for every other type, and for partial-update payloads that
 * don't touch `type` at all (there's no way to check the combined state
 * against the stored document without a fetch, so those are left to the
 * caller's judgement rather than blocked here).
 */
function mcqOptionsAreValid(data) {
  if (data.type !== 'mcq') return true;
  const options = data.options || [];
  if (options.length < 2) return false;
  return options.filter((o) => o.isCorrect).length === 1;
}

const mcqOptionsRefinement = {
  message:
    'MCQ questions need at least 2 options with exactly one marked correct',
  path: ['options'],
};

export const questionCreateZodSchema = questionZodSchema.refine(
  mcqOptionsAreValid,
  mcqOptionsRefinement
);

export const questionUpdateZodSchema = questionZodSchema
  .partial()
  .refine(mcqOptionsAreValid, mcqOptionsRefinement);
