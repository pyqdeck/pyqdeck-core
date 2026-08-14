import analyticsRepository from '../repositories/analyticsRepository.js';

class AnalyticsService {
  /**
   * Aggregate and format all data required for the Studio Overview
   * dashboard. Admins see platform-wide business metrics (total users,
   * global content counts); everyone else sees a personalized view of
   * their own contributions instead -- an editor has no business reason
   * to see total registered users, and "total papers on the platform"
   * isn't actionable to them the way "papers I've added" is.
   */
  async getStudioOverviewData(dbUser) {
    if (dbUser?.role !== 'admin') {
      return this._getPersonalOverviewData(dbUser);
    }

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
      scope: 'global',
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
   * @private
   */
  async _getPersonalOverviewData(dbUser) {
    if (!dbUser) {
      return {
        scope: 'personal',
        metrics: {
          papers: { total: 0, approved: 0, pending: 0 },
          questions: { total: 0 },
        },
      };
    }

    const [papersTotal, papersApproved, papersPending, questionsTotal] =
      await analyticsRepository.getPersonalCounts(dbUser._id);

    return {
      scope: 'personal',
      metrics: {
        papers: {
          total: papersTotal,
          approved: papersApproved,
          pending: papersPending,
        },
        questions: { total: questionsTotal },
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
