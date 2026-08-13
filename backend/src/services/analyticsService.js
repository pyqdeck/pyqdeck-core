import analyticsRepository from '../repositories/analyticsRepository.js';

class AnalyticsService {
  /**
   * Aggregate and format all data required for the Studio Overview dashboard
   */
  async getStudioOverviewData() {
    const [
      [
        totalUsers,
        totalPapers,
        pendingPapersCount,
        totalQuestions,
        totalUniversities,
        totalBranches,
      ],
      recentPendingPapers,
      subjectPopularity,
    ] = await Promise.all([
      analyticsRepository.getGlobalCounts(),
      analyticsRepository.getRecentPendingPapers(5),
      analyticsRepository.getSubjectPopularity(),
    ]);

    const velocityChart = await this._calculateContentVelocity();

    return {
      metrics: {
        users: totalUsers,
        papers: {
          total: totalPapers,
          pending: pendingPapersCount,
        },
        questions: totalQuestions,
        academics: {
          universities: totalUniversities,
          branches: totalBranches,
        },
      },
      charts: {
        contentVelocity: velocityChart,
        subjectPopularity: subjectPopularity,
      },
      queues: {
        pendingPapers: recentPendingPapers,
      },
    };
  }

  /**
   * Helper to format content velocity over the last 7 days for Recharts
   * @private
   */
  async _calculateContentVelocity() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const contentVelocityData =
      await analyticsRepository.getPaperUploadsByDay(sevenDaysAgo);

    const velocityMap = contentVelocityData.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    const velocityChart = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      velocityChart.push({
        date: dateStr,
        papers: velocityMap[dateStr] || 0,
      });
    }

    return velocityChart;
  }
}

export default new AnalyticsService();
