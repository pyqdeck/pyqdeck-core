import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as analyticsController from '../../src/controllers/analyticsController.js';
import analyticsService from '../../src/services/analyticsService.js';

vi.mock('../../src/services/analyticsService.js', () => ({
  default: {
    getStudioOverviewData: vi.fn(),
  },
}));

describe('analyticsController', () => {
  let req, res, next;

  beforeEach(() => {
    req = { dbUser: { _id: 'u1', role: 'admin' } };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  describe('getStudioOverview', () => {
    it('should return studio overview data on success', async () => {
      const mockData = { metrics: { users: 10 } };
      analyticsService.getStudioOverviewData.mockResolvedValue(mockData);

      await analyticsController.getStudioOverview(req, res, next);

      expect(analyticsService.getStudioOverviewData).toHaveBeenCalledWith(
        req.dbUser
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          data: mockData,
          message: 'Studio overview retrieved successfully',
        })
      );
    });

    it('should call next with error if service throws', async () => {
      const error = new Error('Service error');
      analyticsService.getStudioOverviewData.mockRejectedValue(error);

      await analyticsController.getStudioOverview(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
