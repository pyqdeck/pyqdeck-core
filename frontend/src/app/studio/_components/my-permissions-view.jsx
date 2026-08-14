import { KeyRound, ShieldCheck, Plus, Clock, X, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const CAPABILITY_LABELS = {
  'content:create': 'Create',
  'content:edit': 'Edit',
  'content:moderate': 'Moderate',
  'content:delete': 'Delete',
};

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

function RequestStatusBadge({ status }) {
  const config = {
    pending: {
      icon: Clock,
      className: 'text-warning border-warning/30',
      label: 'PENDING',
    },
    approved: {
      icon: Check,
      className: 'text-success border-success/30',
      label: 'APPROVED',
    },
    denied: {
      icon: X,
      className: 'text-destructive border-destructive/30',
      label: 'DENIED',
    },
  }[status] || { icon: Clock, className: '', label: status.toUpperCase() };

  const Icon = config.icon;
  return (
    <Badge
      variant="outline"
      className={cn(
        'h-4 gap-1 rounded-full px-1.5 text-[9px] font-bold',
        config.className
      )}
    >
      <Icon className="size-2.5" />
      {config.label}
    </Badge>
  );
}

export function MyPermissionsView({
  role,
  grants = [],
  requests = [],
  onRequestAccess,
}) {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-foreground text-3xl font-bold tracking-tight">
            My Permissions
          </h1>
          <p className="text-muted-foreground text-base">
            What your account can do in the studio right now.
          </p>
        </div>
        {role !== 'admin' && (
          <Button
            size="sm"
            className="font-roboto shrink-0 gap-1.5 border font-bold shadow-none"
            onClick={onRequestAccess}
          >
            <Plus className="h-3.5 w-3.5" />
            Request Access
          </Button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-muted-foreground font-roboto text-xs font-bold tracking-wider uppercase">
          Role
        </span>
        <RoleBadge role={role} />
      </div>

      {role === 'admin' ? (
        <Card className="border shadow-none">
          <CardContent className="text-muted-foreground flex items-center gap-2 py-4 text-sm">
            <ShieldCheck className="h-4 w-4" />
            Admins have full access everywhere -- scoped grants don&apos;t apply
            to you.
          </CardContent>
        </Card>
      ) : grants.length === 0 ? (
        <Card className="border shadow-none">
          <CardContent className="text-muted-foreground flex items-center gap-2 py-4 text-sm">
            <KeyRound className="h-4 w-4" />
            You have no scoped permissions granted yet. Ask an admin if you need
            access to manage content somewhere.
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-2">
          {grants.map((grant) => {
            const isExpired =
              grant.expiresAt && new Date(grant.expiresAt) < new Date();
            return (
              <Card
                key={grant.id}
                className={cn('border shadow-none', isExpired && 'opacity-60')}
              >
                <CardContent className="flex flex-col gap-1.5 py-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-foreground font-roboto text-sm font-bold">
                      {scopeSummary(grant)}
                    </span>
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
                  {grant.expiresAt && !isExpired && (
                    <span className="text-muted-foreground font-roboto text-[11px]">
                      Expires {formatDate(grant.expiresAt)}
                    </span>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {role !== 'admin' && requests.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground font-roboto text-xs font-bold tracking-wider uppercase">
            My Requests
          </span>
          {requests.map((request) => (
            <Card key={request.id} className="border shadow-none">
              <CardContent className="flex flex-col gap-1.5 py-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-foreground font-roboto text-sm font-bold">
                    {scopeSummary(request)}
                  </span>
                  <RequestStatusBadge status={request.status} />
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
                {request.status === 'denied' && request.denialReason && (
                  <span className="text-destructive font-roboto text-[11px]">
                    {request.denialReason}
                  </span>
                )}
                <span className="text-muted-foreground font-roboto text-[11px]">
                  Requested {formatDate(request.createdAt)}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
