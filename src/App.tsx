import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Shield, Settings as SettingsIcon, Menu, X, LogOut } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Questionnaire } from './components/Questionnaire';
import { MeasureDetails } from './components/MeasureDetails';
import { MeasuresList } from './components/MeasuresList';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { LandingPage } from './components/LandingPage';
import { ProjectSetupWizard } from './components/ProjectSetupWizard';
import { Question, Measure, Assessment } from './types/assessment';
import { measureDefinitions } from './data/measureDefinitions';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { LanguageProvider } from './components/LanguageContext';
import { LanguageSwitch } from './components/LanguageSwitch';
import { mockAssessment } from './data/mockAssessment';
import { calculateScores, getNextMeasureId } from './utils/assessment';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

function AppContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSetupWizard, setShowSetupWizard] = useState(true);
  const [assessment, setAssessment] = useState<Assessment>(mockAssessment);
  const [selectedMeasureId, setSelectedMeasureId] = useState<string | null>(null);
  const { logout, user, isAuthenticated } = useAuth();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handler for question score changes
  const handleAnswerChange = useCallback((questionId: string, score: number) => {
    setAssessment(prevAssessment => {
      const updatedQuestions = prevAssessment.questions.map(q =>
        q.id === questionId ? { ...q, score } : q
      );

      // Handle measure creation/update
      let updatedMeasures = [...prevAssessment.measures];
      if (measureDefinitions[questionId]) {
        // Remove any existing measure for this question
        updatedMeasures = updatedMeasures.filter(m => m.questionRef !== questionId);
        
        // If "Nein" or "Teilweise", create new measure
        if (score === 0 || score === 5) {
          const measureDef = score === 0 ? measureDefinitions[questionId].no : measureDefinitions[questionId].partial;
          const nextId = getNextMeasureId(updatedMeasures);
          
          const newMeasure: Measure = {
            id: nextId,
            questionRef: questionId,
            title: measureDef.title,
            category: updatedQuestions.find(q => q.id === questionId)?.category || 'Identify',
            priority: measureDef.priority,
            status: 'Offen',
            description: measureDef.description,
            responsibility: '',
            comment: '',
            tasks: measureDef.tasks.map((text, index) => ({
              id: String(index + 1),
              text,
              completed: false
            }))
          };
          
          updatedMeasures.push(newMeasure);
        }
      }

      const { categoryScores, overallScore } = calculateScores(updatedQuestions);

      return {
        ...prevAssessment,
        questions: updatedQuestions,
        measures: updatedMeasures,
        categoryScores,
        overallScore
      };
    });
  }, []);

  // Handler for question updates
  const handleQuestionUpdate = useCallback((questionId: string, updates: Partial<Question>) => {
    setAssessment(prevAssessment => ({
      ...prevAssessment,
      questions: prevAssessment.questions.map(q =>
        q.id === questionId ? { ...q, ...updates } : q
      )
    }));
  }, []);

  // Handler for measure updates
  const handleMeasureUpdate = useCallback((measureId: string, updates: Partial<Measure>) => {
    setAssessment(prevAssessment => ({
      ...prevAssessment,
      measures: prevAssessment.measures.map(m =>
        m.id === measureId ? { ...m, ...updates } : m
      )
    }));
  }, []);

  // Handler for importing assessment data
  const handleImport = useCallback((importedData: Assessment) => {
    setAssessment(importedData);
    setShowSetupWizard(false);
  }, []);

  const navigationItems = [
    { path: '/', icon: LayoutDashboard, text: 'Dashboard' },
    { path: '/questionnaire', icon: ClipboardList, text: 'Questionnaire' },
    { path: '/measures', icon: Shield, text: 'Measures' },
    { path: '/settings', icon: SettingsIcon, text: 'Settings' }
  ];

  const handleLogout = async () => {
    await logout();
  };

  // Show landing page if not authenticated
  if (!isAuthenticated && location.pathname !== '/login') {
    return <LandingPage />;
  }

  // Hide navigation on login page
  if (location.pathname === '/login') {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Project Setup Wizard */}
      {showSetupWizard && (
        <ProjectSetupWizard
          onComplete={handleImport}
          onClose={() => setShowSetupWizard(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Security Assessment</h1>
          <div className="mt-2 text-sm text-gray-600">
            {user?.username}
          </div>
          <div className="mt-1 text-sm text-gray-500">
            {assessment.companyName}
          </div>
        </div>
        <nav className="mt-6">
          {navigationItems.map(({ path, icon: Icon, text }) => (
            <Link
              key={path}
              to={path}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              <Icon className="w-5 h-5 mr-3" />
              {text}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMobileMenu} />
      )}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 pt-16">
          <h1 className="text-2xl font-bold text-gray-900">Security Assessment</h1>
          <div className="mt-2 text-sm text-gray-600">
            {user?.username}
          </div>
          <div className="mt-1 text-sm text-gray-500">
            {assessment.companyName}
          </div>
        </div>
        <nav className="mt-6">
          {navigationItems.map(({ path, icon: Icon, text }) => (
            <Link
              key={path}
              to={path}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
              onClick={closeMobileMenu}
            >
              <Icon className="w-5 h-5 mr-3" />
              {text}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard assessment={assessment} />
            </ProtectedRoute>
          } />
          <Route path="/questionnaire" element={
            <ProtectedRoute>
              <Questionnaire
                questions={assessment.questions}
                onAnswerChange={handleAnswerChange}
                onQuestionUpdate={handleQuestionUpdate}
              />
            </ProtectedRoute>
          } />
          <Route path="/measures" element={
            <ProtectedRoute>
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Security Measures</h1>
                {selectedMeasureId ? (
                  <div>
                    <button
                      onClick={() => setSelectedMeasureId(null)}
                      className="mb-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Back to List
                    </button>
                    <MeasureDetails 
                      measure={assessment.measures.find(m => m.id === selectedMeasureId)!}
                      onUpdate={handleMeasureUpdate}
                    />
                  </div>
                ) : (
                  <MeasuresList 
                    measures={assessment.measures}
                    onSelectMeasure={setSelectedMeasureId}
                  />
                )}
              </div>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings assessment={assessment} onImport={handleImport} />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;