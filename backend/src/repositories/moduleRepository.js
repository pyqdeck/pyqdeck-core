import { Module, moduleZodSchema } from '../models/Module.js';
import { NotFoundError, ConflictError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class ModuleRepository {
  async create(data) {
    try {
      const module = new Module(data);
      await module.save();
      return module;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError(
          'Module with this number or slug already exists in this syllabus'
        );
      }
      throw error;
    }
  }

  async findById(id) {
    const module = await Module.findById(id);
    if (!module) throw new NotFoundError('Module not found');
    return module;
  }

  async findBySyllabus(syllabusId, pagination) {
    return paginate(Module, { syllabusId }, pagination, {
      sort: { order: 1, moduleNumber: 1 },
    });
  }

  async countBySyllabus(syllabusId) {
    return Module.countDocuments({ syllabusId });
  }

  async findBySyllabusAndSlug(syllabusId, slug) {
    const module = await Module.findOne({
      syllabusId,
      $or: [{ slug }, { redirectSlugs: slug }],
    });
    if (!module) throw new NotFoundError('Module not found');
    return module;
  }

  async update(id, data) {
    // Sanitize data using the Zod schema to prevent NoSQL injection
    // and ensure only allowed fields are updated.
    const sanitizedData = moduleZodSchema.partial().parse(data);

    const module = await Module.findByIdAndUpdate(
      id,
      { $set: sanitizedData },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );
    if (!module) throw new NotFoundError('Module not found');
    return module;
  }

  async delete(id) {
    const module = await Module.findByIdAndDelete(id);
    if (!module) throw new NotFoundError('Module not found');
    return module;
  }
}

export const moduleRepository = new ModuleRepository();
export default moduleRepository;
