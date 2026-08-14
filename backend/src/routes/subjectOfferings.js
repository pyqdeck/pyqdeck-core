import { Router } from 'express';
import {
  requireAuthentication,
  isAdmin,
  isEditor,
} from '../middlewares/auth.middleware.js';
import { authorizeAny } from '../middlewares/authorizeAny.middleware.js';
import { requireCapability } from '../middlewares/requireCapability.middleware.js';
import {
  resolveFromOfferingCreateBody,
  resolveFromSubjectOfferingId,
} from '../middlewares/scopeResolvers.js';
import { paginate } from '../middlewares/pagination.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { subjectOfferingZodSchema } from '../models/SubjectOffering.js';
import * as subjectOfferingController from '../controllers/subjectOfferingController.js';

const router = Router();

const updateSchema = subjectOfferingZodSchema.partial().omit({
  slug: true,
  universityId: true,
  branchId: true,
  semesterId: true,
  subjectId: true,
});

/**
 * @openapi
 * /subject-offerings:
 *   get:
 *     operationId: listSubjectOfferings
 *     tags: [SubjectOfferings]
 *     summary: List subject offerings (filter by university, branch, and/or semester)
 *     parameters:
 *       - in: query
 *         name: universityId
 *         schema: { type: string }
 *         description: Use with branchId and semesterId for the preferred filter
 *       - in: query
 *         name: branchId
 *         schema: { type: string }
 *       - in: query
 *         name: semesterId
 *         schema: { type: string }
 *         description: If alone, returns offerings for that semester
 *       - in: query
 *         name: isActive
 *         schema: { type: string, enum: [true, all] }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Paginated subject offerings
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
 *                             $ref: '#/components/schemas/SubjectOffering'
 *                         pagination:
 *                           $ref: '#/components/schemas/Pagination'
 */
router.get('/', paginate(), subjectOfferingController.list);

/**
 * @openapi
 * /subject-offerings/id/{id}:
 *   get:
 *     operationId: getSubjectOfferingById
 *     tags: [SubjectOfferings]
 *     summary: Get a subject offering by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Subject offering
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/SubjectOffering'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/id/:id', subjectOfferingController.getById);

/**
 * @openapi
 * /subject-offerings/{slug}:
 *   get:
 *     operationId: getSubjectOfferingBySlug
 *     tags: [SubjectOfferings]
 *     summary: Get a subject offering by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Subject offering
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/SubjectOffering'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:slug', subjectOfferingController.getBySlug);

/**
 * @openapi
 * /subject-offerings:
 *   post:
 *     operationId: createSubjectOffering
 *     tags: [SubjectOfferings]
 *     summary: Create a subject offering (Editor/Admin, or a scoped content:create grant)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubjectOffering'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/SubjectOffering'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.post(
  '/',
  requireAuthentication,
  authorizeAny(
    isEditor,
    requireCapability('content:create', resolveFromOfferingCreateBody)
  ),
  validateBody(subjectOfferingZodSchema),
  subjectOfferingController.create
);

/**
 * @openapi
 * /subject-offerings/{id}:
 *   patch:
 *     operationId: updateSubjectOffering
 *     tags: [SubjectOfferings]
 *     summary: Update a subject offering (Admin, or a scoped content:edit grant)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubjectOffering'
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/SubjectOffering'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.patch(
  '/:id',
  requireAuthentication,
  authorizeAny(
    isAdmin,
    requireCapability('content:edit', resolveFromSubjectOfferingId)
  ),
  validateBody(updateSchema),
  subjectOfferingController.update
);

/**
 * @openapi
 * /subject-offerings/{id}:
 *   delete:
 *     operationId: deleteSubjectOffering
 *     tags: [SubjectOfferings]
 *     summary: Delete a subject offering (Admin, or a scoped content:delete grant)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Deleted
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete(
  '/:id',
  requireAuthentication,
  authorizeAny(
    isAdmin,
    requireCapability('content:delete', resolveFromSubjectOfferingId)
  ),
  subjectOfferingController.remove
);

export default router;
