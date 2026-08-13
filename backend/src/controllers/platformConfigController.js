import { catchAsync, successFormatter } from '../utils/index.js';
import { platformConfigService } from '../services/platformConfigService.js';

const sanitizeConfig = (config) =>
  config.toObject ? config.toObject() : { ...config };

export const getConfig = catchAsync(async (req, res) => {
  const config = await platformConfigService.getConfig();
  res.json(
    successFormatter.formatSuccess(
      sanitizeConfig(config),
      'Platform config fetched'
    )
  );
});

export const updateConfig = catchAsync(async (req, res) => {
  const config = await platformConfigService.updateConfig(req.body);
  res.json(
    successFormatter.formatSuccess(
      sanitizeConfig(config),
      'Platform config updated'
    )
  );
});
