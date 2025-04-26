import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, LineChart, Clock, Lock, Users } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSwitch } from './LanguageSwitch';
import { useLanguage } from './LanguageContext';

export const LandingPage: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    de: {
      title: 'Umfassende Sicherheitsbewertung',
      subtitle: 'Bewerten und verbessern Sie die Sicherheitslage Ihrer Organisation',
      description: 'Evaluieren Sie Ihre Sicherheitsposition mit unserem umfassenden Bewertungstool. Erhalten Sie umsetzbare Erkenntnisse und Empfehlungen basierend auf Branchenstandards.',
      getStarted: 'Jetzt starten',
      features: {
        title: 'Funktionen',
        subtitle: 'Warum unser Bewertungstool?',
        description: 'Umfassende Sicherheitsbewertung basierend auf Branchenstandards und Best Practices.'
      }
    },
    en: {
      title: 'Comprehensive Security Assessment',
      subtitle: 'Evaluate and improve your organization\'s security posture',
      description: 'Evaluate and improve your organization\'s security posture with our comprehensive assessment tool. Get actionable insights and recommendations based on industry best practices.',
      getStarted: 'Get Started',
      features: {
        title: 'Features',
        subtitle: 'Why Choose Our Assessment Tool?',
        description: 'Comprehensive security assessment based on industry standards and best practices.'
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Logo />
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitch />
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {language === 'de' ? 'Anmelden' : 'Login'}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">{t.subtitle}</span>
                  <span className="block text-blue-600">{t.title}</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {t.description}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <Link
                    to="/login"
                    className="rounded-md shadow px-8 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    {t.getStarted}
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="Security operations center"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">{t.features.title}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t.features.subtitle}
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              {t.features.description}
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Comprehensive Assessment</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Cover all aspects of security including organizational, technical, and procedural measures.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <LineChart className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Detailed Analytics</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Get detailed insights and scores across different security categories.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Time-Efficient</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Streamlined assessment process with clear questions and automated scoring.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Secure Storage</h3>
                  <p className="mt-2 text-base text-gray-500">
                    All assessment data is securely stored and accessible only to authorized users.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Collaboration</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Work together with your team and share assessments securely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Start your security assessment today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                {t.getStarted}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <p className="text-base text-gray-400">
                © 2024 Security Assessment Dashboard. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};