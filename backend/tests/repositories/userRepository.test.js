import { describe, it, expect, beforeEach } from 'vitest';
import { userRepository } from '../../src/repositories/userRepository.js';
import { User } from '../../src/models/User.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('UserRepository', () => {
  const userData = {
    clerkId: 'user_123',
    name: 'Test User',
    email: 'test@example.com',
  };

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const user = await userRepository.create(userData);
      expect(user.clerkId).toBe(userData.clerkId);
      expect(user.email).toBe(userData.email);
      expect(user.id).toBeDefined();
    });

    it('should throw ConflictError if user with same email exists', async () => {
      await userRepository.create(userData);
      await expect(
        userRepository.create({
          ...userData,
          clerkId: 'user_456',
        })
      ).rejects.toThrow(ConflictError);
    });

    it('should throw ConflictError if user with same clerkId exists', async () => {
      await userRepository.create(userData);
      await expect(
        userRepository.create({
          ...userData,
          email: 'other@example.com',
        })
      ).rejects.toThrow(ConflictError);
    });
  });

  describe('findById', () => {
    it('should find a user by id', async () => {
      const createdUser = await userRepository.create(userData);
      const user = await userRepository.findById(createdUser.id);
      expect(user.id).toBe(createdUser.id);
      expect(user.name).toBe(userData.name);
    });

    it('should throw NotFoundError if user does not exist', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      await expect(userRepository.findById(nonExistentId)).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('findByClerkId', () => {
    it('should find a user by clerkId', async () => {
      await userRepository.create(userData);
      const user = await userRepository.findByClerkId(userData.clerkId);
      expect(user.clerkId).toBe(userData.clerkId);
    });

    it('should throw NotFoundError if user with clerkId does not exist', async () => {
      await expect(
        userRepository.findByClerkId('non_existent')
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      await userRepository.create(userData);
      const user = await userRepository.findByEmail(userData.email);
      expect(user.email).toBe(userData.email);
    });

    it('should throw NotFoundError if user with email does not exist', async () => {
      await expect(
        userRepository.findByEmail('non_existent@example.com')
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      await userRepository.create(userData);
      const updateData = { name: 'Updated Name' };
      const user = await userRepository.update(userData.clerkId, updateData);
      expect(user.name).toBe(updateData.name);
    });

    it('should throw NotFoundError when updating non-existent user', async () => {
      await expect(
        userRepository.update('non_existent', { name: 'New' })
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('getStats and getStatsByClerkId', () => {
    it('should return default stats if no data exists', async () => {
      const stats = await userRepository.getStats('507f1f77bcf86cd799439011');
      expect(stats).toEqual({ bookmarksCount: 0 });
    });

    it('should return stats for a user', async () => {
      const user = await userRepository.create(userData);
      // Since we don't have bookmarks created in this test, it will return 0
      // but it verifies the aggregation pipeline runs without error
      const stats = await userRepository.getStats(user._id);
      expect(stats).toHaveProperty('bookmarksCount');
    });

    it('should return stats by clerkId', async () => {
      await userRepository.create(userData);
      const stats = await userRepository.getStatsByClerkId(userData.clerkId);
      expect(stats).toHaveProperty('bookmarksCount');
    });
  });

  describe('list', () => {
    beforeEach(async () => {
      await User.create([
        {
          clerkId: 'u1',
          name: 'Alice',
          email: 'alice@example.com',
          role: 'admin',
        },
        {
          clerkId: 'u2',
          name: 'Bob',
          email: 'bob@example.com',
          role: 'normal',
        },
        {
          clerkId: 'u3',
          name: 'Charlie',
          email: 'charlie@example.com',
          role: 'normal',
        },
      ]);
    });

    it('should list users with default pagination', async () => {
      const result = await userRepository.list();
      expect(result.items).toHaveLength(3);
      expect(result.total).toBe(3);
      expect(result.page).toBe(1);
    });

    it('should filter by role', async () => {
      const result = await userRepository.list({ role: 'admin' });
      expect(result.items).toHaveLength(1);
      expect(result.items[0].name).toBe('Alice');
    });

    it('should search by name', async () => {
      const result = await userRepository.list({ search: 'Bob' });
      expect(result.items).toHaveLength(1);
      expect(result.items[0].name).toBe('Bob');
    });

    it('should sort users', async () => {
      const result = await userRepository.list({
        sortBy: 'name',
        sortOrder: 'asc',
      });
      expect(result.items[0].name).toBe('Alice');
      expect(result.items[1].name).toBe('Bob');
      expect(result.items[2].name).toBe('Charlie');
    });
  });
});
