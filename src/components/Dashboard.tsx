import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Shield, AlertCircle, Search, ArrowRight, RefreshCw } from 'lucide-react';
import { NistCategory, Assessment } from '../types/assessment';
import { Logo } from './Logo';
import { PDFDownloadButton } from './PDFDownloadButton';

interface DashboardProps {
  assessment: Assessment;
}

const categoryIcons = {
  Identify: Search,
  Protect: Shield,
  Detect: AlertCircle,
  Respond: ArrowRight,
  Recover: RefreshCw,
};

export const Dashboard: React.FC<DashboardProps> = ({ assessment }) => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Logo and Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <Logo className="h-10" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assessment Overview</h1>
            <p className="mt-2 text-gray-600">
              Company: {assessment.companyName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <PDFDownloadButton assessment={assessment} />
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500">Project ID</p>
            <p className="text-lg font-semibold text-gray-900">{assessment.id}</p>
            <p className="text-sm text-gray-500 mt-1">
              Last updated: {new Date(assessment.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Overall Score</h2>
        <div className="flex items-center">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded-full">
              <div 
                className="h-4 bg-blue-600 rounded-full"
                style={{ width: `${assessment.overallScore}%` }}
              />
            </div>
          </div>
          <span className="ml-4 text-2xl font-bold">{assessment.overallScore}%</span>
        </div>
      </div>

      {/* Category Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {assessment.categoryScores.map(({ category, score }) => {
          const Icon = categoryIcons[category];
          return (
            <div key={category} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-2">
                <Icon className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-semibold">{category}</h3>
              </div>
              <div className="text-3xl font-bold mb-2">{score}%</div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Category Performance</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={assessment.categoryScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Bar dataKey="score" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Measures Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Recent Measures</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Measure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assessment.measures.map((measure) => (
                <tr key={measure.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{measure.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{measure.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${measure.priority === 'High' ? 'bg-red-100 text-red-800' : 
                        measure.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'}`}>
                      {measure.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${measure.status === 'Done' ? 'bg-green-100 text-green-800' : 
                        measure.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {measure.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};