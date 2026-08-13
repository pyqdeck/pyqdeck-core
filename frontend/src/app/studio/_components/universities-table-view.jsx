'use client';

import * as React from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { DropdownAction } from '@/components/dropdown-action';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  MoreVertical,
  Edit2,
  ExternalLink,
  Trash2,
  GraduationCap,
  Layers,
  Search,
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export function UniversitiesTableView({
  universities = [],
  pagination,
  onEdit,
  onDelete,
  loading = false,
}) {
  const searchParams = useSearchParams();
  const search = searchParams?.get('search') || '';
  const router = useRouter();
  const pathname = usePathname();

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.delete('search');
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  if (loading) {
    return (
      <Card className="border-border/50 overflow-hidden border py-0 shadow-none">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 border-b hover:bg-transparent">
                <TableHead className="text-foreground font-roboto h-12 px-6 font-bold">
                  Institution
                </TableHead>
                <TableHead className="text-foreground font-roboto hidden h-12 px-6 font-bold sm:table-cell">
                  Location
                </TableHead>
                <TableHead className="text-foreground font-roboto h-12 px-6 font-bold">
                  Status
                </TableHead>
                <TableHead className="text-foreground font-roboto h-12 w-[100px] px-6 text-right font-bold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-lg" />
                      <div className="flex flex-col gap-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden px-6 py-4 sm:table-cell">
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <Skeleton className="ml-auto h-9 w-9 rounded-md" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 overflow-hidden border py-0 shadow-none">
      <CardContent className="overflow-x-auto p-0">
        <Table className="min-w-[500px]">
          <TableHeader>
            <TableRow className="bg-muted/30 border-b hover:bg-transparent">
              <TableHead className="text-foreground font-roboto h-12 px-6 font-bold">
                Institution
              </TableHead>
              <TableHead className="text-foreground font-roboto hidden h-12 px-6 font-bold sm:table-cell">
                Location
              </TableHead>
              <TableHead className="text-foreground font-roboto h-12 px-6 font-bold">
                Status
              </TableHead>
              <TableHead className="text-foreground font-roboto h-12 w-[100px] px-6 text-right font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {universities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-72 p-0">
                  <Empty className="border-0 shadow-none">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Search className="size-4" />
                      </EmptyMedia>
                      <EmptyTitle className="text-lg">
                        {search
                          ? 'No matching universities'
                          : 'No universities found'}
                      </EmptyTitle>
                      <EmptyDescription>
                        {search
                          ? `We couldn't find any results for "${search}". Try adjusting your filters or search term.`
                          : 'Add your first institution to start managing your academic database.'}
                      </EmptyDescription>
                    </EmptyHeader>
                    {search && (
                      <Button
                        variant="outline"
                        onClick={clearSearch}
                        className="mt-2 border"
                      >
                        Clear Search
                      </Button>
                    )}
                  </Empty>
                </TableCell>
              </TableRow>
            ) : (
              universities.map((uni) => (
                <TableRow key={uni.id} className="group border-b">
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="border-muted bg-muted/50 size-12 rounded-lg border after:rounded-lg">
                        <AvatarImage
                          src={uni.logo}
                          alt={uni.name}
                          className="rounded-lg object-contain"
                        />
                        <AvatarFallback className="rounded-lg text-lg font-bold">
                          {uni.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col">
                        <span className="text-foreground group-hover:text-primary font-roboto flex items-center gap-1.5 truncate font-bold transition-colors">
                          {uni.name}
                          {uni.websiteUrl && (
                            <Link
                              href={uni.websiteUrl}
                              target="_blank"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ExternalLink className="size-3" />
                            </Link>
                          )}
                        </span>
                        <div className="flex items-center gap-2 leading-none">
                          <span className="text-muted-foreground font-roboto text-[10px] font-bold tracking-wider uppercase">
                            {uni.shortName}
                          </span>
                          <span className="text-muted-foreground/30">•</span>
                          <span className="text-muted-foreground font-roboto text-xs lowercase">
                            /{uni.slug}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden px-6 py-4 sm:table-cell">
                    <div className="flex flex-col">
                      <span className="text-foreground font-roboto text-sm font-semibold">
                        {uni.state || 'N/A'}
                      </span>
                      <span className="text-muted-foreground font-roboto text-xs">
                        {uni.country || 'India'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge
                      variant={uni.isActive !== false ? 'default' : 'secondary'}
                      className={`font-roboto rounded-full px-2.5 py-0.5 font-semibold ${
                        uni.isActive !== false
                          ? 'bg-success/10 text-success hover:bg-success/10'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {uni.isActive !== false ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <DropdownAction
                      label="Management"
                      trigger={
                        <Button
                          variant="ghost"
                          className="hover:bg-muted/50 size-9 border p-0 transition-colors"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="size-4" />
                        </Button>
                      }
                    >
                      <DropdownMenuItem
                        className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                        onClick={() => onEdit(uni)}
                      >
                        <Edit2 className="text-muted-foreground group-hover:text-primary mr-3 size-4 transition-colors" />
                        <span className="font-medium">Edit University</span>
                      </DropdownMenuItem>
                      {uni.websiteUrl && (
                        <DropdownMenuItem
                          asChild
                          className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                        >
                          <Link
                            href={uni.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center"
                          >
                            <ExternalLink className="text-muted-foreground group-hover:text-primary mr-3 size-4 transition-colors" />
                            <span className="font-medium">Visit Website</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="my-1 border-b" />
                      <DropdownMenuItem
                        asChild
                        className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                      >
                        <Link
                          href={`/studio/branches?universityId=${uni.id}`}
                          className="flex w-full items-center"
                        >
                          <Layers className="text-muted-foreground group-hover:text-primary mr-3 size-4 transition-colors" />
                          <span className="text-primary font-medium">
                            View Branches
                          </span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        asChild
                        className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                      >
                        <Link
                          href={`/studio/semesters?universityId=${uni.id}`}
                          className="flex w-full items-center"
                        >
                          <GraduationCap className="text-muted-foreground group-hover:text-warning mr-3 size-4 transition-colors" />
                          <span className="text-warning font-medium">
                            View Semesters
                          </span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1 border-b" />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5"
                        onClick={() => onDelete(uni)}
                      >
                        <Trash2 className="text-destructive/70 group-hover:text-destructive mr-3 size-4 transition-colors" />
                        <span className="font-bold">Delete Institution</span>
                      </DropdownMenuItem>
                    </DropdownAction>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      {pagination && pagination.pages > 1 && (
        <CardFooter className="flex-col items-start gap-4 border-t pt-6 sm:flex-row sm:items-center">
          <Pagination className="mx-0 w-auto justify-start">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={
                    pagination.current > 1
                      ? `?page=${pagination.current - 1}`
                      : '#'
                  }
                  className={
                    pagination.current === 1
                      ? 'pointer-events-none opacity-50'
                      : 'border'
                  }
                />
              </PaginationItem>

              {[...Array(pagination.pages)].map((_, i) => {
                const pageNumber = i + 1;
                // Show current page, first, last, and neighbors
                if (
                  pageNumber === 1 ||
                  pageNumber === pagination.pages ||
                  (pageNumber >= pagination.current - 1 &&
                    pageNumber <= pagination.current + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href={`?page=${pageNumber}`}
                        isActive={pageNumber === pagination.current}
                        className="font-roboto border font-bold"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                if (
                  pageNumber === pagination.current - 2 ||
                  pageNumber === pagination.current + 2
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
                  href={
                    pagination.current < pagination.pages
                      ? `?page=${pagination.current + 1}`
                      : '#'
                  }
                  className={
                    pagination.current === pagination.pages
                      ? 'pointer-events-none opacity-50'
                      : 'border'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="text-muted-foreground font-roboto text-sm sm:ml-auto">
            Showing{' '}
            <span className="text-foreground font-bold">
              {(pagination.current - 1) * 10 + 1}
            </span>{' '}
            to{' '}
            <span className="text-foreground font-bold">
              {Math.min(pagination.current * 10, pagination.total)}
            </span>{' '}
            of{' '}
            <span className="text-foreground font-bold">
              {pagination.total}
            </span>{' '}
            entries
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
