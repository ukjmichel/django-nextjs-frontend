'use client';

const { createContext, useContext, useState, useEffect } = require('react');

const AuthContext = createContext(null);

const LOCAL_STORAGE_KEY = 'is-logged-in';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
  };
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, '0');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
