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

  try {
    const paperRes = await api.papers.getPaperBySlug(paperSlug);
    paper = paperRes.data.data;
    if (!paper) return notFound();

    const questionsRes = await api.papers.listQuestionsForPaper(paper.id, {
      limit: 100,
    });
    questions = questionsRes.data.data.items || [];
  } catch (error) {
    console.error('Failed to fetch paper detail:', error);
    return notFound();
  }

  return (
    <div className="p-4">
      <PaperDetail paper={paper} questions={questions} />
    </div>
  );
}
