import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as paperController from '../../src/controllers/paperController.js';
import paperService from '../../src/services/paperService.js';
import permissionGrantService from '../../src/services/permissionGrantService.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

vi.mock('../../src/services/paperService.js', () => ({
  default: {
    list: vi.fn(),
    getBySlug: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updateStatus: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('../../src/services/permissionGrantService.js', () => ({
  default: {
    resolveModeratorOfferingIds: vi.fn(),
  },
}));

describe('paperController', () => {
  let req, res, next;

  const samplePaper = {
    _id: 'paper_1',
    title: 'CS 2023 End Sem',
    slug: 'cs-2023-end-sem',
    examYear: 2023,
    status: 'approved',
  };

  beforeEach(() => {
    req = {
      query: {},
      params: {},
      body: {},
      dbUser: null,
      pagination: { page: 1, limit: 10 },
    };
    res = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
    vi.clearAllMocks();
    // Default: no moderate grants at all, matching pre-existing "normal
    // role sees only approved" behavior in the tests below.
    permissionGrantService.resolveModeratorOfferingIds.mockResolvedValue([]);
  });

  // ─── list ────────────────────────────────────────────────────────────────────

  describe('list', () => {
    it('should set status:approved for non-admin users', async () => {
      req.dbUser = { role: 'normal' };
      paperService.list.mockResolvedValue({
        items: [samplePaper],
        total: 1,
        page: 1,
        limit: 10,
      });

      await paperController.list(req, res, next);

      expect(paperService.list).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'approved' }),
        req.pagination
      );
    });

    it('should NOT set status filter for admin users', async () => {
      req.dbUser = { role: 'admin' };
      paperService.list.mockResolvedValue({
        items: [samplePaper],
        total: 1,
        page: 1,
        limit: 10,
      });

      await paperController.list(req, res, next);

      const callArg = paperService.list.mock.calls[0][0];
      expect(callArg).not.toHaveProperty('status');
    });

    it('should apply examYear filter from query', async () => {
      req.dbUser = { role: 'admin' };
      req.query.examYear = '2023';
      paperService.list.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 10,
      });

      await paperController.list(req, res, next);

      expect(paperService.list).toHaveBeenCalledWith(
        expect.objectContaining({ examYear: 2023 }),
        req.pagination
      );
    });

    it('should apply examType filter from query', async () => {
      req.dbUser = { role: 'admin' };
      req.query.examType = 'endSem';
      paperService.list.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 10,
      });

      await paperController.list(req, res, next);

      expect(paperService.list).toHaveBeenCalledWith(
        expect.objectContaining({ examType: 'endSem' }),
        req.pagination
      );
    });

    it('should apply subjectOfferingId filter from query', async () => {
      req.dbUser = { role: 'admin' };
      req.query.subjectOfferingId = 'so_123';
      paperService.list.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 10,
      });

      await paperController.list(req, res, next);

      expect(paperService.list).toHaveBeenCalledWith(
        expect.objectContaining({ subjectOfferingId: 'so_123' }),
        req.pagination
      );
    });

    it('should handle unauthenticated user (null dbUser)', async () => {
      req.dbUser = null;
      paperService.list.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 10,
      });

      await paperController.list(req, res, next);

      expect(paperService.list).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'approved' }),
        req.pagination
      );
    });

    it('should call next on error', async () => {
      paperService.list.mockRejectedValue(new Error('DB error'));
      await paperController.list(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    describe('scoped content:moderate grants', () => {
      beforeEach(() => {
        req.dbUser = { _id: 'mod_1', role: 'normal' };
        paperService.list.mockResolvedValue({
          items: [],
          total: 0,
          page: 1,
          limit: 10,
        });
      });

      it('sees all statuses, unrestricted, when the grant is global', async () => {
        permissionGrantService.resolveModeratorOfferingIds.mockResolvedValue(
          null
        );

        await paperController.list(req, res, next);

        const callArg = paperService.list.mock.calls[0][0];
        expect(callArg).not.toHaveProperty('status');
        expect(callArg).not.toHaveProperty('subjectOfferingId');
      });

      it('restricts to the granted offerings when the grant is scoped', async () => {
        permissionGrantService.resolveModeratorOfferingIds.mockResolvedValue([
          'off_1',
          'off_2',
        ]);

        await paperController.list(req, res, next);

        expect(paperService.list).toHaveBeenCalledWith(
          expect.objectContaining({
            subjectOfferingId: { $in: ['off_1', 'off_2'] },
          }),
          req.pagination
        );
      });

      it('narrows to nothing when an explicit subjectOfferingId filter falls outside the granted scope', async () => {
        permissionGrantService.resolveModeratorOfferingIds.mockResolvedValue([
          'off_1',
        ]);
        req.query.subjectOfferingId = 'off_outside_scope';

        await paperController.list(req, res, next);

        expect(paperService.list).toHaveBeenCalledWith(
          expect.objectContaining({
            subjectOfferingId: { $in: [] },
          }),
          req.pagination
        );
      });

      it('keeps an explicit subjectOfferingId filter that falls inside the granted scope', async () => {
        permissionGrantService.resolveModeratorOfferingIds.mockResolvedValue([
          'off_1',
        ]);
        req.query.subjectOfferingId = 'off_1';

        await paperController.list(req, res, next);

        expect(paperService.list).toHaveBeenCalledWith(
          expect.objectContaining({ subjectOfferingId: 'off_1' }),
          req.pagination
        );
      });

      it('falls back to the public approved-only view when there are no moderate grants', async () => {
        permissionGrantService.resolveModeratorOfferingIds.mockResolvedValue(
          []
        );

        await paperController.list(req, res, next);

        expect(paperService.list).toHaveBeenCalledWith(
          expect.objectContaining({ status: 'approved' }),
          req.pagination
        );
      });
    });
  });

  // ─── getBySlug ───────────────────────────────────────────────────────────────

  describe('getBySlug', () => {
    it('should return paper by slug', async () => {
      req.params.slug = 'cs-2023-end-sem';
      paperService.getBySlug.mockResolvedValue(samplePaper);

      await paperController.getBySlug(req, res, next);

      expect(paperService.getBySlug).toHaveBeenCalledWith('cs-2023-end-sem');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next with NotFoundError if not found', async () => {
      req.params.slug = 'unknown';
      paperService.getBySlug.mockRejectedValue(
        new NotFoundError('Paper not found')
      );

      await paperController.getBySlug(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  // ─── create ──────────────────────────────────────────────────────────────────

  describe('create', () => {
    it('should create paper with editor user and return 201', async () => {
      req.dbUser = { _id: 'user_1', role: 'editor' };
      req.body = { title: 'CS 2023', slug: 'cs-2023' };
      paperService.create.mockResolvedValue(samplePaper);

      await paperController.create(req, res, next);

      expect(paperService.create).toHaveBeenCalledWith(req.body, 'user_1');
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should pass undefined uploadedBy when dbUser is null', async () => {
      req.dbUser = null;
      req.body = { title: 'CS 2023' };
      paperService.create.mockResolvedValue(samplePaper);

      await paperController.create(req, res, next);

      expect(paperService.create).toHaveBeenCalledWith(req.body, undefined);
    });

    it('should call next on error', async () => {
      paperService.create.mockRejectedValue(new Error('Conflict'));
      await paperController.create(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  // ─── update ──────────────────────────────────────────────────────────────────

  describe('update', () => {
    it('should update paper and return 200', async () => {
      req.params.id = 'paper_1';
      req.body = { title: 'Updated Title' };
      paperService.update.mockResolvedValue({
        ...samplePaper,
        title: 'Updated Title',
      });

      await paperController.update(req, res, next);

      expect(paperService.update).toHaveBeenCalledWith('paper_1', {
        title: 'Updated Title',
      });
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success' })
      );
    });

    it('should call next on error', async () => {
      paperService.update.mockRejectedValue(new NotFoundError('Not found'));
      await paperController.update(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  // ─── updateStatus ─────────────────────────────────────────────────────────────

  describe('updateStatus', () => {
    it('should approve a paper', async () => {
      req.params.id = 'paper_1';
      req.body = { status: 'approved' };
      paperService.updateStatus.mockResolvedValue({
        ...samplePaper,
        status: 'approved',
      });

      await paperController.updateStatus(req, res, next);

      expect(paperService.updateStatus).toHaveBeenCalledWith(
        'paper_1',
        'approved'
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Paper status set to approved',
        })
      );
    });

    it('should reject a paper', async () => {
      req.params.id = 'paper_1';
      req.body = { status: 'rejected' };
      paperService.updateStatus.mockResolvedValue({
        ...samplePaper,
        status: 'rejected',
      });

      await paperController.updateStatus(req, res, next);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Paper status set to rejected',
        })
      );
    });

    it('should call next on error', async () => {
      paperService.updateStatus.mockRejectedValue(
        new NotFoundError('Not found')
      );
      await paperController.updateStatus(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  // ─── remove ──────────────────────────────────────────────────────────────────

  describe('remove', () => {
    it('should delete paper and return 204', async () => {
      req.params.id = 'paper_1';
      paperService.delete.mockResolvedValue(samplePaper);

      await paperController.remove(req, res, next);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should call next on error', async () => {
      paperService.delete.mockRejectedValue(new NotFoundError('Not found'));
      await paperController.remove(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  // ─── moderationQueue ─────────────────────────────────────────────────────────

  describe('moderationQueue', () => {
    it('returns the full pending queue for an admin without checking grants', async () => {
      req.dbUser = { _id: 'admin_1', role: 'admin' };
      paperService.list.mockResolvedValue({
        items: [samplePaper],
        total: 1,
        page: 1,
        limit: 5,
      });

      await paperController.moderationQueue(req, res, next);

      expect(
        permissionGrantService.resolveModeratorOfferingIds
      ).not.toHaveBeenCalled();
      expect(paperService.list).toHaveBeenCalledWith(
        { status: 'pending' },
        { page: 1, limit: 5 }
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { items: [samplePaper], canModerate: true },
        })
      );
    });

    it('returns an unrestricted queue for a global content:moderate grant', async () => {
      req.dbUser = { _id: 'mod_1', role: 'normal' };
      permissionGrantService.resolveModeratorOfferingIds.mockResolvedValue(
        null
      );
      paperService.list.mockResolvedValue({
        items: [samplePaper],
        total: 1,
        page: 1,
        limit: 5,
      });

      await paperController.moderationQueue(req, res, next);

      expect(paperService.list).toHaveBeenCalledWith(
        { status: 'pending' },
        { page: 1, limit: 5 }
      );
    });

    it('restricts the queue to the granted offerings for a scoped moderator', async () => {
      req.dbUser = { _id: 'mod_1', role: 'normal' };
      permissionGrantService.resolveModeratorOfferingIds.mockResolvedValue([
        'off_1',
      ]);
      paperService.list.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 5,
      });

      await paperController.moderationQueue(req, res, next);

      expect(paperService.list).toHaveBeenCalledWith(
        { status: 'pending', subjectOfferingId: { $in: ['off_1'] } },
        { page: 1, limit: 5 }
      );
    });

    it('returns an empty, unmoderatable result without querying papers when there are no grants', async () => {
      req.dbUser = { _id: 'editor_1', role: 'editor' };
      permissionGrantService.resolveModeratorOfferingIds.mockResolvedValue([]);

      await paperController.moderationQueue(req, res, next);

      expect(paperService.list).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { items: [], canModerate: false },
        })
      );
    });

    it('respects a custom limit', async () => {
      req.dbUser = { _id: 'admin_1', role: 'admin' };
      req.query.limit = '10';
      paperService.list.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 10,
      });

      await paperController.moderationQueue(req, res, next);

      expect(paperService.list).toHaveBeenCalledWith(
        { status: 'pending' },
        { page: 1, limit: 10 }
      );
    });

    it('should call next on error', async () => {
      req.dbUser = { _id: 'admin_1', role: 'admin' };
      paperService.list.mockRejectedValue(new Error('DB error'));
      await paperController.moderationQueue(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
