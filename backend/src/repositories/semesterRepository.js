import { Semester, semesterZodSchema } from '../models/Semester.js';
import { Branch } from '../models/Branch.js';
import { University } from '../models/University.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';

class SemesterRepository {
  async create(data) {
    try {
      const semester = new Semester(data);
      await semester.save();
      return semester;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError(
          'Semester with this number or slug already exists for this branch'
        );
      }
      throw error;
    }
  }

  async findById(id) {
    const semester = await Semester.findById(id);
    if (!semester) throw new NotFoundError('Semester not found');
    return semester;
  }

  async findByBranchId(branchId) {
    return Semester.find({ branchId: String(branchId) })
      .populate({
        path: 'branchId',
        populate: { path: 'universityId', select: 'name shortName slug' },
      })
      .sort({ number: 1 });
  }

  async countByBranchId(branchId) {
    return Semester.countDocuments({ branchId: String(branchId) });
  }

  async findAll(query = {}, pagination = { skip: 0, limit: 10 }) {
    const filters = {};
    if (query.branchId) filters.branchId = String(query.branchId);

    const items = await Semester.find(filters)
      .populate({
        path: 'branchId',
        populate: { path: 'universityId', select: 'name shortName slug' },
      })
      .sort({ branchId: 1, number: 1 })
      .skip(pagination.skip)
      .limit(pagination.limit);

    const total = await Semester.countDocuments(filters);

    return { items, total };
  }

  async findByBranchAndNumber(branchId, number) {
    const semester = await Semester.findOne({
      branchId: String(branchId),
      number: Number(number),
    });
    if (!semester) throw new NotFoundError('Semester not found');
    return semester;
  }

  async findByBranchAndSlug(branchId, slug) {
    const semester = await Semester.findOne({
      branchId: String(branchId),
      slug: String(slug),
    });
    if (!semester) throw new NotFoundError('Semester not found');
    return semester;
  }

  async update(id, data) {
    // Sanitize data using the Zod schema to prevent NoSQL injection
    // and ensure only allowed fields are updated.
    const sanitizedData = semesterZodSchema.partial().parse(data);

    const semester = await Semester.findByIdAndUpdate(
      id,
      { $set: sanitizedData },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );
    if (!semester) throw new NotFoundError('Semester not found');
    return semester;
  }

  async delete(id) {
    const semester = await Semester.findByIdAndDelete(id);
    if (!semester) throw new NotFoundError('Semester not found');
    return semester;
  }
}

export const semesterRepository = new SemesterRepository();
export default semesterRepository;
