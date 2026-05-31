import { useState } from 'react';
import api from '../api/axiosInstance';
import AuthContext from './authContextDef';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('arp_user')); } catch { return null; }
  });

  const login = async (usr, pwd) => {
    const body = { usr, pwd };
    const res = await api.post('/api/method/login', body, {
      headers: { 'Content-Type': 'application/json' },
    });
    const data = res.data;
    const full_name = data.full_name || data.message?.full_name || usr;
    const email = data.email || data.message?.email || usr;
    const userObj = { full_name, email };
    localStorage.setItem('arp_user', JSON.stringify(userObj));
    setUser(userObj);
    return data;
  };

  const logout = async () => {
    await api.get('/api/method/logout').catch(() => undefined);
    localStorage.removeItem('arp_user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
