import { KeyRound, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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

export function MyPermissionsView({ role, grants = [] }) {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          My Permissions
        </h1>
        <p className="text-muted-foreground text-base">
          What your account can do in the studio right now.
        </p>
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
    </div>
  );
}
