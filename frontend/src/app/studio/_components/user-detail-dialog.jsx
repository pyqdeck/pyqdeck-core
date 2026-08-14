'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { useApi } from '@/hooks/use-api';
import { UserDetailDialogView } from './user-detail-dialog.view';
import { AddPermissionGrantDialog } from './add-permission-grant-dialog';

export function UserDetailDialog({ user, stats, isLoadingStats, onClose }) {
  const api = useApi();
  const [grants, setGrants] = React.useState([]);
  const [isLoadingGrants, setIsLoadingGrants] = React.useState(false);
  const [revokingGrantId, setRevokingGrantId] = React.useState(null);
  const [addGrantOpen, setAddGrantOpen] = React.useState(false);
  const [showRevoked, setShowRevoked] = React.useState(false);

  const fetchGrants = React.useCallback(
    async (clerkId, includeRevoked) => {
      try {
        const res = await api.users.listUserGrants(clerkId, {
          includeRevoked,
        });
        setGrants(res.data?.data?.items || []);
      } catch (error) {
        console.error('Failed to load permission grants:', error);
      } finally {
        setIsLoadingGrants(false);
      }
    },
    [api]
  );

  const [prevClerkId, setPrevClerkId] = React.useState(user?.clerkId ?? null);
  if ((user?.clerkId ?? null) !== prevClerkId) {
    setPrevClerkId(user?.clerkId ?? null);
    setGrants([]);
    setShowRevoked(false);
    setIsLoadingGrants(!!user && user.role !== 'admin');
  }

  React.useEffect(() => {
    if (!user || user.role === 'admin') return;
    api.users
      .listUserGrants(user.clerkId, { includeRevoked: showRevoked })
      .then((res) => setGrants(res.data?.data?.items || []))
      .catch((error) =>
        console.error('Failed to load permission grants:', error)
      )
      .finally(() => setIsLoadingGrants(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.clerkId, user?.role, showRevoked]);

  const handleToggleShowRevoked = (next) => {
    setShowRevoked(next);
    setIsLoadingGrants(true);
  };

  const handleAddGrant = async (data) => {
    try {
      await api.users.createUserGrant(user.clerkId, data);
      toast.success('Permission granted');
      setAddGrantOpen(false);
      fetchGrants(user.clerkId, showRevoked);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to grant permission'
      );
    }
  };

  const handleRevokeGrant = async (grantId) => {
    setRevokingGrantId(grantId);
    try {
      await api.users.revokeUserGrant(user.clerkId, grantId);
      toast.success('Permission revoked');
      if (showRevoked) {
        // Keep the row visible with its now-revoked audit trail instead
        // of yanking it out from under the admin.
        fetchGrants(user.clerkId, showRevoked);
      } else {
        setGrants((prev) => prev.filter((g) => g.id !== grantId));
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to revoke permission'
      );
    } finally {
      setRevokingGrantId(null);
    }
  };

  return (
    <>
      <UserDetailDialogView
        user={user}
        stats={stats}
        isLoadingStats={isLoadingStats}
        onClose={onClose}
        grants={grants}
        isLoadingGrants={isLoadingGrants}
        onRevokeGrant={handleRevokeGrant}
        revokingGrantId={revokingGrantId}
        onAddGrant={() => setAddGrantOpen(true)}
        showRevoked={showRevoked}
        onToggleShowRevoked={handleToggleShowRevoked}
      />
      <AddPermissionGrantDialog
        open={addGrantOpen}
        onOpenChange={setAddGrantOpen}
        onAdd={handleAddGrant}
      />
    </>
  );
}
