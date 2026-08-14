import { ForbiddenError } from '../utils/errors/index.js';

/**
 * Passes if ANY of the given middlewares would call next() without an
 * error. Used to run the legacy flat-role check alongside the new scoped
 * capability check during rollout, so existing editors keep working
 * unchanged while scoped grants are also honored.
 */
export function authorizeAny(...middlewares) {
  return async (req, res, next) => {
    for (const middleware of middlewares) {
      const passed = await new Promise((resolve) => {
        try {
          middleware(req, res, (err) => resolve(!err));
        } catch {
          resolve(false);
        }
      });
      if (passed) return next();
    }
    next(new ForbiddenError('You do not have permission to do this here.'));
  };
}
