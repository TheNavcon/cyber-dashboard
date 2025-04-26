import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SharePointFileBrowser } from './SharePointFileBrowser';
import { Assessment } from '../types/assessment';
import { Building2, FileSpreadsheet, Upload, FolderOpen } from 'lucide-react';
import { questions } from '../data/questions';
import { calculateScores } from '../utils/assessment';
import { Logo } from './Logo';

interface ProjectSetupWizardProps {
  onComplete: (assessment: Assessment) => void;
  onClose: () => void;
}

type ProjectType = 'new' | 'import' | null;
type ImportSource = 'local' | 'sharepoint' | null;

export const ProjectSetupWizard: React.FC<ProjectSetupWizardProps> = ({ onComplete, onClose }) => {
  const [projectType, setProjectType] = useState<ProjectType>(null);
  const [importSource, setImportSource] = useState<ImportSource>(null);
  const [companyName, setCompanyName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [showFileBrowser, setShowFileBrowser] = useState(false);
  const [importedAssessment, setImportedAssessment] = useState<Assessment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDetailsSubmit = () => {
    if (!companyName || !projectName) {
      setError('Please fill in all fields');
      return;
    }
    setError(null);

    if (projectType === 'new') {
      handleStartNew();
    } else if (importedAssessment) {
      handleImportComplete();
    }
  };

  const handleFileSelect = (content: string) => {
    try {
      const importedData = JSON.parse(content) as Assessment;
      setImportedAssessment(importedData);
      setCompanyName(importedData.companyName || '');
      setProjectName(importedData.id || '');
      setShowFileBrowser(false);
    } catch (error) {
      console.error('Error importing file:', error);
      setError('Error importing file. Please make sure it\'s a valid assessment file.');
    }
  };

  const handleLocalFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        handleFileSelect(content);
      } catch (error) {
        console.error('Error reading file:', error);
        setError('Error reading file. Please try again.');
      }
    };
    reader.readAsText(file);
  };

  const handleStartNew = () => {
    const { categoryScores, overallScore } = calculateScores(questions);
    
    const newAssessment: Assessment = {
      id: projectName,
      companyName,
      date: new Date().toISOString().split('T')[0],
      questions: questions,
      measures: [],
      categoryScores,
      overallScore
    };
    onComplete(newAssessment);
    navigate('/');
  };

  const handleImportComplete = () => {
    if (!importedAssessment) return;

    const updatedAssessment = {
      ...importedAssessment,
      companyName: companyName || importedAssessment.companyName,
      id: projectName || importedAssessment.id,
      date: new Date().toISOString().split('T')[0]
    };
    onComplete(updatedAssessment);
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col min-h-screen z-50">
      {/* Header */}
      <header className="bg-white shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo className="h-8" />
            <h1 className="text-2xl font-bold text-gray-900">Project Setup</h1>
            <div className="w-20">{/* Spacer for alignment */}</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10 bg-white">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-8">
          {projectType === null ? (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
                Welcome to Security Assessment Dashboard
              </h2>
              <button
                onClick={() => setProjectType('import')}
                className="w-full flex items-center justify-center gap-3 px-4 py-6 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FolderOpen className="w-8 h-8 text-blue-600" />
                <div className="text-left">
                  <div className="text-lg font-medium">Load Template</div>
                  <div className="text-sm text-gray-500">Load an assessment from SharePoint or local file</div>
                </div>
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
              <button
                onClick={() => setProjectType('new')}
                className="w-full flex items-center justify-center gap-3 px-4 py-6 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Building2 className="w-8 h-8 text-green-600" />
                <div className="text-left">
                  <div className="text-lg font-medium">New Assessment</div>
                  <div className="text-sm text-gray-500">Create a new security assessment from scratch</div>
                </div>
              </button>
            </div>
          ) : projectType === 'import' && !importedAssessment ? (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">Choose Template Source</h2>
              <button
                onClick={() => {
                  fileInputRef.current?.click();
                  setImportSource('local');
                }}
                className="w-full flex items-center justify-center gap-3 px-4 py-6 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Upload className="w-8 h-8 text-blue-600" />
                <div className="text-left">
                  <div className="text-lg font-medium">Local File</div>
                  <div className="text-sm text-gray-500">Import from your computer</div>
                </div>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".json"
                onChange={handleLocalFileSelect}
              />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowFileBrowser(true);
                  setImportSource('sharepoint');
                }}
                className="w-full flex items-center justify-center gap-3 px-4 py-6 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FileSpreadsheet className="w-8 h-8 text-blue-600" />
                <div className="text-left">
                  <div className="text-lg font-medium">SharePoint</div>
                  <div className="text-sm text-gray-500">Import from SharePoint</div>
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                {projectType === 'new' ? 'New Assessment Details' : 'Assessment Details'}
              </h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter project name"
                  />
                </div>
              </div>
              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => {
                if (importedAssessment) {
                  setImportedAssessment(null);
                  setImportSource(null);
                } else if (importSource) {
                  setImportSource(null);
                } else {
                  setProjectType(null);
                }
              }}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Back
            </button>
            {(projectType === 'new' || importedAssessment) && (
              <button
                onClick={handleDetailsSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {projectType === 'new' ? 'Create Assessment' : 'Continue'}
              </button>
            )}
          </div>
        </div>
      </div>

      {showFileBrowser && (
        <SharePointFileBrowser
          onFileSelect={handleFileSelect}
          onClose={() => setShowFileBrowser(false)}
        />
      )}
    </div>
  );
};