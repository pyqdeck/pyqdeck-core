import { Router } from 'express';
import {
  requireAuthentication,
  isEditor,
} from '../middlewares/auth.middleware.js';
import { paginate } from '../middlewares/pagination.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { questionZodSchema } from '../models/Question.js';
import * as questionController from '../controllers/questionController.js';

const router = Router({ mergeParams: true }); // Access :paperId

/**
 * @openapi
 * /papers/{paperId}/questions:
 *   get:
 *     operationId: listQuestionsForPaper
 *     tags: [PaperQuestions]
 *     summary: List questions linked to a paper (ordered)
 *     parameters:
 *       - in: path
 *         name: paperId
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
 *         description: Paginated questions for the paper
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
router.get('/', paginate(), questionController.listByPaper);

/**
 * @openapi
 * /papers/{paperId}/questions:
 *   post:
 *     operationId: createQuestionForPaper
 *     tags: [PaperQuestions]
 *     summary: Create a question and link it to this paper (Editor or Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paperId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Question created and linked
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
  validateBody(questionZodSchema),
  questionController.createForPaper
);

/**
 * @openapi
 * /papers/{paperId}/questions/{questionId}/link:
 *   post:
 *     operationId: linkQuestionToPaper
 *     tags: [PaperQuestions]
 *     summary: Link an existing question to this paper (Editor or Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paperId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Optional ordering/metadata for the paper–question mapping
 *     responses:
 *       201:
 *         description: Linked
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
 *                         linked: { type: boolean }
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.post(
  '/:questionId/link',
  requireAuthentication,
  isEditor,
  questionController.linkToPaper
);

export default router;
