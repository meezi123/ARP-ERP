import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// withCredentials sends the Frappe session cookie (sid) on every request.
// Frappe's /api/method/login sets the cookie — no Authorization header needed.
const api = axios.create({ baseURL: BASE_URL, withCredentials: true });

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('arp_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
