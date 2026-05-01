import axios from 'axios';

const api = axios.create({
  // استخدام 127.0.0.1 أضمن بكتير من localhost لتجنب مشاكل الـ Network Error
  baseURL: 'http://127.0.0.1:5005/api/auth', 
  headers: {
    'Content-Type': 'application/json'
  }
});

// إضافة Interceptor عشان لو حبيت تضيف Token في المستقبل (احترافية زيادة)
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const authService = {
  
  // 1. تحضير كل السكن (HousingPage.jsx)
  getAllHouses: () => api.get('/all-houses'),

  // 2. تسجيل مستخدم جديد
  register: (userData) => api.post('/register', userData),

  // 3. تسجيل الدخول
  login: (credentials) => api.post('/login', credentials),

  // 4. إضافة سكن جديد (بيدعم رفع الصور)
  addHouse: (formData) => api.post('/add-house', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // 5. تفاصيل سكن معين
  getHouseDetails: (id) => api.get(`/house/${id}`),

  // 6. بحث السكن (لو محتاجه في صفحة البحث)
  searchHouses: (query) => api.get(`/search?city=${query}`)
};

export default api;