import React, { useState } from 'react';
import { Download, Upload, Share2 } from 'lucide-react';
import { Assessment } from '../types/assessment';
import { useAuth } from '../auth/AuthContext';
import { Client } from '@microsoft/microsoft-graph-client';
import { SharePointFileBrowser } from './SharePointFileBrowser';

interface SettingsProps {
  assessment: Assessment;
  onImport: (data: Assessment) => void;
}

export const Settings: React.FC<SettingsProps> = ({ assessment, onImport }) => {
  const { user, acquireToken } = useAuth();
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [showFileBrowser, setShowFileBrowser] = useState(false);

  const handleExport = () => {
    const dataStr = JSON.stringify(assessment, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `security-assessment-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content) as Assessment;
        onImport(importedData);
      } catch (error) {
        console.error('Error importing file:', error);
        alert('Error importing file. Please make sure it\'s a valid assessment file.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleSharePointExport = async () => {
    if (!user || user.environment === 'local') {
      alert('Please login with Microsoft account to use SharePoint export');
      return;
    }

    setIsExporting(true);
    setExportError(null);

    try {
      const accessToken = await acquireToken(['Sites.ReadWrite.All', 'Files.ReadWrite.All']);
      
      const graphClient = Client.init({
        authProvider: (done) => {
          done(null, accessToken);
        }
      });

      // Get the site ID first
      const siteResponse = await graphClient
        .api('/sites/herrinformatikch.sharepoint.com:/sites/HerrInformatikGmbH')
        .get();

      const siteId = siteResponse.id;
      
      // Base path for assessments
      const basePath = '/General/00. Kunden/Herr-Informatik GmbH/04. Produkte/Cyber Security/99. Security Assessment';
      
      // Check if company folder exists
      try {
        await graphClient
          .api(`/sites/${siteId}/drive/root:${basePath}/${assessment.companyName}`)
          .get();
      } catch (error) {
        // If folder doesn't exist, create it
        console.log('Creating company folder...');
        await graphClient
          .api(`/sites/${siteId}/drive/root:${basePath}/${assessment.companyName}`)
          .header('Content-Type', 'application/json')
          .put({
            "name": assessment.companyName,
            "folder": {},
            "@microsoft.graph.conflictBehavior": "rename"
          });
      }

      // Prepare the file content
      const fileName = `security-assessment-${new Date().toISOString().split('T')[0]}.json`;
      const fileContent = JSON.stringify(assessment, null, 2);

      // Upload to the company folder
      await graphClient
        .api(`/sites/${siteId}/drive/root:${basePath}/${assessment.companyName}/${fileName}:/content`)
        .put(fileContent);

      alert('Assessment successfully exported to SharePoint!');
    } catch (error: any) {
      console.error('SharePoint export error:', error);
      const errorMessage = error.message || 'Unknown error occurred';
      setExportError(`Failed to export to SharePoint: ${errorMessage}`);
      alert(`Export failed: ${errorMessage}. Please check your permissions and try again.`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileSelect = (content: string) => {
    try {
      const importedData = JSON.parse(content) as Assessment;
      onImport(importedData);
      setShowFileBrowser(false);
    } catch (error) {
      console.error('Error importing file:', error);
      alert('Error importing file. Please make sure it\'s a valid assessment file.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Assessment Data</h2>
          
          <div className="space-y-6">
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium mb-4">Export Assessment</h3>
              <p className="text-gray-600 mb-4">
                Download your current assessment data or export it directly to SharePoint.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <button
                    onClick={handleExport}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Export as File
                  </button>
                  {user && user.environment !== 'local' && (
                    <button
                      onClick={handleSharePointExport}
                      disabled={isExporting}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed"
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      {isExporting ? 'Exporting...' : 'Export to SharePoint'}
                    </button>
                  )}
                </div>
                {exportError && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    {exportError}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Import Assessment</h3>
              <p className="text-gray-600 mb-4">
                Upload a previously exported assessment file or import from SharePoint.
              </p>
              <div className="flex gap-4">
                <label className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors cursor-pointer">
                  <Upload className="w-5 h-5 mr-2" />
                  Import from File
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
                {user && user.environment !== 'local' && (
                  <button
                    onClick={() => setShowFileBrowser(true)}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Import from SharePoint
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {user?.username === 'admin' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Azure AD Configuration</h2>
            <div className="text-gray-600">
              <p>Client ID: {import.meta.env.VITE_AZURE_CLIENT_ID || '490a0a25-fb38-4d7d-9863-4390bba1ac68'}</p>
              <p>Tenant ID: {import.meta.env.VITE_AZURE_TENANT_ID || '5a995509-48c8-4f3d-9cca-ad648a06c37c'}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Current User</h2>
          <div className="text-gray-600">
            <p>Logged in as: {user?.username}</p>
            <p>Account type: {user?.environment === 'local' ? 'Local Admin' : 'Azure AD'}</p>
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