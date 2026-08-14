import semesterRepository from '../repositories/semesterRepository.js';
import subjectOfferingRepository from '../repositories/subjectOfferingRepository.js';
import permissionGrantService from './permissionGrantService.js';
import { ConflictError } from '../utils/errors/index.js';

class SemesterService {
  async listByBranch(branchId) {
    return semesterRepository.findByBranchId(branchId);
  }

  async listAll(query, pagination) {
    return semesterRepository.findAll(query, pagination);
  }

  async getById(id) {
    return semesterRepository.findById(id);
  }

  async getByBranchAndNumber(branchId, number) {
    return semesterRepository.findByBranchAndNumber(branchId, number);
  }

  async create(data) {
    return semesterRepository.create(data);
  }

  async update(id, data) {
    return semesterRepository.update(id, data);
  }

  async delete(id, deletedBy) {
    const offeringCount = await subjectOfferingRepository.countBySemesterId(id);
    if (offeringCount > 0) {
      throw new ConflictError(
        `Cannot delete: this semester still has ${offeringCount} subject offering(s). Delete them first.`
      );
    }

    const semester = await semesterRepository.delete(id);
    await permissionGrantService.revokeAllForScope('semester', id, deletedBy);
    return semester;
  }
}

export const semesterService = new SemesterService();
export default semesterService;
