import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5005/api/auth', 
});

export const authService = {
  
  // 1.  تحضير كل السكن (HousingPage.jsx)
  // GET -> http://localhost:5005/api/auth/all-houses
  getAllHouses: () => api.get('/all-houses'),

  // 2.  تسجيل مستخدم جديد
  // POST -> http://localhost:5005/api/auth/register
  register: (userData) => api.post('/register', userData),

  // 3.  تسجيل الدخول
  // POST -> http://localhost:5005/api/auth/login
  login: (credentials) => api.post('/login', credentials),

  // 4.  إضافة سكن جديد 
  // POST -> http://localhost:5005/api/auth/add-house
  addHouse: (formData) => api.post('/add-house', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // 5.  تفاصيل سكن   
  // GET -> http://localhost:5005/api/auth/house/:id
  getHouseDetails: (id) => api.get(`/house/${id}`),

};

export default api;