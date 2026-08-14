import mongoose from 'mongoose';
import { Question, questionUpdateZodSchema } from '../models/Question.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class QuestionRepository {
  async create(data) {
    try {
      const question = new Question(data);
      await question.save();
      return question;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError('Question with this slug already exists');
      }
      throw error;
    }
  }

  async findById(id) {
    const question = await Question.findById(id);
    if (!question) throw new NotFoundError('Question not found');
    return question;
  }

  async findBySlug(slug) {
    const question = await Question.findOne({ slug: String(slug) });
    if (!question) throw new NotFoundError('Question not found');
    return question;
  }

  async findAll(filter = {}, pagination) {
    return paginate(Question, filter, pagination);
  }

  async findByTags(tagIds, pagination, extraFilter = {}) {
    return paginate(
      Question,
      {
        tags: { $in: Array.isArray(tagIds) ? tagIds.map(String) : [] },
        ...extraFilter,
      },
      pagination
    );
  }

  async update(id, data) {
    // Sanitize data using the Zod schema to prevent NoSQL injection
    // and ensure only allowed fields are updated.
    const sanitizedData = questionUpdateZodSchema.parse(data);

    const question = await Question.findByIdAndUpdate(
      id,
      { $set: sanitizedData },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );
    if (!question) throw new NotFoundError('Question not found');
    return question;
  }

  async delete(id) {
    const question = await Question.findByIdAndDelete(id);
    if (!question) throw new NotFoundError('Question not found');
    return question;
  }

  async findWithContext(filter = {}, pagination = {}) {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const matchFilter = { ...filter };
    if (matchFilter._id && mongoose.Types.ObjectId.isValid(matchFilter._id)) {
      matchFilter._id = new mongoose.Types.ObjectId(matchFilter._id);
    }

    const pipeline = [
      { $match: matchFilter },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      // Join Paper info
      {
        $lookup: {
          from: 'questionpapermaps',
          localField: '_id',
          foreignField: 'questionId',
          as: 'paperMappings',
        },
      },
      {
        $lookup: {
          from: 'paper',
          localField: 'paperMappings.paperId',
          foreignField: '_id',
          as: 'paperContext',
        },
      },
      // Join Topic info
      {
        $lookup: {
          from: 'questionsyllabusmaps',
          localField: '_id',
          foreignField: 'questionId',
          as: 'syllabusMappings',
        },
      },
      {
        $lookup: {
          from: 'topics',
          localField: 'syllabusMappings.topicId',
          foreignField: '_id',
          as: 'topics',
        },
      },
      // Cleanup
      {
        $project: {
          text: 1,
          type: 1,
          difficulty: 1,
          marks: 1,
          createdAt: 1,
          slug: 1,
          paperContext: {
            $map: {
              input: '$paperContext',
              as: 'p',
              in: {
                title: '$$p.title',
                year: '$$p.examYear',
                exam: '$$p.exam',
              },
            },
          },
          topicContext: {
            $map: {
              input: '$topics',
              as: 't',
              in: {
                name: '$$t.title',
              },
            },
          },
        },
      },
    ];

    const [items, total] = await Promise.all([
      Question.aggregate(pipeline),
      Question.countDocuments(filter),
    ]);

    return { items, total, page, limit };
  }
}

export const questionRepository = new QuestionRepository();
export default questionRepository;
