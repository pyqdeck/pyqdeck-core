import { getApiServer } from '@/lib/api-server';
import { PaperManagement } from '../_components/paper-management';

export const metadata = {
  title: 'Papers | PyqDeck Studio',
  description: 'Add and moderate exam papers for each subject offering.',
};

export default async function PapersPage({ searchParams }) {
  const api = await getApiServer();

  const resolvedSearchParams = await searchParams;
  const offeringId = resolvedSearchParams?.offeringId;

  let offerings = [];
  let currentOffering = null;
  let papers = [];

  try {
    const offRes = await api.subjectOfferings.listSubjectOfferings({
      limit: 100,
    });
    offerings = offRes.data.data.items || [];

    if (offeringId) {
      currentOffering =
        offerings.find((o) => (o.id || o._id) === offeringId) || null;

      if (!currentOffering) {
        const offeringRes =
          await api.subjectOfferings.getSubjectOfferingById(offeringId);
        currentOffering = offeringRes.data.data;
      }

      const papersRes = await api.papers.listPapers({
        subjectOfferingId: offeringId,
        limit: 100,
      });
      papers = papersRes.data.data.items || [];
    }
  } catch (error) {
    console.error('Failed to fetch papers data:', error);
  }

  return (
    <div className="p-4">
      <PaperManagement
        offerings={offerings}
        currentOfferingId={offeringId}
        currentOffering={currentOffering}
        papers={papers}
      />
    </div>
  );
}
