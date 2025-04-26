import { Assessment, NistCategory } from '../types/assessment';
import { questions } from './questions';

export const mockAssessment: Assessment = {
  id: '1',
  companyName: 'Acme Inc.',
  date: '2024-02-25',
  questions,
  measures: [],
  categoryScores: [
    { category: 'Identify' as NistCategory, score: 51, totalQuestions: 10 },
    { category: 'Protect' as NistCategory, score: 22, totalQuestions: 15 },
    { category: 'Detect' as NistCategory, score: 84, totalQuestions: 8 },
    { category: 'Respond' as NistCategory, score: 17, totalQuestions: 12 },
    { category: 'Recover' as NistCategory, score: 45, totalQuestions: 7 }
  ],
  overallScore: 65
};