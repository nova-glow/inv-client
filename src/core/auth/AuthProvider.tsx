import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const login = (email: string, password: string) => {
    console.log(email, password);
    setIsAuthenticated(true);
    navigate('/dashboard');
  };
  const logout = () => {
    setIsAuthenticated(false);
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
