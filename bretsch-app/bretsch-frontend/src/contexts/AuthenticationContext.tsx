import React, { useState } from 'react';
import useLocalStorage from '../util/LocalStorageHook';

export type JWTTokenData = {
  id: number;
  name: string;
  role: string;
  email: string;
  iat: string;
  exp: string;
};

export type RegisterOptions = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  preferedPayment: string;
  streetPlusNumber: string;
  city: string;
};

export type LoginOptions = {
  email: string;
  password: string;
};

export type AuthContext = {
  token: string | null;
  actions: {
    login: (options: LoginOptions) => Promise<boolean>;
    register: (options: RegisterOptions) => Promise<void>;
    getTokenData: () => JWTTokenData | null;
    logout: () => void;
  };
};

export const initialAuthContext = {
  token: localStorage.getItem('token'),
  actions: {
    login: async (): Promise<any> => {},
    register: async () => {},
    getTokenData: () => null,
    logout: () => {},
  },
};

export const authContext = React.createContext<AuthContext>(initialAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [tokenStorage, setTokenStorage] = useLocalStorage('App.token', '');
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = async (values: LoginOptions): Promise<boolean> => {
    try {
      const loginRequest = await fetch('/api/user/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values }),
      });
      if (loginRequest.status === 200) {
        const { data } = await loginRequest.json();
        setToken(data);
        setTokenStorage(data);
        localStorage.setItem('token', data);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const register = async (values: RegisterOptions) => {
    const registerRequest = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (registerRequest.status === 201) {
      const { data } = await registerRequest.json();
      await login({ email: values.email, password: values.password });
    } else {
      throw new Error('Error while registering');
    }
  };

  const getTokenData = () => {
    if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  };
  const logout = () => {
    setTokenStorage('');
    setToken('');
    localStorage.setItem('token', '');
  };
  return (
    <authContext.Provider value={{ token, actions: { login, register, getTokenData, logout } }}>
      {children}
    </authContext.Provider>
  );
};
