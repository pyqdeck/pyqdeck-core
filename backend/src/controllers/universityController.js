import universityService from '../services/universityService.js';
import { successFormatter, catchAsync } from '../utils/index.js';

/**
 * GET /api/v1/universities
 */
export const list = catchAsync(async (req, res, next) => {
  const filter = { ...req.query };
  // Ensure isActive is handled by the service layer logic
  if (req.query.isActive === undefined) filter.isActive = 'true';

  const { items, total, page, limit } = await universityService.list(
    filter,
    req.pagination
  );
  res.json(
    successFormatter.formatList(
      items,
      total,
      page,
      limit,
      'Universities fetched'
    )
  );
});

/**
 * GET /api/v1/universities/:slug
 */
export const getBySlug = catchAsync(async (req, res, next) => {
  const university = await universityService.getBySlug(req.params.slug);
  res.json(successFormatter.formatSuccess(university, 'University fetched'));
});

/**
 * POST /api/v1/universities
 * Admin only
 */
export const create = catchAsync(async (req, res, next) => {
  const university = await universityService.create(req.body);
  res
    .status(201)
    .json(successFormatter.formatSuccess(university, 'University created'));
});

/**
 * POST /api/v1/universities/bulk
 * Admin only
 */
export const bulkCreate = catchAsync(async (req, res, next) => {
  const result = await universityService.bulkCreate(req.body);
  res
    .status(201)
    .json(
      successFormatter.formatSuccess(
        result,
        `${result.summary.success} Universities imported successfully`
      )
    );
});

/**
 * PATCH /api/v1/universities/:id
 * Admin only
 */
export const update = catchAsync(async (req, res, next) => {
  const university = await universityService.update(req.params.id, req.body);
  res.json(successFormatter.formatSuccess(university, 'University updated'));
});

/**
 * DELETE /api/v1/universities/:id
 * Admin only
 */
export const remove = catchAsync(async (req, res, next) => {
  await universityService.delete(req.params.id, req.dbUser?._id);
  res.status(204).send();
});
