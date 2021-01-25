import React, { useState } from 'react';
import useLocalStorage from '../util/LocalStorageHook';

export type JWTTokenData = {
  id: number;
  name: string;
  email: string;
  iat: string;
  exp: string;
};

export type RegisterOptions = {
  email: string;
  password: string;
  name: string;
};

export type LoginOptions = {
  email: string;
  password: string;
};

export type AuthContext = {
  token: string | null;
  actions: {
    login: (options: LoginOptions) => Promise<void>;
    getTokenData: () => JWTTokenData | null;
    logout: () => void;
  };
};

export const initialAuthContext = {
  token: null,
  actions: {
    login: async () => {},
    getTokenData: () => null,
    logout: () => {},
  },
};

export const authContext = React.createContext<AuthContext>(initialAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [tokenStorage, setTokenStorage] = useLocalStorage('App.token', '');
  const [token, setToken] = useState<string | null>(tokenStorage);

  const login = async (values: LoginOptions) => {
    const loginRequest = await fetch('/api/user/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values }),
    });
    if (loginRequest.status === 200) {
      const { data } = await loginRequest.json();
      setToken(data);
      setTokenStorage(data);
      console.log(data);
    } else {
      throw new Error('User does not exist or the password is wrong');
    }
  };

  const register = async (values: RegisterOptions) => {
    const registerRequest = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (registerRequest.status === 200) {
      const { data } = await registerRequest.json();
      await login({ email: values.email, password: values.password });
    } else {
      throw new Error("Error while registering");
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
  };
  return (
    <authContext.Provider value={{ token, actions: { login, getTokenData, logout } }}>{children}</authContext.Provider>
  );
};
