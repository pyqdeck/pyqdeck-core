import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import permissionGrantRepository from '../../src/repositories/permissionGrantRepository.js';
import { PermissionGrant } from '../../src/models/PermissionGrant.js';
import { User } from '../../src/models/User.js';

describe('PermissionGrantRepository', () => {
  let userId;
  let grantedById;

  beforeEach(async () => {
    await PermissionGrant.deleteMany({});
    await User.deleteMany({});

    const user = await User.create({
      clerkId: 'clerk_target',
      email: 'target@example.com',
      name: 'Target User',
      role: 'normal',
    });
    const admin = await User.create({
      clerkId: 'clerk_admin',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
    });
    userId = user._id;
    grantedById = admin._id;
  });

  function makeGrant(overrides = {}) {
    return PermissionGrant.create({
      userId,
      capabilities: ['content:moderate'],
      scopeLevel: 'branch',
      scopeId: new mongoose.Types.ObjectId(),
      grantedBy: grantedById,
      ...overrides,
    });
  }

  describe('findActiveByUserAndCapability', () => {
    it('returns a grant with no expiry', async () => {
      await makeGrant();
      const grants =
        await permissionGrantRepository.findActiveByUserAndCapability(
          userId,
          'content:moderate'
        );
      expect(grants).toHaveLength(1);
    });

    it('returns a grant that expires in the future', async () => {
      await makeGrant({
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      const grants =
        await permissionGrantRepository.findActiveByUserAndCapability(
          userId,
          'content:moderate'
        );
      expect(grants).toHaveLength(1);
    });

    it('excludes a grant that expired in the past', async () => {
      await makeGrant({
        expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      });
      const grants =
        await permissionGrantRepository.findActiveByUserAndCapability(
          userId,
          'content:moderate'
        );
      expect(grants).toHaveLength(0);
    });

    it('excludes a soft-revoked grant even without an expiry', async () => {
      await makeGrant({ isActive: false });
      const grants =
        await permissionGrantRepository.findActiveByUserAndCapability(
          userId,
          'content:moderate'
        );
      expect(grants).toHaveLength(0);
    });
  });

  describe('findByUserId', () => {
    it('populates grantedBy and revokedBy with name/email', async () => {
      const grant = await makeGrant();
      await permissionGrantRepository.revoke(grant._id, grantedById);

      const [populated] = await permissionGrantRepository.findByUserId(userId, {
        includeRevoked: true,
      });

      expect(populated.grantedBy.name).toBe('Admin User');
      expect(populated.grantedBy.email).toBe('admin@example.com');
      expect(populated.revokedBy.name).toBe('Admin User');
    });

    it('excludes revoked grants by default', async () => {
      const grant = await makeGrant();
      await permissionGrantRepository.revoke(grant._id, grantedById);

      const grants = await permissionGrantRepository.findByUserId(userId);
      expect(grants).toHaveLength(0);
    });
  });
});
