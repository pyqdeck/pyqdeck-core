'use client';

import { useState } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { useApi } from '@/hooks/use-api';
import { getCoursifyAskUrl } from '@/lib/coursify';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import {
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

function SolutionCard({ solution, onVote }) {
  const [voting, setVoting] = useState(false);

  const handleVote = async (type) => {
    setVoting(true);
    try {
      await onVote(solution.id, type);
    } finally {
      setVoting(false);
    }
  };

  return (
    <div className="rounded-lg border p-3">
      <div className="mb-2 flex items-center gap-2">
        <Badge variant="secondary" className="capitalize">
          {solution.type}
        </Badge>
        {solution.isVerified && <Badge>Verified</Badge>}
      </div>
      <p className="whitespace-pre-wrap text-sm">{solution.content}</p>
      {solution.latexContent && (
        <pre className="bg-muted mt-2 overflow-x-auto rounded p-2 text-xs">
          {solution.latexContent}
        </pre>
      )}
      <div className="mt-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2"
          disabled={voting}
          onClick={() => handleVote('up')}
        >
          <ThumbsUp className="size-3.5" />
          {solution.upvotes ?? 0}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2"
          disabled={voting}
          onClick={() => handleVote('down')}
        >
          <ThumbsDown className="size-3.5" />
          {solution.downvotes ?? 0}
        </Button>
      </div>
    </div>
  );
}

/**
 * Renders a question with bookmark + (optionally) solutions.
 * Pass `paperId` to enable fetching solutions — the backend only exposes
 * solutions in the context of a paper, so standalone question views (search,
 * bookmarks) can't show them yet.
 */
export function QuestionCard({
  question,
  paperId,
  initialBookmarked = false,
  onBookmarkChange,
}) {
  const { isSignedIn } = useUser();
  const api = useApi();

  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [solutionsLoading, setSolutionsLoading] = useState(false);
  const [solutions, setSolutions] = useState(null);

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

  const handleToggleSolutions = async () => {
    const nextOpen = !solutionsOpen;
    setSolutionsOpen(nextOpen);
    if (nextOpen && solutions === null && paperId) {
      setSolutionsLoading(true);
      try {
        const res = await api.papers.listSolutionsForPaperQuestion(
          paperId,
          question.id,
          { limit: 20 }
        );
        setSolutions(res.data?.data?.items || []);
      } catch (error) {
        console.error('Failed to fetch solutions:', error);
        setSolutions([]);
      } finally {
        setSolutionsLoading(false);
      }
    }
  };

  const handleAskAI = () => {
    window.open(getCoursifyAskUrl(question.text), '_blank', 'noopener,noreferrer');
    toast.info('Opening Coursify in a new tab…');
  };

  const handleVote = async (solutionId, type) => {
    if (!isSignedIn) {
      toast.error('Sign in to vote on solutions.');
      return;
    }
    try {
      const res = await api.solutions.voteOnSolution(solutionId, { type });
      const data = res.data?.data;
      setSolutions((prev) =>
        prev.map((solution) =>
          solution.id === solutionId
            ? {
                ...solution,
                upvotes: data?.upvotes ?? solution.upvotes,
                downvotes: data?.downvotes ?? solution.downvotes,
              }
            : solution
        )
      );
    } catch (error) {
      console.error('Failed to vote:', error);
      toast.error('Could not record your vote.');
    }
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
        <p className="whitespace-pre-wrap text-sm leading-relaxed">
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

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-3">
          <Button
            variant="secondary"
            size="sm"
            className="gap-1.5"
            onClick={handleAskAI}
          >
            <Sparkles className="size-4" />
            Ask AI
          </Button>

          {paperId && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5"
              onClick={handleToggleSolutions}
            >
              <ChevronDown
                className={`size-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`}
              />
              {solutionsOpen ? 'Hide solutions' : 'View solutions'}
            </Button>
          )}
        </div>

        {paperId && (
          <div>
            {solutionsOpen && (
              <div className="mt-3 space-y-3">
                {solutionsLoading ? (
                  <div className="flex items-center gap-2 text-sm">
                    <Spinner className="size-4" /> Loading solutions…
                  </div>
                ) : solutions?.length > 0 ? (
                  solutions.map((solution) => (
                    <SolutionCard
                      key={solution.id}
                      solution={solution}
                      onVote={handleVote}
                    />
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No solutions yet for this question.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
