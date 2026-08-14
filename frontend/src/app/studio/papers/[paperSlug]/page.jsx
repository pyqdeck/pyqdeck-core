import { notFound } from 'next/navigation';
import { getApiServer } from '@/lib/api-server';
import { PaperDetail } from '../../_components/paper-detail';

export async function generateMetadata({ params }) {
  const { paperSlug } = await params;
  return {
    title: `${paperSlug} | Papers | PyqDeck Studio`,
  };
}

export default async function PaperDetailPage({ params }) {
  const { paperSlug } = await params;
  const api = await getApiServer();

  let paper = null;
  let questions = [];
  let offeringHref = null;

  try {
    const paperRes = await api.papers.getPaperBySlug(paperSlug);
    paper = paperRes.data.data;
    if (!paper) return notFound();

    const questionsRes = await api.papers.listQuestionsForPaper(paper.id, {
      limit: 100,
    });
    questions = questionsRes.data.data.items || [];

    const offeringRes = await api.subjectOfferings.getSubjectOfferingById(
      paper.subjectOfferingId
    );
    const offering = offeringRes.data.data;
    if (offering) {
      const universityId = offering.universityId?.id || offering.universityId;
      const branchId = offering.branchId?.id || offering.branchId;
      const semesterId = offering.semesterId?.id || offering.semesterId;
      offeringHref = `/studio/universities/${universityId}/branches/${branchId}/semesters/${semesterId}/offerings/${offering.id}?tab=papers`;
    }
  } catch (error) {
    console.error('Failed to fetch paper detail:', error);
    return notFound();
  }

  return (
    <div className="p-4">
      <PaperDetail
        paper={paper}
        questions={questions}
        backHref={offeringHref}
      />
    </div>
  );
}
