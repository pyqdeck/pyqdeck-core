import mongoose from 'mongoose';
import { Syllabus, syllabusZodSchema } from '../models/Syllabus.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';

class SyllabusRepository {
  async create(data) {
    try {
      const syllabus = new Syllabus(data);
      await syllabus.save();
      return syllabus;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError(
          'Syllabus already exists for this subject offering'
        );
      }
      throw error;
    }
  }

  async findById(id) {
    const syllabus = await Syllabus.findById(id);
    if (!syllabus) throw new NotFoundError('Syllabus not found');
    return syllabus;
  }

  async findBySubjectOffering(subjectOfferingId) {
    const syllabus = await Syllabus.findOne({ subjectOfferingId });
    if (!syllabus) throw new NotFoundError('Syllabus not found');
    return syllabus;
  }

  async existsForSubjectOffering(subjectOfferingId) {
    const syllabus = await Syllabus.exists({ subjectOfferingId });
    return !!syllabus;
  }

  async findBySubjectOfferingOrNull(subjectOfferingId) {
    return Syllabus.findOne({ subjectOfferingId });
  }

  async update(id, data) {
    // Sanitize data using the Zod schema to prevent NoSQL injection
    // and ensure only allowed fields are updated.
    const sanitizedData = syllabusZodSchema.partial().parse(data);

    const syllabus = await Syllabus.findByIdAndUpdate(
      id,
      { $set: sanitizedData },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );
    if (!syllabus) throw new NotFoundError('Syllabus not found');
    return syllabus;
  }

  async delete(id) {
    const syllabus = await Syllabus.findByIdAndDelete(id);
    if (!syllabus) throw new NotFoundError('Syllabus not found');
    return syllabus;
  }

  async getHierarchy(subjectOfferingId) {
    const results = await Syllabus.aggregate([
      {
        $match: {
          subjectOfferingId: new mongoose.Types.ObjectId(subjectOfferingId),
        },
      },
      {
        $lookup: {
          from: 'modules',
          localField: '_id',
          foreignField: 'syllabusId',
          as: 'modules',
        },
      },
      { $unwind: { path: '$modules', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'topics',
          localField: 'modules._id',
          foreignField: 'moduleId',
          as: 'modules.topics',
        },
      },
      // Transform topic _id to id
      {
        $addFields: {
          'modules.topics': {
            $map: {
              input: '$modules.topics',
              as: 'topic',
              in: {
                $mergeObjects: [
                  '$$topic',
                  { id: { $toString: '$$topic._id' } },
                ],
              },
            },
          },
        },
      },
      // Transform module _id to id
      {
        $addFields: {
          'modules.id': { $toString: '$modules._id' },
        },
      },
      {
        $group: {
          _id: '$_id',
          subjectOfferingId: { $first: '$subjectOfferingId' },
          description: { $first: '$description' },
          modules: { $push: '$modules' },
        },
      },
      // Transform syllabus _id to id and clean up empty modules
      {
        $project: {
          id: { $toString: '$_id' },
          subjectOfferingId: 1,
          description: 1,
          modules: {
            $filter: {
              input: '$modules',
              as: 'mod',
              cond: { $gt: [{ $type: '$$mod._id' }, 'missing'] },
            },
          },
        },
      },
    ]);

    if (!results.length) throw new NotFoundError('Syllabus not found');
    return results[0];
  }
}

export const syllabusRepository = new SyllabusRepository();
export default syllabusRepository;
