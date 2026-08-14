import { describe, it, expect, beforeEach, vi } from 'vitest';
import { universityService } from '../../src/services/universityService.js';
import universityRepository from '../../src/repositories/universityRepository.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

vi.mock('../../src/repositories/universityRepository.js', () => ({
  default: {
    findAll: vi.fn(),
    findBySlug: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    createMany: vi.fn(),
  },
}));

vi.mock('../../src/services/permissionGrantService.js', () => ({
  default: {
    revokeAllForScope: vi.fn(),
  },
}));

describe('UniversityService', () => {
  const sampleUniversity = {
    _id: 'uni_1',
    name: 'CSVTU',
    slug: 'csvtu',
    shortName: 'CSVTU',
    state: 'Chhattisgarh',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('list', () => {
    it('should return paginated universities', async () => {
      const mockResult = {
        items: [sampleUniversity],
        total: 1,
        page: 1,
        limit: 10,
      };
      universityRepository.findAll.mockResolvedValue(mockResult);

      const result = await universityService.list({}, { page: 1, limit: 10 });

      expect(universityRepository.findAll).toHaveBeenCalledWith(
        {},
        { page: 1, limit: 10 }
      );
      expect(result).toEqual(mockResult);
    });

    it('should pass filter to repository', async () => {
      universityRepository.findAll.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 10,
      });
      await universityService.list({ isActive: true }, { page: 1, limit: 10 });
      expect(universityRepository.findAll).toHaveBeenCalledWith(
        { isActive: true },
        { page: 1, limit: 10 }
      );
    });
  });

  describe('getBySlug', () => {
    it('should return university by slug', async () => {
      universityRepository.findBySlug.mockResolvedValue(sampleUniversity);
      const result = await universityService.getBySlug('csvtu');
      expect(universityRepository.findBySlug).toHaveBeenCalledWith('csvtu');
      expect(result).toEqual(sampleUniversity);
    });

    it('should throw NotFoundError for unknown slug', async () => {
      universityRepository.findBySlug.mockRejectedValue(
        new NotFoundError('University not found')
      );
      await expect(universityService.getBySlug('unknown')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('getById', () => {
    it('should return university by id', async () => {
      universityRepository.findById.mockResolvedValue(sampleUniversity);
      const result = await universityService.getById('uni_1');
      expect(universityRepository.findById).toHaveBeenCalledWith('uni_1');
      expect(result).toEqual(sampleUniversity);
    });

    it('should throw NotFoundError for unknown id', async () => {
      universityRepository.findById.mockRejectedValue(
        new NotFoundError('University not found')
      );
      await expect(universityService.getById('bad_id')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('create', () => {
    it('should call create on repository', async () => {
      universityRepository.create.mockResolvedValue(sampleUniversity);
      const result = await universityService.create({ name: 'New' });
      expect(universityRepository.create).toHaveBeenCalledWith({ name: 'New' });
      expect(result).toEqual(sampleUniversity);
    });
  });

  describe('bulkCreate', () => {
    it('should call createMany on repository', async () => {
      const unis = [{ name: 'U1' }, { name: 'U2' }];
      universityRepository.createMany.mockResolvedValue({ success: 2 });
      const result = await universityService.bulkCreate(unis);
      expect(universityRepository.createMany).toHaveBeenCalledWith(unis);
      expect(result).toEqual({ success: 2 });
    });
  });

  describe('update', () => {
    it('should update and return the university', async () => {
      const updated = { ...sampleUniversity, name: 'Updated' };
      universityRepository.update.mockResolvedValue(updated);
      const result = await universityService.update('uni_1', {
        name: 'Updated',
      });
      expect(universityRepository.update).toHaveBeenCalledWith('uni_1', {
        name: 'Updated',
      });
      expect(result.name).toBe('Updated');
    });

    it('should throw NotFoundError for unknown id', async () => {
      universityRepository.update.mockRejectedValue(
        new NotFoundError('University not found')
      );
      await expect(universityService.update('bad_id', {})).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('delete', () => {
    it('should delete and return the university', async () => {
      universityRepository.delete.mockResolvedValue(sampleUniversity);
      const result = await universityService.delete('uni_1');
      expect(universityRepository.delete).toHaveBeenCalledWith('uni_1');
      expect(result).toEqual(sampleUniversity);
    });

    it('should throw NotFoundError for unknown id', async () => {
      universityRepository.delete.mockRejectedValue(
        new NotFoundError('University not found')
      );
      await expect(universityService.delete('bad_id')).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
