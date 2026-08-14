import { describe, it, expect, beforeEach, vi } from 'vitest';
import { permissionGrantService } from '../../src/services/permissionGrantService.js';
import permissionGrantRepository from '../../src/repositories/permissionGrantRepository.js';
import { University } from '../../src/models/University.js';
import { Branch } from '../../src/models/Branch.js';
import { ValidationError } from '../../src/utils/errors/index.js';

vi.mock('../../src/repositories/permissionGrantRepository.js', () => ({
  default: {
    create: vi.fn(),
    findById: vi.fn(),
    findByUserId: vi.fn(),
    findActiveByUserAndCapability: vi.fn(),
    revoke: vi.fn(),
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

describe('PermissionGrantService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('userHasCapability', () => {
    it('returns true immediately for admins without querying grants', async () => {
      const result = await permissionGrantService.userHasCapability(
        { role: 'admin' },
        'content:create',
        {}
      );
      expect(result).toBe(true);
      expect(permissionGrantRepository.findActiveByUserAndCapability).not.toHaveBeenCalled();
    });

    it('returns false when no dbUser is provided', async () => {
      const result = await permissionGrantService.userHasCapability(
        null,
        'content:create',
        {}
      );
      expect(result).toBe(false);
    });

    it('matches a global-scope grant regardless of target scope', async () => {
      permissionGrantRepository.findActiveByUserAndCapability.mockResolvedValue([
        { scopeLevel: 'global', scopeId: null },
      ]);

      const result = await permissionGrantService.userHasCapability(
        { _id: 'u1', role: 'normal' },
        'content:create',
        { universityId: 'uni1', branchId: 'b1', semesterId: 's1', subjectOfferingId: 'so1' }
      );
      expect(result).toBe(true);
    });

    it.each([
      ['university', 'universityId'],
      ['branch', 'branchId'],
      ['semester', 'semesterId'],
      ['subjectOffering', 'subjectOfferingId'],
    ])('matches a %s-scope grant when the target scope id equals it', async (scopeLevel, scopeKey) => {
      permissionGrantRepository.findActiveByUserAndCapability.mockResolvedValue([
        { scopeLevel, scopeId: 'match-id' },
      ]);

      const targetScope = { [scopeKey]: 'match-id' };
      const result = await permissionGrantService.userHasCapability(
        { _id: 'u1', role: 'normal' },
        'content:create',
        targetScope
      );
      expect(result).toBe(true);
    });

    it.each([
      ['university', 'universityId'],
      ['branch', 'branchId'],
      ['semester', 'semesterId'],
      ['subjectOffering', 'subjectOfferingId'],
    ])('does not match a %s-scope grant when the target scope id differs', async (scopeLevel, scopeKey) => {
      permissionGrantRepository.findActiveByUserAndCapability.mockResolvedValue([
        { scopeLevel, scopeId: 'grant-id' },
      ]);

      const targetScope = { [scopeKey]: 'different-id' };
      const result = await permissionGrantService.userHasCapability(
        { _id: 'u1', role: 'normal' },
        'content:create',
        targetScope
      );
      expect(result).toBe(false);
    });

    it('does not let a branch-level grant leak into a sibling branch', async () => {
      permissionGrantRepository.findActiveByUserAndCapability.mockResolvedValue([
        { scopeLevel: 'branch', scopeId: 'branch-A' },
      ]);

      const result = await permissionGrantService.userHasCapability(
        { _id: 'u1', role: 'normal' },
        'content:create',
        { branchId: 'branch-B', universityId: 'uni-shared' }
      );
      expect(result).toBe(false);
    });

    it('returns false when the user has no grants for that capability', async () => {
      permissionGrantRepository.findActiveByUserAndCapability.mockResolvedValue([]);

      const result = await permissionGrantService.userHasCapability(
        { _id: 'u1', role: 'normal' },
        'content:moderate',
        { branchId: 'b1' }
      );
      expect(result).toBe(false);
    });

    it('only queries grants that are already filtered to isActive:true by the repository', async () => {
      // revoked grants never come back from findActiveByUserAndCapability, so an
      // empty result here (as if the only grant was revoked) must yield false
      permissionGrantRepository.findActiveByUserAndCapability.mockResolvedValue([]);

      const result = await permissionGrantService.userHasCapability(
        { _id: 'u1', role: 'normal' },
        'content:create',
        { branchId: 'b1' }
      );
      expect(result).toBe(false);
    });
  });

  describe('create', () => {
    it('creates a global grant without checking scope existence', async () => {
      permissionGrantRepository.create.mockResolvedValue({ id: 'g1' });

      await permissionGrantService.create({
        userId: 'u1',
        capabilities: ['content:create'],
        scopeLevel: 'global',
        grantedBy: 'admin1',
      });

      expect(University.exists).not.toHaveBeenCalled();
      expect(permissionGrantRepository.create).toHaveBeenCalled();
    });

    it('throws ValidationError when the scoped resource does not exist', async () => {
      Branch.exists.mockResolvedValue(null);

      await expect(
        permissionGrantService.create({
          userId: 'u1',
          capabilities: ['content:create'],
          scopeLevel: 'branch',
          scopeId: 'missing-branch',
          grantedBy: 'admin1',
        })
      ).rejects.toThrow(ValidationError);

      expect(permissionGrantRepository.create).not.toHaveBeenCalled();
    });

    it('creates the grant when the scoped resource exists', async () => {
      Branch.exists.mockResolvedValue({ _id: 'branch-1' });
      permissionGrantRepository.create.mockResolvedValue({ id: 'g2' });

      await permissionGrantService.create({
        userId: 'u1',
        capabilities: ['content:create'],
        scopeLevel: 'branch',
        scopeId: 'branch-1',
        grantedBy: 'admin1',
      });

      expect(permissionGrantRepository.create).toHaveBeenCalled();
    });
  });

  describe('revoke', () => {
    it('delegates to the repository with the revoking admin id', async () => {
      permissionGrantRepository.revoke.mockResolvedValue({ id: 'g1', isActive: false });

      await permissionGrantService.revoke('g1', 'admin1');

      expect(permissionGrantRepository.revoke).toHaveBeenCalledWith('g1', 'admin1');
    });
  });
});
