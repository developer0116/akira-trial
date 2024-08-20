/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, createContext, useState } from "react";
import { User } from "types";

export interface AuthState {
  userInfo?: User;
  setUserInfo: (userInfo: User) => void;
}

const initialState: AuthState = {
  userInfo: undefined,
  setUserInfo: () => {},
};

export const AuthContext = createContext<AuthState>(initialState);

export const useAuth = () => useContext(AuthContext);

const STORAGE_KEY = "artisan-auth-state";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState<User>();
  useEffect(() => {
    const data = window.localStorage.getItem(STORAGE_KEY);
    if (data !== null) setUserInfo(JSON.parse(data));
    return () => {};
  }, []);

  const handleSetUserInfo = (info: User) => {
    setUserInfo(info);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo: handleSetUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
