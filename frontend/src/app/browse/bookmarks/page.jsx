import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getApiServer } from '@/lib/api-server';
import { BreadcrumbNav } from '@/components/browse/breadcrumb-nav';
import { BookmarksList } from '@/components/browse/bookmarks-list';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'My Bookmarks | PyqDeck',
};

export default async function BookmarksPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const api = await getApiServer();

  let items = [];
  try {
    const bookmarksRes = await api.bookmarks.listBookmarks({
      type: 'question',
      limit: 100,
    });
    const bookmarks = bookmarksRes.data?.data?.items || [];

    const resolved = await Promise.all(
      bookmarks.map(async (bookmark) => {
        try {
          const questionRes = await api.questions.getQuestionById(
            bookmark.targetId
          );
          return { bookmark, question: questionRes.data?.data };
        } catch {
          return null;
        }
      })
    );

    items = resolved.filter((item) => item?.question);
  } catch (error) {
    console.error('Failed to fetch bookmarks:', error);
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <BreadcrumbNav trail={[{ label: 'My Bookmarks' }]} />

      <div className="mt-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Bookmarks</h1>
        <p className="text-muted-foreground mt-2">
          Questions you&apos;ve saved for quick revision.
        </p>
      </div>

      <BookmarksList initialItems={items} />
    </div>
  );
}
