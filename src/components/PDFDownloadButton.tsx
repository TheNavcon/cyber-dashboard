import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import PDFReport from './PDFReport';
import { Assessment } from '../types/assessment';
import { useLanguage } from './LanguageContext';

interface PDFDownloadButtonProps {
  assessment: Assessment;
}

export const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ assessment }) => {
  const { language } = useLanguage();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      // Create PDF document
      const doc = <PDFReport assessment={assessment} language={language} />;
      
      // Generate PDF blob
      const blob = await pdf(doc).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `security-assessment-${assessment.companyName}-${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError(
        error instanceof Error 
          ? `Failed to generate PDF: ${error.message}`
          : 'An unexpected error occurred while generating the PDF'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        <Download className="w-5 h-5 mr-2" />
        {isGenerating ? 'Generating PDF...' : 'Download PDF Report'}
      </button>
      
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md max-w-md">
          {error}
          <div className="mt-1 text-xs">
            Please try again or contact support if the problem persists.
          </div>
        </div>
      )}
    </div>
  );
};