import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles, Hash, Tag, ArrowRight } from 'lucide-react';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from '@/components/ui/empty';

export function AiGenerationQueueView({
  questions,
  onGenerate,
  onGenerateAll,
}) {
  const header = (
    <CardHeader className="flex flex-row items-center justify-between pb-4">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 text-primary dark:bg-primary/10 dark:text-primary flex h-12 w-12 items-center justify-center rounded-xl shadow-sm">
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <CardTitle className="font-roboto text-xl font-bold tracking-tight">
            AI Solution Generator
          </CardTitle>
          <CardDescription className="font-roboto">
            {questions?.length || 0} questions requiring automated AI solutions
          </CardDescription>
        </div>
      </div>
      {questions && questions.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          className="font-roboto border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 dark:border-primary/30 dark:bg-primary/10 dark:text-primary gap-2"
          onClick={onGenerateAll}
        >
          <Sparkles className="h-4 w-4" />
          Auto Generate All
        </Button>
      )}
    </CardHeader>
  );

  if (!questions || questions.length === 0) {
    return (
      <Card className="border-border/50 hover:border-primary/20 border shadow-none transition-all">
        {header}
        <CardContent className="py-12">
          <Empty className="border-none shadow-none">
            <EmptyMedia
              variant="icon"
              className="h-20 w-20 rounded-full bg-slate-50 dark:bg-slate-900/50"
            >
              <Bot className="text-primary/50 h-10 w-10" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle className="font-roboto text-xl font-bold">
                No questions in queue
              </EmptyTitle>
              <EmptyDescription className="font-roboto text-base">
                Questions requiring AI solutions will appear here automatically
                after paper parsing.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 hover:border-primary/20 border shadow-none transition-all">
      {header}
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-roboto text-foreground h-12 py-0 font-bold">
                Question Identity
              </TableHead>
              <TableHead className="font-roboto text-foreground h-12 py-0 font-bold">
                Topic Tags
              </TableHead>
              <TableHead className="font-roboto text-foreground h-12 py-0 font-bold">
                Marks
              </TableHead>
              <TableHead className="font-roboto text-foreground h-12 py-0 text-right font-bold">
                Automation
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question) => (
              <TableRow
                key={question._id}
                className="group hover:bg-primary/[0.02] transition-colors"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800">
                      <Hash className="h-4 w-4" />
                    </div>
                    <span className="text-muted-foreground font-mono text-xs font-medium">
                      {question._id.substring(0, 12)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {(question.tags || []).slice(0, 2).map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-primary/5 text-primary hover:bg-primary/10 dark:bg-primary/10 dark:text-primary text-[10px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {(question.tags || []).length > 2 && (
                      <Badge
                        variant="outline"
                        className="text-muted-foreground text-[10px]"
                      >
                        +{(question.tags || []).length - 2}
                      </Badge>
                    )}
                    {(question.tags || []).length === 0 && (
                      <span className="text-muted-foreground font-roboto text-xs italic">
                        No tags
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="outline"
                    className="font-roboto border-slate-200 bg-slate-50 font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400"
                  >
                    {question.marks || '0'} M
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-roboto group/btn text-primary hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/10 h-9 gap-2 transition-all"
                    onClick={() => onGenerate(question)}
                  >
                    <Sparkles className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                    Generate
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
