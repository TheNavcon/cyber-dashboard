import React, { useState, useEffect } from 'react';
import { Client } from '@microsoft/microsoft-graph-client';
import { useAuth } from '../auth/AuthContext';
import { Folder, File, ChevronRight, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

interface DriveItem {
  id: string;
  name: string;
  folder?: any;
  webUrl: string;
  parentReference?: {
    path: string;
    driveId: string;
  };
}

interface SharePointFileBrowserProps {
  onFileSelect: (content: string) => void;
  onClose: () => void;
}

export const SharePointFileBrowser: React.FC<SharePointFileBrowserProps> = ({ onFileSelect, onClose }) => {
  const [items, setItems] = useState<DriveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string>('/General/00. Kunden/Herr-Informatik GmbH/04. Produkte/Cyber Security/99. Security Assessment');
  const [pathHistory, setPathHistory] = useState<string[]>([]);
  const { acquireToken } = useAuth();

  const loadItems = async (path: string) => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = await acquireToken([
        'Sites.Read.All',
        'Files.Read.All'
      ]);

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

      // Get items from the specific path
      const itemsResponse = await graphClient
        .api(`/sites/${siteId}/drive/root:${path}:/children`)
        .get();

      // Sort items: folders first, then files
      const sortedItems = itemsResponse.value.sort((a: DriveItem, b: DriveItem) => {
        if (a.folder && !b.folder) return -1;
        if (!a.folder && b.folder) return 1;
        return a.name.localeCompare(b.name);
      });

      setItems(sortedItems);
    } catch (err: any) {
      console.error('SharePoint access error:', err);
      setError(err.message || 'Failed to access SharePoint. Please check your permissions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems(currentPath);
  }, [currentPath]);

  const handleItemClick = async (item: DriveItem) => {
    if (item.folder) {
      setPathHistory([...pathHistory, currentPath]);
      setCurrentPath(`${currentPath}/${item.name}`);
    } else if (item.name.endsWith('.json')) {
      try {
        setLoading(true);
        const accessToken = await acquireToken([
          'Sites.Read.All',
          'Files.Read.All'
        ]);

        // Get the site ID first
        const siteResponse = await fetch(
          'https://graph.microsoft.com/v1.0/sites/herrinformatikch.sharepoint.com:/sites/HerrInformatikGmbH',
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );

        if (!siteResponse.ok) {
          throw new Error('Failed to get site information');
        }

        const siteData = await siteResponse.json();
        const siteId = siteData.id;

        // Download file content
        const response = await fetch(
          `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root:${currentPath}/${item.name}:/content`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to download file: ${response.statusText}`);
        }

        const content = await response.text();
        onFileSelect(content);
      } catch (err: any) {
        console.error('Error downloading file:', err);
        setError(`Failed to download file: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (pathHistory.length > 0) {
      const previousPath = pathHistory[pathHistory.length - 1];
      setPathHistory(pathHistory.slice(0, -1));
      setCurrentPath(previousPath);
    }
  };

  const getBreadcrumbs = () => {
    const parts = currentPath.split('/').filter(Boolean);
    return parts.map((part, index) => {
      const isLast = index === parts.length - 1;
      return (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
          <span className={`${isLast ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
            {part}
          </span>
        </React.Fragment>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Select Assessment File</h2>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 overflow-x-auto">
            {getBreadcrumbs()}
          </div>
        </div>

        <div className="p-6">
          {pathHistory.length > 0 && (
            <button
              onClick={handleBack}
              className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : error ? (
            <div className="bg-red-50 p-6 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-red-800 font-medium">Access Error</h3>
                  <p className="text-red-600 mt-1">{error}</p>
                  <p className="text-red-700 mt-4">Please ensure you have:</p>
                  <ul className="list-disc list-inside text-red-600 mt-2">
                    <li>Logged in with a valid Microsoft account</li>
                    <li>Been granted access to the SharePoint site</li>
                    <li>Proper permissions to view and download files</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {item.folder ? (
                    <Folder className="w-5 h-5 text-yellow-500 mr-3" />
                  ) : (
                    <File className="w-5 h-5 text-blue-500 mr-3" />
                  )}
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.folder && <ChevronRight className="w-5 h-5 text-gray-400" />}
                </button>
              ))}
              {items.length === 0 && !error && (
                <div className="text-center py-8 text-gray-500">
                  No files found in this location
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <button
            onClick={() => loadItems(currentPath)}
            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
          >
            Refresh
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};