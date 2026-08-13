'use client';

import * as React from 'react';
import {
  MoreVertical,
  ShieldCheck,
  UserCog,
  Calendar,
  ExternalLink,
  UserMinus,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Ban,
  ShieldOff,
  Bookmark,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const ROLE_TABS = [
  { label: 'All Users', value: '' },
  { label: 'Admins', value: 'admin' },
  { label: 'Editors', value: 'editor' },
  { label: 'Members', value: 'normal' },
];

const PAGE_SIZES = [10, 25, 50];

function SortIcon({ field, currentSortBy, currentSortOrder }) {
  if (currentSortBy !== field)
    return <ChevronsUpDown className="ml-1 inline h-3.5 w-3.5 opacity-40" />;
  return currentSortOrder === 'asc' ? (
    <ChevronUp className="ml-1 inline h-3.5 w-3.5" />
  ) : (
    <ChevronDown className="ml-1 inline h-3.5 w-3.5" />
  );
}

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

function UserDetailDialog({ user, stats, isLoadingStats, onClose }) {
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
                <div className="grid grid-cols-2 gap-3">
                  <Skeleton className="h-16 rounded-lg" />
                  <Skeleton className="h-16 rounded-lg" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/40 flex flex-col items-center gap-1 rounded-lg border py-3">
                    <Bookmark className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground font-roboto text-2xl font-bold">
                      {stats?.bookmarksCount ?? '—'}
                    </span>
                    <span className="text-muted-foreground font-roboto text-[10px] font-semibold tracking-wider uppercase">
                      Bookmarks
                    </span>
                  </div>
                  <div className="bg-muted/40 flex flex-col items-center gap-1 rounded-lg border py-3">
                    <FileText className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground font-roboto text-2xl font-bold">
                      {stats?.solutionsCount ?? '—'}
                    </span>
                    <span className="text-muted-foreground font-roboto text-[10px] font-semibold tracking-wider uppercase">
                      Solutions
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function UsersTableView({
  users = [],
  pagination,
  onUpdateRole,
  onBanUser,
  onUnbanUser,
  onOpenDetail,
  onCloseDetail,
  selectedUser,
  userStats,
  isLoadingStats,
  isUpdating,
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const search = searchParams.get('search') || '';
  const currentRole = searchParams.get('role') || '';
  const currentSortBy = searchParams.get('sortBy') || 'createdAt';
  const currentSortOrder = searchParams.get('sortOrder') || 'desc';
  const currentIsActive = searchParams.get('isActive') || '';

  // Builds a new href preserving all current URL params, with overrides applied.
  // Resets page to 1 unless 'page' is explicitly in overrides.
  const buildHref = (overrides = {}) => {
    const params = new URLSearchParams(searchParams.toString());
    const hasPageOverride = 'page' in overrides;

    Object.entries(overrides).forEach(([key, val]) => {
      if (val === null || val === '') {
        params.delete(key);
      } else {
        params.set(key, String(val));
      }
    });

    if (!hasPageOverride) params.set('page', '1');

    return `${pathname}?${params.toString()}`;
  };

  const buildSortHref = (field) => {
    if (currentSortBy === field) {
      return buildHref({
        sortBy: field,
        sortOrder: currentSortOrder === 'asc' ? 'desc' : 'asc',
      });
    }
    return buildHref({ sortBy: field, sortOrder: 'desc' });
  };

  const showingBanned = currentIsActive === 'false';

  return (
    <div className="flex flex-col gap-4">
      {/* Role filter + banned toggle */}
      <div className="flex flex-wrap items-center gap-1.5">
        {ROLE_TABS.map((tab) => (
          <Link key={tab.value} href={buildHref({ role: tab.value || null })}>
            <Button
              variant={currentRole === tab.value ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'font-roboto h-8 rounded-full border px-3.5 text-xs font-bold',
                currentRole !== tab.value &&
                  'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </Button>
          </Link>
        ))}

        <Link
          href={buildHref({ isActive: showingBanned ? null : 'false' })}
          className="ml-auto"
        >
          <Button
            variant={showingBanned ? 'destructive' : 'outline'}
            size="sm"
            className={cn(
              'font-roboto h-8 rounded-full border px-3.5 text-xs font-bold',
              !showingBanned && 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Ban className="mr-1.5 h-3 w-3" />
            {showingBanned ? 'Showing Banned' : 'Show Banned'}
          </Button>
        </Link>
      </div>

      <Card className="border-border/50 overflow-hidden border p-0 shadow-none">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 border-b hover:bg-transparent">
                <TableHead className="text-foreground font-roboto h-12 w-[400px] px-6 font-bold">
                  User Identity
                </TableHead>
                <TableHead className="text-foreground font-roboto h-12 px-6 font-bold">
                  <Link
                    href={buildSortHref('role')}
                    className="hover:text-foreground inline-flex items-center transition-colors"
                  >
                    Role
                    <SortIcon
                      field="role"
                      currentSortBy={currentSortBy}
                      currentSortOrder={currentSortOrder}
                    />
                  </Link>
                </TableHead>
                <TableHead className="text-foreground font-roboto h-12 px-6 font-bold">
                  Affiliation
                </TableHead>
                <TableHead className="text-foreground font-roboto h-12 px-6 font-bold">
                  <Link
                    href={buildSortHref('createdAt')}
                    className="hover:text-foreground inline-flex items-center transition-colors"
                  >
                    Joined
                    <SortIcon
                      field="createdAt"
                      currentSortBy={currentSortBy}
                      currentSortOrder={currentSortOrder}
                    />
                  </Link>
                </TableHead>
                <TableHead className="text-foreground font-roboto h-12 w-[100px] px-6 text-right font-bold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-muted-foreground font-roboto h-48 text-center italic"
                  >
                    {search ? 'No users match your search.' : 'No users found.'}
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow
                    key={user.clerkId}
                    className={cn(
                      'group border-b',
                      user.isActive === false &&
                        'bg-destructive/[0.03] hover:bg-destructive/[0.06]'
                    )}
                  >
                    {/* Identity */}
                    <TableCell className="px-6 py-3">
                      <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                          <Avatar className="border-muted bg-muted/50 h-12 w-12 rounded-full border">
                            <AvatarImage
                              src={user.avatarUrl}
                              alt={user.name}
                              className="rounded-full"
                            />
                            <AvatarFallback className="rounded-full">
                              {user.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {user.isActive === false && (
                            <div className="bg-destructive absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-white">
                              <Ban className="h-2 w-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <button
                            className="text-foreground group-hover:text-primary font-roboto flex cursor-pointer items-center gap-1 text-left font-bold transition-colors"
                            onClick={() => onOpenDetail(user)}
                          >
                            {user.name}
                            {user.isMe && (
                              <Badge className="bg-primary/10 text-primary hover:bg-primary/10 ml-1 h-4 rounded-full border-none px-1.5 text-[9px] font-bold">
                                YOU
                              </Badge>
                            )}
                            {user.isActive === false && (
                              <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/10 ml-1 h-4 rounded-full border-none px-1.5 text-[9px] font-bold">
                                BANNED
                              </Badge>
                            )}
                            <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                          </button>
                          <span className="text-muted-foreground font-roboto text-xs lowercase">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      <RoleBadge role={user.role} />
                    </TableCell>

                    {/* Affiliation */}
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-foreground font-roboto text-sm font-medium">
                          {user.university?.shortName || 'Independent'}
                        </span>
                        <span className="text-muted-foreground font-roboto text-[10px] font-bold tracking-tight uppercase">
                          {user.branch?.name || 'Global'}
                        </span>
                      </div>
                    </TableCell>

                    {/* Joined */}
                    <TableCell className="px-6 py-3">
                      <div className="text-muted-foreground font-roboto flex items-center gap-2 text-sm">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(user.createdAt).toLocaleDateString(
                          undefined,
                          {
                            month: 'short',
                            year: 'numeric',
                          }
                        )}
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-6 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="hover:bg-muted/50 h-9 w-9 border p-0 transition-colors"
                            disabled={isUpdating || user.isMe}
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="font-roboto w-56 border p-2 shadow-none"
                        >
                          <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-semibold tracking-wider uppercase">
                            Permissions
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="my-1 border-b" />
                          <DropdownMenuItem
                            className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                            onClick={() => onUpdateRole(user.clerkId, 'admin')}
                          >
                            <ShieldCheck className="text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors" />
                            <span className="font-medium">Make Admin</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                            onClick={() => onUpdateRole(user.clerkId, 'editor')}
                          >
                            <UserCog className="text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors" />
                            <span className="font-medium">Assign Editor</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5"
                            onClick={() => onUpdateRole(user.clerkId, 'normal')}
                          >
                            <UserMinus className="text-destructive/70 group-hover:text-destructive mr-3 h-4 w-4 transition-colors" />
                            <span className="font-bold">
                              Revoke Permissions
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="my-1 border-b" />
                          {user.isActive !== false ? (
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5"
                              onClick={() => onBanUser(user.clerkId)}
                            >
                              <Ban className="text-destructive/70 group-hover:text-destructive mr-3 h-4 w-4 transition-colors" />
                              <span className="font-bold">Ban User</span>
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="focus:bg-success/5 text-success group cursor-pointer rounded-md py-2.5"
                              onClick={() => onUnbanUser(user.clerkId)}
                            >
                              <ShieldOff className="text-success/70 group-hover:text-success mr-3 h-4 w-4 transition-colors" />
                              <span className="font-bold">Unban User</span>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>

        {pagination && pagination.pages >= 1 && (
          <CardFooter className="border-t">
            {pagination.pages > 1 && (
              <Pagination className="mx-0 w-auto justify-start">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={buildHref({
                        page: Math.max(1, pagination.page - 1),
                      })}
                      className={cn(
                        'border font-bold',
                        pagination.page === 1 &&
                          'pointer-events-none opacity-50'
                      )}
                    />
                  </PaginationItem>

                  {[...Array(pagination.pages)].map((_, i) => {
                    const pageNumber = i + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === pagination.pages ||
                      (pageNumber >= pagination.page - 1 &&
                        pageNumber <= pagination.page + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href={buildHref({ page: pageNumber })}
                            isActive={pageNumber === pagination.page}
                            className="font-roboto border font-bold"
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    if (
                      pageNumber === pagination.page - 2 ||
                      pageNumber === pagination.page + 2
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href={buildHref({
                        page: Math.min(pagination.pages, pagination.page + 1),
                      })}
                      className={cn(
                        'border font-bold',
                        pagination.page === pagination.pages &&
                          'pointer-events-none opacity-50'
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}

            <div className="ml-auto flex items-center gap-3">
              <span className="text-muted-foreground font-roboto text-sm">
                Showing{' '}
                <span className="text-foreground font-bold">
                  {(pagination.page - 1) * pagination.limit + 1}
                </span>{' '}
                to{' '}
                <span className="text-foreground font-bold">
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}
                </span>{' '}
                of{' '}
                <span className="text-foreground font-bold">
                  {pagination.total}
                </span>{' '}
                entries
              </span>

              {/* Per-page selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-roboto h-8 border font-bold"
                  >
                    {pagination.limit} / page
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="font-roboto border p-1 shadow-none"
                >
                  {PAGE_SIZES.map((size) => (
                    <DropdownMenuItem key={size} asChild>
                      <Link
                        href={buildHref({ limit: size, page: 1 })}
                        className={cn(
                          'cursor-pointer rounded-md font-bold',
                          pagination.limit === size && 'bg-muted'
                        )}
                      >
                        {size} per page
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardFooter>
        )}
      </Card>

      <UserDetailDialog
        user={selectedUser}
        stats={userStats}
        isLoadingStats={isLoadingStats}
        onClose={onCloseDetail}
      />
    </div>
  );
}
