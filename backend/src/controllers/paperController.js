import paperService from '../services/paperService.js';
import permissionGrantService from '../services/permissionGrantService.js';
import { successFormatter, catchAsync } from '../utils/index.js';

/**
 * GET /api/v1/papers
 */
export const list = catchAsync(async (req, res, next) => {
  const filter = {};
  const isPrivileged = ['admin', 'editor'].includes(req.dbUser?.role);

  // A non-editor/admin user with a scoped content:moderate grant can also
  // see non-approved papers, but only within their granted scope(s).
  let moderatorOfferingIds = null;
  let canSeeAllStatuses = isPrivileged;
  if (!isPrivileged && req.dbUser) {
    moderatorOfferingIds =
      await permissionGrantService.resolveModeratorOfferingIds(req.dbUser);
    canSeeAllStatuses =
      moderatorOfferingIds === null || moderatorOfferingIds.length > 0;
  }

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

  // Scoped moderators (not admin/editor) are restricted to their granted
  // offerings, intersected with any explicit subjectOfferingId filter.
  if (!isPrivileged && Array.isArray(moderatorOfferingIds)) {
    if (filter.subjectOfferingId) {
      if (!moderatorOfferingIds.includes(String(filter.subjectOfferingId))) {
        filter.subjectOfferingId = { $in: [] };
      }
    } else {
      filter.subjectOfferingId = { $in: moderatorOfferingIds };
    }
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
 * GET /api/v1/papers/moderation-queue
 * Returns pending papers the caller can actually moderate: all of them for
 * admins or a global content:moderate grant, only those within their
 * scope for a scoped grant holder, or an empty (canModerate: false) result
 * for anyone else -- e.g. a plain editor, who has never had approve/reject
 * rights regardless of this session's permission-grant work.
 */
export const moderationQueue = catchAsync(async (req, res, next) => {
  const limit = req.query.limit ? Number(req.query.limit) : 5;
  const filter = { status: 'pending' };
  let canModerate = req.dbUser?.role === 'admin';

  if (!canModerate) {
    const offeringIds =
      await permissionGrantService.resolveModeratorOfferingIds(req.dbUser);
    if (offeringIds === null) {
      canModerate = true;
    } else if (offeringIds.length > 0) {
      canModerate = true;
      filter.subjectOfferingId = { $in: offeringIds };
    }
  }

  if (!canModerate) {
    return res.json(
      successFormatter.formatSuccess(
        { items: [], canModerate: false },
        'Moderation queue fetched'
      )
    );
  }

  const { items } = await paperService.list(filter, { page: 1, limit });
  res.json(
    successFormatter.formatSuccess(
      { items, canModerate: true },
      'Moderation queue fetched'
    )
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
