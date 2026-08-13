'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useApi } from '@/hooks/use-api';
import { QuestionCard } from '@/components/browse/question-card';

export function PaperQuestions({ questions }) {
  const { isSignedIn } = useUser();
  const api = useApi();
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  useEffect(() => {
    if (!isSignedIn) return;

    let cancelled = false;
    api.bookmarks
      .listBookmarks({ type: 'question', limit: 100 })
      .then((res) => {
        if (cancelled) return;
        const ids = new Set(
          (res.data?.data?.items || []).map((bookmark) => bookmark.targetId)
        );
        setBookmarkedIds(ids);
      })
      .catch((error) => {
        console.error('Failed to load bookmark state:', error);
      });

    return () => {
      cancelled = true;
    };
  }, [isSignedIn, api]);

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div key={question.id} className="flex gap-3">
          <span className="text-muted-foreground pt-4 text-sm font-medium">
            Q{index + 1}
          </span>
          <div className="flex-1">
            <QuestionCard
              question={question}
              initialBookmarked={bookmarkedIds.has(question.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
