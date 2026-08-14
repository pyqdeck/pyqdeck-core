import { describe, it, expect } from 'vitest';
import mongoose from 'mongoose';
import seoRepository from '../../src/repositories/seoRepository.js';
import { Question } from '../../src/models/Question.js';
import { Paper } from '../../src/models/Paper.js';
import { Subject } from '../../src/models/Subject.js';
import { University } from '../../src/models/University.js';
import { beforeEach, vi } from 'vitest';

describe('SeoRepository', () => {
  beforeEach(async () => {
    await Question.deleteMany({});
    await Paper.deleteMany({});
    await Subject.deleteMany({});
    await University.deleteMany({});
  });
  it('should fetch verified question slugs', async () => {
    await Question.create([
      { mdText: 'Q1', slug: 'q1', isVerified: true, type: 'short' },
      { mdText: 'Q2', slug: 'q2', isVerified: false, type: 'short' },
    ]);

    const result = await seoRepository.getAllQuestionSlugs();
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('q1');
  });

  it('should fetch approved paper slugs', async () => {
    await Paper.create([
      {
        title: 'P1',
        slug: 'p1',
        status: 'approved',
        exam: 'End',
        examYear: 2023,
        examType: 'regular',
        subjectOfferingId: new mongoose.Types.ObjectId(),
      },
      {
        title: 'P2',
        slug: 'p2',
        status: 'draft',
        exam: 'End',
        examYear: 2023,
        examType: 'regular',
        subjectOfferingId: new mongoose.Types.ObjectId(),
      },
    ]);

    const result = await seoRepository.getAllPaperSlugs();
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('p1');
  });

  it('should fetch active subject slugs', async () => {
    await Subject.create([
      { name: 'S1', subjectCode: 'C1', slug: 's1', isActive: true },
      { name: 'S2', subjectCode: 'C2', slug: 's2', isActive: false },
    ]);

    const result = await seoRepository.getAllSubjectSlugs();
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('s1');
  });

  it('should fetch active university slugs', async () => {
    await University.create([
      { name: 'U1', shortName: 'U1', slug: 'u1-test', isActive: true },
      { name: 'U2', shortName: 'U2', slug: 'u2-test', isActive: false },
    ]);

    const result = await seoRepository.getAllUniversitySlugs();
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('u1-test');
  });
});
