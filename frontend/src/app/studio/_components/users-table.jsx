'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { UsersTableView } from './users-table-view';
import { UserDetailDialog } from './user-detail-dialog';
import { useApi } from '@/hooks/use-api';
import { useRouter } from 'next/navigation';

export function UsersTable({ initialUsers = [], pagination }) {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [userStats, setUserStats] = React.useState(null);
  const [isLoadingStats, setIsLoadingStats] = React.useState(false);
  const api = useApi();
  const router = useRouter();

  const handleUpdateRole = async (clerkId, newRole) => {
    setIsUpdating(true);
    const toastId = toast.loading('Updating user role...');
    try {
      await api.users.updateUser(clerkId, { role: newRole });
      toast.success('User role updated successfully', { id: toastId });
      router.refresh();
    } catch (error) {
      console.error('Failed to update role:', error);
      toast.error('Failed to update user role', { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBanUser = async (clerkId) => {
    setIsUpdating(true);
    const toastId = toast.loading('Banning user...');
    try {
      await api.users.updateUser(clerkId, { isActive: false });
      toast.success('User has been banned', { id: toastId });
      router.refresh();
    } catch (error) {
      console.error('Failed to ban user:', error);
      toast.error('Failed to ban user', { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUnbanUser = async (clerkId) => {
    setIsUpdating(true);
    const toastId = toast.loading('Restoring user access...');
    try {
      await api.users.updateUser(clerkId, { isActive: true });
      toast.success('User access restored', { id: toastId });
      router.refresh();
    } catch (error) {
      console.error('Failed to restore user access:', error);
      toast.error('Failed to restore user access', { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOpenDetail = async (user) => {
    setSelectedUser(user);
    setUserStats(null);
    setIsLoadingStats(true);
    try {
      const res = await api.users.getUserById(user.clerkId);
      setUserStats(res.data.data?.stats ?? null);
    } catch (error) {
      console.error('Failed to load user stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleCloseDetail = () => {
    setSelectedUser(null);
    setUserStats(null);
  };

  return (
    <>
      <UsersTableView
        users={initialUsers}
        pagination={pagination}
        onUpdateRole={handleUpdateRole}
        onBanUser={handleBanUser}
        onUnbanUser={handleUnbanUser}
        onOpenDetail={handleOpenDetail}
        isUpdating={isUpdating}
      />
      <UserDetailDialog
        user={selectedUser}
        stats={userStats}
        isLoadingStats={isLoadingStats}
        onClose={handleCloseDetail}
      />
    </>
  );
}
