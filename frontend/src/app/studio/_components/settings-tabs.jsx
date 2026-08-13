'use client';

import * as React from 'react';
import { Settings2Icon, WrenchIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GeneralSettingsCard } from './general-settings-card';
import { WipeDbCard } from './wipe-db-card';
import { SystemInfoCard } from './system-info-card';

const SETTINGS_TABS = [
  { id: 'platform', label: 'Platform', icon: Settings2Icon },
  { id: 'maintenance', label: 'Maintenance', icon: WrenchIcon },
];

export function SettingsTabs({ platformConfig, health }) {
  const [activeTab, setActiveTab] = React.useState('platform');

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex w-full flex-col gap-6"
        >
          <TabsList variant="pill" className="w-fit">
            {SETTINGS_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger key={tab.id} value={tab.id}>
                  <Icon className="mr-1.5 h-3.5 w-3.5" />
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {/* 4. Added a subtle fade-in animation to smooth out tab switching */}
          <TabsContent
            value="platform"
            className="animate-in fade-in-50 mt-2 duration-300"
          >
            <GeneralSettingsCard initialConfig={platformConfig} />
          </TabsContent>

          <TabsContent
            value="maintenance"
            className="animate-in fade-in-50 mt-2 duration-300"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              <WipeDbCard />
              <SystemInfoCard initialHealth={health} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
