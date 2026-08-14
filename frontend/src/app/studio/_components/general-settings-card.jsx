'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { GeneralSettingsCardView } from './general-settings-card.view';
import { useApi } from '@/hooks/use-api';
import { getErrorMessage } from '@/lib/api-error';

export function GeneralSettingsCard({ initialConfig }) {
  const [settings, setSettings] = React.useState({
    devMode: initialConfig?.devMode ?? false,
    contentFreeze: initialConfig?.contentFreeze ?? false,
    maintenanceMode: initialConfig?.maintenanceMode ?? false,
  });
  const [isUpdating, setIsUpdating] = React.useState(null);
  const api = useApi();

  const handleToggle = async (key, value) => {
    const prev = settings[key];
    setSettings((s) => ({ ...s, [key]: value }));
    setIsUpdating(key);
    try {
      const res = await api.platformConfig.updatePlatformConfig({
        [key]: value,
      });
      const updated = res.data.data;
      setSettings({
        devMode: updated.devMode,
        contentFreeze: updated.contentFreeze,
        maintenanceMode: updated.maintenanceMode,
      });
      toast.success('Setting updated');
    } catch (error) {
      setSettings((s) => ({ ...s, [key]: prev }));
      toast.error(getErrorMessage(error, 'Failed to update setting'));
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <GeneralSettingsCardView
      settings={settings}
      isUpdating={isUpdating}
      onToggle={handleToggle}
    />
  );
}
