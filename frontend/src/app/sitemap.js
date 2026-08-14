import { Api } from '@/lib/api-generated';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pyqdeck.in';

// Plain, unauthenticated client (not `getApiServer()`) -- that helper calls
// Clerk's `auth()`, which reads request headers and forces the whole route
// to render dynamically per-request. This sitemap only ever needs public
// data, so avoiding it lets Next statically generate/cache this route.
function getPublicApi() {
  return new Api({
    baseURL: (
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'
    ).replace(/\/+$/, ''),
  });
}

// Public list endpoints cap `limit` at 100 per page, so this pages through
// results rather than requesting everything in one call.
async function fetchAllPages(
  fetchPage,
  { pageSize = 100, maxPages = 20 } = {}
) {
  const items = [];
  for (let page = 1; page <= maxPages; page += 1) {
    const res = await fetchPage({ page, limit: pageSize });
    const pageItems = res.data?.data?.items || [];
    items.push(...pageItems);
    if (pageItems.length < pageSize) break;
  }
  return items;
}

function unwrapId(value) {
  return typeof value === 'object' && value !== null ? value.id : value;
}

export default async function sitemap() {
  const staticEntries = [
    { url: `${siteUrl}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/browse`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/sign-in`, changeFrequency: 'yearly', priority: 0.1 },
    { url: `${siteUrl}/sign-up`, changeFrequency: 'yearly', priority: 0.1 },
  ];

  let universities = [];
  let branches = [];
  let semesters = [];
  let offerings = [];
  let papers = [];

  try {
    const api = getPublicApi();
    [universities, branches, semesters, offerings, papers] = await Promise.all([
      fetchAllPages((p) => api.universities.listUniversities(p)),
      fetchAllPages((p) => api.branches.listAllBranches(p)),
      fetchAllPages((p) => api.semesters.listAllSemesters(p)),
      fetchAllPages((p) => api.subjectOfferings.listSubjectOfferings(p)),
      fetchAllPages((p) => api.papers.listPapers(p)),
    ]);
  } catch (error) {
    console.error('Failed to build sitemap:', error);
    return staticEntries;
  }

  const universityById = new Map(universities.map((u) => [u.id, u]));
  const branchById = new Map(branches.map((b) => [b.id, b]));
  const semesterById = new Map(semesters.map((s) => [s.id, s]));

  const universityEntries = universities.map((u) => ({
    url: `${siteUrl}/browse/${u.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const branchEntries = branches
    .map((b) => {
      const university = universityById.get(unwrapId(b.universityId));
      if (!university) return null;
      return {
        url: `${siteUrl}/browse/${university.slug}/${b.slug}`,
        changeFrequency: 'weekly',
        priority: 0.7,
      };
    })
    .filter(Boolean);

  const semesterEntries = semesters
    .map((s) => {
      const branch = branchById.get(unwrapId(s.branchId));
      if (!branch) return null;
      const university = universityById.get(unwrapId(branch.universityId));
      if (!university) return null;
      return {
        url: `${siteUrl}/browse/${university.slug}/${branch.slug}/${s.number}`,
        changeFrequency: 'monthly',
        priority: 0.6,
      };
    })
    .filter(Boolean);

  const offeringEntries = offerings
    .map((o) => {
      const university = universityById.get(unwrapId(o.universityId));
      const branch = branchById.get(unwrapId(o.branchId));
      const semester = semesterById.get(unwrapId(o.semesterId));
      if (!university || !branch || !semester) return null;
      return {
        url: `${siteUrl}/browse/${university.slug}/${branch.slug}/${semester.number}/${o.slug}`,
        changeFrequency: 'monthly',
        priority: 0.6,
      };
    })
    .filter(Boolean);

  const paperEntries = papers.map((p) => ({
    url: `${siteUrl}/browse/paper/${p.slug}`,
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  return [
    ...staticEntries,
    ...universityEntries,
    ...branchEntries,
    ...semesterEntries,
    ...offeringEntries,
    ...paperEntries,
  ];
}
