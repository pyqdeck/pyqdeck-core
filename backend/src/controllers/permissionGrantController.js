import { successFormatter, catchAsync } from '../utils/index.js';
import permissionGrantService from '../services/permissionGrantService.js';
import userRepository from '../repositories/userRepository.js';
import { ROLE_TEMPLATES } from '../models/PermissionGrant.js';

/**
 * GET /api/v1/users/grant-templates
 */
export const listGrantTemplates = catchAsync(async (req, res) => {
  res.json(
    successFormatter.formatSuccess(
      { items: ROLE_TEMPLATES },
      'Grant templates fetched'
    )
  );
});

/**
 * GET /api/v1/users/me/grants
 * Self-service: any authenticated user can see their own active grants,
 * no admin required.
 */
export const listMyGrants = catchAsync(async (req, res) => {
  const grants = await permissionGrantService.listForUser(req.dbUser._id, {
    includeRevoked: false,
  });

  res.json(successFormatter.formatSuccess({ items: grants }, 'Grants fetched'));
});

/**
 * GET /api/v1/users/:clerkId/grants
 */
export const listGrants = catchAsync(async (req, res) => {
  const user = await userRepository.findByClerkId(req.params.clerkId);
  const includeRevoked = req.query.includeRevoked === 'true';

  const grants = await permissionGrantService.listForUser(user._id, {
    includeRevoked,
  });

  res.json(successFormatter.formatSuccess({ items: grants }, 'Grants fetched'));
});

/**
 * POST /api/v1/users/:clerkId/grants
 */
export const createGrant = catchAsync(async (req, res) => {
  const user = await userRepository.findByClerkId(req.params.clerkId);
  const { capabilities, scopeLevel, scopeId, label, notes, expiresAt } =
    req.body;

  const grant = await permissionGrantService.create({
    userId: user._id,
    capabilities,
    scopeLevel,
    scopeId: scopeLevel === 'global' ? undefined : scopeId,
    label,
    notes,
    expiresAt,
    grantedBy: req.dbUser._id,
  });

  res
    .status(201)
    .json(successFormatter.formatSuccess({ grant }, 'Grant created'));
});

/**
 * DELETE /api/v1/users/:clerkId/grants/:grantId
 */
export const revokeGrant = catchAsync(async (req, res) => {
  const grant = await permissionGrantService.revoke(
    req.params.grantId,
    req.dbUser._id
  );

  res.json(successFormatter.formatSuccess({ grant }, 'Grant revoked'));
});
