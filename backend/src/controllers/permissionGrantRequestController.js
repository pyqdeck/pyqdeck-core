import { successFormatter, catchAsync } from '../utils/index.js';
import permissionGrantRequestService from '../services/permissionGrantRequestService.js';
import { ValidationError } from '../utils/errors/index.js';

/**
 * POST /api/v1/users/me/grant-requests
 * Self-service: any authenticated user can ask for a scoped permission.
 */
export const createRequest = catchAsync(async (req, res) => {
  const { capabilities, scopeLevel, scopeId, label, reason } = req.body;

  const request = await permissionGrantRequestService.create({
    userId: req.dbUser._id,
    capabilities,
    scopeLevel,
    scopeId: scopeLevel === 'global' ? undefined : scopeId,
    label,
    reason,
  });

  res
    .status(201)
    .json(successFormatter.formatSuccess({ request }, 'Request submitted'));
});

/**
 * GET /api/v1/users/me/grant-requests
 * Self-service: my own request history.
 */
export const listMyRequests = catchAsync(async (req, res) => {
  const requests = await permissionGrantRequestService.listForUser(
    req.dbUser._id
  );
  res.json(
    successFormatter.formatSuccess({ items: requests }, 'Requests fetched')
  );
});

/**
 * GET /api/v1/users/grant-requests
 * Admin only. Defaults to pending requests unless ?status= is given.
 */
export const listRequests = catchAsync(async (req, res) => {
  const status = req.query.status || 'pending';
  const requests = await permissionGrantRequestService.listAll({
    status: status === 'all' ? undefined : status,
  });
  res.json(
    successFormatter.formatSuccess({ items: requests }, 'Requests fetched')
  );
});

/**
 * POST /api/v1/users/grant-requests/:requestId/approve
 * Admin only. Creates the real grant and marks the request approved.
 */
export const approveRequest = catchAsync(async (req, res) => {
  const request = await permissionGrantRequestService.approve(
    req.params.requestId,
    req.dbUser._id
  );
  res.json(successFormatter.formatSuccess({ request }, 'Request approved'));
});

/**
 * POST /api/v1/users/grant-requests/:requestId/deny
 * Admin only.
 */
export const denyRequest = catchAsync(async (req, res) => {
  const reason = req.body?.reason;
  if (!reason || !reason.trim()) {
    throw new ValidationError('A reason is required to deny a request');
  }

  const request = await permissionGrantRequestService.deny(
    req.params.requestId,
    req.dbUser._id,
    reason
  );
  res.json(successFormatter.formatSuccess({ request }, 'Request denied'));
});
