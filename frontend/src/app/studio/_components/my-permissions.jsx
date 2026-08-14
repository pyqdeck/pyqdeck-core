'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { useApi } from '@/hooks/use-api';
import { MyPermissionsView } from './my-permissions-view';
import { RequestPermissionDialog } from './request-permission-dialog';

export function MyPermissions({ role, grants, initialRequests }) {
  const api = useApi();
  const [requests, setRequests] = React.useState(initialRequests);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleRequest = async (data) => {
    try {
      await api.users.createMyGrantRequest(data);
      toast.success('Request submitted');
      const res = await api.users.listMyGrantRequests();
      setRequests(res.data?.data?.items || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to submit request'
      );
      throw error;
    }
  };

  return (
    <>
      <MyPermissionsView
        role={role}
        grants={grants}
        requests={requests}
        onRequestAccess={() => setDialogOpen(true)}
      />
      <RequestPermissionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onRequest={handleRequest}
      />
    </>
  );
}
