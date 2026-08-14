import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Paper } from '../../src/models/Paper.js';
import { SubjectOffering } from '../../src/models/SubjectOffering.js';
import { QuestionPaperMap } from '../../src/models/QuestionPaperMap.js';
import {
  resolveFromSubjectOfferingBody,
  resolveFromPaperParam,
  resolveFromPaperId,
  resolveFromQuestionId,
} from '../../src/middlewares/scopeResolvers.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

vi.mock('../../src/models/Paper.js', () => ({
  Paper: { findById: vi.fn() },
}));
vi.mock('../../src/models/SubjectOffering.js', () => ({
  SubjectOffering: { findById: vi.fn() },
}));
vi.mock('../../src/models/QuestionPaperMap.js', () => ({
  QuestionPaperMap: { findOne: vi.fn() },
}));

const offering = {
  _id: 'off1',
  universityId: 'uni1',
  branchId: 'branch1',
  semesterId: 'sem1',
};
const expectedScope = {
  universityId: 'uni1',
  branchId: 'branch1',
  semesterId: 'sem1',
  subjectOfferingId: 'off1',
};

const lean = (value) => ({ lean: vi.fn().mockResolvedValue(value) });

describe('scopeResolvers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('resolveFromSubjectOfferingBody', () => {
    it('resolves the scope from req.body.subjectOfferingId', async () => {
      SubjectOffering.findById.mockReturnValue(lean(offering));

      const scope = await resolveFromSubjectOfferingBody({
        body: { subjectOfferingId: 'off1' },
      });

      expect(SubjectOffering.findById).toHaveBeenCalledWith('off1');
      expect(scope).toEqual(expectedScope);
    });

    it('throws NotFoundError when the offering does not exist', async () => {
      SubjectOffering.findById.mockReturnValue(lean(null));

      await expect(
        resolveFromSubjectOfferingBody({ body: { subjectOfferingId: 'x' } })
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('resolveFromPaperParam', () => {
    it('resolves the scope from the paper nested under :paperId', async () => {
      Paper.findById.mockReturnValue(lean({ subjectOfferingId: 'off1' }));
      SubjectOffering.findById.mockReturnValue(lean(offering));

      const scope = await resolveFromPaperParam({
        params: { paperId: 'paper1' },
      });

      expect(Paper.findById).toHaveBeenCalledWith('paper1');
      expect(scope).toEqual(expectedScope);
    });

    it('throws NotFoundError when the paper does not exist', async () => {
      Paper.findById.mockReturnValue(lean(null));

      await expect(
        resolveFromPaperParam({ params: { paperId: 'missing' } })
      ).rejects.toThrow(NotFoundError);
    });

    it('throws NotFoundError when the paper references a missing offering', async () => {
      Paper.findById.mockReturnValue(lean({ subjectOfferingId: 'off1' }));
      SubjectOffering.findById.mockReturnValue(lean(null));

      await expect(
        resolveFromPaperParam({ params: { paperId: 'paper1' } })
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('resolveFromPaperId', () => {
    it('resolves the scope from the paper at :id', async () => {
      Paper.findById.mockReturnValue(lean({ subjectOfferingId: 'off1' }));
      SubjectOffering.findById.mockReturnValue(lean(offering));

      const scope = await resolveFromPaperId({ params: { id: 'paper1' } });

      expect(Paper.findById).toHaveBeenCalledWith('paper1');
      expect(scope).toEqual(expectedScope);
    });

    it('throws NotFoundError when the paper does not exist', async () => {
      Paper.findById.mockReturnValue(lean(null));

      await expect(
        resolveFromPaperId({ params: { id: 'missing' } })
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('resolveFromQuestionId', () => {
    it('resolves the scope via the paper the question is linked to', async () => {
      QuestionPaperMap.findOne.mockReturnValue(lean({ paperId: 'paper1' }));
      Paper.findById.mockReturnValue(lean({ subjectOfferingId: 'off1' }));
      SubjectOffering.findById.mockReturnValue(lean(offering));

      const scope = await resolveFromQuestionId({
        params: { id: 'question1' },
      });

      expect(QuestionPaperMap.findOne).toHaveBeenCalledWith({
        questionId: 'question1',
      });
      expect(Paper.findById).toHaveBeenCalledWith('paper1');
      expect(scope).toEqual(expectedScope);
    });

    it('throws NotFoundError when the question is not linked to any paper', async () => {
      QuestionPaperMap.findOne.mockReturnValue(lean(null));

      await expect(
        resolveFromQuestionId({ params: { id: 'unlinked-question' } })
      ).rejects.toThrow(NotFoundError);
      expect(Paper.findById).not.toHaveBeenCalled();
    });
  });
});
