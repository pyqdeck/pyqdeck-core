import { Router } from 'express';
import * as platformConfigController from '../controllers/platformConfigController.js';
import {
  requireAuthentication,
  isAdmin,
} from '../middlewares/auth.middleware.js';
import { syncUser } from '../middlewares/syncUser.middleware.js';

const router = Router();

/**
 * @openapi
 * /platform-config:
 *   get:
 *     operationId: getPlatformConfig
 *     tags: [Platform Config]
 *     summary: Get platform configuration (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Platform configuration
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/PlatformConfig'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.get(
  '/',
  requireAuthentication,
  syncUser,
  isAdmin,
  platformConfigController.getConfig
);

/**
 * @openapi
 * /platform-config:
 *   patch:
 *     operationId: updatePlatformConfig
 *     tags: [Platform Config]
 *     summary: Update platform configuration (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               devMode:
 *                 type: boolean
 *               contentFreeze:
 *                 type: boolean
 *               maintenanceMode:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Updated platform configuration
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/PlatformConfig'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.patch(
  '/',
  requireAuthentication,
  syncUser,
  isAdmin,
  platformConfigController.updateConfig
);

export default router;
