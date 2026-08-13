'use client';

import * as React from 'react';
import {
  Trash2,
  MoreVertical,
  BookOpen,
  Calendar,
  Layers,
  GraduationCap,
  Building,
  ClipboardList,
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

export function OfferingsTableView({
  offerings = [],
  pagination,
  search,
  onDelete,
  loading = false,
}) {
  if (loading) {
    return (
      <Card className="border-border/50 border p-0 shadow-none">
        <CardHeader className="pb-3">
          <Skeleton className="mb-2 h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[300px]">Offering</TableHead>
                <TableHead>Hierarchy</TableHead>
                <TableHead>Regulation</TableHead>
                <TableHead>Year</TableHead>
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
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
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
    <Card className="border-border/50 border p-0 shadow-none">
      <CardContent className="overflow-x-auto p-0">
        <Table className="min-w-[480px]">
          <TableHeader>
            <TableRow className="text-muted-foreground border-b text-xs font-bold tracking-wider uppercase hover:bg-transparent">
              <TableHead className="text-foreground w-[300px] font-bold">
                Subject Offering
              </TableHead>
              <TableHead className="text-foreground font-bold">
                Hierarchy
              </TableHead>
              <TableHead className="text-foreground hidden font-bold sm:table-cell">
                Regulation
              </TableHead>
              <TableHead className="text-foreground hidden font-bold sm:table-cell">
                Academic Year
              </TableHead>
              <TableHead className="text-foreground w-[100px] text-right text-xs font-bold tracking-widest uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offerings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="font-roboto text-muted-foreground h-48 text-center italic"
                >
                  {search
                    ? 'No subject offerings match your criteria.'
                    : 'No subject offerings defined for this track.'}
                </TableCell>
              </TableRow>
            ) : (
              offerings.map((offering) => (
                <TableRow
                  key={offering.id}
                  className="group hover:bg-muted/30 border-b transition-colors"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="border-success/20 bg-success/5 text-success dark:border-success/30 dark:bg-success/10 dark:text-success flex h-10 w-10 items-center justify-center rounded-xl border transition-transform group-hover:scale-110">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div className="flex min-w-0 flex-col">
                        <span className="font-roboto text-foreground group-hover:text-primary cursor-pointer truncate font-bold transition-colors">
                          {offering.subjectId?.name || 'Unknown Subject'}
                        </span>
                        <span className="text-muted-foreground font-roboto text-xs italic">
                          {offering.subjectId?.subjectCode || 'No Code'}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="font-roboto text-foreground flex items-center gap-1.5 text-xs font-medium">
                        <Building className="text-muted-foreground h-3 w-3" />
                        <span>
                          {offering.universityId?.shortName ||
                            offering.universityId?.name ||
                            'N/A'}
                        </span>
                      </div>
                      <div className="font-roboto text-muted-foreground flex items-center gap-1.5 text-[10px]">
                        <GraduationCap className="h-3 w-3" />
                        <span>
                          {offering.branchId?.shortName ||
                            offering.branchId?.name ||
                            'N/A'}
                        </span>
                        <span className="mx-1">•</span>
                        <span className="text-primary font-bold">
                          Sem {offering.semesterId?.number || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant="outline"
                      className="bg-muted/30 border-primary/20 text-primary dark:border-primary/30 dark:text-primary border font-mono font-bold"
                    >
                      {offering.regulation || 'General'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="font-roboto flex items-center gap-2 text-sm font-medium">
                      <Calendar className="text-muted-foreground h-4 w-4" />
                      {offering.academicYear || 'Ongoing'}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="hover:bg-muted/50 h-9 w-9 rounded-md border p-0 transition-colors"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="font-roboto w-56 border p-2 shadow-none"
                      >
                        <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-[10px] font-bold tracking-widest uppercase">
                          Offering Controls
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="my-1 border-b" />
                        <DropdownMenuItem className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5">
                          <ClipboardList className="text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors" />
                          <span className="font-medium">View Syllabus</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5">
                          <Layers className="text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors" />
                          <span className="text-primary font-medium">
                            Learning Materials
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1 border-b" />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5"
                          onClick={() => onDelete?.(offering.id)}
                        >
                          <Trash2 className="text-destructive/70 group-hover:text-destructive mr-3 h-4 w-4 transition-colors" />
                          <span className="font-bold">Withdraw Offering</span>
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
        </CardFooter>
      )}
    </Card>
  );
}
