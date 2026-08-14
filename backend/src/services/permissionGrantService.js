import permissionGrantRepository from '../repositories/permissionGrantRepository.js';
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

class PermissionGrantService {
  async listForUser(userId, options) {
    return permissionGrantRepository.findByUserId(userId, options);
  }

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
    return permissionGrantRepository.create(data);
  }

  async revoke(id, revokedBy) {
    return permissionGrantRepository.revoke(id, revokedBy);
  }

  async revokeAllForScope(scopeLevel, scopeId, revokedBy) {
    return permissionGrantRepository.revokeAllForScope(
      scopeLevel,
      scopeId,
      revokedBy
    );
  }

  /**
   * Does this user hold `capability` somewhere that covers `targetScope`?
   * Admins bypass entirely. Otherwise a grant matches if it's global, or its
   * scope level + id matches the corresponding ancestor in targetScope --
   * a branch-level grant transparently covers every semester/offering under it,
   * since targetScope always carries the full resolved ancestor chain.
   */
  async userHasCapability(dbUser, capability, targetScope = {}) {
    if (dbUser?.role === 'admin') return true;
    if (!dbUser) return false;

    const grants =
      await permissionGrantRepository.findActiveByUserAndCapability(
        dbUser._id,
        capability
      );

    return grants.some((grant) => {
      if (grant.scopeLevel === 'global') return true;

      const targetId = {
        university: targetScope.universityId,
        branch: targetScope.branchId,
        semester: targetScope.semesterId,
        subjectOffering: targetScope.subjectOfferingId,
      }[grant.scopeLevel];

      return !!targetId && String(grant.scopeId) === String(targetId);
    });
  }
}

export const permissionGrantService = new PermissionGrantService();
export default permissionGrantService;
