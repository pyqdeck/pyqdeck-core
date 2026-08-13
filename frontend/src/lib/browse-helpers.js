/**
 * Fetches all subjects (paginated) into an id -> subject lookup map.
 * Subject-offerings only store a subjectId, so listings need this to show names.
 * Capped at a few pages so a runaway subject catalog can't hang a page render.
 */
export async function getSubjectMap(api) {
  const map = new Map();
  let page = 1;
  const limit = 100;
  const maxPages = 10;

  while (page <= maxPages) {
    const res = await api.subjects.listSubjects({ page, limit });
    const items = res.data?.data?.items || [];
    for (const subject of items) map.set(subject.id, subject);

    const pagination = res.data?.data?.pagination;
    if (!pagination || page >= pagination.totalPages) break;
    page += 1;
  }

  return map;
}

export function formatExamType(examType) {
  if (!examType) return '';
  return examType
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
