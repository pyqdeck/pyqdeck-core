'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { useApi } from '@/hooks/use-api';
import { AccessRequestsView } from './access-requests-view';

export function AccessRequests({ initialRequests }) {
  const api = useApi();
  const [requests, setRequests] = React.useState(initialRequests);
  const [processingId, setProcessingId] = React.useState(null);
  const [denyTarget, setDenyTarget] = React.useState(null);
  const [denyReason, setDenyReason] = React.useState('');

  const handleApprove = async (request) => {
    setProcessingId(request.id);
    try {
      await api.users.approveGrantRequest(request.id);
      toast.success('Request approved');
      setRequests((prev) => prev.filter((r) => r.id !== request.id));
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to approve request'
      );
    } finally {
      setProcessingId(null);
    }
  };

  const openDeny = (request) => {
    setDenyTarget(request);
    setDenyReason('');
  };

  const handleDenyOpenChange = (open) => {
    if (!open) setDenyTarget(null);
  };

  const handleDenyConfirm = async () => {
    if (!denyTarget || !denyReason.trim()) return;
    setProcessingId(denyTarget.id);
    try {
      await api.users.denyGrantRequest(denyTarget.id, { reason: denyReason });
      toast.success('Request denied');
      setRequests((prev) => prev.filter((r) => r.id !== denyTarget.id));
      setDenyTarget(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to deny request'
      );
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <AccessRequestsView
      requests={requests}
      processingId={processingId}
      onApprove={handleApprove}
      onDeny={openDeny}
      denyTarget={denyTarget}
      denyReason={denyReason}
      onDenyReasonChange={setDenyReason}
      onDenyOpenChange={handleDenyOpenChange}
      onDenyConfirm={handleDenyConfirm}
    />
  );
}
