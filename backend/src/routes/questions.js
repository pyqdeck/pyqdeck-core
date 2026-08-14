import { Router } from 'express';
import {
  requireAuthentication,
  isAdmin,
  isEditor,
} from '../middlewares/auth.middleware.js';
import { authorizeAny } from '../middlewares/authorizeAny.middleware.js';
import { requireCapability } from '../middlewares/requireCapability.middleware.js';
import { resolveFromQuestionId } from '../middlewares/scopeResolvers.js';
import { paginate } from '../middlewares/pagination.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { questionZodSchema } from '../models/Question.js';
import * as questionController from '../controllers/questionController.js';
import { checkContentFreeze } from '../middlewares/checkContentFreeze.middleware.js';

const router = Router();

const updateQuestionSchema = questionZodSchema.partial();

/**
 * @openapi
 * /questions:
 *   get:
 *     operationId: searchQuestions
 *     tags: [Questions]
 *     summary: Search and list questions (paginated)
 *     parameters:
 *       - in: query
 *         name: type
 *         schema: { type: string }
 *       - in: query
 *         name: difficulty
 *         schema: { type: string }
 *       - in: query
 *         name: isVerified
 *         schema: { type: string, enum: [true, false] }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Paginated questions
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
 *                             $ref: '#/components/schemas/Question'
 *                         pagination:
 *                           $ref: '#/components/schemas/Pagination'
 */
router.get('/', paginate(), questionController.search);

/**
 * @openapi
 * /questions/slug/{slug}:
 *   get:
 *     operationId: getQuestionBySlug
 *     tags: [Questions]
 *     summary: Get question by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Question
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Question'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/slug/:slug', questionController.getBySlug);

/**
 * @openapi
 * /questions/{id}:
 *   get:
 *     operationId: getQuestionById
 *     tags: [Questions]
 *     summary: Get question by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Question
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Question'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:id', questionController.getById);

/**
 * @openapi
 * /questions:
 *   post:
 *     operationId: createQuestion
 *     tags: [Questions]
 *     summary: Create a standalone question (Editor or Admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
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
 *                       $ref: '#/components/schemas/Question'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.post(
  '/',
  requireAuthentication,
  isEditor,
  checkContentFreeze,
  validateBody(questionZodSchema),
  questionController.create
);

/**
 * @openapi
 * /questions/{id}:
 *   patch:
 *     operationId: updateQuestion
 *     tags: [Questions]
 *     summary: Update a question (Editor/Admin, or a scoped content:edit grant)
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
 *             $ref: '#/components/schemas/Question'
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
 *                       $ref: '#/components/schemas/Question'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.patch(
  '/:id',
  requireAuthentication,
  authorizeAny(
    isEditor,
    requireCapability('content:edit', resolveFromQuestionId)
  ),
  validateBody(updateQuestionSchema),
  questionController.update
);

/**
 * @openapi
 * /questions/{id}:
 *   delete:
 *     operationId: deleteQuestion
 *     tags: [Questions]
 *     summary: Delete a question (Admin, or a scoped content:delete grant)
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
    requireCapability('content:delete', resolveFromQuestionId)
  ),
  questionController.remove
);

export default router;
