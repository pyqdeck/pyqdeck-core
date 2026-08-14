import paperRepository from '../repositories/paperRepository.js';
import questionPaperMapRepository from '../repositories/questionPaperMapRepository.js';
import { loggerService } from '../utils/index.js';

const logger = loggerService.getLogger();

class PaperService {
  async list(filter = {}, pagination) {
    return paperRepository.findAll(filter, pagination);
  }

  async getBySlug(slug) {
    return paperRepository.findBySlug(slug);
  }

  async getById(id) {
    return paperRepository.findById(id);
  }

  async create(data, uploadedBy) {
    return paperRepository.create({ ...data, uploadedBy });
  }

  async update(id, data) {
    return paperRepository.update(id, data);
  }

  async updateStatus(id, status) {
    logger.info('Paper status updated', { id, status });
    return paperRepository.updateStatus(id, status);
  }

  async delete(id) {
    const paper = await paperRepository.delete(id);
    // The paper is gone, but its questions aren't -- they're standalone
    // and may be linked to other papers too. Just clean up this paper's
    // own link records.
    await questionPaperMapRepository.deleteByPaper(id);
    return paper;
  }
}

export const paperService = new PaperService();
export default paperService;
