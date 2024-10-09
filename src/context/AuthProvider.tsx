import React, { ReactNode, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  //   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    console.log('checkAuth');
    localStorage.getItem('token') ?
      setIsAuthenticated(true) :
      setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
