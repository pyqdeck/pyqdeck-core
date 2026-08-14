import paperService from '../services/paperService.js';
import { successFormatter, catchAsync } from '../utils/index.js';

/**
 * GET /api/v1/papers
 */
export const list = catchAsync(async (req, res, next) => {
  const filter = {};
  // Public users only see approved papers
  const canSeeAllStatuses = ['admin', 'editor'].includes(req.dbUser?.role);
  if (!canSeeAllStatuses) filter.status = 'approved';

  // Optional query filters
  if (req.query.examYear) filter.examYear = Number(req.query.examYear);
  if (req.query.examType) filter.examType = req.query.examType;
  if (req.query.subjectOfferingId)
    filter.subjectOfferingId = req.query.subjectOfferingId;
  if (canSeeAllStatuses && req.query.status) filter.status = req.query.status;
  if (req.query.q) {
    const escaped = String(req.query.q)
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (escaped) filter.title = { $regex: escaped, $options: 'i' };
  }

  const { items, total, page, limit } = await paperService.list(
    filter,
    req.pagination
  );
  res.json(
    successFormatter.formatList(items, total, page, limit, 'Papers fetched')
  );
});

/**
 * GET /api/v1/papers/:slug
 */
export const getBySlug = catchAsync(async (req, res, next) => {
  const paper = await paperService.getBySlug(req.params.slug);
  res.json(successFormatter.formatSuccess(paper, 'Paper fetched'));
});

/**
 * POST /api/v1/papers
 * Editor / Admin only
 */
export const create = catchAsync(async (req, res, next) => {
  const paper = await paperService.create(req.body, req.dbUser?._id);
  res.status(201).json(successFormatter.formatSuccess(paper, 'Paper created'));
});

/**
 * PATCH /api/v1/papers/:id
 * Editor / Admin only
 */
export const update = catchAsync(async (req, res, next) => {
  const paper = await paperService.update(req.params.id, req.body);
  res.json(successFormatter.formatSuccess(paper, 'Paper updated'));
});

/**
 * PATCH /api/v1/papers/:id/status
 * Admin only — approve / reject papers
 */
export const updateStatus = catchAsync(async (req, res, next) => {
  const paper = await paperService.updateStatus(req.params.id, req.body.status);
  res.json(
    successFormatter.formatSuccess(
      paper,
      `Paper status set to ${req.body.status}`
    )
  );
});

/**
 * DELETE /api/v1/papers/:id
 * Admin only
 */
export const remove = catchAsync(async (req, res, next) => {
  await paperService.delete(req.params.id);
  res.status(204).send();
});
