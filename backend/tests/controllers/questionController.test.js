import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as questionController from '../../src/controllers/questionController.js';
import questionService from '../../src/services/questionService.js';

vi.mock('../../src/services/questionService.js', () => ({
  default: {
    listByPaper: vi.fn(),
    getById: vi.fn(),
    getBySlug: vi.fn(),
    search: vi.fn(),
    create: vi.fn(),
    createForPaper: vi.fn(),
    linkToPaper: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('questionController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      query: {},
      params: {},
      body: {},
      dbUser: { _id: 'user_1' },
      pagination: { page: 1, limit: 10 },
    };
    res = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  describe('listByPaper', () => {
    it('should return questions for a paper', async () => {
      req.params.paperId = 'paper_1';
      questionService.listByPaper.mockResolvedValue({ items: [], total: 0 });
      await questionController.listByPaper(req, res, next);
      expect(questionService.listByPaper).toHaveBeenCalledWith(
        'paper_1',
        req.pagination
      );
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('search', () => {
    it('should apply filters from query', async () => {
      req.query = { type: 'mcq', difficulty: 'hard', isVerified: 'true' };
      questionService.search.mockResolvedValue({ items: [], total: 0 });
      await questionController.search(req, res, next);
      expect(questionService.search).toHaveBeenCalledWith(
        { type: 'mcq', difficulty: 'hard', isVerified: true },
        req.pagination
      );
    });
  });

  describe('createForPaper', () => {
    it('should call createForPaper service', async () => {
      req.params.paperId = 'paper_1';
      req.body = { mdText: 'Q1' };
      questionService.createForPaper.mockResolvedValue({
        question: {},
        mapping: {},
      });
      await questionController.createForPaper(req, res, next);
      expect(questionService.createForPaper).toHaveBeenCalledWith(
        'paper_1',
        req.body,
        'user_1'
      );
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe('linkToPaper', () => {
    it('should call linkToPaper service', async () => {
      req.params = { paperId: 'p1', questionId: 'q1' };
      questionService.linkToPaper.mockResolvedValue({});
      await questionController.linkToPaper(req, res, next);
      expect(questionService.linkToPaper).toHaveBeenCalledWith(
        'p1',
        'q1',
        req.body
      );
    });
  });
});
