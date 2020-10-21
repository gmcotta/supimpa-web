import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

type SignInCredentials = {
  email: string;
  password: string;
};

type UserType = {
  id: number;
  name: string;
  email: string;
};

type AuthState = {
  user: UserType;
  token: string;
};

type AuthContextTypes = {
  signIn(credentials: SignInCredentials): void;
  user: UserType;
};

const AuthContext = createContext({} as AuthContextTypes);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState(() => {
    const rawUser = localStorage.getItem('@Supimpa:admin/user');
    const token = localStorage.getItem('@Supimpa:admin/token');
    if (rawUser && token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      const user = JSON.parse(rawUser);
      return { user, token };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(({ email, password }) => {
    console.log(email, password);
    api.post('/admin/session', { email, password }).then(response => {
      const { user, token } = response.data;

      localStorage.setItem('@Supimpa:admin/user', JSON.stringify(user));
      localStorage.setItem('@Supimpa:admin/token', token);

      api.defaults.headers.Authorization = `Bearer ${token}`;
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextTypes {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Context must be within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
