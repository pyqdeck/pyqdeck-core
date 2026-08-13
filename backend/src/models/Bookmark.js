import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Bookmark:
 *       type: object
 *       required:
 *         - userId
 *         - targetType
 *         - targetId
 *       properties:
 *         id:
 *           type: string
 *           example: 65a12345b67890cdef666666
 *         userId:
 *           type: string
 *           description: Reference to User
 *           example: 65b98765a43210fedcba9876
 *         targetType:
 *           type: string
 *           enum: [question, paper]
 *           example: question
 *         targetId:
 *           type: string
 *           description: ID of the bookmarked document
 *           example: 65a12345b67890cdef123456
 *         note:
 *           type: string
 *           description: Optional personal note on the bookmark
 *           example: "Important question for finals!"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export const BookmarkTargetType = z.enum(['question', 'paper']);

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    targetType: {
      type: String,
      enum: ['question', 'paper'],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'targetType',
    },
    note: {
      type: String,
      trim: true,
      maxlength: 500,
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

bookmarkSchema.index({ userId: 1, targetType: 1 });
bookmarkSchema.index(
  { userId: 1, targetId: 1, targetType: 1 },
  { unique: true }
);

export const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;

export const bookmarkZodSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  targetType: BookmarkTargetType,
  targetId: z.string().min(1, 'Target ID is required'),
  note: z.string().max(500).optional(),
});
