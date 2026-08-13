import mongoose from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     PlatformConfig:
 *       type: object
 *       properties:
 *         devMode:
 *           type: boolean
 *           default: false
 *         contentFreeze:
 *           type: boolean
 *           default: false
 *         maintenanceMode:
 *           type: boolean
 *           default: false
 */

const platformConfigSchema = new mongoose.Schema(
  {
    instanceId: {
      type: String,
      default: 'main',
      unique: true,
    },
    devMode: {
      type: Boolean,
      default: false,
    },
    contentFreeze: {
      type: Boolean,
      default: false,
    },
    maintenanceMode: {
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

export const PlatformConfig = mongoose.model(
  'PlatformConfig',
  platformConfigSchema
);

export const platformConfigZodSchema = z.object({
  devMode: z.boolean().optional(),
  contentFreeze: z.boolean().optional(),
  maintenanceMode: z.boolean().optional(),
});
