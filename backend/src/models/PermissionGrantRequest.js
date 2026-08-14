import mongoose from 'mongoose';
import { z } from 'zod';
import { Capability, ScopeLevel } from './PermissionGrant.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     PermissionGrantRequest:
 *       type: object
 *       required:
 *         - userId
 *         - capabilities
 *         - scopeLevel
 *       properties:
 *         id:
 *           type: string
 *           example: 65a12345b67890cdef555555
 *         userId:
 *           type: string
 *           description: Reference to the User asking for access
 *           example: 65b98765a43210fedcba9876
 *         capabilities:
 *           type: array
 *           items:
 *             type: string
 *             enum: [content:create, content:edit, content:moderate, content:delete]
 *         scopeLevel:
 *           type: string
 *           enum: [global, university, branch, semester, subjectOffering]
 *         scopeId:
 *           type: string
 *           nullable: true
 *         label:
 *           type: string
 *           description: Human-readable scope name, set client-side at request time
 *         reason:
 *           type: string
 *           description: Why the requester wants this access
 *         status:
 *           type: string
 *           enum: [pending, approved, denied]
 *           default: pending
 *         reviewedBy:
 *           type: string
 *           nullable: true
 *           description: Reference to the admin who approved or denied this request
 *         reviewedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         denialReason:
 *           type: string
 *           nullable: true
 *         resultingGrantId:
 *           type: string
 *           nullable: true
 *           description: Reference to the PermissionGrant created when this request was approved
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export const RequestStatus = z.enum(['pending', 'approved', 'denied']);

const permissionGrantRequestSchema = new mongoose.Schema(
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
    reason: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'denied'],
      default: 'pending',
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
    denialReason: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    resultingGrantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PermissionGrant',
      default: null,
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

permissionGrantRequestSchema.index({ userId: 1, status: 1 });
permissionGrantRequestSchema.index({ status: 1, createdAt: -1 });

export const PermissionGrantRequest = mongoose.model(
  'PermissionGrantRequest',
  permissionGrantRequestSchema
);
export default PermissionGrantRequest;

export const permissionGrantRequestZodSchema = z
  .object({
    capabilities: z
      .array(Capability)
      .min(1, 'At least one capability is required'),
    scopeLevel: ScopeLevel,
    scopeId: z.string().nullable().optional(),
    label: z.string().max(200).optional(),
    reason: z.string().max(500).optional(),
  })
  .refine(
    (data) => (data.scopeLevel === 'global' ? !data.scopeId : !!data.scopeId),
    {
      message: 'scopeId is required unless scopeLevel is "global"',
      path: ['scopeId'],
    }
  );
