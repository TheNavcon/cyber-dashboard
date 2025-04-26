import React, { useState, useMemo, useCallback, memo } from 'react';
import { Question, NistCategory } from '../types/assessment';
import { QuestionDetails } from './QuestionDetails';
import { SortAsc, SortDesc, MessageSquare, Paperclip, AlertCircle, Flag, MoreVertical, ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionnaireProps {
  questions: Question[];
  onAnswerChange: (questionId: string, score: number) => void;
  onQuestionUpdate?: (questionId: string, updates: Partial<Question>) => void;
}

type FilterStatus = 'all' | 'answered' | 'open' | 'uncertain';
type FilterScore = 'all' | 0 | 5 | 10;
type SortDirection = 'asc' | 'desc';

const SUBCATEGORY_MAP = {
  'V': 'Verantwortlichkeit',
  'I': 'IT-Sicherheit',
  'R': 'Richtlinien',
  'D': 'Datenschutz',
  'S': 'Sensibilisierung',
  'N': 'Netzwerk',
  'F': 'Firewall'
} as const;

const SCORE_OPTIONS = [
  { value: 0, label: 'Nein' },
  { value: 5, label: 'Teilweise' },
  { value: 10, label: 'Ja' }
] as const;

const FilterSelect = memo<{
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: Array<{ value: string | number; label: string; }>
}>(({ label, value, onChange, options }) => (
  <div className="flex items-center gap-2">
    <label className="text-sm font-medium text-gray-700">
      {label}:
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        aria-label={label}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  </div>
));

FilterSelect.displayName = 'FilterSelect';

const QuestionCard = memo<{
  question: Question;
  onQuestionClick: (question: Question) => void;
  onAnswerChange: (questionId: string, score: number) => void;
  onUpdateQuestion: (questionId: string, updates: Partial<Question>) => void;
  getScoreColor: (score: number | undefined) => string;
  showAllDescriptions: boolean;
}>(({ question, onQuestionClick, onAnswerChange, onUpdateQuestion, getScoreColor, showAllDescriptions }) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuestionClick(question);
  };

  const toggleUncertain = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateQuestion(question.id, { isUncertain: !question.isUncertain });
  };

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDescription(!showDescription);
  };

  // Use either the global setting or local toggle
  const shouldShowDescription = showAllDescriptions || showDescription;

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
              {question.category}
            </span>
            <span className="text-sm font-medium px-2 py-1 bg-gray-100 text-gray-800 rounded">
              {question.id}
            </span>
            {question.isUncertain && (
              <span className="text-sm font-medium px-2 py-1 bg-yellow-100 text-yellow-800 rounded flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Unsicher
              </span>
            )}
            <div className="flex items-center gap-2">
              {question.comments?.length > 0 && (
                <span className="text-sm font-medium px-2 py-1 bg-purple-100 text-purple-800 rounded flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  {question.comments.length}
                </span>
              )}
              {question.attachments?.length > 0 && (
                <span className="text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded flex items-center gap-1">
                  <Paperclip className="w-4 h-4" />
                  {question.attachments.length}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
            {question.description && !showAllDescriptions && (
              <button
                onClick={toggleDescription}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
              >
                {shouldShowDescription ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Beschreibung ausblenden
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Beschreibung anzeigen
                  </>
                )}
              </button>
            )}
            {shouldShowDescription && question.description && (
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                {question.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`text-sm font-bold px-3 py-1 rounded-full ${getScoreColor(question.score)}`}>
            {question.score === undefined ? '-/10' : `${question.score}/10`}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleUncertain}
              className={`p-2 rounded-full hover:bg-gray-100 ${
                question.isUncertain ? 'text-yellow-500' : 'text-gray-400'
              }`}
              title="Mark as uncertain"
            >
              <Flag className="w-5 h-5" />
            </button>
            <button
              onClick={handleDetailsClick}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400"
              title="Open details"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div 
        className="flex gap-4 mt-4" 
        onClick={e => e.stopPropagation()}
        role="radiogroup"
        aria-label="Question score"
      >
        {SCORE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
              question.score === option.value
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.value}
              checked={question.score === option.value}
              onChange={() => onAnswerChange(question.id, option.value)}
              className="sr-only"
              aria-label={option.label}
            />
            <span className="font-medium">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
});

QuestionCard.displayName = 'QuestionCard';

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  questions,
  onAnswerChange,
  onQuestionUpdate
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [filters, setFilters] = useState({
    status: 'all' as FilterStatus,
    score: 'all' as FilterScore,
    category: 'all' as string
  });
  const [categorySort, setCategorySort] = useState<SortDirection>('asc');
  const [showAllDescriptions, setShowAllDescriptions] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(questions.map(q => {
      const subcategory = q.id.split('.')[1]?.[0];
      return SUBCATEGORY_MAP[subcategory as keyof typeof SUBCATEGORY_MAP] || 'Sonstige';
    }))];
    
    return ['all', ...uniqueCategories.sort()];
  }, [questions]);

  const filteredAndSortedQuestions = useMemo(() => {
    return questions.filter(question => {
      if (filters.status === 'uncertain' && !question.isUncertain) return false;
      if (filters.status === 'answered' && question.score === undefined) return false;
      if (filters.status === 'open' && question.score !== undefined) return false;
      if (filters.status !== 'all' && filters.status !== 'uncertain') {
        const isAnswered = question.score !== undefined;
        if (filters.status === 'answered' !== isAnswered) return false;
      }

      if (filters.score !== 'all') {
        const scoreValue = typeof filters.score === 'string' ? parseInt(filters.score, 10) : filters.score;
        if (question.score !== scoreValue) return false;
      }

      if (filters.category !== 'all') {
        const subcategory = question.id.split('.')[1]?.[0];
        const category = SUBCATEGORY_MAP[subcategory as keyof typeof SUBCATEGORY_MAP] || 'Sonstige';
        if (category !== filters.category) return false;
      }

      return true;
    }).sort((a, b) => {
      const categoryA = a.id.split('.')[1]?.[0] || '';
      const categoryB = b.id.split('.')[1]?.[0] || '';
      return categorySort === 'asc' 
        ? categoryA.localeCompare(categoryB)
        : categoryB.localeCompare(categoryA);
    });
  }, [questions, filters, categorySort]);

  const handleFilterChange = useCallback((type: keyof typeof filters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [type]: type === 'score' && value !== 'all' ? parseInt(value as string, 10) : value
    }));
  }, []);

  const toggleCategorySort = useCallback(() => {
    setCategorySort(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []);

  const handleQuestionClick = useCallback((question: Question) => {
    setSelectedQuestion(question);
  }, []);

  const handleQuestionUpdate = useCallback((questionId: string, updates: Partial<Question>) => {
    if (onQuestionUpdate) {
      onQuestionUpdate(questionId, updates);
    }
  }, [onQuestionUpdate]);

  const getScoreColor = useCallback((score: number | undefined): string => {
    if (score === undefined) return 'bg-gray-100 text-gray-500';
    const colorMap: Record<number, string> = {
      10: 'bg-green-100 text-green-800',
      5: 'bg-yellow-100 text-yellow-800',
      0: 'bg-red-100 text-red-800'
    };
    return colorMap[score] || 'bg-gray-100 text-gray-500';
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Security Assessment Questionnaire</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-8" role="search">
        <div className="flex flex-wrap gap-4">
          <FilterSelect
            label="Status"
            value={filters.status}
            onChange={(value) => handleFilterChange('status', value)}
            options={[
              { value: 'all', label: 'All' },
              { value: 'answered', label: 'Answered' },
              { value: 'open', label: 'Open' },
              { value: 'uncertain', label: 'Uncertain' }
            ]}
          />

          <FilterSelect
            label="Answer"
            value={filters.score}
            onChange={(value) => handleFilterChange('score', value)}
            options={[
              { value: 'all', label: 'All' },
              ...SCORE_OPTIONS.map(opt => ({ value: opt.value, label: opt.label }))
            ]}
          />

          <FilterSelect
            label="Category"
            value={filters.category}
            onChange={(value) => handleFilterChange('category', value)}
            options={categories.map(category => ({
              value: category,
              label: category === 'all' ? 'All Categories' : category
            }))}
          />

          <button
            onClick={toggleCategorySort}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            aria-label={`Sort ${categorySort === 'asc' ? 'ascending' : 'descending'}`}
          >
            Sort {categorySort === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setShowAllDescriptions(prev => !prev)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {showAllDescriptions ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide All Descriptions
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show All Descriptions
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4" role="list">
        {filteredAndSortedQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            onQuestionClick={handleQuestionClick}
            onAnswerChange={onAnswerChange}
            onUpdateQuestion={handleQuestionUpdate}
            getScoreColor={getScoreColor}
            showAllDescriptions={showAllDescriptions}
          />
        ))}

        {filteredAndSortedQuestions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow" role="alert">
            <p className="text-gray-500">No questions match the selected filters</p>
          </div>
        )}
      </div>

      {selectedQuestion && (
        <QuestionDetails
          question={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
          onUpdate={handleQuestionUpdate}
        />
      )}
    </div>
  );
};