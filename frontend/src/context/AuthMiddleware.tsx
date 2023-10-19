import React, {createContext } from 'react';
import {useSelector} from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const AuthContext = createContext<boolean>(false);
export const AuthMiddleware = ({children}: {children: React.ReactNode}) => {
  const isAuthenticated = useSelector(state => state.user.isAuth)

  const location = useLocation()
  const { pathname } = location
  if(!isAuthenticated && pathname === '/profile'){
      return <Navigate to="/" replace/>
  }
  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  );
}
