import { User } from '@/utils/interfaces/User';
import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface UserProviderProps {
  children?: ReactNode
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('Father component is not part of a context')
  }
  return context;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  const setUser = (user: User | null) => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
    setUserState(user);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};