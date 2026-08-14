import { describe, it, expect, beforeEach, vi } from 'vitest';
import { subjectOfferingService } from '../../src/services/subjectOfferingService.js';
import subjectOfferingRepository from '../../src/repositories/subjectOfferingRepository.js';
import paperRepository from '../../src/repositories/paperRepository.js';
import syllabusRepository from '../../src/repositories/syllabusRepository.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

vi.mock('../../src/repositories/subjectOfferingRepository.js', () => ({
  default: {
    findByUniversityBranchSemester: vi.fn(),
    findBySemesterId: vi.fn(),
    findBySlug: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('../../src/repositories/paperRepository.js', () => ({
  default: {
    countBySubjectOffering: vi.fn(),
  },
}));

vi.mock('../../src/repositories/syllabusRepository.js', () => ({
  default: {
    existsForSubjectOffering: vi.fn(),
  },
}));

vi.mock('../../src/services/permissionGrantService.js', () => ({
  default: {
    revokeAllForScope: vi.fn(),
  },
}));

describe('SubjectOfferingService', () => {
  const sampleOffering = {
    _id: 'offering_1',
    universityId: 'uni_1',
    branchId: 'branch_1',
    semesterId: 'sem_1',
    subjectId: 'sub_1',
    slug: 'csvtu-cse-sem5-compiler-design',
    isActive: true,
  };

  beforeEach(() => vi.clearAllMocks());

  describe('list', () => {
    it('should query by university+branch+semester when all provided', async () => {
      const mockResult = {
        items: [sampleOffering],
        total: 1,
        page: 1,
        limit: 10,
      };
      subjectOfferingRepository.findByUniversityBranchSemester.mockResolvedValue(
        mockResult
      );

      const filter = {
        universityId: 'uni_1',
        branchId: 'branch_1',
        semesterId: 'sem_1',
      };
      const result = await subjectOfferingService.list(filter, {
        page: 1,
        limit: 10,
      });

      expect(
        subjectOfferingRepository.findByUniversityBranchSemester
      ).toHaveBeenCalledWith(
        'uni_1',
        'branch_1',
        'sem_1',
        { page: 1, limit: 10 },
        {}
      );
      expect(result).toEqual(mockResult);
    });

    it('should pass extra filter through to repository', async () => {
      const mockResult = { items: [], total: 0, page: 1, limit: 10 };
      subjectOfferingRepository.findByUniversityBranchSemester.mockResolvedValue(
        mockResult
      );

      const filter = {
        universityId: 'uni_1',
        branchId: 'branch_1',
        semesterId: 'sem_1',
        extra: { isActive: true },
      };
      await subjectOfferingService.list(filter, { page: 1, limit: 10 });

      expect(
        subjectOfferingRepository.findByUniversityBranchSemester
      ).toHaveBeenCalledWith(
        'uni_1',
        'branch_1',
        'sem_1',
        { page: 1, limit: 10 },
        {
          isActive: true,
        }
      );
    });
  });

  describe('getBySlug', () => {
    it('should return offering by slug', async () => {
      subjectOfferingRepository.findBySlug.mockResolvedValue(sampleOffering);
      const result = await subjectOfferingService.getBySlug(
        'csvtu-cse-sem5-compiler-design'
      );
      expect(subjectOfferingRepository.findBySlug).toHaveBeenCalledWith(
        'csvtu-cse-sem5-compiler-design'
      );
      expect(result).toEqual(sampleOffering);
    });

    it('should throw NotFoundError for unknown slug', async () => {
      subjectOfferingRepository.findBySlug.mockRejectedValue(
        new NotFoundError('Subject offering not found')
      );
      await expect(subjectOfferingService.getBySlug('unknown')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('getById', () => {
    it('should return offering by id', async () => {
      subjectOfferingRepository.findById.mockResolvedValue(sampleOffering);
      const result = await subjectOfferingService.getById('offering_1');
      expect(subjectOfferingRepository.findById).toHaveBeenCalledWith(
        'offering_1'
      );
      expect(result).toEqual(sampleOffering);
    });

    it('should throw NotFoundError for unknown id', async () => {
      subjectOfferingRepository.findById.mockRejectedValue(
        new NotFoundError('Subject offering not found')
      );
      await expect(subjectOfferingService.getById('bad_id')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('listBySemester', () => {
    it('should return offerings filtered by semesterId', async () => {
      const mockResult = {
        items: [sampleOffering],
        total: 1,
        page: 1,
        limit: 10,
      };
      subjectOfferingRepository.findBySemesterId.mockResolvedValue(mockResult);

      const result = await subjectOfferingService.listBySemester(
        'sem_1',
        { page: 1, limit: 10 },
        { isActive: true }
      );

      expect(subjectOfferingRepository.findBySemesterId).toHaveBeenCalledWith(
        'sem_1',
        { page: 1, limit: 10 },
        { isActive: true }
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe('create', () => {
    it('should create and return an offering', async () => {
      subjectOfferingRepository.create.mockResolvedValue(sampleOffering);
      const result = await subjectOfferingService.create(sampleOffering);
      expect(subjectOfferingRepository.create).toHaveBeenCalledWith(
        sampleOffering
      );
      expect(result).toEqual(sampleOffering);
    });
  });

  describe('update', () => {
    it('should update and return the offering', async () => {
      const updated = { ...sampleOffering, regulation: '2022' };
      subjectOfferingRepository.update.mockResolvedValue(updated);
      const result = await subjectOfferingService.update('offering_1', {
        regulation: '2022',
      });
      expect(subjectOfferingRepository.update).toHaveBeenCalledWith(
        'offering_1',
        {
          regulation: '2022',
        }
      );
      expect(result.regulation).toBe('2022');
    });

    it('should throw NotFoundError for unknown id', async () => {
      subjectOfferingRepository.update.mockRejectedValue(
        new NotFoundError('Subject offering not found')
      );
      await expect(subjectOfferingService.update('bad_id', {})).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('delete', () => {
    it('should delete and return the offering when it has no papers or syllabus', async () => {
      paperRepository.countBySubjectOffering.mockResolvedValue(0);
      syllabusRepository.existsForSubjectOffering.mockResolvedValue(false);
      subjectOfferingRepository.delete.mockResolvedValue(sampleOffering);
      const result = await subjectOfferingService.delete('offering_1');
      expect(subjectOfferingRepository.delete).toHaveBeenCalledWith(
        'offering_1'
      );
      expect(result).toEqual(sampleOffering);
    });

    it('should throw ConflictError and not delete when papers still exist', async () => {
      paperRepository.countBySubjectOffering.mockResolvedValue(5);

      await expect(subjectOfferingService.delete('offering_1')).rejects.toThrow(
        ConflictError
      );
      expect(subjectOfferingRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw ConflictError and not delete when a syllabus still exists', async () => {
      paperRepository.countBySubjectOffering.mockResolvedValue(0);
      syllabusRepository.existsForSubjectOffering.mockResolvedValue(true);

      await expect(subjectOfferingService.delete('offering_1')).rejects.toThrow(
        ConflictError
      );
      expect(subjectOfferingRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw NotFoundError for unknown id', async () => {
      paperRepository.countBySubjectOffering.mockResolvedValue(0);
      syllabusRepository.existsForSubjectOffering.mockResolvedValue(false);
      subjectOfferingRepository.delete.mockRejectedValue(
        new NotFoundError('Subject offering not found')
      );
      await expect(subjectOfferingService.delete('bad_id')).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
