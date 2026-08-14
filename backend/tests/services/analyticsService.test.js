import { describe, it, expect, vi, beforeEach } from 'vitest';
import analyticsService from '../../src/services/analyticsService.js';
import analyticsRepository from '../../src/repositories/analyticsRepository.js';

vi.mock('../../src/repositories/analyticsRepository.js', () => ({
  default: {
    getGlobalCounts: vi.fn(),
    getRecentPendingPapers: vi.fn(),
    getSubjectPopularity: vi.fn(),
    getPaperUploadsByDay: vi.fn(),
    getPersonalCounts: vi.fn(),
  },
}));

describe('analyticsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getStudioOverviewData', () => {
    it('should aggregate and format all studio overview data', async () => {
      // Mock repository returns
      analyticsRepository.getGlobalCounts.mockResolvedValue([
        100, 50, 5, 200, 10, 20,
      ]);
      analyticsRepository.getRecentPendingPapers.mockResolvedValue([
        { title: 'Pending Paper 1' },
      ]);
      analyticsRepository.getSubjectPopularity.mockResolvedValue([
        { subject: 'Math', count: 10 },
      ]);

      // Mock paper uploads mapping over last 7 days
      analyticsRepository.getPaperUploadsByDay.mockImplementation(() => {
        const dateStr = new Date().toISOString().split('T')[0];
        return Promise.resolve([{ _id: dateStr, count: 5 }]);
      });

      const result = await analyticsService.getStudioOverviewData({
        role: 'admin',
      });

      expect(result.scope).toBe('global');
      expect(analyticsRepository.getGlobalCounts).toHaveBeenCalled();
      expect(analyticsRepository.getRecentPendingPapers).toHaveBeenCalledWith(
        5
      );
      expect(analyticsRepository.getSubjectPopularity).toHaveBeenCalled();
      expect(analyticsRepository.getPaperUploadsByDay).toHaveBeenCalled();

      expect(result.metrics).toEqual({
        users: 100,
        papers: {
          total: 50,
          pending: 5,
        },
        questions: 200,
        academics: {
          universities: 10,
          branches: 20,
        },
      });

      expect(result.queues.pendingPapers).toEqual([
        { title: 'Pending Paper 1' },
      ]);
      expect(result.charts.subjectPopularity).toEqual([
        { subject: 'Math', count: 10 },
      ]);

      // Content velocity chart should have 7 elements for the last 7 days
      expect(result.charts.contentVelocity).toHaveLength(7);

      // Validate structure of chart item
      const today = new Date().toISOString().split('T')[0];
      const todayChart = result.charts.contentVelocity.find(
        (c) => c.date === today
      );
      expect(todayChart).toBeDefined();
      expect(todayChart.papers).toBe(5);
    });
  });

  describe('getStudioOverviewData for a non-admin', () => {
    it('returns a personal scope with the caller own counts, not global data', async () => {
      analyticsRepository.getPersonalCounts.mockResolvedValue([3, 2, 1, 7]);

      const result = await analyticsService.getStudioOverviewData({
        _id: 'editor_1',
        role: 'editor',
      });

      expect(analyticsRepository.getPersonalCounts).toHaveBeenCalledWith(
        'editor_1'
      );
      expect(analyticsRepository.getGlobalCounts).not.toHaveBeenCalled();
      expect(result).toEqual({
        scope: 'personal',
        metrics: {
          papers: { total: 3, approved: 2, pending: 1 },
          questions: { total: 7 },
        },
      });
    });

    it('does not leak platform-wide metrics like total users into the personal scope', async () => {
      analyticsRepository.getPersonalCounts.mockResolvedValue([0, 0, 0, 0]);

      const result = await analyticsService.getStudioOverviewData({
        _id: 'editor_1',
        role: 'editor',
      });

      expect(result.metrics).not.toHaveProperty('users');
      expect(result.metrics).not.toHaveProperty('academics');
    });

    it('handles a missing dbUser without throwing', async () => {
      const result = await analyticsService.getStudioOverviewData(null);

      expect(result.scope).toBe('personal');
      expect(result.metrics.papers.total).toBe(0);
      expect(analyticsRepository.getPersonalCounts).not.toHaveBeenCalled();
    });
  });

  describe('_calculateContentVelocity', () => {
    it('should map dates with missing data to 0', async () => {
      analyticsRepository.getPaperUploadsByDay.mockResolvedValue([]);

      const velocityChart = await analyticsService._calculateContentVelocity();

      expect(velocityChart).toHaveLength(7);
      for (const item of velocityChart) {
        expect(item.papers).toBe(0);
      }
    });
  });
});
