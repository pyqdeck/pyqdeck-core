import { describe, it, expect, beforeEach, vi } from 'vitest';
import { userService } from '../../src/services/userService.js';
import userRepository from '../../src/repositories/userRepository.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

vi.mock('../../src/repositories/userRepository.js', () => ({
  userRepository: {
    existsByClerkId: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    list: vi.fn(),
    findByClerkId: vi.fn(),
    getStatsByClerkId: vi.fn(),
    upsertByClerkOrEmail: vi.fn(),
  },
  default: {
    existsByClerkId: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    list: vi.fn(),
    findByClerkId: vi.fn(),
    getStatsByClerkId: vi.fn(),
    upsertByClerkOrEmail: vi.fn(),
  },
}));

describe('UserService', () => {
  const clerkData = {
    id: 'clerk_123',
    first_name: 'John',
    last_name: 'Doe',
    email_addresses: [{ id: 'email_1', email_address: 'john@example.com' }],
    primary_email_address_id: 'email_1',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleUserCreated', () => {
    it('should create a new user if they do not exist', async () => {
      userRepository.existsByClerkId.mockResolvedValue(false);
      userRepository.create.mockResolvedValue({ id: 'db_1' });

      await userService.handleUserCreated(clerkData);

      expect(userRepository.create).toHaveBeenCalledWith({
        clerkId: 'clerk_123',
        name: 'John Doe',
        email: 'john@example.com',
        avatarUrl: null,
      });
    });

    it('should skip creation if user already exists', async () => {
      userRepository.existsByClerkId.mockResolvedValue(true);

      await userService.handleUserCreated(clerkData);

      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('handleUserUpdated', () => {
    it('should update existing user', async () => {
      userRepository.update.mockResolvedValue({ id: 'db_1' });

      await userService.handleUserUpdated(clerkData);

      expect(userRepository.update).toHaveBeenCalledWith('clerk_123', {
        name: 'John Doe',
        email: 'john@example.com',
        avatarUrl: null,
      });
    });

    it('should catch NotFoundError and skip update', async () => {
      userRepository.update.mockRejectedValue(new NotFoundError());

      await expect(
        userService.handleUserUpdated(clerkData)
      ).resolves.not.toThrow();
    });
  });

  describe('handleUserDeleted', () => {
    it('should deactivate user', async () => {
      userRepository.update.mockResolvedValue({ id: 'db_1' });

      await userService.handleUserDeleted({ id: 'clerk_123' });

      expect(userRepository.update).toHaveBeenCalledWith('clerk_123', {
        isActive: false,
      });
    });

    it('should catch NotFoundError and skip delete', async () => {
      userRepository.update.mockRejectedValue(new NotFoundError());

      await expect(
        userService.handleUserDeleted({ id: 'clerk_123' })
      ).resolves.not.toThrow();
    });

    it('should re-throw other errors in handleUserDeleted', async () => {
      userRepository.update.mockRejectedValue(new Error('Other error'));
      await expect(
        userService.handleUserDeleted({ id: 'clerk_123' })
      ).rejects.toThrow('Other error');
    });

    it('should re-throw other errors in handleUserUpdated', async () => {
      userRepository.update.mockRejectedValue(new Error('Other update error'));
      await expect(userService.handleUserUpdated(clerkData)).rejects.toThrow(
        'Other update error'
      );
    });
  });

  describe('listUsers', () => {
    it('should call userRepository.list', async () => {
      const filter = { role: 'admin' };
      const pagination = { page: 1, limit: 5 };
      userRepository.list.mockResolvedValue({ items: [], total: 0 });

      await userService.listUsers(filter, pagination);

      expect(userRepository.list).toHaveBeenCalledWith(filter, pagination);
    });
  });

  describe('getUserByClerkId', () => {
    it('should return user and stats', async () => {
      const clerkId = 'user_1';
      const user = { id: 'db_1', clerkId };
      const stats = { bookmarksCount: 1 };

      userRepository.findByClerkId.mockResolvedValue(user);
      userRepository.getStatsByClerkId.mockResolvedValue(stats);

      const result = await userService.getUserByClerkId(clerkId);

      expect(result).toEqual({ user, stats });
      expect(userRepository.findByClerkId).toHaveBeenCalledWith(clerkId);
      expect(userRepository.getStatsByClerkId).toHaveBeenCalledWith(clerkId);
    });
  });

  describe('updateUser', () => {
    it('should call userRepository.update', async () => {
      const clerkId = 'user_1';
      const data = { role: 'admin' };
      userRepository.update.mockResolvedValue({ ...data, clerkId });

      await userService.updateUser(clerkId, data);

      expect(userRepository.update).toHaveBeenCalledWith(clerkId, data);
    });
  });
});
