import { describe, it, expect, beforeEach, vi } from 'vitest';
import { branchService } from '../../src/services/branchService.js';
import branchRepository from '../../src/repositories/branchRepository.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

vi.mock('../../src/repositories/branchRepository.js', () => ({
  default: {
    findByUniversityId: vi.fn(),
    findBySlug: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    getStructure: vi.fn(),
    findAll: vi.fn(),
    createMany: vi.fn(),
  },
}));

vi.mock('../../src/services/permissionGrantService.js', () => ({
  default: {
    revokeAllForScope: vi.fn(),
  },
}));

describe('BranchService', () => {
  const sampleBranch = {
    _id: 'branch_1',
    universityId: 'uni_1',
    name: 'Computer Science & Engineering',
    shortName: 'CSE',
    slug: 'cse',
  };

  beforeEach(() => vi.clearAllMocks());

  describe('listByUniversity', () => {
    it('should return paginated branches for a university', async () => {
      const mockResult = {
        items: [sampleBranch],
        total: 1,
        page: 1,
        limit: 10,
      };
      branchRepository.findByUniversityId.mockResolvedValue(mockResult);

      const result = await branchService.listByUniversity('uni_1', {
        page: 1,
        limit: 10,
      });

      expect(branchRepository.findByUniversityId).toHaveBeenCalledWith(
        'uni_1',
        { page: 1, limit: 10 },
        {}
      );
      expect(result).toEqual(mockResult);
    });

    it('should pass extra filter to repository', async () => {
      branchRepository.findByUniversityId.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 10,
      });
      await branchService.listByUniversity(
        'uni_1',
        { page: 1, limit: 10 },
        { isActive: true }
      );
      expect(branchRepository.findByUniversityId).toHaveBeenCalledWith(
        'uni_1',
        { page: 1, limit: 10 },
        { isActive: true }
      );
    });
  });

  describe('getBySlug', () => {
    it('should return branch by universityId and slug', async () => {
      branchRepository.findBySlug.mockResolvedValue(sampleBranch);
      const result = await branchService.getBySlug('uni_1', 'cse');
      expect(branchRepository.findBySlug).toHaveBeenCalledWith('uni_1', 'cse');
      expect(result).toEqual(sampleBranch);
    });

    it('should throw NotFoundError for unknown slug', async () => {
      branchRepository.findBySlug.mockRejectedValue(
        new NotFoundError('Branch not found')
      );
      await expect(branchService.getBySlug('uni_1', 'unknown')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('getById', () => {
    it('should return branch by id', async () => {
      branchRepository.findById.mockResolvedValue(sampleBranch);
      const result = await branchService.getById('branch_1');
      expect(branchRepository.findById).toHaveBeenCalledWith('branch_1');
      expect(result).toEqual(sampleBranch);
    });

    it('should throw NotFoundError for unknown id', async () => {
      branchRepository.findById.mockRejectedValue(
        new NotFoundError('Branch not found')
      );
      await expect(branchService.getById('bad_id')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('getStructure', () => {
    it('should return branch structure from repository', async () => {
      const mockResult = { id: 'branch_1', semesters: [] };
      branchRepository.getStructure.mockResolvedValue(mockResult);

      const result = await branchService.getStructure('branch_1');

      expect(branchRepository.getStructure).toHaveBeenCalledWith('branch_1');
      expect(result).toEqual(mockResult);
    });

    it('should throw Error if repository fails', async () => {
      branchRepository.getStructure.mockRejectedValue(new Error('err'));
      await expect(branchService.getStructure('branch_1')).rejects.toThrow(
        'err'
      );
    });
  });

  describe('create', () => {
    it('should create and return a branch', async () => {
      branchRepository.create.mockResolvedValue(sampleBranch);
      const result = await branchService.create(sampleBranch);
      expect(branchRepository.create).toHaveBeenCalledWith(sampleBranch);
      expect(result).toEqual(sampleBranch);
    });
  });

  describe('update', () => {
    it('should update and return the branch', async () => {
      const updated = { ...sampleBranch, name: 'Updated CSE' };
      branchRepository.update.mockResolvedValue(updated);
      const result = await branchService.update('branch_1', {
        name: 'Updated CSE',
      });
      expect(branchRepository.update).toHaveBeenCalledWith('branch_1', {
        name: 'Updated CSE',
      });
      expect(result.name).toBe('Updated CSE');
    });

    it('should throw NotFoundError for unknown id', async () => {
      branchRepository.update.mockRejectedValue(
        new NotFoundError('Branch not found')
      );
      await expect(branchService.update('bad_id', {})).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('delete', () => {
    it('should delete and return the branch', async () => {
      branchRepository.delete.mockResolvedValue(sampleBranch);
      const result = await branchService.delete('branch_1');
      expect(branchRepository.delete).toHaveBeenCalledWith('branch_1');
      expect(result).toEqual(sampleBranch);
    });

    it('should throw NotFoundError for unknown id', async () => {
      branchRepository.delete.mockRejectedValue(
        new NotFoundError('Branch not found')
      );
      await expect(branchService.delete('bad_id')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('listAll', () => {
    it('should return all branches with default filter', async () => {
      branchRepository.findAll.mockResolvedValue({ items: [], total: 0 });
      await branchService.listAll({}, { page: 1, limit: 10 });
      expect(branchRepository.findAll).toHaveBeenCalledWith(
        {},
        { page: 1, limit: 10 }
      );
    });

    it('should apply universityId filter in listAll', async () => {
      branchRepository.findAll.mockResolvedValue({ items: [], total: 0 });
      await branchService.listAll(
        { universityId: 'uni_1' },
        { page: 1, limit: 10 }
      );
      expect(branchRepository.findAll).toHaveBeenCalledWith(
        { universityId: 'uni_1' },
        { page: 1, limit: 10 }
      );
    });

    it('should apply isActive:true when string "true" is passed', async () => {
      branchRepository.findAll.mockResolvedValue({ items: [], total: 0 });
      await branchService.listAll({ isActive: 'true' }, { page: 1, limit: 10 });
      expect(branchRepository.findAll).toHaveBeenCalledWith(
        { isActive: true },
        { page: 1, limit: 10 }
      );
    });

    it('should apply isActive:true when boolean true is passed', async () => {
      branchRepository.findAll.mockResolvedValue({ items: [], total: 0 });
      await branchService.listAll({ isActive: true }, { page: 1, limit: 10 });
      expect(branchRepository.findAll).toHaveBeenCalledWith(
        { isActive: true },
        { page: 1, limit: 10 }
      );
    });

    it('should skip isActive when "all" is passed', async () => {
      branchRepository.findAll.mockResolvedValue({ items: [], total: 0 });
      await branchService.listAll({ isActive: 'all' }, { page: 1, limit: 10 });
      expect(branchRepository.findAll).toHaveBeenCalledWith(
        {},
        { page: 1, limit: 10 }
      );
    });
  });

  describe('bulkCreate', () => {
    it('should call createMany on repository', async () => {
      const branches = [{ name: 'B1' }, { name: 'B2' }];
      branchRepository.createMany.mockResolvedValue({ success: 2 });
      const result = await branchService.bulkCreate(branches);
      expect(branchRepository.createMany).toHaveBeenCalledWith(branches);
      expect(result).toEqual({ success: 2 });
    });
  });
});
