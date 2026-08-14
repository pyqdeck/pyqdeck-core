import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAuth } from '@clerk/express';
import {
  requireAuthentication,
  authorize,
  isAdmin,
  isEditor,
} from '../../src/middlewares/auth.middleware.js';
import {
  UnauthorizedError,
  ForbiddenError,
} from '../../src/utils/errors/index.js';

vi.mock('@clerk/express', () => ({
  getAuth: vi.fn(),
}));

describe('auth.middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { auth: {}, dbUser: null, query: {} };
    res = {};
    next = vi.fn();
    vi.clearAllMocks();
  });

  // ─── requireAuthentication ──────────────────────────────────────────────────

  describe('requireAuthentication', () => {
    it('should call next() when userId is present', () => {
      getAuth.mockReturnValue({ userId: 'user_123' });
      requireAuthentication(req, res, next);
      expect(next).toHaveBeenCalledWith();
    });

    it('should call next(UnauthorizedError) when userId is missing', () => {
      getAuth.mockReturnValue({ userId: null });
      requireAuthentication(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    });

    it('should call next(UnauthorizedError) when getAuth returns empty object', () => {
      getAuth.mockReturnValue({});
      requireAuthentication(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    });
  });

  // ─── authorize ──────────────────────────────────────────────────────────────

  describe('authorize', () => {
    it('should call next(UnauthorizedError) if getAuth does not return userId', () => {
      getAuth.mockReturnValue({});
      const mw = authorize(['admin']);
      mw(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    });

    it('should call next(UnauthorizedError) if dbUser is not attached', () => {
      getAuth.mockReturnValue({ userId: 'user_123' });
      req.dbUser = null;
      const mw = authorize(['admin']);
      mw(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    });

    it('should call next() if no roles are specified (any authenticated user)', () => {
      getAuth.mockReturnValue({ userId: 'user_123' });
      req.dbUser = { role: 'normal' };
      const mw = authorize([]);
      mw(req, res, next);
      expect(next).toHaveBeenCalledWith();
    });

    it('should call next() when user has an allowed role', () => {
      getAuth.mockReturnValue({ userId: 'user_123' });
      req.dbUser = { role: 'admin' };
      const mw = authorize(['admin']);
      mw(req, res, next);
      expect(next).toHaveBeenCalledWith();
    });

    it('should call next(ForbiddenError) when user role is not allowed', () => {
      getAuth.mockReturnValue({ userId: 'user_123' });
      req.dbUser = { role: 'normal' };
      const mw = authorize(['admin']);
      mw(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
    });

    it('should call next(ForbiddenError) for a banned admin, before the role check runs', () => {
      getAuth.mockReturnValue({ userId: 'user_123' });
      req.dbUser = { role: 'admin', isActive: false };
      const mw = authorize(['admin']);
      mw(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
    });
  });

  // ─── isAdmin shorthand ───────────────────────────────────────────────────────

  describe('isAdmin', () => {
    it('should allow admin users', () => {
      getAuth.mockReturnValue({ userId: 'user_123' });
      req.dbUser = { role: 'admin' };
      isAdmin(req, res, next);
      expect(next).toHaveBeenCalledWith();
    });

    it('should reject editor users with ForbiddenError', () => {
      getAuth.mockReturnValue({ userId: 'user_123' });
      req.dbUser = { role: 'editor' };
      isAdmin(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
    });

    it('should reject normal users with ForbiddenError', () => {
      getAuth.mockReturnValue({ userId: 'user_123' });
      req.dbUser = { role: 'normal' };
      isAdmin(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
    });
  });

  // ─── isEditor shorthand ───────────────────────────────────────────────────────

  describe('isEditor', () => {
    it('should allow admin users', () => {
      getAuth.mockReturnValue({ userId: 'user_123' });
      req.dbUser = { role: 'admin' };
      isEditor(req, res, next);
      expect(next).toHaveBeenCalledWith();
    });

    it('should allow editor users', () => {
      getAuth.mockReturnValue({ userId: 'user_123' });
      req.dbUser = { role: 'editor' };
      isEditor(req, res, next);
      expect(next).toHaveBeenCalledWith();
    });

    it('should reject normal users with ForbiddenError', () => {
      getAuth.mockReturnValue({ userId: 'user_123' });
      req.dbUser = { role: 'normal' };
      isEditor(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
    });

    it('should reject a banned editor with ForbiddenError even though the role matches', () => {
      getAuth.mockReturnValue({ userId: 'user_123' });
      req.dbUser = { role: 'editor', isActive: false };
      isEditor(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
    });
  });
});
