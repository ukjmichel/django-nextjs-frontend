'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const LOGIN_REDIRECT_URL = '/';
const LOGOUT_REDIRECT_URL = '/';
const LOGIN_REQUIRED_URL = '/login';
const LOCAL_STORAGE_KEY = 'is-logged-in';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedAuthStatus) {
      const parsedStatus = parseInt(storedAuthStatus);
      setIsAuthenticated(parsedStatus === 1);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, '1');

    const nextUrl = searchParams.get('next');
    const invalidNextUrls = ['/login', '/logout'];
    const nextUrlValid =
      nextUrl && nextUrl.startsWith('/') && !invalidNextUrls.includes(nextUrl);

    if (nextUrlValid) {
      router.replace(nextUrl);
      return;
    } else {
      router.replace(LOGIN_REDIRECT_URL);
      return;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, '0');
    router.replace(LOGOUT_REDIRECT_URL);
  };

  const loginRequiredRedirect = () => {
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, '0');
    const loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathname}`;
    router.replace(loginWithNextUrl);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loginRequiredRedirect }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
