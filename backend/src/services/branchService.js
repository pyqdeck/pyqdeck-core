import branchRepository from '../repositories/branchRepository.js';
import permissionGrantService from './permissionGrantService.js';

class BranchService {
  async listByUniversity(universityId, pagination, query = {}) {
    const filter = {};
    if (query.isActive !== undefined && query.isActive !== 'all') {
      filter.isActive = query.isActive === 'true' || query.isActive === true;
    }

    return branchRepository.findByUniversityId(
      universityId,
      pagination,
      filter
    );
  }

  async listAll(query = {}, pagination) {
    const filter = {};

    if (query.isActive !== undefined && query.isActive !== 'all') {
      filter.isActive = query.isActive === 'true' || query.isActive === true;
    }

    if (query.universityId) {
      filter.universityId = query.universityId;
    }

    return branchRepository.findAll(filter, pagination);
  }

  async bulkCreate(data) {
    return branchRepository.createMany(data);
  }

  async getBySlug(universityId, slug) {
    return branchRepository.findBySlug(universityId, slug);
  }

  async getById(id) {
    return branchRepository.findById(id);
  }

  async getStructure(id) {
    return branchRepository.getStructure(id);
  }

  async create(data) {
    return branchRepository.create(data);
  }

  async update(id, data) {
    return branchRepository.update(id, data);
  }

  async delete(id, deletedBy) {
    const branch = await branchRepository.delete(id);
    await permissionGrantService.revokeAllForScope('branch', id, deletedBy);
    return branch;
  }
}

export const branchService = new BranchService();
export default branchService;
