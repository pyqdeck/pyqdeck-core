import { describe, it, expect, beforeEach, vi } from 'vitest';
import { paperService } from '../../src/services/paperService.js';
import paperRepository from '../../src/repositories/paperRepository.js';
import questionPaperMapRepository from '../../src/repositories/questionPaperMapRepository.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

vi.mock('../../src/repositories/paperRepository.js', () => ({
  default: {
    findAll: vi.fn(),
    findBySlug: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updateStatus: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('../../src/repositories/questionPaperMapRepository.js', () => ({
  default: {
    deleteByPaper: vi.fn(),
  },
}));

describe('PaperService', () => {
  const samplePaper = {
    _id: 'paper_1',
    title: 'CS 2023 End Sem',
    slug: 'cs-2023-end-sem',
    examYear: 2023,
    examType: 'endSem',
    status: 'pending',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('list', () => {
    it('should return paginated papers', async () => {
      const mockResult = { items: [samplePaper], total: 1, page: 1, limit: 10 };
      paperRepository.findAll.mockResolvedValue(mockResult);

      const result = await paperService.list({}, { page: 1, limit: 10 });

      expect(paperRepository.findAll).toHaveBeenCalledWith(
        {},
        { page: 1, limit: 10 }
      );
      expect(result).toEqual(mockResult);
    });

    it('should pass filter with status to repository', async () => {
      paperRepository.findAll.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 10,
      });
      await paperService.list({ status: 'approved' }, { page: 1, limit: 10 });
      expect(paperRepository.findAll).toHaveBeenCalledWith(
        { status: 'approved' },
        { page: 1, limit: 10 }
      );
    });
  });

  describe('getBySlug', () => {
    it('should return paper by slug', async () => {
      paperRepository.findBySlug.mockResolvedValue(samplePaper);
      const result = await paperService.getBySlug('cs-2023-end-sem');
      expect(paperRepository.findBySlug).toHaveBeenCalledWith(
        'cs-2023-end-sem'
      );
      expect(result).toEqual(samplePaper);
    });

    it('should throw NotFoundError for unknown slug', async () => {
      paperRepository.findBySlug.mockRejectedValue(
        new NotFoundError('Paper not found')
      );
      await expect(paperService.getBySlug('unknown')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('getById', () => {
    it('should return paper by id', async () => {
      paperRepository.findById.mockResolvedValue(samplePaper);
      const result = await paperService.getById('paper_1');
      expect(paperRepository.findById).toHaveBeenCalledWith('paper_1');
      expect(result).toEqual(samplePaper);
    });

    it('should throw NotFoundError for unknown id', async () => {
      paperRepository.findById.mockRejectedValue(
        new NotFoundError('Paper not found')
      );
      await expect(paperService.getById('bad_id')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('create', () => {
    it('should create paper and attach uploadedBy', async () => {
      const created = { ...samplePaper, uploadedBy: 'user_1' };
      paperRepository.create.mockResolvedValue(created);

      const result = await paperService.create(samplePaper, 'user_1');

      expect(paperRepository.create).toHaveBeenCalledWith({
        ...samplePaper,
        uploadedBy: 'user_1',
      });
      expect(result.uploadedBy).toBe('user_1');
    });

    it('should create paper without uploadedBy if not provided', async () => {
      paperRepository.create.mockResolvedValue(samplePaper);
      await paperService.create(samplePaper, undefined);
      expect(paperRepository.create).toHaveBeenCalledWith({
        ...samplePaper,
        uploadedBy: undefined,
      });
    });
  });

  describe('update', () => {
    it('should update and return the paper', async () => {
      const updated = { ...samplePaper, title: 'Updated Title' };
      paperRepository.update.mockResolvedValue(updated);

      const result = await paperService.update('paper_1', {
        title: 'Updated Title',
      });

      expect(paperRepository.update).toHaveBeenCalledWith('paper_1', {
        title: 'Updated Title',
      });
      expect(result.title).toBe('Updated Title');
    });

    it('should throw NotFoundError for unknown id', async () => {
      paperRepository.update.mockRejectedValue(
        new NotFoundError('Paper not found')
      );
      await expect(paperService.update('bad_id', {})).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('updateStatus', () => {
    it('should update paper status to approved', async () => {
      const approved = { ...samplePaper, status: 'approved' };
      paperRepository.updateStatus.mockResolvedValue(approved);

      const result = await paperService.updateStatus('paper_1', 'approved');

      expect(paperRepository.updateStatus).toHaveBeenCalledWith(
        'paper_1',
        'approved'
      );
      expect(result.status).toBe('approved');
    });

    it('should update paper status to rejected', async () => {
      const rejected = { ...samplePaper, status: 'rejected' };
      paperRepository.updateStatus.mockResolvedValue(rejected);

      const result = await paperService.updateStatus('paper_1', 'rejected');
      expect(result.status).toBe('rejected');
    });

    it('should throw NotFoundError for unknown id', async () => {
      paperRepository.updateStatus.mockRejectedValue(
        new NotFoundError('Paper not found')
      );
      await expect(
        paperService.updateStatus('bad_id', 'approved')
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('delete', () => {
    it('should delete the paper and clean up its question-paper links', async () => {
      paperRepository.delete.mockResolvedValue(samplePaper);
      questionPaperMapRepository.deleteByPaper.mockResolvedValue({
        deletedCount: 3,
      });

      const result = await paperService.delete('paper_1');

      expect(paperRepository.delete).toHaveBeenCalledWith('paper_1');
      expect(questionPaperMapRepository.deleteByPaper).toHaveBeenCalledWith(
        'paper_1'
      );
      expect(result).toEqual(samplePaper);
    });

    it('should throw NotFoundError for unknown id and skip the link cleanup', async () => {
      paperRepository.delete.mockRejectedValue(
        new NotFoundError('Paper not found')
      );
      await expect(paperService.delete('bad_id')).rejects.toThrow(
        NotFoundError
      );
      expect(questionPaperMapRepository.deleteByPaper).not.toHaveBeenCalled();
    });
  });
});
