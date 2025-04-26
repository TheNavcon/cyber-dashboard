export type NistCategory = 'Identify' | 'Protect' | 'Detect' | 'Respond' | 'Recover';

export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileData: string;
  uploadDate: string;
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  createdBy: string;
}

export interface Question {
  id: string;
  category: NistCategory;
  text: string;
  description?: string;
  score: number | undefined;
  maxScore: number;
  measureId?: string;
  comments: Comment[];
  attachments: Attachment[];
  needsReview?: boolean;
  isUncertain?: boolean;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface Measure {
  id: string;
  questionRef: string;
  title: string;
  category: NistCategory;
  priority: 'Hoch' | 'Mittel' | 'Niedrig';
  status: string;
  description: string;
  responsibility: string;
  comment: string;
  tasks: Task[];
}

export interface CategoryScore {
  category: NistCategory;
  score: number;
  totalQuestions: number;
}

export interface Assessment {
  id: string;
  companyName: string;
  date: string;
  questions: Question[];
  measures: Measure[];
  categoryScores: CategoryScore[];
  overallScore: number;
}