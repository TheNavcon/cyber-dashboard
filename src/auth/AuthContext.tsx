import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { PublicClientApplication, Configuration, AccountInfo, EventType } from '@azure/msal-browser';

interface AuthContextType {
  isAuthenticated: boolean;
  user: AccountInfo | null;
  login: (username?: string, password?: string) => Promise<void>;
  loginWithAzure: () => Promise<void>;
  logout: () => Promise<void>;
  acquireToken: (scopes: string[]) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || '490a0a25-fb38-4d7d-9863-4390bba1ac68',
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID || '5a995509-48c8-4f3d-9cca-ad648a06c37c'}`,
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    allowNativeBroker: false,
    windowHashTimeout: 60000,
    iframeHashTimeout: 6000,
    loadFrameTimeout: 0,
  }
};

const loginRequest = {
  scopes: [
    'User.Read',
    'Files.Read.All',
    'Sites.Read.All'
  ]
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AccountInfo | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const msalInstance = useRef<PublicClientApplication | null>(null);

  useEffect(() => {
    const initializeMsal = async () => {
      try {
        if (!msalInstance.current) {
          console.log('Initializing MSAL...');
          msalInstance.current = new PublicClientApplication(msalConfig);
          await msalInstance.current.initialize();
          console.log('MSAL initialized successfully');

          // Handle redirect promise
          const result = await msalInstance.current.handleRedirectPromise();
          if (result) {
            setUser(result.account);
            setIsAuthenticated(true);
          }

          // Register event callbacks
          msalInstance.current.addEventCallback((event) => {
            if (event.eventType === EventType.LOGIN_SUCCESS) {
              const account = event.payload as AccountInfo;
              setUser(account);
              setIsAuthenticated(true);
            } else if (event.eventType === EventType.LOGOUT_SUCCESS) {
              setUser(null);
              setIsAuthenticated(false);
              sessionStorage.clear();
            }
          });

          // Check for existing accounts
          const accounts = msalInstance.current.getAllAccounts();
          if (accounts.length > 0) {
            setUser(accounts[0]);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('MSAL initialization error:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeMsal();
  }, []);

  const login = async (username?: string, password?: string) => {
    if (username === 'admin' && password === 'Aniw5LnaYWUM59$') {
      const userData = {
        homeAccountId: 'admin',
        localAccountId: 'admin',
        environment: 'local',
        tenantId: 'local',
        username: 'admin',
      };
      setIsAuthenticated(true);
      setUser(userData);
      sessionStorage.setItem('localAuth', JSON.stringify({
        isAuthenticated: true,
        user: userData
      }));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const loginWithAzure = async () => {
    if (!msalInstance.current || !isInitialized) {
      throw new Error('MSAL is not initialized');
    }

    try {
      console.log('Attempting Azure login...');
      const response = await msalInstance.current.loginPopup({
        ...loginRequest,
        prompt: 'select_account'
      });
      console.log('Login successful:', response);
      setUser(response.account);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Azure AD login failed:', error);
      throw error;
    }
  };

  const acquireToken = async (scopes: string[]): Promise<string> => {
    if (!msalInstance.current || !isInitialized) {
      throw new Error('MSAL is not initialized');
    }

    try {
      const account = msalInstance.current.getAllAccounts()[0];
      if (!account) {
        throw new Error('No account found');
      }

      console.log('Attempting silent token acquisition...');
      const response = await msalInstance.current.acquireTokenSilent({
        scopes,
        account
      });
      console.log('Token acquired silently');
      return response.accessToken;
    } catch (error) {
      console.log('Silent token acquisition failed, trying popup');
      const response = await msalInstance.current.acquireTokenPopup({ scopes });
      console.log('Token acquired through popup');
      return response.accessToken;
    }
  };

  const logout = async () => {
    if (user?.environment === 'local') {
      sessionStorage.removeItem('localAuth');
      sessionStorage.clear();
      setIsAuthenticated(false);
      setUser(null);
    } else if (msalInstance.current && isInitialized) {
      try {
        console.log('Logging out...');
        msalInstance.current.clearCache();
        await msalInstance.current.logoutPopup({
          postLogoutRedirectUri: window.location.origin,
          mainWindowRedirectUri: window.location.origin
        });
        sessionStorage.clear();
        console.log('Logout successful');
      } catch (error) {
        console.error('Logout error:', error);
      }
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    const storedAuth = sessionStorage.getItem('localAuth');
    if (storedAuth) {
      const { isAuthenticated: stored, user: storedUser } = JSON.parse(storedAuth);
      setIsAuthenticated(stored);
      setUser(storedUser);
    }
  }, []);

  if (!isInitialized) {
    return <div>Initializing authentication...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, loginWithAzure, logout, acquireToken }}>
      {children}
    </AuthContext.Provider>
  );
};