import { Paper } from '../models/Paper.js';
import { SubjectOffering } from '../models/SubjectOffering.js';
import { QuestionPaperMap } from '../models/QuestionPaperMap.js';
import { Syllabus } from '../models/Syllabus.js';
import { Module } from '../models/Module.js';
import { Topic } from '../models/Topic.js';
import { NotFoundError } from '../utils/errors/index.js';

function toScope(offering) {
  return {
    universityId: offering.universityId,
    branchId: offering.branchId,
    semesterId: offering.semesterId,
    subjectOfferingId: offering._id,
  };
}

async function scopeFromOfferingId(subjectOfferingId) {
  const offering = await SubjectOffering.findById(subjectOfferingId).lean();
  if (!offering) throw new NotFoundError('Subject offering not found');
  return toScope(offering);
}

async function scopeFromSyllabusId(syllabusId) {
  const syllabus = await Syllabus.findById(syllabusId).lean();
  if (!syllabus) throw new NotFoundError('Syllabus not found');
  return scopeFromOfferingId(syllabus.subjectOfferingId);
}

async function scopeFromModuleId(moduleId) {
  const module_ = await Module.findById(moduleId).lean();
  if (!module_) throw new NotFoundError('Module not found');
  return scopeFromSyllabusId(module_.syllabusId);
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

/**
 * For POST /subject-offerings -- the offering doesn't exist yet, so its
 * ancestor scope is read directly off the create body rather than looked
 * up. A subjectOffering-level grant can never match here (there's no
 * subjectOfferingId yet); university/branch/semester-level grants still
 * work normally.
 */
export async function resolveFromOfferingCreateBody(req) {
  return {
    universityId: req.body.universityId,
    branchId: req.body.branchId,
    semesterId: req.body.semesterId,
  };
}

/**
 * For PATCH/DELETE /subject-offerings/:id.
 */
export async function resolveFromSubjectOfferingId(req) {
  return scopeFromOfferingId(req.params.id);
}

/**
 * For PATCH /syllabus/:id.
 */
export async function resolveFromSyllabusId(req) {
  return scopeFromSyllabusId(req.params.id);
}

/**
 * For POST /modules -- scope comes from the syllabus named in the body.
 */
export async function resolveFromModuleBody(req) {
  return scopeFromSyllabusId(req.body.syllabusId);
}

/**
 * For PATCH/DELETE /modules/:id.
 */
export async function resolveFromModuleId(req) {
  return scopeFromModuleId(req.params.id);
}

/**
 * For POST /topics -- scope comes from the module named in the body.
 */
export async function resolveFromTopicBody(req) {
  return scopeFromModuleId(req.body.moduleId);
}

/**
 * For PATCH/DELETE /topics/:id.
 */
export async function resolveFromTopicId(req) {
  const topic = await Topic.findById(req.params.id).lean();
  if (!topic) throw new NotFoundError('Topic not found');
  return scopeFromModuleId(topic.moduleId);
}
