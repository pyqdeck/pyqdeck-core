import permissionGrantRepository from '../repositories/permissionGrantRepository.js';
import subjectOfferingRepository from '../repositories/subjectOfferingRepository.js';
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

  /**
   * Resolves which subjectOfferings a non-admin/editor moderator is allowed
   * to see pending/rejected/draft papers for, based on their active
   * `content:moderate` grants.
   *
   * Returns `null` to mean "unrestricted" (the user holds a global grant),
   * or an array of offering ids to mean "restricted to exactly these" --
   * an empty array means the user has no moderate grants at all, so they
   * see nothing beyond the public approved-only view.
   */
  async resolveModeratorOfferingIds(dbUser) {
    if (!dbUser) return [];

    const grants =
      await permissionGrantRepository.findActiveByUserAndCapability(
        dbUser._id,
        'content:moderate'
      );
    if (grants.length === 0) return [];
    if (grants.some((grant) => grant.scopeLevel === 'global')) return null;

    const byLevel = {
      university: [],
      branch: [],
      semester: [],
      subjectOffering: [],
    };
    for (const grant of grants) {
      byLevel[grant.scopeLevel].push(grant.scopeId);
    }

    return subjectOfferingRepository.findIdsByScope({
      universityIds: byLevel.university,
      branchIds: byLevel.branch,
      semesterIds: byLevel.semester,
      subjectOfferingIds: byLevel.subjectOffering,
    });
  }
}

export const permissionGrantService = new PermissionGrantService();
export default permissionGrantService;
