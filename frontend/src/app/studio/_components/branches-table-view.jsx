'use client';

import * as React from 'react';
import {
  Edit,
  Trash2,
  MoreVertical,
  Building,
  Hash,
  GraduationCap,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export function BranchesTableView({
  branches = [],
  pagination,
  onEdit,
  onDelete,
  loading = false,
}) {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  if (loading) {
    return (
      <Card className="border-border/50 overflow-hidden border p-0 shadow-none">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[300px]">Branch</TableHead>
                <TableHead>Short Name</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded-full" />
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
    <Card className="border-border/50 overflow-hidden border p-0 shadow-none">
      <CardContent className="overflow-x-auto p-0">
        <Table className="min-w-[560px]">
          <TableHeader>
            <TableRow className="bg-muted/30 border-b hover:bg-transparent">
              <TableHead className="font-roboto text-foreground h-12 px-6 font-bold tracking-wider uppercase">
                Branch
              </TableHead>
              <TableHead className="font-roboto text-foreground hidden h-12 px-6 font-bold tracking-wider uppercase sm:table-cell">
                Short Name
              </TableHead>
              <TableHead className="font-roboto text-foreground h-12 px-6 font-bold tracking-wider uppercase">
                Institution
              </TableHead>
              <TableHead className="font-roboto text-foreground hidden h-12 px-6 text-center font-bold tracking-wider uppercase sm:table-cell">
                Code
              </TableHead>
              <TableHead className="font-roboto text-foreground h-12 px-6 font-bold tracking-wider uppercase">
                Status
              </TableHead>
              <TableHead className="text-foreground h-12 w-[100px] px-6 text-right font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {branches.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="font-roboto text-muted-foreground h-48 text-center italic"
                >
                  {search
                    ? 'No branches match your search criteria.'
                    : 'No branches found. Connect an institution to get started.'}
                </TableCell>
              </TableRow>
            ) : (
              branches.map((branch) => (
                <TableRow
                  key={branch.id}
                  className="group hover:bg-muted/30 border-b transition-colors"
                >
                  <TableCell className="px-6 py-3">
                    <div className="flex min-w-0 flex-col">
                      <span className="font-roboto text-foreground group-hover:text-primary cursor-pointer truncate font-bold transition-colors">
                        {branch.name}
                      </span>
                      <span className="text-muted-foreground font-roboto text-xs italic">
                        /{branch.slug}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant="outline"
                      className="font-roboto border font-bold uppercase"
                    >
                      {branch.shortName}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <Building className="text-muted-foreground h-4 w-4" />
                        <span className="font-roboto text-sm font-medium">
                          {branch.universityId?.name || 'Unknown'}
                        </span>
                      </div>
                      {branch.universityId?.shortName && (
                        <div className="flex items-center gap-2">
                          <div className="w-4" />{' '}
                          {/* Spacer to align with icon */}
                          <Badge
                            variant="secondary"
                            className="font-roboto px-1.5 py-0 text-[10px] font-bold"
                          >
                            {branch.universityId.shortName}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-center sm:table-cell">
                    <div className="flex items-center justify-center gap-1">
                      <Hash className="text-muted-foreground h-3 w-3" />
                      <span className="font-mono text-xs font-bold">
                        {branch.branchCode || '--'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={branch.isActive ? 'success' : 'secondary'}
                      className={`font-roboto border font-bold ${
                        branch.isActive
                          ? 'bg-success/10 text-success hover:bg-success/10 dark:bg-success/10 dark:text-success'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {branch.isActive ? 'Active' : 'Archived'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="hover:bg-muted/50 h-9 w-9 rounded-md border p-0 transition-colors"
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="font-roboto w-56 border p-2 shadow-none"
                      >
                        <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-semibold tracking-wider uppercase">
                          Branch Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="my-1 border-b" />
                        <DropdownMenuItem
                          className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                          onClick={() => onEdit(branch)}
                        >
                          <Edit className="text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors" />
                          <span className="font-medium">Update Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          asChild
                          className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                        >
                          <Link
                            href={`/studio/semesters?branchId=${branch.id}`}
                            className="flex w-full items-center"
                          >
                            <GraduationCap className="text-muted-foreground group-hover:text-warning mr-3 h-4 w-4 transition-colors" />
                            <span className="text-warning font-medium">
                              View Semesters
                            </span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1 border-b" />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5"
                          onClick={() => onDelete(branch)}
                        >
                          <Trash2 className="text-destructive/70 group-hover:text-destructive mr-3 h-4 w-4 transition-colors" />
                          <span className="font-bold">Delete Branch</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
