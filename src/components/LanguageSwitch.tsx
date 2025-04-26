import React from 'react';
import { useLanguage } from './LanguageContext';

export const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage('de')}
        className={`px-2 py-1 rounded ${
          language === 'de' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        DE
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded ${
          language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        EN
      </button>
    </div>
  );
};