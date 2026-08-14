import { PermissionGrantRequest } from '../models/PermissionGrantRequest.js';
import { NotFoundError } from '../utils/errors/index.js';

class PermissionGrantRequestRepository {
  async create(data) {
    const request = new PermissionGrantRequest(data);
    await request.save();
    return request;
  }

  async findById(id) {
    const request = await PermissionGrantRequest.findById(id);
    if (!request) throw new NotFoundError('Permission grant request not found');
    return request;
  }

  async findByUserId(userId) {
    return PermissionGrantRequest.find({ userId }).sort({ createdAt: -1 });
  }

  async findAll({ status } = {}) {
    const query = {};
    if (status) query.status = status;
    return PermissionGrantRequest.find(query)
      .sort({ createdAt: -1 })
      .populate('userId', 'name email')
      .populate('reviewedBy', 'name email');
  }

  async updateStatus(id, data) {
    const request = await PermissionGrantRequest.findByIdAndUpdate(
      id,
      { $set: data },
      { returnDocument: 'after', runValidators: true }
    );
    if (!request) throw new NotFoundError('Permission grant request not found');
    return request;
  }
}

export const permissionGrantRequestRepository =
  new PermissionGrantRequestRepository();
export default permissionGrantRequestRepository;
