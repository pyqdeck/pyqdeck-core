import { SettingsTabs } from '../_components/settings-tabs';
import { getApiServer } from '@/lib/api-server';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  let health = null;
  let platformConfig = null;

  try {
    const api = await getApiServer();
    const [healthRes, configRes] = await Promise.all([
      api.health.getHealthDetailed(),
      api.platformConfig.getPlatformConfig(),
    ]);
    health = healthRes.data.data;
    platformConfig = configRes.data.data;
  } catch (error) {
    console.error('Failed to fetch settings data:', error);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
          Studio Settings
        </h1>
        <p className="text-muted-foreground font-roboto">
          Manage platform configuration and maintenance tasks.
        </p>
      </div>

      <SettingsTabs platformConfig={platformConfig} health={health} />
    </div>
  );
}
