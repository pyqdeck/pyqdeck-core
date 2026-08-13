import {
  PlatformConfig,
  platformConfigZodSchema,
} from '../models/PlatformConfig.js';

class PlatformConfigRepository {
  async get() {
    let config = await PlatformConfig.findOne({ instanceId: 'main' });
    if (!config) {
      config = await PlatformConfig.create({ instanceId: 'main' });
    }
    return config;
  }

  async update(data) {
    const sanitized = platformConfigZodSchema.parse(data);

    return PlatformConfig.findOneAndUpdate(
      { instanceId: 'main' },
      { $set: sanitized },
      { returnDocument: 'after', upsert: true, runValidators: true }
    );
  }
}

export const platformConfigRepository = new PlatformConfigRepository();
export default platformConfigRepository;
