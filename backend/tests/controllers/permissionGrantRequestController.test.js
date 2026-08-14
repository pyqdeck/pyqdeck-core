import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as permissionGrantRequestController from '../../src/controllers/permissionGrantRequestController.js';
import permissionGrantRequestService from '../../src/services/permissionGrantRequestService.js';
import { ValidationError } from '../../src/utils/errors/index.js';

vi.mock('../../src/services/permissionGrantRequestService.js', () => ({
  default: {
    create: vi.fn(),
    listForUser: vi.fn(),
    listAll: vi.fn(),
    approve: vi.fn(),
    deny: vi.fn(),
  },
}));

describe('permissionGrantRequestController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {},
      query: {},
      body: {},
      dbUser: { _id: 'u1' },
    };
    res = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  describe('createRequest', () => {
    it('creates a request for req.dbUser, omitting scopeId for a global request', async () => {
      req.body = {
        capabilities: ['content:create'],
        scopeLevel: 'global',
        scopeId: 'ignored',
      };
      permissionGrantRequestService.create.mockResolvedValue({ id: 'r1' });

      await permissionGrantRequestController.createRequest(req, res);

      expect(permissionGrantRequestService.create).toHaveBeenCalledWith(
        expect.objectContaining({ userId: 'u1', scopeId: undefined })
      );
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('keeps scopeId for a scoped request', async () => {
      req.body = {
        capabilities: ['content:create'],
        scopeLevel: 'branch',
        scopeId: 'b1',
      };
      permissionGrantRequestService.create.mockResolvedValue({ id: 'r1' });

      await permissionGrantRequestController.createRequest(req, res);

      expect(permissionGrantRequestService.create).toHaveBeenCalledWith(
        expect.objectContaining({ scopeId: 'b1' })
      );
    });
  });

  describe('listMyRequests', () => {
    it('lists requests for req.dbUser', async () => {
      permissionGrantRequestService.listForUser.mockResolvedValue([]);
      await permissionGrantRequestController.listMyRequests(req, res);
      expect(permissionGrantRequestService.listForUser).toHaveBeenCalledWith(
        'u1'
      );
    });
  });

  describe('listRequests', () => {
    it('defaults to pending when no status query param is given', async () => {
      permissionGrantRequestService.listAll.mockResolvedValue([]);
      await permissionGrantRequestController.listRequests(req, res);
      expect(permissionGrantRequestService.listAll).toHaveBeenCalledWith({
        status: 'pending',
      });
    });

    it('passes undefined status when status=all', async () => {
      req.query.status = 'all';
      permissionGrantRequestService.listAll.mockResolvedValue([]);
      await permissionGrantRequestController.listRequests(req, res);
      expect(permissionGrantRequestService.listAll).toHaveBeenCalledWith({
        status: undefined,
      });
    });

    it('passes through an explicit status filter', async () => {
      req.query.status = 'denied';
      permissionGrantRequestService.listAll.mockResolvedValue([]);
      await permissionGrantRequestController.listRequests(req, res);
      expect(permissionGrantRequestService.listAll).toHaveBeenCalledWith({
        status: 'denied',
      });
    });
  });

  describe('approveRequest', () => {
    it('approves using the admin dbUser id', async () => {
      req.params.requestId = 'r1';
      req.dbUser = { _id: 'admin_1' };
      permissionGrantRequestService.approve.mockResolvedValue({ id: 'r1' });

      await permissionGrantRequestController.approveRequest(req, res);

      expect(permissionGrantRequestService.approve).toHaveBeenCalledWith(
        'r1',
        'admin_1'
      );
    });
  });

  describe('denyRequest', () => {
    it('denies with the given reason', async () => {
      req.params.requestId = 'r1';
      req.dbUser = { _id: 'admin_1' };
      req.body = { reason: 'Not appropriate for this role' };
      permissionGrantRequestService.deny.mockResolvedValue({ id: 'r1' });

      await permissionGrantRequestController.denyRequest(req, res);

      expect(permissionGrantRequestService.deny).toHaveBeenCalledWith(
        'r1',
        'admin_1',
        'Not appropriate for this role'
      );
    });

    it('rejects a missing reason without calling the service', async () => {
      req.params.requestId = 'r1';
      req.body = {};

      await permissionGrantRequestController.denyRequest(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
      expect(permissionGrantRequestService.deny).not.toHaveBeenCalled();
    });

    it('rejects a blank reason without calling the service', async () => {
      req.params.requestId = 'r1';
      req.body = { reason: '   ' };

      await permissionGrantRequestController.denyRequest(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
      expect(permissionGrantRequestService.deny).not.toHaveBeenCalled();
    });
  });
});
