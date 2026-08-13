const COURSIFY_BASE_URL =
  process.env.NEXT_PUBLIC_COURSIFY_URL || 'https://hasanraiyan.me';

/**
 * Builds a deep link into the Coursify app that pre-fills and sends the
 * question text as an AI research query. Matches the pattern used by
 * pyqdeck-windows (src/components/shared/QuestionItem.jsx).
 */
export function getCoursifyAskUrl(questionText) {
  return `${COURSIFY_BASE_URL}/coursify?search_ai=${encodeURIComponent(questionText)}&send=true`;
}
