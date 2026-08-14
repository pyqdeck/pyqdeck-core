import { Router } from 'express';
import { z } from 'zod';
import * as userController from '../controllers/userController.js';
import * as permissionGrantController from '../controllers/permissionGrantController.js';
import * as permissionGrantRequestController from '../controllers/permissionGrantRequestController.js';
import {
  requireAuthentication,
  isAdmin,
} from '../middlewares/auth.middleware.js';
import { syncUser } from '../middlewares/syncUser.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { Capability, ScopeLevel } from '../models/PermissionGrant.js';
import { permissionGrantRequestZodSchema } from '../models/PermissionGrantRequest.js';

const router = Router();

const createGrantSchema = z
  .object({
    capabilities: z
      .array(Capability)
      .min(1, 'At least one capability is required'),
    scopeLevel: ScopeLevel,
    scopeId: z.string().nullable().optional(),
    label: z.string().max(200).optional(),
    notes: z.string().max(500).optional(),
    expiresAt: z.coerce.date().optional(),
  })
  .refine(
    (data) => (data.scopeLevel === 'global' ? !data.scopeId : !!data.scopeId),
    {
      message: 'scopeId is required unless scopeLevel is "global"',
      path: ['scopeId'],
    }
  );

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
 * /users/me/grants:
 *   get:
 *     operationId: listMyGrants
 *     tags: [Users]
 *     summary: List my own active scoped permission grants
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of my active permission grants
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
 *                           items: { $ref: '#/components/schemas/PermissionGrant' }
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get(
  '/me/grants',
  requireAuthentication,
  syncUser,
  permissionGrantController.listMyGrants
);

/**
 * @openapi
 * /users/me/grant-requests:
 *   get:
 *     operationId: listMyGrantRequests
 *     tags: [Users]
 *     summary: List my own permission grant requests
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: My request history
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
 *                           items: { $ref: '#/components/schemas/PermissionGrantRequest' }
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get(
  '/me/grant-requests',
  requireAuthentication,
  syncUser,
  permissionGrantRequestController.listMyRequests
);

/**
 * @openapi
 * /users/me/grant-requests:
 *   post:
 *     operationId: createMyGrantRequest
 *     tags: [Users]
 *     summary: Ask an admin for a scoped permission
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [capabilities, scopeLevel]
 *             properties:
 *               capabilities:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [content:create, content:edit, content:moderate, content:delete]
 *               scopeLevel:
 *                 type: string
 *                 enum: [global, university, branch, semester, subjectOffering]
 *               scopeId:
 *                 type: string
 *                 nullable: true
 *               label:
 *                 type: string
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Request submitted
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
 *                         request: { $ref: '#/components/schemas/PermissionGrantRequest' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post(
  '/me/grant-requests',
  requireAuthentication,
  syncUser,
  validateBody(permissionGrantRequestZodSchema),
  permissionGrantRequestController.createRequest
);

/**
 * @openapi
 * /users/grant-templates:
 *   get:
 *     operationId: listGrantTemplates
 *     tags: [Users]
 *     summary: List the preset capability-bundle templates offered when creating a grant or request
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role-template presets
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
 *                           items:
 *                             type: object
 *                             properties:
 *                               value: { type: string }
 *                               label: { type: string }
 *                               capabilities:
 *                                 type: array
 *                                 items: { type: string }
 */
router.get(
  '/grant-templates',
  requireAuthentication,
  syncUser,
  permissionGrantController.listGrantTemplates
);

/**
 * @openapi
 * /users/grant-requests:
 *   get:
 *     operationId: listGrantRequests
 *     tags: [Users]
 *     summary: List permission grant requests (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         description: Defaults to "pending"; pass "all" for full history
 *         schema: { type: string, enum: [pending, approved, denied, all] }
 *     responses:
 *       200:
 *         description: List of requests
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
 *                           items: { $ref: '#/components/schemas/PermissionGrantRequest' }
 */
router.get(
  '/grant-requests',
  requireAuthentication,
  syncUser,
  isAdmin,
  permissionGrantRequestController.listRequests
);

/**
 * @openapi
 * /users/grant-requests/{requestId}/approve:
 *   post:
 *     operationId: approveGrantRequest
 *     tags: [Users]
 *     summary: Approve a pending grant request, creating the grant it describes (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Request approved
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
 *                         request: { $ref: '#/components/schemas/PermissionGrantRequest' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.post(
  '/grant-requests/:requestId/approve',
  requireAuthentication,
  syncUser,
  isAdmin,
  permissionGrantRequestController.approveRequest
);

/**
 * @openapi
 * /users/grant-requests/{requestId}/deny:
 *   post:
 *     operationId: denyGrantRequest
 *     tags: [Users]
 *     summary: Deny a pending grant request (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [reason]
 *             properties:
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request denied
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
 *                         request: { $ref: '#/components/schemas/PermissionGrantRequest' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.post(
  '/grant-requests/:requestId/deny',
  requireAuthentication,
  syncUser,
  isAdmin,
  permissionGrantRequestController.denyRequest
);

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

/**
 * @openapi
 * /users/{clerkId}/grants:
 *   get:
 *     operationId: listUserGrants
 *     tags: [Users]
 *     summary: List a user's scoped permission grants (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clerkId
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: includeRevoked
 *         schema: { type: boolean, default: false }
 *     responses:
 *       200:
 *         description: List of permission grants
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
 *                           items: { $ref: '#/components/schemas/PermissionGrant' }
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get(
  '/:clerkId/grants',
  requireAuthentication,
  syncUser,
  isAdmin,
  permissionGrantController.listGrants
);

/**
 * @openapi
 * /users/{clerkId}/grants:
 *   post:
 *     operationId: createUserGrant
 *     tags: [Users]
 *     summary: Grant a user a scoped permission (Admin only)
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
 *             required: [capabilities, scopeLevel]
 *             properties:
 *               capabilities:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [content:create, content:edit, content:moderate, content:delete]
 *               scopeLevel:
 *                 type: string
 *                 enum: [global, university, branch, semester, subjectOffering]
 *               scopeId:
 *                 type: string
 *                 nullable: true
 *               label:
 *                 type: string
 *               notes:
 *                 type: string
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Grant created
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
 *                         grant: { $ref: '#/components/schemas/PermissionGrant' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.post(
  '/:clerkId/grants',
  requireAuthentication,
  syncUser,
  isAdmin,
  validateBody(createGrantSchema),
  permissionGrantController.createGrant
);

/**
 * @openapi
 * /users/{clerkId}/grants/{grantId}:
 *   delete:
 *     operationId: revokeUserGrant
 *     tags: [Users]
 *     summary: Revoke a user's scoped permission grant (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clerkId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: grantId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Grant revoked
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
 *                         grant: { $ref: '#/components/schemas/PermissionGrant' }
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete(
  '/:clerkId/grants/:grantId',
  requireAuthentication,
  syncUser,
  isAdmin,
  permissionGrantController.revokeGrant
);

export default router;
