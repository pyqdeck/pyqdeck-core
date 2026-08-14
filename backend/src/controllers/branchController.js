import branchService from '../services/branchService.js';
import { successFormatter, catchAsync } from '../utils/index.js';

/**
 * GET /api/v1/universities/:universityId/branches
 */
export const list = catchAsync(async (req, res, next) => {
  const filter = { ...req.query };
  if (req.query.isActive === undefined) filter.isActive = 'true';

  const { items, total, page, limit } = await branchService.listByUniversity(
    req.params.universityId,
    req.pagination,
    filter
  );
  res.json(
    successFormatter.formatList(items, total, page, limit, 'Branches fetched')
  );
});

/**
 * GET /api/v1/branches
 * Admin only
 */
export const listAll = catchAsync(async (req, res, next) => {
  const filter = { ...req.query };
  if (req.query.isActive === undefined) filter.isActive = 'true';

  const { items, total, page, limit } = await branchService.listAll(
    filter,
    req.pagination
  );
  res.json(
    successFormatter.formatList(
      items,
      total,
      page,
      limit,
      'All branches fetched'
    )
  );
});

/**
 * GET /api/v1/branches/:id/structure
 */
export const getStructure = catchAsync(async (req, res, next) => {
  const structure = await branchService.getStructure(req.params.id);
  res.json(
    successFormatter.formatSuccess(structure, 'Branch structure fetched')
  );
});

/**
 * GET /api/v1/universities/:universityId/branches/:slug
 */
export const getBySlug = catchAsync(async (req, res, next) => {
  const branch = await branchService.getBySlug(
    req.params.universityId,
    req.params.slug
  );
  res.json(successFormatter.formatSuccess(branch, 'Branch fetched'));
});

/**
 * POST /api/v1/universities/:universityId/branches
 * Admin only
 */
export const create = catchAsync(async (req, res, next) => {
  const branch = await branchService.create({
    ...req.body,
    universityId: req.params.universityId,
  });
  res
    .status(201)
    .json(successFormatter.formatSuccess(branch, 'Branch created'));
});

/**
 * POST /api/v1/universities/:universityId/branches/bulk
 * Admin only
 */
export const bulkCreate = catchAsync(async (req, res, next) => {
  const branches = req.body.map((branch) => ({
    ...branch,
    universityId: req.params.universityId,
  }));
  const result = await branchService.bulkCreate(branches);
  res
    .status(201)
    .json(
      successFormatter.formatSuccess(
        result,
        `${result.summary.success} Branches imported successfully`
      )
    );
});

/**
 * PATCH /api/v1/universities/:universityId/branches/:id
 * Admin only
 */
export const update = catchAsync(async (req, res, next) => {
  const branch = await branchService.update(req.params.id, req.body);
  res.json(successFormatter.formatSuccess(branch, 'Branch updated'));
});

/**
 * DELETE /api/v1/universities/:universityId/branches/:id
 * Admin only
 */
export const remove = catchAsync(async (req, res, next) => {
  await branchService.delete(req.params.id, req.dbUser?._id);
  res.status(204).send();
});
