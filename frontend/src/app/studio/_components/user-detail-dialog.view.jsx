'use client';

import * as React from 'react';
import { Calendar, Bookmark, Plus, X, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

function RoleBadge({ role }) {
  return (
    <Badge
      className={cn(
        'font-roboto rounded-full px-2.5 py-0.5 font-semibold',
        role === 'admin'
          ? 'bg-success/10 text-success hover:bg-success/10'
          : role === 'editor'
            ? 'bg-warning/10 text-warning hover:bg-warning/10'
            : 'bg-muted text-muted-foreground'
      )}
    >
      {role}
    </Badge>
  );
}

const CAPABILITY_LABELS = {
  'content:create': 'Create',
  'content:edit': 'Edit',
  'content:moderate': 'Moderate',
  'content:delete': 'Delete',
};

function scopeSummary(grant) {
  if (grant.label) return grant.label;
  if (grant.scopeLevel === 'global') return 'Global';
  return `${grant.scopeLevel} scope`;
}

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function grantAuditLine(grant) {
  const grantedByName = grant.grantedBy?.name || 'someone';
  const grantedLine = grant.createdAt
    ? `Granted by ${grantedByName} on ${formatDate(grant.createdAt)}`
    : `Granted by ${grantedByName}`;

  if (grant.revokedAt) {
    const revokedByName = grant.revokedBy?.name || 'someone';
    return `${grantedLine} · Revoked by ${revokedByName} on ${formatDate(grant.revokedAt)}`;
  }
  return grantedLine;
}

function GrantRow({ grant, onRevoke, isRevoking }) {
  const isRevoked = grant.isActive === false;
  const isExpired =
    !isRevoked && grant.expiresAt && new Date(grant.expiresAt) < new Date();

  return (
    <div
      className={cn(
        'border-border/50 flex items-center justify-between gap-3 rounded-lg border px-3 py-2',
        (isRevoked || isExpired) && 'opacity-60'
      )}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-foreground font-roboto truncate text-sm font-bold">
            {scopeSummary(grant)}
          </span>
          {isRevoked && (
            <Badge
              variant="outline"
              className="text-destructive border-destructive/30 h-4 rounded-full px-1.5 text-[9px] font-bold"
            >
              REVOKED
            </Badge>
          )}
          {isExpired && (
            <Badge
              variant="outline"
              className="text-warning border-warning/30 h-4 rounded-full px-1.5 text-[9px] font-bold"
            >
              EXPIRED
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {grant.capabilities.map((cap) => (
            <Badge
              key={cap}
              variant="outline"
              className="font-roboto h-5 rounded-full px-2 text-[10px] font-bold"
            >
              {CAPABILITY_LABELS[cap] || cap}
            </Badge>
          ))}
        </div>
        <span className="text-muted-foreground font-roboto text-[11px]">
          {grantAuditLine(grant)}
          {!isRevoked && grant.expiresAt && !isExpired && (
            <> · Expires {formatDate(grant.expiresAt)}</>
          )}
        </span>
      </div>
      {!isRevoked && (
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive shrink-0"
          disabled={isRevoking}
          onClick={() => onRevoke(grant.id)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Revoke permission</span>
        </Button>
      )}
    </div>
  );
}

export function UserDetailDialogView({
  user,
  stats,
  isLoadingStats,
  onClose,
  grants = [],
  isLoadingGrants,
  onRevokeGrant,
  revokingGrantId,
  onAddGrant,
  showRevoked,
  onToggleShowRevoked,
}) {
  return (
    <Dialog open={!!user} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="font-roboto border shadow-none sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-roboto text-lg font-bold">
            User Profile
          </DialogTitle>
        </DialogHeader>

        {user && (
          <div className="flex flex-col gap-5">
            {/* Identity */}
            <div className="flex items-center gap-4">
              <Avatar className="border-muted bg-muted/50 h-16 w-16 rounded-full border">
                <AvatarImage
                  src={user.avatarUrl}
                  alt={user.name}
                  className="rounded-full"
                />
                <AvatarFallback className="rounded-full text-lg font-bold">
                  {user.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-foreground font-roboto text-base font-bold">
                    {user.name}
                  </span>
                  {user.isMe && (
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/10 h-4 rounded-full border-none px-1.5 text-[9px] font-bold">
                      YOU
                    </Badge>
                  )}
                  {user.isActive === false && (
                    <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/10 h-4 rounded-full border-none px-1.5 text-[9px] font-bold">
                      BANNED
                    </Badge>
                  )}
                </div>
                <span className="text-muted-foreground font-roboto text-xs lowercase">
                  {user.email}
                </span>
              </div>
            </div>

            <Separator />

            {/* Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground font-roboto text-[10px] font-bold tracking-wider uppercase">
                  Role
                </span>
                <RoleBadge role={user.role} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground font-roboto text-[10px] font-bold tracking-wider uppercase">
                  Joined
                </span>
                <span className="text-foreground font-roboto flex items-center gap-1.5 text-sm">
                  <Calendar className="text-muted-foreground h-3.5 w-3.5" />
                  {new Date(user.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground font-roboto text-[10px] font-bold tracking-wider uppercase">
                  University
                </span>
                <span className="text-foreground font-roboto text-sm font-medium">
                  {user.university?.shortName || 'Independent'}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground font-roboto text-[10px] font-bold tracking-wider uppercase">
                  Branch
                </span>
                <span className="text-foreground font-roboto text-sm font-medium">
                  {user.branch?.name || 'Global'}
                </span>
              </div>
            </div>

            <Separator />

            {/* Activity stats */}
            <div>
              <span className="text-muted-foreground font-roboto mb-3 block text-[10px] font-bold tracking-wider uppercase">
                Activity
              </span>
              {isLoadingStats ? (
                <Skeleton className="h-16 rounded-lg" />
              ) : (
                <div className="bg-muted/40 flex flex-col items-center gap-1 rounded-lg border py-3">
                  <Bookmark className="text-muted-foreground h-4 w-4" />
                  <span className="text-foreground font-roboto text-2xl font-bold">
                    {stats?.bookmarksCount ?? '—'}
                  </span>
                  <span className="text-muted-foreground font-roboto text-[10px] font-semibold tracking-wider uppercase">
                    Bookmarks
                  </span>
                </div>
              )}
            </div>

            <Separator />

            {/* Scoped permissions */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-roboto text-[10px] font-bold tracking-wider uppercase">
                  Permissions
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-roboto h-7 gap-1 px-2 text-xs font-bold"
                  onClick={onAddGrant}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </Button>
              </div>

              {user.role !== 'admin' && (
                <div className="flex items-center justify-end gap-2">
                  <Label
                    htmlFor="show-revoked-grants"
                    className="text-muted-foreground font-roboto text-xs font-medium"
                  >
                    Show revoked
                  </Label>
                  <Switch
                    id="show-revoked-grants"
                    checked={!!showRevoked}
                    onCheckedChange={onToggleShowRevoked}
                  />
                </div>
              )}

              {user.role === 'admin' ? (
                <div className="bg-muted/40 text-muted-foreground flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
                  <ShieldCheck className="h-4 w-4" />
                  Admins already have full access everywhere.
                </div>
              ) : isLoadingGrants ? (
                <Skeleton className="h-12 rounded-lg" />
              ) : grants.length === 0 ? (
                <p className="text-muted-foreground font-roboto text-sm">
                  No scoped permissions granted yet.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {grants.map((grant) => (
                    <GrantRow
                      key={grant.id}
                      grant={grant}
                      onRevoke={onRevokeGrant}
                      isRevoking={revokingGrantId === grant.id}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
