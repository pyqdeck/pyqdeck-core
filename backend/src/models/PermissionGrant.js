import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     PermissionGrant:
 *       type: object
 *       required:
 *         - userId
 *         - capabilities
 *         - scopeLevel
 *       properties:
 *         id:
 *           type: string
 *           example: 65a12345b67890cdef444444
 *         userId:
 *           type: string
 *           description: Reference to User this grant belongs to
 *           example: 65b98765a43210fedcba9876
 *         capabilities:
 *           type: array
 *           items:
 *             type: string
 *             enum: [content:create, content:edit, content:moderate, content:delete]
 *           example: [content:create, content:moderate]
 *         scopeLevel:
 *           type: string
 *           enum: [global, university, branch, semester, subjectOffering]
 *           example: branch
 *         scopeId:
 *           type: string
 *           nullable: true
 *           description: Required unless scopeLevel is "global" -- points at the University/Branch/Semester/SubjectOffering this grant is scoped to
 *           example: 65a12345b67890cdef111111
 *         label:
 *           type: string
 *           description: Human-readable name set at creation time, e.g. "Content Moderator -- Computer Engineering"
 *           example: "Content Moderator -- Computer Engineering"
 *         isActive:
 *           type: boolean
 *           default: true
 *         grantedBy:
 *           type: string
 *           description: Reference to the admin User who created this grant
 *         revokedBy:
 *           type: string
 *           nullable: true
 *         revokedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         notes:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export const Capability = z.enum([
  'content:create',
  'content:edit',
  'content:moderate',
  'content:delete',
]);

export const ScopeLevel = z.enum([
  'global',
  'university',
  'branch',
  'semester',
  'subjectOffering',
]);

const permissionGrantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    capabilities: {
      type: [
        {
          type: String,
          enum: [
            'content:create',
            'content:edit',
            'content:moderate',
            'content:delete',
          ],
        },
      ],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'At least one capability is required',
      },
    },
    scopeLevel: {
      type: String,
      enum: ['global', 'university', 'branch', 'semester', 'subjectOffering'],
      required: true,
    },
    scopeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: function () {
        return this.scopeLevel !== 'global';
      },
      validate: {
        validator: function (value) {
          return this.scopeLevel === 'global' ? !value : !!value;
        },
        message: 'scopeId is required unless scopeLevel is "global"',
      },
    },
    label: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    grantedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    revokedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    revokedAt: {
      type: Date,
      default: null,
    },
    notes: {
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

permissionGrantSchema.index({ userId: 1, isActive: 1 });
permissionGrantSchema.index({ scopeLevel: 1, scopeId: 1, isActive: 1 });
permissionGrantSchema.index({
  userId: 1,
  scopeLevel: 1,
  scopeId: 1,
  isActive: 1,
});

export const PermissionGrant = mongoose.model(
  'PermissionGrant',
  permissionGrantSchema
);
export default PermissionGrant;

export const permissionGrantZodSchema = z
  .object({
    userId: z.string().min(1, 'User ID is required'),
    capabilities: z
      .array(Capability)
      .min(1, 'At least one capability is required'),
    scopeLevel: ScopeLevel,
    scopeId: z.string().nullable().optional(),
    label: z.string().max(200).optional(),
    notes: z.string().max(500).optional(),
  })
  .refine(
    (data) => (data.scopeLevel === 'global' ? !data.scopeId : !!data.scopeId),
    {
      message: 'scopeId is required unless scopeLevel is "global"',
      path: ['scopeId'],
    }
  );
