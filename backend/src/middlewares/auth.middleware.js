import { getAuth } from '@clerk/express';
import { UnauthorizedError, ForbiddenError } from '../utils/errors/index.js';
import { UserRole } from '../utils/constants.js';

/**
 * Ensures the request has a valid Clerk session.
 * Returns 401 JSON (not a redirect) — correct for REST APIs.
 * clerkMiddleware() in app.js already populates req.auth.
 */
export function requireAuthentication(req, res, next) {
  const { userId } = getAuth(req);
  if (!userId) {
    return next(new UnauthorizedError('Authentication required'));
  }
  next();
}

/**
 * Middleware to restrict access based on user roles
 * Expects req.dbUser to be populated by syncUser middleware
 *
 * @param {string[]} allowedRoles - Array of roles allowed to access the route
 */
export const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    // 1. Check if user is authenticated (Clerk middleware should handle this, but double check)
    const { userId } = getAuth(req);
    if (!userId) {
      return next(new UnauthorizedError('Authentication required'));
    }

    // 2. Check if dbUser is attached (syncUser middleware should handle this)
    if (!req.dbUser) {
      return next(
        new UnauthorizedError(
          'User profile not found. Please sync your account.'
        )
      );
    }

    // 3. Banned accounts lose access regardless of role -- a stale Clerk
    // session shouldn't outlive an admin's ban decision.
    if (req.dbUser.isActive === false) {
      return next(new ForbiddenError('Your account has been suspended.'));
    }

    // 4. Check if user has one of the allowed roles
    // If no roles are specified, allow any authenticated user
    if (allowedRoles.length === 0) {
      return next();
    }

    if (!allowedRoles.includes(req.dbUser.role)) {
      return next(
        new ForbiddenError(
          `Access denied. Requires one of roles: ${allowedRoles.join(', ')}`
        )
      );
    }

    next();
  };
};

/**
 * Shorthand for Admin-only routes
 */
export const isAdmin = authorize([UserRole.ADMIN]);

/**
 * Shorthand for Editor or Admin routes
 */
export const isEditor = authorize([UserRole.EDITOR, UserRole.ADMIN]);
