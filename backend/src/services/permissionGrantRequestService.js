import permissionGrantRequestRepository from '../repositories/permissionGrantRequestRepository.js';
import permissionGrantService from './permissionGrantService.js';
import { University } from '../models/University.js';
import { Branch } from '../models/Branch.js';
import { Semester } from '../models/Semester.js';
import { SubjectOffering } from '../models/SubjectOffering.js';
import { ValidationError } from '../utils/errors/index.js';

const SCOPE_MODELS = {
  university: University,
  branch: Branch,
  semester: Semester,
  subjectOffering: SubjectOffering,
};

class PermissionGrantRequestService {
  async create(data) {
    if (data.scopeLevel !== 'global') {
      const Model = SCOPE_MODELS[data.scopeLevel];
      const exists = await Model.exists({ _id: data.scopeId });
      if (!exists) {
        throw new ValidationError(
          `No ${data.scopeLevel} found with id ${data.scopeId}`
        );
      }
    }
    return permissionGrantRequestRepository.create({
      ...data,
      status: 'pending',
    });
  }

  async listForUser(userId) {
    return permissionGrantRequestRepository.findByUserId(userId);
  }

  async listAll(filters) {
    return permissionGrantRequestRepository.findAll(filters);
  }

  /**
   * Approves a pending request: creates the real grant it describes (via
   * permissionGrantService, so the same scope-existence validation and
   * audit trail apply), then marks the request approved and links it to
   * the grant it produced.
   */
  async approve(id, adminId) {
    const request = await permissionGrantRequestRepository.findById(id);
    if (request.status !== 'pending') {
      throw new ValidationError('This request has already been reviewed');
    }

    const grant = await permissionGrantService.create({
      userId: request.userId,
      capabilities: request.capabilities,
      scopeLevel: request.scopeLevel,
      scopeId: request.scopeLevel === 'global' ? undefined : request.scopeId,
      label: request.label,
      grantedBy: adminId,
    });

    return permissionGrantRequestRepository.updateStatus(id, {
      status: 'approved',
      reviewedBy: adminId,
      reviewedAt: new Date(),
      resultingGrantId: grant._id,
    });
  }

  async deny(id, adminId, reason) {
    const request = await permissionGrantRequestRepository.findById(id);
    if (request.status !== 'pending') {
      throw new ValidationError('This request has already been reviewed');
    }

    return permissionGrantRequestRepository.updateStatus(id, {
      status: 'denied',
      reviewedBy: adminId,
      reviewedAt: new Date(),
      denialReason: reason,
    });
  }
}

export const permissionGrantRequestService =
  new PermissionGrantRequestService();
export default permissionGrantRequestService;
