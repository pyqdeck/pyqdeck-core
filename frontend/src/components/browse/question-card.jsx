'use client';

import { useState } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { useApi } from '@/hooks/use-api';
import { getCoursifyAskUrl } from '@/lib/coursify';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Bookmark, BookmarkCheck, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export function QuestionCard({
  question,
  initialBookmarked = false,
  onBookmarkChange,
}) {
  const { isSignedIn } = useUser();
  const api = useApi();

  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const handleToggleBookmark = async () => {
    setBookmarkLoading(true);
    try {
      const res = await api.bookmarks.toggleBookmark({
        targetType: 'question',
        targetId: question.id,
      });
      const data = res.data?.data;
      const nowBookmarked =
        typeof data?.bookmarked === 'boolean'
          ? data.bookmarked
          : Boolean(data?.isBookmarked);
      setBookmarked(nowBookmarked);
      onBookmarkChange?.(question.id, nowBookmarked);
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
      toast.error('Could not update bookmark. Please try again.');
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleAskAI = () => {
    window.open(
      getCoursifyAskUrl(question.text),
      '_blank',
      'noopener,noreferrer'
    );
    toast.info('Opening Coursify in a new tab…');
  };

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
        <div className="flex flex-wrap gap-1.5">
          {question.type && (
            <Badge variant="secondary" className="capitalize">
              {question.type}
            </Badge>
          )}
          {question.difficulty && (
            <Badge variant="outline" className="capitalize">
              {question.difficulty}
            </Badge>
          )}
          {question.marks != null && (
            <Badge variant="outline">{question.marks} marks</Badge>
          )}
        </div>

        {isSignedIn ? (
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            disabled={bookmarkLoading}
            onClick={handleToggleBookmark}
            aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            {bookmarked ? (
              <BookmarkCheck className="text-primary size-4.5" />
            ) : (
              <Bookmark className="size-4.5" />
            )}
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Bookmark className="size-4.5" />
            </Button>
          </SignInButton>
        )}
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {question.text}
        </p>

        {question.images?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {question.images.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt="Question attachment"
                className="max-h-48 rounded-md border object-contain"
              />
            ))}
          </div>
        )}

        <div className="mt-4 border-t pt-3">
          <Button
            variant="secondary"
            size="sm"
            className="gap-1.5"
            onClick={handleAskAI}
          >
            <Sparkles className="size-4" />
            Ask AI
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
