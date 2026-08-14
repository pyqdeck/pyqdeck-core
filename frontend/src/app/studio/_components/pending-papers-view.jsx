import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  FileText,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from '@/components/ui/empty';

export function PendingPapersView({ papers, onApprove, onReject, loading }) {
  const header = (
    <CardHeader className="flex flex-row items-center justify-between pb-4">
      <div className="flex items-center gap-4">
        <div className="bg-warning/10 text-warning dark:bg-warning/10 dark:text-warning flex h-12 w-12 items-center justify-center rounded-xl shadow-sm">
          <Clock className="h-6 w-6" />
        </div>
        <div>
          <CardTitle className="font-roboto text-xl font-bold tracking-tight">
            Moderation Queue
          </CardTitle>
          <CardDescription className="font-roboto">
            {papers?.length || 0} paper uploads awaiting review and approval
          </CardDescription>
        </div>
      </div>
      <Badge
        variant="secondary"
        className="bg-warning/10 text-warning dark:bg-warning/10 dark:text-warning"
      >
        Needs Attention
      </Badge>
    </CardHeader>
  );

  if (loading) {
    return (
      <Card className="border-border/50 hover:border-warning/20 border shadow-none transition-all">
        {header}
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-roboto text-foreground h-12 py-0 font-bold">
                  Document Details
                </TableHead>
                <TableHead className="font-roboto text-foreground h-12 py-0 font-bold">
                  Academic Context
                </TableHead>
                <TableHead className="font-roboto text-foreground h-12 py-0 font-bold">
                  Uploaded On
                </TableHead>
                <TableHead className="font-roboto text-foreground h-12 py-0 text-right font-bold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(3)].map((_, i) => (
                <TableRow key={i} className="hover:bg-transparent">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-lg" />
                      <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-3 w-[80px]" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>
                  <TableCell className="py-4">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <Skeleton className="ml-auto h-8 w-8 rounded-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  if (!papers || papers.length === 0) {
    return (
      <Card className="border-border/50 hover:border-warning/20 border shadow-none transition-all">
        {header}
        <CardContent className="py-12">
          <Empty className="border-none shadow-none">
            <EmptyMedia
              variant="icon"
              className="h-20 w-20 rounded-full bg-slate-50 dark:bg-slate-900/50"
            >
              <CheckCircle className="text-success/50 h-10 w-10" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle className="font-roboto text-xl font-bold">
                Moderation Queue Clear
              </EmptyTitle>
              <EmptyDescription className="font-roboto text-base">
                You&apos;re all caught up! No papers awaiting review. 🎉
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 hover:border-warning/20 border shadow-none transition-all">
      {header}
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-roboto text-foreground h-12 py-0 font-bold">
                Document Details
              </TableHead>
              <TableHead className="font-roboto text-foreground h-12 py-0 font-bold">
                Academic Context
              </TableHead>
              <TableHead className="font-roboto text-foreground h-12 py-0 font-bold">
                Uploaded On
              </TableHead>
              <TableHead className="font-roboto text-foreground h-12 py-0 text-right font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {papers.map((paper) => (
              <TableRow
                key={paper.id}
                className="group hover:bg-warning/[0.02] transition-colors"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-roboto text-foreground line-clamp-1 max-w-[250px] font-bold">
                        {paper.title || 'Untitled Paper'}
                      </span>
                      <span className="text-muted-foreground font-roboto text-xs tracking-wider uppercase">
                        {paper.status || 'Pending Review'}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="outline"
                    className="border-primary/20 bg-primary/5 text-primary dark:border-primary/30 dark:bg-primary/10 dark:text-primary px-2 py-0.5"
                  >
                    {paper.subjectOfferingId?.slug || 'General'}
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  <div className="text-muted-foreground font-roboto flex items-center gap-2 text-sm">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(paper.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-warning/10 hover:text-warning dark:hover:bg-warning/10 h-8 w-8 rounded-full transition-all"
                      >
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel className="font-roboto">
                        Moderation Actions
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/studio/papers/${paper.slug}`}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Review Document</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-success focus:bg-success/10 focus:text-success dark:focus:bg-success/10 flex cursor-pointer items-center gap-2"
                        onClick={() => onApprove(paper)}
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Approve Paper</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive dark:focus:bg-destructive/10 flex cursor-pointer items-center gap-2"
                        onClick={() => onReject(paper)}
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Reject Paper</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
