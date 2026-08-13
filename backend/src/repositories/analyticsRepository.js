import { User } from '../models/User.js';
import { Paper } from '../models/Paper.js';
import { Question } from '../models/Question.js';
import { University } from '../models/University.js';
import { Branch } from '../models/Branch.js';
import { SubjectOffering } from '../models/SubjectOffering.js';
import { Subject } from '../models/Subject.js';

class AnalyticsRepository {
  /**
   * Get basic entity counts
   */
  async getGlobalCounts() {
    return Promise.all([
      User.countDocuments(),
      Paper.countDocuments(),
      Paper.countDocuments({ status: 'pending' }),
      Question.countDocuments(),
      University.countDocuments(),
      Branch.countDocuments(),
    ]);
  }

  /**
   * Get recently uploaded papers awaiting review
   * @param {number} limit
   */
  async getRecentPendingPapers(limit = 5) {
    return Paper.find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('subjectOfferingId', 'slug')
      .lean();
  }

  /**
   * Aggregate paper uploads by day over the last N days
   * @param {Date} startDate
   */
  async getPaperUploadsByDay(startDate) {
    return Paper.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  }

  /**
   * Calculate subject popularity by grouping papers by their subject offerings
   */
  async getSubjectPopularity() {
    return Paper.aggregate([
      {
        $group: {
          _id: '$subjectOfferingId',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'subjectofferings',
          localField: '_id',
          foreignField: '_id',
          as: 'offering',
        },
      },
      { $unwind: '$offering' },
      {
        $lookup: {
          from: 'subjects',
          localField: 'offering.subjectId',
          foreignField: '_id',
          as: 'subject',
        },
      },
      { $unwind: '$subject' },
      {
        $group: {
          _id: '$subject.name',
          count: { $sum: '$count' },
        },
      },
      {
        $project: {
          subject: '$_id',
          count: 1,
          _id: 0,
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
  }
}

export default new AnalyticsRepository();
