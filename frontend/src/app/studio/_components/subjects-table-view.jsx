'use client';

import * as React from 'react';
import {
  Edit,
  Trash2,
  MoreVertical,
  BookOpen,
  Hash,
  FileText,
  Layers,
  GraduationCap,
} from 'lucide-react';
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
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
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

export function SubjectsTableView({
  subjects = [],
  pagination,
  onEdit,
  onDelete,
  loading = false,
}) {
  if (loading) {
    return (
      <Card className="border-border/50 border p-0 shadow-none! outline-none!">
        <CardHeader className="">
          <Skeleton className="mb-2 h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[300px]">Subject</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Units</TableHead>
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
    <Card className="border-border/50 bg-background overflow-hidden rounded-3xl border p-0 shadow-none">
      <CardContent className="overflow-x-auto p-0">
        <Table className="min-w-[400px]">
          {/* HEADER */}
          <TableHeader className="bg-muted/30 backdrop-blur">
            <TableRow className="border-border/50 border-b hover:bg-transparent">
              <TableHead className="text-muted-foreground h-14 px-6 text-[11px] font-semibold tracking-[0.12em] uppercase">
                Subject
              </TableHead>

              <TableHead className="text-muted-foreground hidden text-[11px] font-semibold tracking-[0.12em] uppercase sm:table-cell">
                Code
              </TableHead>

              <TableHead className="text-muted-foreground text-[11px] font-semibold tracking-[0.12em] uppercase">
                Status
              </TableHead>

              <TableHead className="text-muted-foreground hidden text-center text-[11px] font-semibold tracking-[0.12em] uppercase sm:table-cell">
                Units
              </TableHead>

              <TableHead className="text-muted-foreground w-[80px] pr-6 text-right text-[11px] font-semibold tracking-[0.12em] uppercase">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody>
            {subjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-52 text-center">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="bg-muted text-muted-foreground flex h-14 w-14 items-center justify-center rounded-2xl">
                      <BookOpen className="h-6 w-6" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-semibold">No subjects found</p>

                      <p className="text-muted-foreground text-sm">
                        Curriculum subjects will appear here.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              subjects.map((subject) => (
                <TableRow
                  key={subject.id}
                  className="group border-border/40 odd:bg-background even:bg-muted/[0.015] hover:bg-muted/50 border-b transition-all"
                >
                  {/* SUBJECT */}
                  <TableCell className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary ring-primary/10 flex h-11 w-11 items-center justify-center rounded-2xl ring-1 transition-transform duration-200 group-hover:scale-105">
                        <BookOpen className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 space-y-1">
                        <p className="group-hover:text-primary truncate text-sm font-semibold tracking-tight transition-colors">
                          {subject.name}
                        </p>

                        <p className="text-muted-foreground truncate text-xs">
                          /{subject.slug}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* CODE */}
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant="secondary"
                      className="bg-muted text-muted-foreground rounded-xl border-0 px-2.5 py-1 font-mono text-[11px] font-medium tracking-tight"
                    >
                      {subject.code || 'NO-CODE'}
                    </Badge>
                  </TableCell>

                  {/* STATUS */}
                  <TableCell>
                    <Badge className="rounded-xl border-0 bg-emerald-500/10 px-2.5 py-1 font-medium text-emerald-600 shadow-none dark:text-emerald-400">
                      {subject.isActive ? 'Active' : 'Archived'}
                    </Badge>
                  </TableCell>

                  {/* UNITS */}
                  <TableCell className="hidden text-center sm:table-cell">
                    <div className="bg-muted/70 text-muted-foreground inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium">
                      <Layers className="h-3.5 w-3.5" />

                      <span>{subject.units?.length || 0} Units</span>
                    </div>
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell className="pr-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-muted rounded-2xl transition-all duration-200 data-[state=open]:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="border-border/50 bg-popover w-56 rounded-2xl border p-2"
                      >
                        <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                          Manage Subject
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => onEdit?.(subject)}
                          className="cursor-pointer rounded-xl"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Subject
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer rounded-xl">
                          <FileText className="mr-2 h-4 w-4" />
                          View Syllabus
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => onDelete?.(subject)}
                          className="text-destructive focus:text-destructive cursor-pointer rounded-xl"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Subject
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

      {/* PAGINATION */}
      {pagination && pagination.pages > 1 && (
        <CardFooter className="border-border/50 border-t px-6 py-4">
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Pagination className="mx-0 w-auto">
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
                        : 'rounded-xl'
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
                          className="rounded-xl"
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
                        : 'rounded-xl'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <div className="text-muted-foreground text-sm">
              Showing{' '}
              <span className="text-foreground font-semibold">
                {(pagination.current - 1) * 10 + 1}
              </span>{' '}
              to{' '}
              <span className="text-foreground font-semibold">
                {Math.min(pagination.current * 10, pagination.total)}
              </span>{' '}
              of{' '}
              <span className="text-foreground font-semibold">
                {pagination.total}
              </span>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
