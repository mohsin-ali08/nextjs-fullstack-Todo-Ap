import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust this to your backend URL
});

// Attach JWT Token to Request Headers (optional for protected routes)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
