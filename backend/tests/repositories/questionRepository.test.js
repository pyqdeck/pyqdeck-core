import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { questionRepository } from '../../src/repositories/questionRepository.js';
import { Question } from '../../src/models/Question.js';
import { Paper } from '../../src/models/Paper.js';
import { QuestionPaperMap } from '../../src/models/QuestionPaperMap.js';
import { QuestionSyllabusMap } from '../../src/models/QuestionSyllabusMap.js';
import { Topic } from '../../src/models/Topic.js';
import { NotFoundError, ConflictError } from '../../src/utils/errors/index.js';

describe('QuestionRepository', () => {
  const questionData = {
    mdText: 'What is a compiler?',
    type: 'short',
    slug: 'what-is-compiler',
  };

  beforeEach(async () => {
    await Question.deleteMany({});
    await Paper.deleteMany({});
    await QuestionPaperMap.deleteMany({});
    await QuestionSyllabusMap.deleteMany({});
    await Topic.deleteMany({});
  });

  describe('create', () => {
    it('should create successfully', async () => {
      const question = await questionRepository.create(questionData);
      expect(question.mdText).toBe(questionData.mdText);
      expect(question.slug).toBe(questionData.slug);
    });

    it('should throw ConflictError on duplicate slug', async () => {
      await questionRepository.create(questionData);
      await expect(
        questionRepository.create({
          ...questionData,
          mdText: 'different text',
        })
      ).rejects.toThrow(ConflictError);
    });
  });

  describe('findById', () => {
    it('should find by id', async () => {
      const created = await questionRepository.create(questionData);
      const question = await questionRepository.findById(created.id);
      expect(question.id).toBe(created.id);
    });
  });

  describe('findBySlug', () => {
    it('should find by slug', async () => {
      await questionRepository.create(questionData);
      const question = await questionRepository.findBySlug(questionData.slug);
      expect(question.slug).toBe(questionData.slug);
    });
  });

  describe('findAll', () => {
    it('should return paginated questions', async () => {
      await questionRepository.create(questionData);
      const result = await questionRepository.findAll(
        {},
        { page: 1, limit: 10 }
      );
      expect(result.items).toHaveLength(1);
    });
  });

  describe('findByTags', () => {
    it('should find questions by tags', async () => {
      const tagId = new mongoose.Types.ObjectId();
      await questionRepository.create({ ...questionData, tags: [tagId] });
      const result = await questionRepository.findByTags([tagId], {
        page: 1,
        limit: 10,
      });
      expect(result.items).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      const created = await questionRepository.create(questionData);
      const updated = await questionRepository.update(created.id, {
        mdText: 'Updated Text',
      });
      expect(updated.mdText).toBe('Updated Text');
    });

    it('should reject an mcq update whose options break the single-correct-answer rule', async () => {
      const created = await questionRepository.create(questionData);
      await expect(
        questionRepository.update(created.id, {
          type: 'mcq',
          options: [{ text: 'Only one option', isCorrect: true }],
        })
      ).rejects.toThrow();
    });
  });

  describe('mcq options', () => {
    it('persists options with exactly one correct answer', async () => {
      const question = await questionRepository.create({
        mdText: 'What does CPU stand for?',
        type: 'mcq',
        slug: 'what-does-cpu-stand-for',
        options: [
          { text: 'Central Processing Unit', isCorrect: true },
          { text: 'Central Programming Unit', isCorrect: false },
        ],
      });

      expect(question.options).toHaveLength(2);
      expect(question.options.filter((o) => o.isCorrect)).toHaveLength(1);
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      const created = await questionRepository.create(questionData);
      await questionRepository.delete(created.id);
      await expect(questionRepository.findById(created.id)).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('findWithContext', () => {
    it('should return question with paper and topic context', async () => {
      const q = await questionRepository.create(questionData);

      const paper = await Paper.create({
        title: 'Exam 2023',
        examYear: 2023,
        examType: 'regular',
        slug: 'exam-2023',
        subjectOfferingId: new mongoose.Types.ObjectId(),
      });

      await QuestionPaperMap.create({
        questionId: q._id,
        paperId: paper._id,
      });

      const topic = await Topic.create({
        title: 'Compiler Intro',
        slug: 'compiler-intro',
        moduleId: new mongoose.Types.ObjectId(),
      });

      await QuestionSyllabusMap.create({
        questionId: q._id,
        topicId: topic._id,
      });

      const result = await questionRepository.findWithContext({ _id: q._id });

      expect(result.items).toHaveLength(1);
      const item = result.items[0];
      expect(item.paperContext).toHaveLength(1);
      expect(item.paperContext[0].title).toBe('Exam 2023');
      expect(item.topicContext).toHaveLength(1);
      expect(item.topicContext[0].name).toBe('Compiler Intro');
    });
  });
});
