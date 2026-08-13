import mongoose from 'mongoose';
import { User, userZodSchema } from '../models/User.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';

class UserRepository {
  async create(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError(
          'User with this email or Clerk ID already exists'
        );
      }
      throw error;
    }
  }

  async findById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async findByClerkId(clerkId) {
    const user = await User.findOne({ clerkId: String(clerkId) });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({ email: String(email) });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async update(clerkId, updateData) {
    // Sanitize data using the Zod schema to prevent NoSQL injection
    // and ensure only allowed fields are updated.
    const sanitizedData = userZodSchema.partial().parse(updateData);

    const user = await User.findOneAndUpdate(
      { clerkId: String(clerkId) },
      { $set: sanitizedData },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async upsertByClerkOrEmail(clerkId, userData) {
    // Use findOneAndUpdate with upsert to handle race conditions atomically
    return User.findOneAndUpdate(
      { $or: [{ clerkId: String(clerkId) }, { email: userData.email }] },
      { $set: userData },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );
  }

  async existsByEmail(email) {
    const count = await User.countDocuments({ email });
    return count > 0;
  }

  async existsByClerkId(clerkId) {
    const count = await User.countDocuments({ clerkId });
    return count > 0;
  }

  async getStats(userId) {
    const results = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'bookmarks',
          localField: '_id',
          foreignField: 'userId',
          as: 'bookmarks',
        },
      },
      {
        $project: {
          bookmarksCount: { $size: '$bookmarks' },
        },
      },
    ]);

    return results[0] || { bookmarksCount: 0 };
  }

  async getStatsByClerkId(clerkId) {
    const results = await User.aggregate([
      { $match: { clerkId: String(clerkId) } },
      {
        $lookup: {
          from: 'bookmarks',
          localField: '_id',
          foreignField: 'userId',
          as: 'bookmarks',
        },
      },
      {
        $project: {
          bookmarksCount: { $size: '$bookmarks' },
        },
      },
    ]);

    return results[0] || { bookmarksCount: 0 };
  }

  async list(filter = {}, pagination = { page: 1, limit: 10 }) {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const allowedSortFields = ['name', 'email', 'role', 'createdAt'];
    const sortBy = allowedSortFields.includes(filter.sortBy)
      ? filter.sortBy
      : 'createdAt';
    const sortOrder = filter.sortOrder === 'asc' ? 1 : -1;

    const query = {};
    if (filter.role) query.role = filter.role;
    if (filter.isActive === 'true') query.isActive = true;
    else if (filter.isActive === 'false') query.isActive = false;
    if (filter.search) {
      query.$or = [
        { name: { $regex: filter.search, $options: 'i' } },
        { email: { $regex: filter.search, $options: 'i' } },
      ];
    }

    const [items, total] = await Promise.all([
      User.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(query),
    ]);

    return {
      items,
      total,
      page,
      limit,
    };
  }
}

export const userRepository = new UserRepository();
export default userRepository;
