import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

type SignInCredentials = {
  email: string;
  password: string;
  rememberMe: boolean;
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
  user: UserType;
  signIn(credentials: SignInCredentials): Promise<boolean>;
  signOut(): void;
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

  const signIn = useCallback(
    async ({
      email,
      password,
      rememberMe,
    }: SignInCredentials): Promise<boolean> => {
      try {
        const response = await api.post('/admin/session', { email, password });
        const { user, token } = response.data;
        setData({ user, token });
        api.defaults.headers.Authorization = `Bearer ${token}`;

        if (rememberMe) {
          localStorage.setItem('@Supimpa:admin/user', JSON.stringify(user));
          localStorage.setItem('@Supimpa:admin/token', token);
        }

        return true;
      } catch (error) {
        return false;
      }
    },
    [],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@Supimpa:admin/user');
    localStorage.removeItem('@Supimpa:admin/token');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
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
