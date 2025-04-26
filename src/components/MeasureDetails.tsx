import React, { useState } from 'react';
import { Measure, Task } from '../types/assessment';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface MeasureDetailsProps {
  measure: Measure;
  onUpdate: (measureId: string, updates: Partial<Measure>) => void;
}

export const MeasureDetails: React.FC<MeasureDetailsProps> = ({ measure, onUpdate }) => {
  const handleTaskToggle = (taskId: string) => {
    const updatedTasks = measure.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    onUpdate(measure.id, { tasks: updatedTasks });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
                {measure.questionRef}
              </span>
              <span className="text-sm font-medium px-2 py-1 bg-gray-100 text-gray-800 rounded">
                {measure.category}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{measure.title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <input
              type="text"
              value={measure.status}
              onChange={(e) => onUpdate(measure.id, { status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Verantwortlichkeit</label>
            <input
              type="text"
              value={measure.responsibility}
              onChange={(e) => onUpdate(measure.id, { responsibility: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priorität</label>
            <select
              value={measure.priority}
              onChange={(e) => onUpdate(measure.id, { priority: e.target.value as Measure['priority'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Hoch">Hoch</option>
              <option value="Mittel">Mittel</option>
              <option value="Niedrig">Niedrig</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kommentar</label>
            <input
              type="text"
              value={measure.comment}
              onChange={(e) => onUpdate(measure.id, { comment: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ziele & Aufgaben</h3>
          <div className="space-y-3">
            {measure.tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskToggle(task.id)}
                  className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};