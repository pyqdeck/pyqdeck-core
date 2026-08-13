import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import {
  requireAuthentication,
  isAdmin,
} from '../middlewares/auth.middleware.js';
import { syncUser } from '../middlewares/syncUser.middleware.js';

const router = Router();

/**
 * @openapi
 * /users/me:
 *   get:
 *     operationId: getCurrentUser
 *     tags: [Users]
 *     summary: Get my profile and activity stats
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User record and bookmark counts
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         user:
 *                           $ref: '#/components/schemas/User'
 *                         stats:
 *                           type: object
 *                           properties:
 *                             bookmarks: { type: integer }
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/me', requireAuthentication, syncUser, userController.getMe);

/**
 * @openapi
 * /users:
 *   get:
 *     operationId: listUsers
 *     tags: [Users]
 *     summary: List all users (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema: { type: string, enum: [admin, editor, normal] }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: isActive
 *         schema: { type: boolean }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [name, email, role, createdAt], default: createdAt }
 *       - in: query
 *         name: sortOrder
 *         schema: { type: string, enum: [asc, desc], default: desc }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of users with pagination
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         items:
 *                           type: array
 *                           items: { $ref: '#/components/schemas/User' }
 *                         total: { type: integer }
 *                         page: { type: integer }
 *                         limit: { type: integer }
 */
router.get(
  '/',
  requireAuthentication,
  syncUser,
  isAdmin,
  userController.listUsers
);

/**
 * @openapi
 * /users/{clerkId}:
 *   get:
 *     operationId: getUserById
 *     tags: [Users]
 *     summary: Get a user by clerkId with activity stats (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clerkId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User record and activity stats
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         user: { $ref: '#/components/schemas/User' }
 *                         stats:
 *                           type: object
 *                           properties:
 *                             bookmarksCount: { type: integer }
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get(
  '/:clerkId',
  requireAuthentication,
  syncUser,
  isAdmin,
  userController.getUserById
);

/**
 * @openapi
 * /users/{clerkId}:
 *   patch:
 *     operationId: updateUser
 *     tags: [Users]
 *     summary: Update a user (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clerkId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, editor, normal]
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         user: { $ref: '#/components/schemas/User' }
 */
router.patch(
  '/:clerkId',
  requireAuthentication,
  syncUser,
  isAdmin,
  userController.updateUser
);

export default router;
