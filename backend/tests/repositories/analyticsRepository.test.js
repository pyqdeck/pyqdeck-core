import { describe, it, expect, beforeEach } from 'vitest';
import analyticsRepository from '../../src/repositories/analyticsRepository.js';
import { User, UserRole } from '../../src/models/User.js';
import { Paper } from '../../src/models/Paper.js';
import { Question } from '../../src/models/Question.js';
import { University } from '../../src/models/University.js';
import { Branch } from '../../src/models/Branch.js';
import { SubjectOffering } from '../../src/models/SubjectOffering.js';
import { Subject } from '../../src/models/Subject.js';
import mongoose from 'mongoose';

describe('analyticsRepository', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Paper.deleteMany({});
    await Question.deleteMany({});
    await University.deleteMany({});
    await Branch.deleteMany({});
    await SubjectOffering.deleteMany({});
    await Subject.deleteMany({});
  });

  describe('getGlobalCounts', () => {
    it('should return counts of all entities', async () => {
      await User.create({
        clerkId: 'user1',
        email: 'test@test.com',
        name: 'Test User',
        role: UserRole.STUDENT,
      });
      const counts = await analyticsRepository.getGlobalCounts();
      expect(counts).toEqual([1, 0, 0, 0, 0, 0]);
    });
  });

  describe('getRecentPendingPapers', () => {
    it('should return recent pending papers limited to provided number', async () => {
      const subject = await Subject.create({
        name: 'Math',
        subjectCode: 'M101',
        slug: 'math',
        isActive: true,
      });

      const university = await University.create({
        name: 'Test Univ',
        shortName: 'TU',
        slug: 'test-univ',
        isActive: true,
      });

      const branch = await Branch.create({
        name: 'CS',
        shortName: 'CS',
        slug: 'cs',
        universityId: university._id,
        isActive: true,
      });

      const offering = await SubjectOffering.create({
        subjectId: subject._id,
        universityId: university._id,
        branchId: branch._id,
        semesterId: new mongoose.Types.ObjectId(),
        syllabusId: new mongoose.Types.ObjectId(),
        slug: 'math-offering',
      });

      await Paper.create([
        {
          title: 'Paper 1',
          slug: 'paper-1',
          status: 'pending',
          exam: 'End',
          examYear: 2023,
          examType: 'regular',
          subjectOfferingId: offering._id,
          createdAt: new Date('2023-01-01'),
        },
        {
          title: 'Paper 2',
          slug: 'paper-2',
          status: 'pending',
          exam: 'End',
          examYear: 2023,
          examType: 'regular',
          subjectOfferingId: offering._id,
          createdAt: new Date('2023-01-02'),
        },
        {
          title: 'Paper 3',
          slug: 'paper-3',
          status: 'approved',
          exam: 'End',
          examYear: 2023,
          examType: 'regular',
          subjectOfferingId: offering._id,
        },
      ]);

      const pendingPapers = await analyticsRepository.getRecentPendingPapers(1);
      expect(pendingPapers).toHaveLength(1);
      expect(pendingPapers[0].title).toBe('Paper 2');
      expect(pendingPapers[0].subjectOfferingId.slug).toBe('math-offering');
    });

    it('should default limit to 5 if not provided', async () => {
      const pendingPapers = await analyticsRepository.getRecentPendingPapers();
      expect(pendingPapers).toHaveLength(0);
    });
  });

  describe('getPaperUploadsByDay', () => {
    it('should aggregate paper uploads by day', async () => {
      const offering = new mongoose.Types.ObjectId();
      await Paper.create([
        {
          title: 'P1',
          slug: 'p1',
          status: 'approved',
          exam: 'End',
          examYear: 2023,
          examType: 'regular',
          subjectOfferingId: offering,
          createdAt: new Date('2023-10-10T10:00:00Z'),
        },
        {
          title: 'P2',
          slug: 'p2',
          status: 'approved',
          exam: 'End',
          examYear: 2023,
          examType: 'regular',
          subjectOfferingId: offering,
          createdAt: new Date('2023-10-10T12:00:00Z'),
        },
        {
          title: 'P3',
          slug: 'p3',
          status: 'approved',
          exam: 'End',
          examYear: 2023,
          examType: 'regular',
          subjectOfferingId: offering,
          createdAt: new Date('2023-10-11T10:00:00Z'),
        },
      ]);

      const result = await analyticsRepository.getPaperUploadsByDay(
        new Date('2023-10-01T00:00:00Z')
      );
      expect(result).toHaveLength(2);
      expect(result[0]._id).toBe('2023-10-10');
      expect(result[0].count).toBe(2);
      expect(result[1]._id).toBe('2023-10-11');
      expect(result[1].count).toBe(1);
    });
  });

  describe('getSubjectPopularity', () => {
    it('should calculate subject popularity by grouping papers by subject offerings', async () => {
      const subject1 = await Subject.create({
        name: 'Sub1',
        subjectCode: 'C1',
        slug: 's1',
        isActive: true,
      });
      const subject2 = await Subject.create({
        name: 'Sub2',
        subjectCode: 'C2',
        slug: 's2',
        isActive: true,
      });

      const offering1 = await SubjectOffering.create({
        subjectId: subject1._id,
        universityId: new mongoose.Types.ObjectId(),
        branchId: new mongoose.Types.ObjectId(),
        semesterId: new mongoose.Types.ObjectId(),
        syllabusId: new mongoose.Types.ObjectId(),
        slug: 'o1',
      });

      const offering2 = await SubjectOffering.create({
        subjectId: subject2._id,
        universityId: new mongoose.Types.ObjectId(),
        branchId: new mongoose.Types.ObjectId(),
        semesterId: new mongoose.Types.ObjectId(),
        syllabusId: new mongoose.Types.ObjectId(),
        slug: 'o2',
      });

      await Paper.create([
        {
          title: 'P1',
          slug: 'p1',
          status: 'approved',
          exam: 'End',
          examYear: 2023,
          examType: 'regular',
          subjectOfferingId: offering1._id,
        },
        {
          title: 'P2',
          slug: 'p2',
          status: 'approved',
          exam: 'End',
          examYear: 2023,
          examType: 'regular',
          subjectOfferingId: offering1._id,
        },
        {
          title: 'P3',
          slug: 'p3',
          status: 'approved',
          exam: 'End',
          examYear: 2023,
          examType: 'regular',
          subjectOfferingId: offering2._id,
        },
      ]);

      const result = await analyticsRepository.getSubjectPopularity();
      expect(result).toHaveLength(2);
      expect(result[0].subject).toBe('Sub1');
      expect(result[0].count).toBe(2);
      expect(result[1].subject).toBe('Sub2');
      expect(result[1].count).toBe(1);
    });
  });
});
