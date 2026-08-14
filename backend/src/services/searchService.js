import questionRepository from '../repositories/questionRepository.js';
import subjectRepository from '../repositories/subjectRepository.js';
import paperRepository from '../repositories/paperRepository.js';
import { escapeRegExp } from '../utils/index.js';

class SearchService {
  async unifiedSearch(query, pagination) {
    const searchRegex = new RegExp(escapeRegExp(query), 'i');

    // Run searches in parallel
    const [questions, subjects, papers] = await Promise.all([
      questionRepository.findWithContext({ mdText: searchRegex }, pagination),
      subjectRepository.findAll(
        {
          $or: [{ name: searchRegex }, { subjectCode: searchRegex }],
        },
        pagination
      ),
      paperRepository.findAll(
        {
          $or: [{ title: searchRegex }, { exam: searchRegex }],
        },
        pagination
      ),
    ]);

    return {
      questions: questions.items,
      subjects: subjects.items,
      papers: papers.items,
      totalQuestions: questions.total,
      totalSubjects: subjects.total,
      totalPapers: papers.total,
    };
  }
}

export const searchService = new SearchService();
export default searchService;
