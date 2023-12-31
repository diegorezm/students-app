import React, {createContext} from 'react';
import toast from 'react-hot-toast';
import {useSelector} from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';

export const AuthContext = createContext<boolean>(false);
export const AuthMiddleware = ({children}: {children: React.ReactNode}) => {
  const isAuthenticated = useSelector(state => state.user.isAuth)

  const location = useLocation()
  const {pathname} = location

  if (!isAuthenticated && (pathname === '/profile' || pathname === '/')) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  );
}
