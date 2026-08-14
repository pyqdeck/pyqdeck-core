import { Router } from 'express';
import * as syllabusController from '../controllers/syllabusController.js';
import { paginate } from '../middlewares/pagination.middleware.js';
import {
  requireAuthentication,
  isEditor,
  isAdmin,
} from '../middlewares/auth.middleware.js';
import { authorizeAny } from '../middlewares/authorizeAny.middleware.js';
import { requireCapability } from '../middlewares/requireCapability.middleware.js';
import {
  resolveFromSubjectOfferingBody,
  resolveFromSyllabusId,
  resolveFromModuleBody,
  resolveFromModuleId,
  resolveFromTopicBody,
  resolveFromTopicId,
} from '../middlewares/scopeResolvers.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { syllabusZodSchema } from '../models/Syllabus.js';
import { moduleZodSchema } from '../models/Module.js';
import { topicZodSchema } from '../models/Topic.js';

const router = Router();

/**
 * @openapi
 * /subject-offerings/{subjectOfferingId}/syllabus:
 *   get:
 *     operationId: getSyllabusBySubjectOffering
 *     tags: [Syllabus]
 *     summary: Get syllabus with modules and topics
 *     parameters:
 *       - in: path
 *         name: subjectOfferingId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Syllabus hierarchy
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       allOf:
 *                         - $ref: '#/components/schemas/Syllabus'
 *                         - type: object
 *                           properties:
 *                             modules:
 *                               type: array
 *                               items:
 *                                 allOf:
 *                                   - $ref: '#/components/schemas/Module'
 *                                   - type: object
 *                                     properties:
 *                                       topics:
 *                                         type: array
 *                                         items:
 *                                           $ref: '#/components/schemas/Topic'
 */

/**
 * @openapi
 * /syllabus:
 *   post:
 *     operationId: createSyllabus
 *     tags: [Syllabus]
 *     summary: Initialize a new syllabus (Editor/Admin, or a scoped content:create grant)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Syllabus' }
 *     responses:
 *       201:
 *         description: Syllabus initialized
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/SuccessResponse' }
 */
router.post(
  '/syllabus',
  requireAuthentication,
  authorizeAny(
    isEditor,
    requireCapability('content:create', resolveFromSubjectOfferingBody)
  ),
  validateBody(syllabusZodSchema),
  syllabusController.createSyllabus
);

router.get(
  '/subject-offerings/:subjectOfferingId/syllabus',
  syllabusController.getBySubjectOffering
);

/**
 * @openapi
 * /syllabus/{id}:
 *   patch:
 *     operationId: updateSyllabus
 *     tags: [Syllabus]
 *     summary: Update syllabus metadata (Editor/Admin, or a scoped content:edit grant)
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
 *           schema: { $ref: '#/components/schemas/Syllabus' }
 *     responses:
 *       200:
 *         description: Syllabus updated
 */
router.patch(
  '/syllabus/:id',
  requireAuthentication,
  authorizeAny(
    isEditor,
    requireCapability('content:edit', resolveFromSyllabusId)
  ),
  validateBody(syllabusZodSchema.partial()),
  syllabusController.updateSyllabus
);

// Module Routes
/**
 * @openapi
 * /modules:
 *   post:
 *     operationId: createModule
 *     tags: [Syllabus]
 *     summary: Add a module to a syllabus (Editor/Admin, or a scoped content:create grant)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Module' }
 *     responses:
 *       201:
 *         description: Module created
 */
router.post(
  '/modules',
  requireAuthentication,
  authorizeAny(
    isEditor,
    requireCapability('content:create', resolveFromModuleBody)
  ),
  validateBody(moduleZodSchema),
  syllabusController.createModule
);

router.get('/modules', paginate(), syllabusController.listModules);

/**
 * @openapi
 * /modules/{id}:
 *   patch:
 *     operationId: updateModule
 *     tags: [Syllabus]
 *     summary: Update a module (Editor/Admin, or a scoped content:edit grant)
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
 *           schema: { $ref: '#/components/schemas/Module' }
 *     responses:
 *       200:
 *         description: Module updated
 */
router.patch(
  '/modules/:id',
  requireAuthentication,
  authorizeAny(
    isEditor,
    requireCapability('content:edit', resolveFromModuleId)
  ),
  validateBody(moduleZodSchema.partial()),
  syllabusController.updateModule
);

/**
 * @openapi
 * /modules/{id}:
 *   delete:
 *     operationId: deleteModule
 *     tags: [Syllabus]
 *     summary: Delete a module (Admin, or a scoped content:delete grant)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Module deleted
 */
router.delete(
  '/modules/:id',
  requireAuthentication,
  authorizeAny(
    isAdmin,
    requireCapability('content:delete', resolveFromModuleId)
  ),
  syllabusController.deleteModule
);

// Topic Routes
/**
 * @openapi
 * /topics:
 *   post:
 *     operationId: createTopic
 *     tags: [Syllabus]
 *     summary: Add a topic to a module (Editor/Admin, or a scoped content:create grant)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Topic' }
 *     responses:
 *       201:
 *         description: Topic created
 */
router.post(
  '/topics',
  requireAuthentication,
  authorizeAny(
    isEditor,
    requireCapability('content:create', resolveFromTopicBody)
  ),
  validateBody(topicZodSchema),
  syllabusController.createTopic
);

/**
 * @openapi
 * /topics/{id}:
 *   patch:
 *     operationId: updateTopic
 *     tags: [Syllabus]
 *     summary: Update a topic (Editor/Admin, or a scoped content:edit grant)
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
 *           schema: { $ref: '#/components/schemas/Topic' }
 *     responses:
 *       200:
 *         description: Topic updated
 */
router.patch(
  '/topics/:id',
  requireAuthentication,
  authorizeAny(isEditor, requireCapability('content:edit', resolveFromTopicId)),
  validateBody(topicZodSchema.partial()),
  syllabusController.updateTopic
);

/**
 * @openapi
 * /topics/{id}:
 *   delete:
 *     operationId: deleteTopic
 *     tags: [Syllabus]
 *     summary: Delete a topic (Admin, or a scoped content:delete grant)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Topic deleted
 */
router.delete(
  '/topics/:id',
  requireAuthentication,
  authorizeAny(
    isAdmin,
    requireCapability('content:delete', resolveFromTopicId)
  ),
  syllabusController.deleteTopic
);

// Question Mappings
/**
 * @openapi
 * /modules/{id}/questions:
 *   get:
 *     operationId: getModuleQuestions
 *     tags: [Syllabus]
 *     summary: Get questions for a module
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: List of questions
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
router.get(
  '/modules/:id/questions',
  paginate(),
  syllabusController.getModuleQuestions
);

/**
 * @openapi
 * /topics/{id}/questions:
 *   get:
 *     operationId: getTopicQuestions
 *     tags: [Syllabus]
 *     summary: Get questions for a topic
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: List of questions
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
router.get(
  '/topics/:id/questions',
  paginate(),
  syllabusController.getTopicQuestions
);

export default router;
