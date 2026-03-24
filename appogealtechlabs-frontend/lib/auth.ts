import api from './api';

const TOKEN_KEY = 'auth_tokens';

interface AuthTokens {
  access: string;
  refresh: string;
}

export const setTokens = (tokens: AuthTokens) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  }
};

export const getTokens = (): AuthTokens | null => {
  if (typeof window !== 'undefined') {
    const tokens = localStorage.getItem(TOKEN_KEY);
    return tokens ? JSON.parse(tokens) : null;
  }
  return null;
};

export const removeTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const getAccessToken = () => {
  const tokens = getTokens();
  return tokens?.access;
};

// Add interceptor to inject token
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add interceptor to handle token refresh (basic implementation)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokens = getTokens();
      
      if (tokens?.refresh) {
        try {
          // Call refresh endpoint
          // Note: We use axios directly or a separate instance to avoid infinite loops
          // For simplicity reusing api but usually creating a new instance is safer
          // Here assuming the refresh call won't trigger 401 loop if handled carefully
          const response = await api.post('/token/refresh/', { refresh: tokens.refresh });
          
          if (response.status === 200) {
            const newTokens = {
              access: response.data.access,
              refresh: tokens.refresh // Refresh token might rely on rotation setting
            };
            setTokens(newTokens);
            
            // Update header and retry original request
            originalRequest.headers.Authorization = `Bearer ${newTokens.access}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          // If refresh fails, logout
          removeTokens();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      } else {
         // No refresh token, logout
         removeTokens();
         if (typeof window !== 'undefined') {
            // window.location.href = '/login'; 
            // Better to let the app handle redirection
         }
      }
    }
    return Promise.reject(error);
  }
);
