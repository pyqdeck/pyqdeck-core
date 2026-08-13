import {
  MoreVertical,
  Edit2,
  Trash2,
  Building2,
  GraduationCap,
  BookOpen,
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
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function SemestersTableView({
  semesters = [],
  pagination,
  onEdit,
  onDelete,
  loading = false,
}) {
  const searchParams = useSearchParams();
  const search = searchParams?.get('search') || '';

  if (loading) {
    return (
      <Card className="border-border/50 overflow-hidden border p-0 shadow-none">
        <CardContent className="overflow-x-auto p-0">
          <Table className="min-w-[480px]">
            <TableHeader>
              <TableRow className="bg-muted/30 border-b hover:bg-transparent">
                <TableHead className="font-roboto text-foreground h-12 w-[200px] px-6 font-bold tracking-wider uppercase">
                  Semester
                </TableHead>
                <TableHead className="font-roboto text-foreground hidden h-12 px-6 font-bold tracking-wider uppercase sm:table-cell">
                  Title / Label
                </TableHead>
                <TableHead className="font-roboto text-foreground h-12 px-6 font-bold tracking-wider uppercase">
                  Branch
                </TableHead>
                <TableHead className="font-roboto text-foreground hidden h-12 px-6 font-bold tracking-wider uppercase sm:table-cell">
                  URL Path
                </TableHead>
                <TableHead className="font-roboto text-foreground h-12 w-[100px] px-6 text-right font-bold tracking-wider uppercase">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i} className="border-b">
                  <TableCell className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 rounded-lg" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </TableCell>
                  <TableCell className="hidden px-6 py-3 sm:table-cell">
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell className="px-6 py-3">
                    <div className="flex flex-col gap-1.5">
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </TableCell>
                  <TableCell className="hidden px-6 py-3 sm:table-cell">
                    <Skeleton className="h-5 w-24 rounded" />
                  </TableCell>
                  <TableCell className="px-6 py-3 text-right">
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
    <Card className="border-border/50 overflow-hidden border p-0 shadow-none">
      <CardContent className="overflow-x-auto p-0">
        <Table className="min-w-[480px]">
          <TableHeader>
            <TableRow className="bg-muted/30 border-b hover:bg-transparent">
              <TableHead className="font-roboto text-foreground h-12 w-[200px] px-6 font-bold tracking-wider uppercase">
                Semester
              </TableHead>
              <TableHead className="font-roboto text-foreground hidden h-12 px-6 font-bold tracking-wider uppercase sm:table-cell">
                Title / Label
              </TableHead>
              <TableHead className="font-roboto text-foreground h-12 px-6 font-bold tracking-wider uppercase">
                Branch
              </TableHead>
              <TableHead className="font-roboto text-foreground hidden h-12 px-6 font-bold tracking-wider uppercase sm:table-cell">
                URL Path
              </TableHead>
              <TableHead className="font-roboto text-foreground h-12 w-[100px] px-6 text-right font-bold tracking-wider uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {semesters.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="font-roboto text-muted-foreground h-48 text-center italic"
                >
                  {search
                    ? 'No semesters match your search criteria.'
                    : 'Select a branch to view or manage its semesters.'}
                </TableCell>
              </TableRow>
            ) : (
              semesters.map((sem) => (
                <TableRow
                  key={sem.id}
                  className="group hover:bg-muted/30 border-b transition-colors"
                >
                  <TableCell className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="border-info/20 bg-info/5 text-info dark:border-info/30 dark:bg-info/10 dark:text-info flex h-9 w-9 items-center justify-center rounded-lg border">
                        <span className="font-roboto text-sm font-bold">
                          {sem.number}
                        </span>
                      </div>
                      <span className="font-roboto text-foreground group-hover:text-primary font-bold transition-colors">
                        Semester {sem.number}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden px-6 py-3 sm:table-cell">
                    <span className="font-roboto text-muted-foreground text-sm italic">
                      {sem.title || `Standard Semester ${sem.number}`}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-3">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="text-muted-foreground h-4 w-4" />
                        <span className="font-roboto text-sm font-medium">
                          {sem?.branchId?.name || 'Unknown Branch'}
                        </span>
                      </div>
                      {sem?.branchId?.universityId &&
                        typeof sem.branchId.universityId === 'object' && (
                          <div className="mt-0.5 flex items-center gap-2">
                            <Building2 className="text-muted-foreground/60 h-3 w-3" />
                            <span className="font-roboto text-muted-foreground text-[10px] tracking-wider uppercase">
                              {sem.branchId.universityId?.shortName ||
                                'Institution'}
                            </span>
                          </div>
                        )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden px-6 py-3 sm:table-cell">
                    <code className="bg-muted font-roboto text-muted-foreground rounded px-1.5 py-0.5 text-xs font-bold">
                      /{sem.slug}
                    </code>
                  </TableCell>
                  <TableCell className="px-6 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="hover:bg-muted/50 h-9 w-9 border p-0 transition-colors"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="font-roboto w-56 border p-2 shadow-none"
                      >
                        <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-semibold tracking-wider uppercase">
                          Semester Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="my-1 border-b" />
                        <DropdownMenuItem
                          className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                          onClick={() => onEdit?.(sem)}
                        >
                          <Edit2 className="text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors" />
                          <span className="font-medium">Update Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          asChild
                          className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                        >
                          <Link
                            href={`/studio/subjects?semesterId=${sem.id}`}
                            className="flex w-full items-center"
                          >
                            <BookOpen className="text-muted-foreground group-hover:text-success mr-3 h-4 w-4 transition-colors" />
                            <span className="text-success font-medium">
                              View Subjects
                            </span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1 border-b" />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5"
                          onClick={() => onDelete?.(sem)}
                        >
                          <Trash2 className="text-destructive/70 group-hover:text-destructive mr-3 h-4 w-4 transition-colors" />
                          <span className="font-bold">Delete Semester</span>
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
