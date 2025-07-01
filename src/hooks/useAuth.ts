
import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface User {
  id: string;
  email: string;
  name: string;
}

export const useAuth = () => {
  const [user, setUser] = useLocalStorage<User | null>('auth-user', null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    
    // Mock login - simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation
    if (email === 'test@example.com' && password === 'password') {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0]
      };
      setUser(mockUser);
      setLoading(false);
      return { success: true };
    }
    
    // For demo purposes, accept any email with password length > 6
    if (email.includes('@') && password.length >= 6) {
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0]
      };
      setUser(mockUser);
      setLoading(false);
      return { success: true };
    }
    
    setLoading(false);
    return { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
  };

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    
    // Mock registration - simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation
    if (!email.includes('@') || password.length < 6) {
      setLoading(false);
      return { success: false, error: '올바른 이메일과 6자 이상의 비밀번호를 입력해주세요.' };
    }
    
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name
    };
    setUser(mockUser);
    setLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
};
