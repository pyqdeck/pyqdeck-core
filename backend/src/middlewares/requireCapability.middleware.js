import permissionGrantService from '../services/permissionGrantService.js';
import { UnauthorizedError, ForbiddenError } from '../utils/errors/index.js';

/**
 * Restricts access based on a scoped permission grant rather than a flat
 * role. `scopeResolver(req)` derives the target university/branch/semester/
 * subjectOffering ids for this specific request; the user passes if they
 * hold `capability` at that scope (or any ancestor scope), or are an admin.
 *
 * @param {string} capability - one of the Capability enum values
 * @param {(req) => Promise<object>} scopeResolver
 */
export function requireCapability(capability, scopeResolver) {
  return async (req, res, next) => {
    try {
      if (!req.dbUser) {
        return next(
          new UnauthorizedError(
            'User profile not found. Please sync your account.'
          )
        );
      }

      const scope = await scopeResolver(req);
      const allowed = await permissionGrantService.userHasCapability(
        req.dbUser,
        capability,
        scope
      );

      if (!allowed) {
        return next(
          new ForbiddenError('You do not have permission to do this here.')
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
