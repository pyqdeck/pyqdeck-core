import { describe, it, expect, beforeEach, vi } from 'vitest';
import { requireCapability } from '../../src/middlewares/requireCapability.middleware.js';
import { authorizeAny } from '../../src/middlewares/authorizeAny.middleware.js';
import permissionGrantService from '../../src/services/permissionGrantService.js';
import {
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
} from '../../src/utils/errors/index.js';

vi.mock('../../src/services/permissionGrantService.js', () => ({
  default: {
    userHasCapability: vi.fn(),
  },
}));

describe('requireCapability', () => {
  let req, res, next;

  beforeEach(() => {
    req = { dbUser: { _id: 'u1', role: 'normal' } };
    res = {};
    next = vi.fn();
    vi.clearAllMocks();
  });

  it('calls next(UnauthorizedError) when req.dbUser is missing', async () => {
    req.dbUser = null;
    const scopeResolver = vi.fn();
    const mw = requireCapability('content:create', scopeResolver);

    await mw(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    expect(scopeResolver).not.toHaveBeenCalled();
  });

  it('calls next() when the user has the capability in the resolved scope', async () => {
    const scopeResolver = vi.fn().mockResolvedValue({ branchId: 'b1' });
    permissionGrantService.userHasCapability.mockResolvedValue(true);
    const mw = requireCapability('content:create', scopeResolver);

    await mw(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('calls next(ForbiddenError) when the user lacks the capability', async () => {
    const scopeResolver = vi.fn().mockResolvedValue({ branchId: 'b1' });
    permissionGrantService.userHasCapability.mockResolvedValue(false);
    const mw = requireCapability('content:create', scopeResolver);

    await mw(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
  });

  it('propagates a NotFoundError thrown by the scope resolver instead of a 500', async () => {
    const scopeResolver = vi
      .fn()
      .mockRejectedValue(new NotFoundError('Paper not found'));
    const mw = requireCapability('content:create', scopeResolver);

    await mw(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    expect(permissionGrantService.userHasCapability).not.toHaveBeenCalled();
  });
});

describe('authorizeAny', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {};
    next = vi.fn();
  });

  it('calls next() when the first middleware passes', async () => {
    const passing = (r, s, n) => n();
    const failing = (r, s, n) => n(new ForbiddenError());
    const mw = authorizeAny(passing, failing);

    await mw(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('calls next() when a later middleware passes even if an earlier one fails', async () => {
    const failing = (r, s, n) => n(new ForbiddenError());
    const passing = (r, s, n) => n();
    const mw = authorizeAny(failing, passing);

    await mw(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('calls next(ForbiddenError) when every middleware fails', async () => {
    const failing1 = (r, s, n) => n(new ForbiddenError('first'));
    const failing2 = (r, s, n) => n(new ForbiddenError('second'));
    const mw = authorizeAny(failing1, failing2);

    await mw(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
  });

  it('treats a synchronously-throwing middleware as a failure, not a crash', async () => {
    const throwing = () => {
      throw new Error('boom');
    };
    const passing = (r, s, n) => n();
    const mw = authorizeAny(throwing, passing);

    await mw(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('works with an async middleware (e.g. requireCapability) as one of the branches', async () => {
    permissionGrantService.userHasCapability.mockResolvedValue(true);
    const scopeResolver = vi.fn().mockResolvedValue({ branchId: 'b1' });
    const failing = (r, s, n) => n(new ForbiddenError());
    const mw = authorizeAny(
      failing,
      requireCapability('content:create', scopeResolver)
    );
    req.dbUser = { _id: 'u1', role: 'normal' };

    await mw(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });
});
