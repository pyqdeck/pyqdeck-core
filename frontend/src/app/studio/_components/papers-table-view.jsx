'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  ListOrdered,
  FileText,
} from 'lucide-react';
import { DropdownAction } from '@/components/dropdown-action';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

const STATUS_STYLES = {
  draft: 'bg-muted text-muted-foreground',
  pending: 'bg-warning/10 text-warning',
  approved: 'bg-success/10 text-success',
  rejected: 'bg-destructive/10 text-destructive',
};

function StatusBadge({ status }) {
  return (
    <Badge className={`font-roboto border font-bold capitalize ${STATUS_STYLES[status] || STATUS_STYLES.draft}`}>
      {status}
    </Badge>
  );
}

export function PapersTableView({
  papers = [],
  onEdit,
  onDelete,
  onSetStatus,
}) {
  if (papers.length === 0) {
    return (
      <Card className="border shadow-none">
        <CardContent className="py-16">
          <Empty className="border-none shadow-none">
            <EmptyMedia variant="icon" className="bg-muted h-16 w-16 rounded-2xl">
              <FileText className="text-muted-foreground h-8 w-8" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle className="font-roboto text-lg font-bold">
                No papers yet
              </EmptyTitle>
              <EmptyDescription className="font-roboto">
                Add the first exam paper for this offering.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border p-0 shadow-none">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-transparent">
              <TableHead className="font-roboto h-12 px-6 font-medium">
                Title
              </TableHead>
              <TableHead className="font-roboto h-12 px-6 font-medium">
                Year
              </TableHead>
              <TableHead className="font-roboto h-12 px-6 font-medium">
                Type
              </TableHead>
              <TableHead className="font-roboto h-12 px-6 font-medium">
                Status
              </TableHead>
              <TableHead className="font-roboto h-12 w-[80px] px-6 text-right font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {papers.map((paper) => (
              <TableRow key={paper.id}>
                <TableCell className="px-6 py-4">
                  <Link
                    href={`/studio/papers/${paper.slug}`}
                    className="hover:text-primary font-medium transition-colors"
                  >
                    {paper.title}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground px-6 py-4">
                  {paper.examYear}
                </TableCell>
                <TableCell className="text-muted-foreground px-6 py-4 capitalize">
                  {paper.examType}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <StatusBadge status={paper.status} />
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <DropdownAction tooltip="Paper actions">
                    <DropdownMenuItem asChild className="cursor-pointer rounded-md py-2.5">
                      <Link href={`/studio/papers/${paper.slug}`} className="flex w-full items-center">
                        <ListOrdered className="text-muted-foreground mr-3 h-4 w-4" />
                        <span className="font-medium">Manage Questions</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer rounded-md py-2.5"
                      onClick={() => onEdit(paper)}
                    >
                      <Edit2 className="text-muted-foreground mr-3 h-4 w-4" />
                      <span className="font-medium">Edit details</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1 border-b" />
                    {paper.status !== 'approved' && (
                      <DropdownMenuItem
                        className="cursor-pointer rounded-md py-2.5"
                        onClick={() => onSetStatus(paper, 'approved')}
                      >
                        <CheckCircle2 className="text-success mr-3 h-4 w-4" />
                        <span className="text-success font-medium">Approve</span>
                      </DropdownMenuItem>
                    )}
                    {paper.status !== 'rejected' && (
                      <DropdownMenuItem
                        className="cursor-pointer rounded-md py-2.5"
                        onClick={() => onSetStatus(paper, 'rejected')}
                      >
                        <XCircle className="text-destructive mr-3 h-4 w-4" />
                        <span className="text-destructive font-medium">Reject</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="my-1 border-b" />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive cursor-pointer rounded-md py-2.5"
                      onClick={() => onDelete(paper)}
                    >
                      <Trash2 className="mr-3 h-4 w-4" />
                      <span className="font-medium">Delete</span>
                    </DropdownMenuItem>
                  </DropdownAction>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
