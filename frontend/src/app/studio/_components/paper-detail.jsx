'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Bot } from 'lucide-react';
import { toast } from 'sonner';
import { QuestionsTable } from './questions-table';
import { QuestionInlineForm } from './question-inline-form';
import { QuestionJsonImport } from './question-json-import';
import { QUESTION_AI_PROMPT } from '@/lib/question-ai-prompt';

const STATUS_STYLES = {
  draft: 'bg-muted text-muted-foreground',
  pending: 'bg-warning/10 text-warning',
  approved: 'bg-success/10 text-success',
  rejected: 'bg-destructive/10 text-destructive',
};

export function PaperDetail({ paper, questions = [], backHref }) {
  const router = useRouter();
  const api = useApi();

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

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(QUESTION_AI_PROMPT);
    toast.success(
      'AI prompt copied -- paste it into your AI tool along with the paper images.'
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href={backHref || '/studio/universities'}
          className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to offering
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
            variant="outline"
            onClick={handleCopyPrompt}
            className="font-roboto border font-bold shadow-none"
          >
            <Bot className="h-4 w-4" /> Copy AI Prompt
          </Button>
        </div>
      </div>

      <Tabs defaultValue="form">
        <TabsList variant="pill" className="w-fit">
          <TabsTrigger value="form">Add Question</TabsTrigger>
          <TabsTrigger value="json">Paste JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <QuestionInlineForm onAdd={handleAdd} />
        </TabsContent>

        <TabsContent value="json">
          <QuestionJsonImport onAdd={handleAdd} />
        </TabsContent>
      </Tabs>

      <QuestionsTable
        questions={questions}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
