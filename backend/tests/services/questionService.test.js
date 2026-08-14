import { describe, it, expect, beforeEach, vi } from 'vitest';
import { questionService } from '../../src/services/questionService.js';
import questionRepository from '../../src/repositories/questionRepository.js';
import questionPaperMapRepository from '../../src/repositories/questionPaperMapRepository.js';

vi.mock('../../src/repositories/questionRepository.js', () => ({
  default: {
    findById: vi.fn(),
    findBySlug: vi.fn(),
    findAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('../../src/repositories/questionPaperMapRepository.js', () => ({
  default: {
    findByPaper: vi.fn(),
    create: vi.fn(),
  },
}));

describe('QuestionService', () => {
  const sampleQuestion = {
    _id: 'q_1',
    mdText: 'What is a compiler?',
    type: 'short',
    difficulty: 'easy',
  };

  beforeEach(() => vi.clearAllMocks());

  describe('listByPaper', () => {
    it('should call mapping repository to list questions in a paper', async () => {
      const mockResult = { items: [], total: 0 };
      questionPaperMapRepository.findByPaper.mockResolvedValue(mockResult);
      const result = await questionService.listByPaper('paper_1', { page: 1 });
      expect(questionPaperMapRepository.findByPaper).toHaveBeenCalledWith(
        'paper_1',
        { page: 1 }
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe('createForPaper', () => {
    it('should create question and link it to paper', async () => {
      questionRepository.create.mockResolvedValue(sampleQuestion);
      questionPaperMapRepository.create.mockResolvedValue({ id: 'map_1' });

      const data = { mdText: 'New', questionNumber: 1 };
      const result = await questionService.createForPaper(
        'paper_1',
        data,
        'user_1'
      );

      expect(questionRepository.create).toHaveBeenCalledWith({
        ...data,
        createdBy: 'user_1',
      });
      expect(questionPaperMapRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ paperId: 'paper_1', questionId: 'q_1' })
      );
      expect(result).toHaveProperty('question');
      expect(result).toHaveProperty('mapping');
    });
  });

  describe('getById', () => {
    it('should return question by id', async () => {
      questionRepository.findById.mockResolvedValue(sampleQuestion);
      const result = await questionService.getById('q_1');
      expect(result).toEqual(sampleQuestion);
    });
  });

  describe('search', () => {
    it('should call findAll on repository', async () => {
      questionRepository.findAll.mockResolvedValue({ items: [] });
      await questionService.search({ type: 'mcq' }, { page: 1 });
      expect(questionRepository.findAll).toHaveBeenCalledWith(
        { type: 'mcq' },
        { page: 1 }
      );
    });
  });

  describe('update', () => {
    it('should update question', async () => {
      questionRepository.update.mockResolvedValue(sampleQuestion);
      await questionService.update('q_1', { mdText: 'Updated' });
      expect(questionRepository.update).toHaveBeenCalledWith('q_1', {
        mdText: 'Updated',
      });
    });
  });

  describe('delete', () => {
    it('should delete question', async () => {
      questionRepository.delete.mockResolvedValue(sampleQuestion);
      await questionService.delete('q_1');
      expect(questionRepository.delete).toHaveBeenCalledWith('q_1');
    });
  });
});
