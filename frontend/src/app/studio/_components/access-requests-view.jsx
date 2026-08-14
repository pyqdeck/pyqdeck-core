'use client';

import { Check, X, Inbox } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from '@/components/ui/empty';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const CAPABILITY_LABELS = {
  'content:create': 'Create',
  'content:edit': 'Edit',
  'content:moderate': 'Moderate',
  'content:delete': 'Delete',
};

function scopeSummary(request) {
  if (request.label) return request.label;
  if (request.scopeLevel === 'global') return 'Global';
  return `${request.scopeLevel} scope`;
}

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function AccessRequestsView({
  requests = [],
  processingId,
  onApprove,
  onDeny,
  denyTarget,
  denyReason,
  onDenyReasonChange,
  onDenyOpenChange,
  onDenyConfirm,
}) {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          Access Requests
        </h1>
        <p className="text-muted-foreground text-base">
          Review pending permission requests from studio users.
        </p>
      </div>

      {requests.length === 0 ? (
        <Empty className="rounded-xl border">
          <EmptyMedia variant="icon">
            <Inbox className="h-8 w-8" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No pending requests</EmptyTitle>
            <EmptyDescription>
              You&apos;re all caught up -- nobody is waiting on a decision.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((request) => {
            const isProcessing = processingId === request.id;
            return (
              <Card key={request.id} className="border shadow-none">
                <CardContent className="flex flex-col gap-2 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-foreground font-roboto text-sm font-bold">
                        {request.userId?.name || 'Unknown user'}
                      </span>
                      <span className="text-muted-foreground font-roboto text-xs">
                        {request.userId?.email}
                      </span>
                    </div>
                    <span className="text-muted-foreground font-roboto text-[11px]">
                      Requested {formatDate(request.createdAt)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-foreground font-roboto text-sm font-bold">
                      {scopeSummary(request)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {request.capabilities.map((cap) => (
                      <Badge
                        key={cap}
                        variant="outline"
                        className="font-roboto h-5 rounded-full px-2 text-[10px] font-bold"
                      >
                        {CAPABILITY_LABELS[cap] || cap}
                      </Badge>
                    ))}
                  </div>

                  {request.reason && (
                    <p className="text-muted-foreground font-roboto text-sm">
                      &ldquo;{request.reason}&rdquo;
                    </p>
                  )}

                  <div className="flex justify-end gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isProcessing}
                      className="font-roboto text-destructive hover:text-destructive gap-1.5 border font-bold shadow-none"
                      onClick={() => onDeny(request)}
                    >
                      <X className="h-3.5 w-3.5" />
                      Deny
                    </Button>
                    <Button
                      size="sm"
                      disabled={isProcessing}
                      className="font-roboto gap-1.5 border font-bold shadow-none"
                      onClick={() => onApprove(request)}
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={!!denyTarget} onOpenChange={onDenyOpenChange}>
        <DialogContent className="border shadow-none sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="font-roboto text-lg font-bold">
              Deny Request
            </DialogTitle>
            <DialogDescription className="font-roboto">
              Let {denyTarget?.userId?.name || 'the requester'} know why this
              was denied.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="deny-reason" className="font-roboto font-bold">
              Reason
            </Label>
            <Textarea
              id="deny-reason"
              rows={3}
              className="font-roboto border focus-visible:ring-0"
              value={denyReason}
              onChange={(e) => onDenyReasonChange(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="destructive"
              disabled={!denyReason.trim()}
              className="font-roboto w-full border font-bold shadow-none"
              onClick={onDenyConfirm}
            >
              Deny Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
