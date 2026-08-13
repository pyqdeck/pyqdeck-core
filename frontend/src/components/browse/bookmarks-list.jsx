'use client';

import { useState } from 'react';
import { QuestionCard } from '@/components/browse/question-card';

/**
 * Bookmarked questions have no paper context, so QuestionCard renders
 * without the solutions section here (see its `paperId` doc comment).
 */
export function BookmarksList({ initialItems }) {
  const [items, setItems] = useState(initialItems);

  const handleBookmarkChange = (questionId, bookmarked) => {
    if (!bookmarked) {
      setItems((prev) => prev.filter((item) => item.question.id !== questionId));
    }
  };

  if (items.length === 0) {
    return (
      <p className="text-muted-foreground py-10 text-center">
        You haven&apos;t bookmarked any questions yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {items.map(({ question }) => (
        <QuestionCard
          key={question.id}
          question={question}
          initialBookmarked
          onBookmarkChange={handleBookmarkChange}
        />
      ))}
    </div>
  );
}
