'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const LOGIN_REDIRECT_URL = '/';
const LOGOUT_REDIRECT_URL = '/';
const LOGIN_REQUIRED_URL = '/login';
const LOCAL_STORAGE_KEY = 'auth-data';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const storedAuthData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedAuthData) {
      const { isLoggedIn, user } = JSON.parse(storedAuthData);
      setIsAuthenticated(isLoggedIn);
      setUsername(user || '');
    }
  }, []);

  const login = async (user) => {
    // Check if `user` is defined and has a `name` property
    if (!user || !user.username) {
      console.error('Invalid user data:', user);
      return;
    }

    try {
      // Perform login API request
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (response.ok) {
        // On successful login, update state and localStorage
        setIsAuthenticated(true);
        setUsername(user.username);

        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({
            isLoggedIn: true,
            user: user.username,
          })
        );

        // Handle redirection based on `next` URL
        const nextUrl = searchParams.get('next');
        const invalidNextUrls = ['/login', '/logout'];
        const nextUrlValid =
          nextUrl &&
          nextUrl.startsWith('/') &&
          !invalidNextUrls.includes(nextUrl);

        router.replace(LOGIN_REDIRECT_URL);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        isLoggedIn: false,
        user: '',
      })
    );
    router.replace(LOGOUT_REDIRECT_URL);
  };

  const loginRequiredRedirect = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        isLoggedIn: false,
        user: '',
      })
    );
    const loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathname}`;
    router.replace(loginWithNextUrl);
    return;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        login,
        logout,
        loginRequiredRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
