'use client';

export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = window.sessionStorage.getItem('user');
    if (!user) {
      return null;
    } else {
      return JSON.parse(user);
    }
  } else {
    return null;
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return window.sessionStorage.getItem('token') || null;
  } else {
    return null;
  }
};

export const setUserSession = (token: string, user: any) => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem('user', JSON.stringify(user));
    window.sessionStorage.setItem('token', token);
  }
};

export const resetUserSession = () => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem('user');
    window.sessionStorage.removeItem('token');
  }
};
