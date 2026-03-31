// Firebase token handling is managed automatically by AuthContext via onAuthStateChanged
// and by the axios interceptor set in that context.
// This file is kept as a no-op stub to avoid breaking any remaining imports.

export const removeTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_tokens');
  }
};

export const getTokens = () => null;
export const setTokens = (_tokens: unknown) => {};
export const getAccessToken = () => undefined;
