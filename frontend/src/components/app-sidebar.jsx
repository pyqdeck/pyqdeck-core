'use client';

import * as React from 'react';
import { useUser } from '@clerk/nextjs';

import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  BuildingIcon,
  BookOpenIcon,
  Settings2Icon,
  UsersIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
} from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

// PyqDeck Admin/Editor navigation data
const navData = {
  platform: [
    {
      title: 'Overview',
      url: '/studio',
      icon: <LayoutDashboardIcon />,
      isActive: true,
    },
  ],
  academics: [
    {
      title: 'Universities',
      url: '/studio/universities',
      icon: <BuildingIcon />,
    },
  ],
  content: [
    {
      title: 'Subjects',
      url: '/studio/subjects',
      icon: <BookOpenIcon />,
    },
  ],
  security: [
    {
      title: 'User Directory',
      url: '/studio/users',
      icon: <UsersIcon />,
    },
    {
      title: 'Settings',
      url: '/studio/settings',
      icon: <Settings2Icon />,
    },
  ],
};

export function AppSidebar({ userRole, ...props }) {
  const { user, isLoaded } = useUser();

  const userData = {
    name: user?.fullName || 'User',
    email: user?.primaryEmailAddress?.emailAddress || 'admin@pyqdeck.in',
    avatar: user?.imageUrl || '',
  };

  const teams = [
    {
      name: 'PyqDeck Admin',
      logo: <GraduationCapIcon />,
      plan: (userRole || 'Editor').toUpperCase(),
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {navData.platform.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Academics</SidebarGroupLabel>
          <SidebarMenu>
            {navData.academics.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Content Management</SidebarGroupLabel>
          <SidebarMenu>
            {navData.content.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Security</SidebarGroupLabel>
          <SidebarMenu>
            {navData.security.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {!isLoaded ? (
          <div className="flex items-center gap-3 p-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="flex flex-col gap-1 overflow-hidden">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ) : (
          <NavUser user={userData} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
