'use client';

import * as React from 'react';
import { z } from 'zod';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { getErrorMessage } from '@/lib/api-error';
import { questionSchema, toQuestionPayload } from './question-form-schema';

const questionsArraySchema = z.array(questionSchema);

const PLACEHOLDER = `[
  {
    "mdText": "Explain the working of a full adder circuit.",
    "type": "short",
    "marks": 5
  }
]`;

function parseQuestions(text) {
  if (!text.trim()) return { items: null, error: null };
  let raw;
  try {
    raw = JSON.parse(text);
  } catch {
    return { items: null, error: 'Not valid JSON.' };
  }
  const result = questionsArraySchema.safeParse(
    Array.isArray(raw) ? raw : [raw]
  );
  if (!result.success) {
    const first = result.error.issues[0];
    const path = first.path.length ? ` (${first.path.join('.')})` : '';
    return { items: null, error: `${first.message}${path}` };
  }
  return { items: result.data, error: null };
}

export function QuestionJsonImport({ onAdd }) {
  const [jsonText, setJsonText] = React.useState('');
  const [isImporting, setIsImporting] = React.useState(false);

  const { items, error } = React.useMemo(
    () => parseQuestions(jsonText),
    [jsonText]
  );

  const handleImport = async () => {
    if (!items?.length) return;
    setIsImporting(true);

    let succeeded = 0;
    const failures = [];
    for (const [index, item] of items.entries()) {
      try {
        await onAdd(toQuestionPayload(item));
        succeeded += 1;
      } catch (err) {
        failures.push(`#${index + 1}: ${getErrorMessage(err, 'failed')}`);
      }
    }

    setIsImporting(false);

    if (failures.length === 0) {
      toast.success(`Added ${succeeded} question${succeeded === 1 ? '' : 's'}`);
      setJsonText('');
    } else {
      console.error('Question import failures:', failures);
      toast.error(
        `${succeeded} added, ${failures.length} failed. See console for details.`
      );
    }
  };

  return (
    <Card className="border shadow-none">
      <CardContent className="grid gap-3">
        <Textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder={PLACEHOLDER}
          rows={10}
          className="border font-mono text-xs focus-visible:ring-0"
        />
        {error && <p className="text-destructive text-xs">{error}</p>}
        <Button
          type="button"
          onClick={handleImport}
          disabled={!items?.length || isImporting}
          className="font-roboto w-fit border font-bold shadow-none"
        >
          <Upload className="mr-1.5 h-4 w-4" />
          {isImporting
            ? 'Adding…'
            : `Add ${items?.length || 0} question${items?.length === 1 ? '' : 's'}`}
        </Button>
      </CardContent>
    </Card>
  );
}
