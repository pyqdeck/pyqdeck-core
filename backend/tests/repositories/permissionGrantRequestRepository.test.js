import { describe, it, expect, beforeEach } from 'vitest';
import permissionGrantRequestRepository from '../../src/repositories/permissionGrantRequestRepository.js';
import { PermissionGrantRequest } from '../../src/models/PermissionGrantRequest.js';
import { User } from '../../src/models/User.js';
import { NotFoundError } from '../../src/utils/errors/index.js';
import mongoose from 'mongoose';

describe('PermissionGrantRequestRepository', () => {
  let userId;
  let adminId;

  beforeEach(async () => {
    await PermissionGrantRequest.deleteMany({});
    await User.deleteMany({});

    const user = await User.create({
      clerkId: 'clerk_requester',
      email: 'requester@example.com',
      name: 'Requester',
      role: 'editor',
    });
    const admin = await User.create({
      clerkId: 'clerk_admin',
      email: 'admin@example.com',
      name: 'Admin',
      role: 'admin',
    });
    userId = user._id;
    adminId = admin._id;
  });

  function makeRequest(overrides = {}) {
    return PermissionGrantRequest.create({
      userId,
      capabilities: ['content:create'],
      scopeLevel: 'branch',
      scopeId: new mongoose.Types.ObjectId(),
      ...overrides,
    });
  }

  describe('create / findById', () => {
    it('creates a request defaulting to pending status', async () => {
      const request = await permissionGrantRequestRepository.create({
        userId,
        capabilities: ['content:create'],
        scopeLevel: 'global',
      });
      expect(request.status).toBe('pending');
    });

    it('throws NotFoundError for a missing id', async () => {
      await expect(
        permissionGrantRequestRepository.findById(new mongoose.Types.ObjectId())
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('findByUserId', () => {
    it('returns only that user requests, newest first', async () => {
      await makeRequest();
      await new Promise((r) => setTimeout(r, 5));
      await makeRequest({ scopeLevel: 'global', scopeId: undefined });
      await makeRequest({ userId: new mongoose.Types.ObjectId() });

      const requests =
        await permissionGrantRequestRepository.findByUserId(userId);
      expect(requests).toHaveLength(2);
      expect(requests[0].createdAt.getTime()).toBeGreaterThanOrEqual(
        requests[1].createdAt.getTime()
      );
    });
  });

  describe('findAll', () => {
    it('filters by status when given', async () => {
      const pending = await makeRequest();
      const approved = await makeRequest();
      await permissionGrantRequestRepository.updateStatus(approved._id, {
        status: 'approved',
      });

      const pendingOnly = await permissionGrantRequestRepository.findAll({
        status: 'pending',
      });
      expect(pendingOnly).toHaveLength(1);
      expect(pendingOnly[0].id).toBe(pending.id);
    });

    it('returns everything when no status filter is given', async () => {
      await makeRequest();
      await makeRequest();

      const all = await permissionGrantRequestRepository.findAll();
      expect(all).toHaveLength(2);
    });

    it('populates userId and reviewedBy with name/email', async () => {
      const request = await makeRequest();
      await permissionGrantRequestRepository.updateStatus(request._id, {
        status: 'approved',
        reviewedBy: adminId,
        reviewedAt: new Date(),
      });

      const [populated] = await permissionGrantRequestRepository.findAll();
      expect(populated.userId.name).toBe('Requester');
      expect(populated.reviewedBy.name).toBe('Admin');
    });
  });

  describe('updateStatus', () => {
    it('updates the given fields', async () => {
      const request = await makeRequest();
      const updated = await permissionGrantRequestRepository.updateStatus(
        request._id,
        { status: 'denied', denialReason: 'Not needed' }
      );
      expect(updated.status).toBe('denied');
      expect(updated.denialReason).toBe('Not needed');
    });

    it('throws NotFoundError for a missing id', async () => {
      await expect(
        permissionGrantRequestRepository.updateStatus(
          new mongoose.Types.ObjectId(),
          { status: 'approved' }
        )
      ).rejects.toThrow(NotFoundError);
    });
  });
});
