import {
  SubjectOffering,
  subjectOfferingZodSchema,
} from '../models/SubjectOffering.js';
import { University } from '../models/University.js';
import { Branch } from '../models/Branch.js';
import { Semester } from '../models/Semester.js';
import { Subject } from '../models/Subject.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class SubjectOfferingRepository {
  async create(data) {
    try {
      const offering = new SubjectOffering(data);
      await offering.save();
      return offering;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError(
          'Subject offering with this combination already exists'
        );
      }
      throw error;
    }
  }

  async findById(id) {
    const offering = await SubjectOffering.findById(id);
    if (!offering) throw new NotFoundError('Subject offering not found');
    return offering;
  }

  async findBySlug(slug) {
    const offering = await SubjectOffering.findOne({ slug: String(slug) });
    if (!offering) throw new NotFoundError('Subject offering not found');
    return offering;
  }

  async findBySemesterId(semesterId, pagination, filter = {}) {
    const result = await paginate(
      SubjectOffering,
      { semesterId: String(semesterId), ...filter },
      pagination
    );

    result.items = await SubjectOffering.populate(result.items, [
      { path: 'universityId', select: 'name shortName' },
      { path: 'branchId', select: 'name shortName universityId' },
      { path: 'semesterId', select: 'number' },
      { path: 'subjectId', select: 'name subjectCode slug' },
    ]);

    return result;
  }

  async countBySemesterId(semesterId) {
    return SubjectOffering.countDocuments({ semesterId: String(semesterId) });
  }

  /**
   * Resolves the set of offering ids reachable from a mix of
   * university/branch/semester/subjectOffering scope ids -- used to turn a
   * moderator's permission grants into a concrete visibility filter.
   */
  async findIdsByScope({
    universityIds = [],
    branchIds = [],
    semesterIds = [],
    subjectOfferingIds = [],
  }) {
    const or = [];
    if (universityIds.length) or.push({ universityId: { $in: universityIds } });
    if (branchIds.length) or.push({ branchId: { $in: branchIds } });
    if (semesterIds.length) or.push({ semesterId: { $in: semesterIds } });
    if (subjectOfferingIds.length)
      or.push({ _id: { $in: subjectOfferingIds } });
    if (!or.length) return [];

    const docs = await SubjectOffering.find({ $or: or }).select('_id').lean();
    return docs.map((doc) => String(doc._id));
  }

  async findByUniversityBranchSemester(
    universityId,
    branchId,
    semesterId,
    pagination,
    filter = {}
  ) {
    const query = { ...filter };
    if (universityId) query.universityId = String(universityId);
    if (branchId) query.branchId = String(branchId);
    if (semesterId) query.semesterId = String(semesterId);

    const result = await paginate(SubjectOffering, query, pagination);

    // Populate relations to show names and metadata in the UI
    result.items = await SubjectOffering.populate(result.items, [
      { path: 'universityId', select: 'name shortName' },
      { path: 'branchId', select: 'name shortName universityId' },
      { path: 'semesterId', select: 'number' },
      { path: 'subjectId', select: 'name subjectCode slug' },
    ]);

    return result;
  }

  async update(id, data) {
    // Sanitize data using the Zod schema to prevent NoSQL injection
    // and ensure only allowed fields are updated.
    const sanitizedData = subjectOfferingZodSchema.partial().parse(data);

    const offering = await SubjectOffering.findByIdAndUpdate(
      id,
      { $set: sanitizedData },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );
    if (!offering) throw new NotFoundError('Subject offering not found');
    return offering;
  }

  async delete(id) {
    const offering = await SubjectOffering.findByIdAndDelete(id);
    if (!offering) throw new NotFoundError('Subject offering not found');
    return offering;
  }
}

export const subjectOfferingRepository = new SubjectOfferingRepository();
export default subjectOfferingRepository;
