import { Paper } from '../models/Paper.js';
import { SubjectOffering } from '../models/SubjectOffering.js';
import { QuestionPaperMap } from '../models/QuestionPaperMap.js';
import { NotFoundError } from '../utils/errors/index.js';

function toScope(offering) {
  return {
    universityId: offering.universityId,
    branchId: offering.branchId,
    semesterId: offering.semesterId,
    subjectOfferingId: offering._id,
  };
}

/**
 * For routes that create content directly against a subjectOfferingId in
 * the request body (e.g. POST /papers).
 */
export async function resolveFromSubjectOfferingBody(req) {
  const offering = await SubjectOffering.findById(
    req.body.subjectOfferingId
  ).lean();
  if (!offering) throw new NotFoundError('Subject offering not found');
  return toScope(offering);
}

/**
 * For routes nested under a paper (e.g. POST /papers/:paperId/questions and
 * the question-linking endpoint) -- the paper's offering defines the scope,
 * since Question itself carries no hierarchy linkage at all.
 */
export async function resolveFromPaperParam(req) {
  const paper = await Paper.findById(req.params.paperId).lean();
  if (!paper) throw new NotFoundError('Paper not found');

  const offering = await SubjectOffering.findById(
    paper.subjectOfferingId
  ).lean();
  if (!offering) throw new NotFoundError('Subject offering not found');
  return toScope(offering);
}

/**
 * For routes that act on a paper directly (e.g. PATCH/DELETE
 * /papers/:id, PATCH /papers/:id/status) -- identical to
 * resolveFromPaperParam but reads the paper's own :id param rather than a
 * nested :paperId.
 */
export async function resolveFromPaperId(req) {
  const paper = await Paper.findById(req.params.id).lean();
  if (!paper) throw new NotFoundError('Paper not found');

  const offering = await SubjectOffering.findById(
    paper.subjectOfferingId
  ).lean();
  if (!offering) throw new NotFoundError('Subject offering not found');
  return toScope(offering);
}

/**
 * For routes that act on a standalone question (e.g. PATCH/DELETE
 * /questions/:id). Question itself carries no hierarchy linkage, so its
 * scope is derived from a paper it's linked to via QuestionPaperMap -- a
 * question created through the studio always has at least one such link,
 * since question creation only ever happens through a paper. A question
 * with no links at all (never linked, or unlinked from every paper) has
 * no resolvable scope, so only the legacy isEditor/isAdmin bypass can
 * reach it.
 */
export async function resolveFromQuestionId(req) {
  const mapping = await QuestionPaperMap.findOne({
    questionId: req.params.id,
  }).lean();
  if (!mapping) {
    throw new NotFoundError(
      'This question is not linked to any paper, so its scope cannot be resolved'
    );
  }
  return resolveFromPaperParam({ params: { paperId: mapping.paperId } });
}
