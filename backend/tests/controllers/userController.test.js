import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as userController from '../../src/controllers/userController.js';
import userService from '../../src/services/userService.js';
import { ForbiddenError } from '../../src/utils/errors/index.js';

vi.mock('../../src/services/userService.js', () => ({
  default: {
    listUsers: vi.fn(),
    getUserByClerkId: vi.fn(),
    updateUser: vi.fn(),
    getUserStats: vi.fn(),
  },
}));

vi.mock('@clerk/express', () => ({
  getAuth: vi.fn(() => ({ userId: 'requester_1' })),
}));

describe('userController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      dbUser: { _id: 'user_1', clerkId: 'user_1', name: 'Test' },
      query: {},
      params: {},
      body: {},
    };
    res = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  describe('getMe', () => {
    it('should return user info and stats', async () => {
      userService.getUserStats.mockResolvedValue({
        bookmarksCount: 5,
      });

      await userController.getMe(req, res, next);

      expect(userService.getUserStats).toHaveBeenCalledWith('user_1');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User profile fetched',
          data: {
            user: req.dbUser,
            stats: {
              bookmarksCount: 5,
            },
          },
        })
      );
    });

    it('should return 401 if dbUser is missing', async () => {
      req.dbUser = null;
      await userController.getMe(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
    });
  });

  describe('listUsers', () => {
    it('should return paginated users with isMe flag', async () => {
      const users = [
        { clerkId: 'user_1', name: 'User 1' },
        { clerkId: 'requester_1', name: 'Me' },
      ];
      userService.listUsers.mockResolvedValue({
        items: users,
        total: 2,
        page: 1,
        limit: 10,
      });

      await userController.listUsers(req, res, next);

      expect(userService.listUsers).toHaveBeenCalled();
      const response = res.json.mock.calls[0][0];
      expect(response.data.items[1].isMe).toBe(true);
      expect(response.data.items[0].isMe).toBe(false);
    });
  });

  describe('getUserById', () => {
    it('should return user and stats', async () => {
      req.params.clerkId = 'target_user';
      userService.getUserByClerkId.mockResolvedValue({
        user: { clerkId: 'target_user' },
        stats: { bookmarksCount: 0 },
      });

      await userController.getUserById(req, res, next);

      expect(userService.getUserByClerkId).toHaveBeenCalledWith('target_user');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'User fetched successfully' })
      );
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      req.params.clerkId = 'target_user';
      req.body = { role: 'admin' };
      userService.updateUser.mockResolvedValue({
        clerkId: 'target_user',
        role: 'admin',
      });

      await userController.updateUser(req, res, next);

      expect(userService.updateUser).toHaveBeenCalledWith('target_user', {
        role: 'admin',
        isActive: undefined,
      });
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'User updated successfully' })
      );
    });

    it('should call next with ForbiddenError when self-demoting', async () => {
      req.params.clerkId = 'requester_1';
      req.body = { role: 'normal' };

      await userController.updateUser(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
    });
  });
});
