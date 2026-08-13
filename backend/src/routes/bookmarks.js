import { Router } from 'express';
import * as bookmarkController from '../controllers/bookmarkController.js';
import { requireAuthentication } from '../middlewares/auth.middleware.js';
import { paginate } from '../middlewares/pagination.middleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { bookmarkZodSchema } from '../models/Bookmark.js';

const router = Router();

// All bookmark routes require authentication
router.use(requireAuthentication);

/**
 * @openapi
 * /bookmarks:
 *   get:
 *     operationId: listBookmarks
 *     tags: [Bookmarks]
 *     summary: List my bookmarks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema: { type: string, enum: [question, paper] }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: List of bookmarks
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
 *                             $ref: '#/components/schemas/Bookmark'
 *                         pagination:
 *                           $ref: '#/components/schemas/Pagination'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/', paginate(), bookmarkController.listMine);

/**
 * @openapi
 * /bookmarks/toggle:
 *   post:
 *     operationId: toggleBookmark
 *     tags: [Bookmarks]
 *     summary: Toggle bookmark (add/remove)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bookmark'
 *     responses:
 *       200:
 *         description: Toggled state
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
 *                         isBookmarked:
 *                           type: boolean
 *                         bookmark:
 *                           $ref: '#/components/schemas/Bookmark'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post(
  '/toggle',
  validateBody(bookmarkZodSchema.omit({ userId: true })),
  bookmarkController.toggle
);

/**
 * @openapi
 * /bookmarks/{id}:
 *   delete:
 *     operationId: deleteBookmark
 *     tags: [Bookmarks]
 *     summary: Delete a specific bookmark
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Deleted
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.delete('/:id', bookmarkController.remove);

export default router;
