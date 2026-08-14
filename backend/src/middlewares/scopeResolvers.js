import { Paper } from '../models/Paper.js';
import { SubjectOffering } from '../models/SubjectOffering.js';
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
