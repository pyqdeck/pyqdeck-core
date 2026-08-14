import mongoose from 'mongoose';
import { Branch, branchZodSchema } from '../models/Branch.js';
import { University } from '../models/University.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class BranchRepository {
  async create(data) {
    try {
      const branch = new Branch(data);
      await branch.save();
      return branch;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError(
          'Branch with this slug already exists for this university'
        );
      }
      throw error;
    }
  }

  async createMany(data) {
    if (!Array.isArray(data)) {
      throw new Error('Data must be an array for bulk operations');
    }
    try {
      const results = await Branch.insertMany(data, {
        ordered: false,
        rawResult: true,
      });
      return {
        inserted: results.insertedDocs || [],
        failed: [],
        summary: {
          total: data.length,
          success: results.insertedCount || 0,
          failed: 0,
        },
      };
    } catch (error) {
      if (error.name === 'MongoBulkWriteError') {
        const inserted = error.insertedDocs || [];
        const writeErrors = error.writeErrors || [];

        return {
          inserted,
          failed: writeErrors.map((err) => ({
            index: err.index,
            message: err.errmsg,
            data: data[err.index],
          })),
          summary: {
            total: data.length,
            success: inserted.length,
            failed: writeErrors.length,
          },
        };
      }
      throw error;
    }
  }

  async findById(id) {
    const branch = await Branch.findById(id);
    if (!branch) throw new NotFoundError('Branch not found');
    return branch;
  }

  async findBySlug(universityId, slug) {
    const branch = await Branch.findOne({
      universityId: String(universityId),
      $or: [{ slug: String(slug) }, { redirectSlugs: String(slug) }],
    });
    if (!branch) throw new NotFoundError('Branch not found');
    return branch;
  }

  async findByUniversityId(universityId, pagination, filter = {}) {
    return paginate(
      Branch,
      { universityId: String(universityId), ...filter },
      pagination
    );
  }

  async countByUniversityId(universityId) {
    return Branch.countDocuments({ universityId: String(universityId) });
  }

  async findAll(filter = {}, pagination) {
    // We don't use the paginate util here because we want population
    const { page, limit, skip } = pagination;
    const [items, total] = await Promise.all([
      Branch.find(filter)
        .populate('universityId', 'name shortName')
        .skip(skip)
        .limit(limit)
        .sort({ name: 1 }),
      Branch.countDocuments(filter),
    ]);
    return { items, total, page, limit };
  }

  async update(id, data) {
    // Sanitize data using the Zod schema to prevent NoSQL injection
    // and ensure only allowed fields are updated.
    const sanitizedData = branchZodSchema.partial().parse(data);

    const branch = await Branch.findByIdAndUpdate(
      id,
      { $set: sanitizedData },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );
    if (!branch) throw new NotFoundError('Branch not found');
    return branch;
  }

  async delete(id) {
    const branch = await Branch.findByIdAndDelete(id);
    if (!branch) throw new NotFoundError('Branch not found');
    return branch;
  }

  async getStructure(branchId) {
    const results = await Branch.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(branchId) } },
      {
        $lookup: {
          from: 'semesters',
          localField: '_id',
          foreignField: 'branchId',
          as: 'semesters',
        },
      },
      { $unwind: { path: '$semesters', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'subjectofferings',
          localField: 'semesters._id',
          foreignField: 'semesterId',
          as: 'semesters.subjects',
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          shortName: { $first: '$shortName' },
          universityId: { $first: '$universityId' },
          semesters: { $push: '$semesters' },
        },
      },
      { $sort: { 'semesters.number': 1 } },
    ]);

    if (!results.length) throw new NotFoundError('Branch not found');
    return results[0];
  }
}

export const branchRepository = new BranchRepository();
export default branchRepository;
