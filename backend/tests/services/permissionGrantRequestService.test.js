import { describe, it, expect, beforeEach, vi } from 'vitest';
import { permissionGrantRequestService } from '../../src/services/permissionGrantRequestService.js';
import permissionGrantRequestRepository from '../../src/repositories/permissionGrantRequestRepository.js';
import permissionGrantService from '../../src/services/permissionGrantService.js';
import { University } from '../../src/models/University.js';
import { Branch } from '../../src/models/Branch.js';
import { ValidationError } from '../../src/utils/errors/index.js';

vi.mock('../../src/repositories/permissionGrantRequestRepository.js', () => ({
  default: {
    create: vi.fn(),
    findById: vi.fn(),
    findByUserId: vi.fn(),
    findAll: vi.fn(),
    updateStatus: vi.fn(),
  },
}));

vi.mock('../../src/services/permissionGrantService.js', () => ({
  default: {
    create: vi.fn(),
  },
}));

vi.mock('../../src/models/University.js', () => ({
  University: { exists: vi.fn() },
}));
vi.mock('../../src/models/Branch.js', () => ({
  Branch: { exists: vi.fn() },
}));
vi.mock('../../src/models/Semester.js', () => ({
  Semester: { exists: vi.fn() },
}));
vi.mock('../../src/models/SubjectOffering.js', () => ({
  SubjectOffering: { exists: vi.fn() },
}));

describe('PermissionGrantRequestService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('creates a global request without checking scope existence', async () => {
      permissionGrantRequestRepository.create.mockResolvedValue({ id: 'r1' });

      await permissionGrantRequestService.create({
        userId: 'u1',
        capabilities: ['content:create'],
        scopeLevel: 'global',
      });

      expect(University.exists).not.toHaveBeenCalled();
      expect(permissionGrantRequestRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'pending' })
      );
    });

    it('throws ValidationError when the scoped resource does not exist', async () => {
      Branch.exists.mockResolvedValue(null);

      await expect(
        permissionGrantRequestService.create({
          userId: 'u1',
          capabilities: ['content:create'],
          scopeLevel: 'branch',
          scopeId: 'missing-branch',
        })
      ).rejects.toThrow(ValidationError);

      expect(permissionGrantRequestRepository.create).not.toHaveBeenCalled();
    });

    it('creates the request when the scoped resource exists', async () => {
      Branch.exists.mockResolvedValue({ _id: 'branch-1' });
      permissionGrantRequestRepository.create.mockResolvedValue({ id: 'r2' });

      await permissionGrantRequestService.create({
        userId: 'u1',
        capabilities: ['content:create'],
        scopeLevel: 'branch',
        scopeId: 'branch-1',
      });

      expect(permissionGrantRequestRepository.create).toHaveBeenCalled();
    });
  });

  describe('approve', () => {
    it('creates the grant and marks the request approved, linking the two', async () => {
      permissionGrantRequestRepository.findById.mockResolvedValue({
        id: 'r1',
        status: 'pending',
        userId: 'u1',
        capabilities: ['content:create'],
        scopeLevel: 'branch',
        scopeId: 'b1',
        label: 'CS Branch',
      });
      permissionGrantService.create.mockResolvedValue({ _id: 'grant_1' });
      permissionGrantRequestRepository.updateStatus.mockResolvedValue({
        id: 'r1',
        status: 'approved',
      });

      await permissionGrantRequestService.approve('r1', 'admin_1');

      expect(permissionGrantService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'u1',
          capabilities: ['content:create'],
          scopeLevel: 'branch',
          scopeId: 'b1',
          grantedBy: 'admin_1',
        })
      );
      expect(
        permissionGrantRequestRepository.updateStatus
      ).toHaveBeenCalledWith(
        'r1',
        expect.objectContaining({
          status: 'approved',
          reviewedBy: 'admin_1',
          resultingGrantId: 'grant_1',
        })
      );
    });

    it('omits scopeId for a global request when creating the grant', async () => {
      permissionGrantRequestRepository.findById.mockResolvedValue({
        id: 'r1',
        status: 'pending',
        userId: 'u1',
        capabilities: ['content:create'],
        scopeLevel: 'global',
        scopeId: null,
      });
      permissionGrantService.create.mockResolvedValue({ _id: 'grant_1' });
      permissionGrantRequestRepository.updateStatus.mockResolvedValue({});

      await permissionGrantRequestService.approve('r1', 'admin_1');

      const callArg = permissionGrantService.create.mock.calls[0][0];
      expect(callArg.scopeId).toBeUndefined();
    });

    it('throws when the request has already been reviewed', async () => {
      permissionGrantRequestRepository.findById.mockResolvedValue({
        id: 'r1',
        status: 'approved',
      });

      await expect(
        permissionGrantRequestService.approve('r1', 'admin_1')
      ).rejects.toThrow(ValidationError);
      expect(permissionGrantService.create).not.toHaveBeenCalled();
    });
  });

  describe('deny', () => {
    it('marks a pending request denied with the given reason', async () => {
      permissionGrantRequestRepository.findById.mockResolvedValue({
        id: 'r1',
        status: 'pending',
      });
      permissionGrantRequestRepository.updateStatus.mockResolvedValue({
        id: 'r1',
        status: 'denied',
      });

      await permissionGrantRequestService.deny(
        'r1',
        'admin_1',
        'Not needed for your role'
      );

      expect(
        permissionGrantRequestRepository.updateStatus
      ).toHaveBeenCalledWith(
        'r1',
        expect.objectContaining({
          status: 'denied',
          reviewedBy: 'admin_1',
          denialReason: 'Not needed for your role',
        })
      );
    });

    it('throws when the request has already been reviewed', async () => {
      permissionGrantRequestRepository.findById.mockResolvedValue({
        id: 'r1',
        status: 'denied',
      });

      await expect(
        permissionGrantRequestService.deny('r1', 'admin_1', 'reason')
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('listForUser', () => {
    it('delegates to the repository', async () => {
      permissionGrantRequestRepository.findByUserId.mockResolvedValue([]);
      await permissionGrantRequestService.listForUser('u1');
      expect(
        permissionGrantRequestRepository.findByUserId
      ).toHaveBeenCalledWith('u1');
    });
  });

  describe('listAll', () => {
    it('delegates to the repository with filters', async () => {
      permissionGrantRequestRepository.findAll.mockResolvedValue([]);
      await permissionGrantRequestService.listAll({ status: 'pending' });
      expect(permissionGrantRequestRepository.findAll).toHaveBeenCalledWith({
        status: 'pending',
      });
    });
  });
});
