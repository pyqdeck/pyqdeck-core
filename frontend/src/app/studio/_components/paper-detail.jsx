'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus } from 'lucide-react';
import { QuestionsTable } from './questions-table';
import { QuestionFormDialog } from './question-form-dialog';

const STATUS_STYLES = {
  draft: 'bg-muted text-muted-foreground',
  pending: 'bg-warning/10 text-warning',
  approved: 'bg-success/10 text-success',
  rejected: 'bg-destructive/10 text-destructive',
};

export function PaperDetail({ paper, questions = [] }) {
  const router = useRouter();
  const api = useApi();
  const [addOpen, setAddOpen] = React.useState(false);

  const handleAdd = async (data) => {
    await api.papers.createQuestionForPaper(paper.id, data);
    router.refresh();
  };

  const handleUpdate = async (id, data) => {
    await api.questions.updateQuestion(id, data);
    router.refresh();
  };

  const handleDelete = async (id) => {
    await api.questions.deleteQuestion(id);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/studio/papers"
          className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to papers
        </Link>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-roboto text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              {paper.title}
            </h1>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="outline">{paper.examYear}</Badge>
              <Badge variant="outline" className="capitalize">
                {paper.examType}
              </Badge>
              <Badge
                className={`border font-bold capitalize ${STATUS_STYLES[paper.status] || STATUS_STYLES.draft}`}
              >
                {paper.status}
              </Badge>
            </div>
          </div>
          <Button
            onClick={() => setAddOpen(true)}
            className="font-roboto bg-primary hover:bg-primary/90 border font-bold shadow-none"
          >
            <Plus className="h-4 w-4" /> Add Question
          </Button>
        </div>
      </div>

      <QuestionsTable
        questions={questions}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <QuestionFormDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onSubmit={handleAdd}
      />
    </div>
  );
}
