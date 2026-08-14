import subjectOfferingRepository from '../repositories/subjectOfferingRepository.js';
import paperRepository from '../repositories/paperRepository.js';
import syllabusRepository from '../repositories/syllabusRepository.js';
import moduleRepository from '../repositories/moduleRepository.js';
import permissionGrantService from './permissionGrantService.js';
import { ConflictError } from '../utils/errors/index.js';

class SubjectOfferingService {
  async list(filter = {}, pagination) {
    return subjectOfferingRepository.findByUniversityBranchSemester(
      filter.universityId,
      filter.branchId,
      filter.semesterId,
      pagination,
      filter.extra || {}
    );
  }

  async getBySlug(slug) {
    return subjectOfferingRepository.findBySlug(slug);
  }

  async getById(id) {
    return subjectOfferingRepository.findById(id);
  }

  async listBySemester(semesterId, pagination, filter = {}) {
    return subjectOfferingRepository.findBySemesterId(
      semesterId,
      pagination,
      filter
    );
  }

  async create(data) {
    return subjectOfferingRepository.create(data);
  }

  async update(id, data) {
    return subjectOfferingRepository.update(id, data);
  }

  async delete(id, deletedBy) {
    const paperCount = await paperRepository.countBySubjectOffering(id);
    if (paperCount > 0) {
      throw new ConflictError(
        `Cannot delete: this subject offering still has ${paperCount} paper(s). Delete them first.`
      );
    }

    const syllabus = await syllabusRepository.findBySubjectOfferingOrNull(id);
    if (syllabus) {
      const syllabusId = syllabus.id || syllabus._id;
      const moduleCount = await moduleRepository.countBySyllabus(syllabusId);
      if (moduleCount > 0) {
        throw new ConflictError(
          `Cannot delete: this subject offering's syllabus still has ${moduleCount} module(s). Delete them first.`
        );
      }
      // Empty syllabus (no modules) -- cascade-delete it along with the
      // offering instead of leaving an orphaned record behind.
      await syllabusRepository.delete(syllabusId);
    }

    const offering = await subjectOfferingRepository.delete(id);
    await permissionGrantService.revokeAllForScope(
      'subjectOffering',
      id,
      deletedBy
    );
    return offering;
  }
}

export const subjectOfferingService = new SubjectOfferingService();
export default subjectOfferingService;
