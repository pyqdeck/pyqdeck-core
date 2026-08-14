import { PermissionGrant } from '../models/PermissionGrant.js';
import { NotFoundError } from '../utils/errors/index.js';

class PermissionGrantRepository {
  async create(data) {
    const grant = new PermissionGrant(data);
    await grant.save();
    return grant;
  }

  async findById(id) {
    const grant = await PermissionGrant.findById(id);
    if (!grant) throw new NotFoundError('Permission grant not found');
    return grant;
  }

  async findByUserId(userId, { includeRevoked = false } = {}) {
    const query = { userId };
    if (!includeRevoked) query.isActive = true;
    return PermissionGrant.find(query).sort({ createdAt: -1 });
  }

  async findActiveByUserAndCapability(userId, capability) {
    return PermissionGrant.find({
      userId,
      isActive: true,
      capabilities: capability,
    }).lean();
  }

  async revoke(id, revokedBy) {
    const grant = await PermissionGrant.findByIdAndUpdate(
      id,
      {
        $set: {
          isActive: false,
          revokedBy,
          revokedAt: new Date(),
        },
      },
      { returnDocument: 'after', runValidators: true }
    );
    if (!grant) throw new NotFoundError('Permission grant not found');
    return grant;
  }
}

export const permissionGrantRepository = new PermissionGrantRepository();
export default permissionGrantRepository;
