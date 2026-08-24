import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Automatically attach the admin token to every request, if one exists.
// This means individual components/tabs never need to manually pass
// { headers: { Authorization: ... } } — it happens here, once, for all of them.
axiosClient.interceptors.request.use((request) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

// If any request comes back 401, the token is dead or missing — clear it and
// send the user back to login instead of leaving them stuck on a broken dashboard.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;