import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as permissionGrantController from '../../src/controllers/permissionGrantController.js';
import permissionGrantService from '../../src/services/permissionGrantService.js';
import userRepository from '../../src/repositories/userRepository.js';

vi.mock('../../src/services/permissionGrantService.js', () => ({
  default: {
    listForUser: vi.fn(),
    create: vi.fn(),
    revoke: vi.fn(),
  },
}));

vi.mock('../../src/repositories/userRepository.js', () => ({
  default: {
    findByClerkId: vi.fn(),
  },
}));

describe('permissionGrantController', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, query: {}, body: {}, dbUser: { _id: 'admin_1' } };
    res = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
    };
    vi.clearAllMocks();
  });

  describe('listGrantTemplates', () => {
    it('returns the static role templates, without touching the service', async () => {
      await permissionGrantController.listGrantTemplates(req, res);

      expect(permissionGrantService.listForUser).not.toHaveBeenCalled();
      const [payload] = res.json.mock.calls[0];
      expect(payload.data.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ value: 'moderator' }),
          expect.objectContaining({ value: 'contributor' }),
          expect.objectContaining({ value: 'custom' }),
        ])
      );
    });
  });

  describe('listMyGrants', () => {
    it('lists active grants for req.dbUser, without a clerkId lookup', async () => {
      req.dbUser = { _id: 'u1' };
      permissionGrantService.listForUser.mockResolvedValue([{ id: 'g1' }]);

      await permissionGrantController.listMyGrants(req, res);

      expect(permissionGrantService.listForUser).toHaveBeenCalledWith('u1', {
        includeRevoked: false,
      });
      expect(userRepository.findByClerkId).not.toHaveBeenCalled();
    });
  });

  describe('createGrant', () => {
    it('passes expiresAt through to the service', async () => {
      userRepository.findByClerkId.mockResolvedValue({ _id: 'target_1' });
      permissionGrantService.create.mockResolvedValue({ id: 'g1' });
      req.params.clerkId = 'clerk_target';
      req.body = {
        capabilities: ['content:moderate'],
        scopeLevel: 'branch',
        scopeId: 'branch_1',
        expiresAt: '2027-01-01T00:00:00.000Z',
      };

      await permissionGrantController.createGrant(req, res);

      expect(permissionGrantService.create).toHaveBeenCalledWith(
        expect.objectContaining({ expiresAt: '2027-01-01T00:00:00.000Z' })
      );
    });
  });
});
