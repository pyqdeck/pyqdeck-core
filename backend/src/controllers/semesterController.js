import semesterService from '../services/semesterService.js';
import { successFormatter, catchAsync } from '../utils/index.js';

/**
 * GET /api/v1/semesters (Global)
 * GET /api/v1/branches/:branchId/semesters
 */
export const list = catchAsync(async (req, res, next) => {
  const branchId = req.params.branchId || req.query.branchId;
  const { skip, limit, page } = req.pagination;

  const query = {};
  if (branchId && branchId !== 'all') query.branchId = branchId;

  const { items, total } = await semesterService.listAll(query, {
    skip,
    limit,
  });

  res.json(
    successFormatter.formatList(items, total, page, limit, 'Semesters fetched')
  );
});

/**
 * GET /api/v1/branches/:branchId/semesters/:number
 * number = semester number (1–8)
 */
export const getByNumber = catchAsync(async (req, res, next) => {
  const number = Number(req.params.number);
  const semester = await semesterService.getByBranchAndNumber(
    req.params.branchId,
    number
  );
  res.json(successFormatter.formatSuccess(semester, 'Semester fetched'));
});

/**
 * POST /api/v1/branches/:branchId/semesters
 * Admin only
 */
export const create = catchAsync(async (req, res, next) => {
  const semester = await semesterService.create({
    ...req.body,
    branchId: req.params.branchId,
  });
  res
    .status(201)
    .json(successFormatter.formatSuccess(semester, 'Semester created'));
});

/**
 * PATCH /api/v1/branches/:branchId/semesters/:id
 * Admin only
 */
export const update = catchAsync(async (req, res, next) => {
  const semester = await semesterService.update(req.params.id, req.body);
  res.json(successFormatter.formatSuccess(semester, 'Semester updated'));
});

/**
 * DELETE /api/v1/branches/:branchId/semesters/:id
 * Admin only
 */
export const remove = catchAsync(async (req, res, next) => {
  await semesterService.delete(req.params.id, req.dbUser?._id);
  res.status(204).send();
});
