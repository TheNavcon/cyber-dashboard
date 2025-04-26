import React, { useState } from 'react';
import { Measure } from '../types/assessment';
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';

interface MeasuresListProps {
  measures: Measure[];
  onSelectMeasure: (measureId: string) => void;
}

type SortField = 'id' | 'questionRef' | 'category' | 'priority' | 'title';
type SortDirection = 'asc' | 'desc';

export const MeasuresList: React.FC<MeasuresListProps> = ({ measures, onSelectMeasure }) => {
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-blue-600" /> : 
      <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  const sortedMeasures = [...measures].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    switch (sortField) {
      case 'id':
        return a.id.localeCompare(b.id) * direction;
      case 'questionRef':
        return a.questionRef.localeCompare(b.questionRef) * direction;
      case 'category':
        return a.category.localeCompare(b.category) * direction;
      case 'priority': {
        const priorityOrder = { 'Hoch': 0, 'Mittel': 1, 'Niedrig': 2 };
        return (priorityOrder[a.priority] - priorityOrder[b.priority]) * direction;
      }
      case 'title':
        return a.title.localeCompare(b.title) * direction;
      default:
        return 0;
    }
  });

  const SortableHeader: React.FC<{ field: SortField; children: React.ReactNode }> = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {getSortIcon(field)}
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <SortableHeader field="id">Measurement ID</SortableHeader>
            <SortableHeader field="questionRef">Question Ref</SortableHeader>
            <SortableHeader field="category">Category</SortableHeader>
            <SortableHeader field="priority">Priority</SortableHeader>
            <SortableHeader field="title">Title</SortableHeader>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedMeasures.map((measure) => (
            <tr
              key={measure.id}
              onClick={() => onSelectMeasure(measure.id)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {measure.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {measure.questionRef}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {measure.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${measure.priority === 'Hoch' ? 'bg-red-100 text-red-800' : 
                    measure.priority === 'Mittel' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'}`}>
                  {measure.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {measure.title}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};