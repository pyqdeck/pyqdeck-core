import { describe, it, expect, beforeEach, vi } from 'vitest';
import { semesterService } from '../../src/services/semesterService.js';
import semesterRepository from '../../src/repositories/semesterRepository.js';
import subjectOfferingRepository from '../../src/repositories/subjectOfferingRepository.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

vi.mock('../../src/repositories/semesterRepository.js', () => ({
  default: {
    findByBranchId: vi.fn(),
    findById: vi.fn(),
    findByBranchAndNumber: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('../../src/repositories/subjectOfferingRepository.js', () => ({
  default: {
    countBySemesterId: vi.fn(),
  },
}));

vi.mock('../../src/services/permissionGrantService.js', () => ({
  default: {
    revokeAllForScope: vi.fn(),
  },
}));

describe('SemesterService', () => {
  const sampleSemester = {
    _id: 'sem_1',
    branchId: 'branch_1',
    number: 5,
    slug: 'semester-5',
    title: 'Semester 5',
  };

  beforeEach(() => vi.clearAllMocks());

  describe('listByBranch', () => {
    it('should return all semesters for a branch sorted by number', async () => {
      semesterRepository.findByBranchId.mockResolvedValue([sampleSemester]);
      const result = await semesterService.listByBranch('branch_1');
      expect(semesterRepository.findByBranchId).toHaveBeenCalledWith(
        'branch_1'
      );
      expect(result).toEqual([sampleSemester]);
    });

    it('should return empty array if no semesters exist', async () => {
      semesterRepository.findByBranchId.mockResolvedValue([]);
      const result = await semesterService.listByBranch('branch_1');
      expect(result).toEqual([]);
    });
  });

  describe('getById', () => {
    it('should return semester by id', async () => {
      semesterRepository.findById.mockResolvedValue(sampleSemester);
      const result = await semesterService.getById('sem_1');
      expect(semesterRepository.findById).toHaveBeenCalledWith('sem_1');
      expect(result).toEqual(sampleSemester);
    });

    it('should throw NotFoundError for unknown id', async () => {
      semesterRepository.findById.mockRejectedValue(
        new NotFoundError('Semester not found')
      );
      await expect(semesterService.getById('bad_id')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('getByBranchAndNumber', () => {
    it('should return semester by branch and number', async () => {
      semesterRepository.findByBranchAndNumber.mockResolvedValue(
        sampleSemester
      );
      const result = await semesterService.getByBranchAndNumber('branch_1', 5);
      expect(semesterRepository.findByBranchAndNumber).toHaveBeenCalledWith(
        'branch_1',
        5
      );
      expect(result).toEqual(sampleSemester);
    });

    it('should throw NotFoundError if not found', async () => {
      semesterRepository.findByBranchAndNumber.mockRejectedValue(
        new NotFoundError('Semester not found')
      );
      await expect(
        semesterService.getByBranchAndNumber('branch_1', 99)
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('create', () => {
    it('should create and return a semester', async () => {
      semesterRepository.create.mockResolvedValue(sampleSemester);
      const result = await semesterService.create(sampleSemester);
      expect(semesterRepository.create).toHaveBeenCalledWith(sampleSemester);
      expect(result).toEqual(sampleSemester);
    });
  });

  describe('update', () => {
    it('should update and return the semester', async () => {
      const updated = { ...sampleSemester, title: 'Fifth Semester' };
      semesterRepository.update.mockResolvedValue(updated);
      const result = await semesterService.update('sem_1', {
        title: 'Fifth Semester',
      });
      expect(semesterRepository.update).toHaveBeenCalledWith('sem_1', {
        title: 'Fifth Semester',
      });
      expect(result.title).toBe('Fifth Semester');
    });

    it('should throw NotFoundError for unknown id', async () => {
      semesterRepository.update.mockRejectedValue(
        new NotFoundError('Semester not found')
      );
      await expect(semesterService.update('bad_id', {})).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('delete', () => {
    it('should delete and return the semester when it has no subject offerings', async () => {
      subjectOfferingRepository.countBySemesterId.mockResolvedValue(0);
      semesterRepository.delete.mockResolvedValue(sampleSemester);
      const result = await semesterService.delete('sem_1');
      expect(semesterRepository.delete).toHaveBeenCalledWith('sem_1');
      expect(result).toEqual(sampleSemester);
    });

    it('should throw ConflictError and not delete when subject offerings still exist', async () => {
      subjectOfferingRepository.countBySemesterId.mockResolvedValue(1);

      await expect(semesterService.delete('sem_1')).rejects.toThrow(
        ConflictError
      );
      expect(semesterRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw NotFoundError for unknown id', async () => {
      subjectOfferingRepository.countBySemesterId.mockResolvedValue(0);
      semesterRepository.delete.mockRejectedValue(
        new NotFoundError('Semester not found')
      );
      await expect(semesterService.delete('bad_id')).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
