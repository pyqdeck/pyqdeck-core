'use client';

import * as React from 'react';
import { Edit2, Trash2, HelpCircle, CheckCircle2 } from 'lucide-react';
import { DropdownAction } from '@/components/dropdown-action';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

export function QuestionsTableView({ questions = [], onEdit, onDelete }) {
  if (questions.length === 0) {
    return (
      <Card className="border shadow-none">
        <CardContent className="py-16">
          <Empty className="border-none shadow-none">
            <EmptyMedia
              variant="icon"
              className="bg-muted h-16 w-16 rounded-2xl"
            >
              <HelpCircle className="text-muted-foreground h-8 w-8" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle className="font-roboto text-lg font-bold">
                No questions yet
              </EmptyTitle>
              <EmptyDescription className="font-roboto">
                Add the first question for this paper.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {questions.map((question, index) => (
        <Card key={question.id} className="border shadow-none">
          <CardContent className="flex items-start justify-between gap-4 p-4">
            <div className="flex flex-1 gap-3">
              <span className="text-muted-foreground pt-0.5 font-mono text-sm">
                Q{index + 1}
              </span>
              <div className="flex-1 space-y-2">
                <p className="text-sm leading-relaxed">{question.mdText}</p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="capitalize">
                    {question.type}
                  </Badge>
                  {question.difficulty && (
                    <Badge variant="outline" className="capitalize">
                      {question.difficulty}
                    </Badge>
                  )}
                  {question.marks != null && (
                    <Badge variant="outline">{question.marks} marks</Badge>
                  )}
                  {question.isVerified && (
                    <Badge className="bg-success/10 text-success border font-bold">
                      <CheckCircle2 className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <DropdownAction tooltip="Question actions">
              <DropdownMenuItem
                className="cursor-pointer rounded-md py-2.5"
                onClick={() => onEdit(question)}
              >
                <Edit2 className="text-muted-foreground mr-3 h-4 w-4" />
                <span className="font-medium">Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive cursor-pointer rounded-md py-2.5"
                onClick={() => onDelete(question)}
              >
                <Trash2 className="mr-3 h-4 w-4" />
                <span className="font-medium">Delete</span>
              </DropdownMenuItem>
            </DropdownAction>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
