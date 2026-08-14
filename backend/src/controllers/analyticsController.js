import analyticsService from '../services/analyticsService.js';
import { successFormatter, catchAsync } from '../utils/index.js';

/**
 * @desc    Get complete studio overview metrics
 * @route   GET /api/v1/analytics/studio-overview
 * @access  Private (Admin/Editor)
 */
export const getStudioOverview = catchAsync(async (req, res, next) => {
  const dashboardData = await analyticsService.getStudioOverviewData(
    req.dbUser
  );

  return res
    .status(200)
    .json(
      successFormatter.formatSuccess(
        dashboardData,
        'Studio overview retrieved successfully'
      )
    );
});
