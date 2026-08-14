import subjectOfferingService from '../services/subjectOfferingService.js';
import { successFormatter, catchAsync } from '../utils/index.js';

/**
 * GET /api/v1/subject-offerings
 * Supports filtering by ?universityId=&branchId=&semesterId=
 */
export const list = catchAsync(async (req, res, next) => {
  const { universityId, branchId, semesterId } = req.query;

  // If all three filters provided, use the optimised path
  if (universityId && branchId && semesterId) {
    const { items, total, page, limit } = await subjectOfferingService.list(
      { universityId, branchId, semesterId },
      req.pagination
    );
    return res.json(
      successFormatter.formatList(
        items,
        total,
        page,
        limit,
        'Subject offerings fetched'
      )
    );
  }

  // Fall back to semester-only filter
  if (semesterId && !universityId && !branchId) {
    const filter = {};
    if (req.query.isActive !== 'all') filter.isActive = true;
    const { items, total, page, limit } =
      await subjectOfferingService.listBySemester(
        semesterId,
        req.pagination,
        filter
      );
    return res.json(
      successFormatter.formatList(
        items,
        total,
        page,
        limit,
        'Subject offerings fetched'
      )
    );
  }

  // Fall back to general list if no specific hierarchy filters
  const { items, total, page, limit } = await subjectOfferingService.list(
    { universityId, branchId, semesterId },
    req.pagination
  );
  return res.json(
    successFormatter.formatList(
      items,
      total,
      page,
      limit,
      'Subject offerings fetched'
    )
  );
});

/**
 * GET /api/v1/subject-offerings/:slug
 */
export const getBySlug = catchAsync(async (req, res, next) => {
  const offering = await subjectOfferingService.getBySlug(req.params.slug);
  res.json(
    successFormatter.formatSuccess(offering, 'Subject offering fetched')
  );
});

/**
 * GET /api/v1/subject-offerings/id/:id
 */
export const getById = catchAsync(async (req, res, next) => {
  const offering = await subjectOfferingService.getById(req.params.id);
  res.json(
    successFormatter.formatSuccess(offering, 'Subject offering fetched')
  );
});

/**
 * POST /api/v1/subject-offerings
 * Admin / Editor only
 */
export const create = catchAsync(async (req, res, next) => {
  const offering = await subjectOfferingService.create(req.body);
  res
    .status(201)
    .json(successFormatter.formatSuccess(offering, 'Subject offering created'));
});

/**
 * PATCH /api/v1/subject-offerings/:id
 * Admin only
 */
export const update = catchAsync(async (req, res, next) => {
  const offering = await subjectOfferingService.update(req.params.id, req.body);
  res.json(
    successFormatter.formatSuccess(offering, 'Subject offering updated')
  );
});

/**
 * DELETE /api/v1/subject-offerings/:id
 * Admin only
 */
export const remove = catchAsync(async (req, res, next) => {
  await subjectOfferingService.delete(req.params.id, req.dbUser?._id);
  res.status(204).send();
});
