import { Question, NistCategory, CategoryScore } from '../types/assessment';

export const calculateScores = (questions: Question[]): { categoryScores: CategoryScore[], overallScore: number } => {
  const categories = ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'] as NistCategory[];
  
  const categoryScores = categories.map(category => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const totalScore = categoryQuestions.reduce((sum, q) => sum + (q.score || 0), 0);
    const maxPossibleScore = categoryQuestions.reduce((sum, q) => sum + q.maxScore, 0);
    const score = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
    
    return {
      category,
      score,
      totalQuestions: categoryQuestions.length
    };
  });

  const totalScore = questions.reduce((sum, q) => sum + (q.score || 0), 0);
  const maxPossibleScore = questions.reduce((sum, q) => sum + q.maxScore, 0);
  const overallScore = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;

  return { categoryScores, overallScore };
};

export const getNextMeasureId = (currentMeasures: { id: string }[]): string => {
  if (currentMeasures.length === 0) return 'M001';
  
  const currentIds = currentMeasures.map(m => parseInt(m.id.slice(1)));
  const maxId = Math.max(...currentIds);
  const nextId = maxId + 1;
  
  if (nextId > 999) {
    console.error('Maximum measure ID (M999) reached');
    return 'M999';
  }
  
  return `M${String(nextId).padStart(3, '0')}`;
};