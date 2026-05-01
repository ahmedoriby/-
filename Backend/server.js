require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./routes/auth');

const app = express();

// التعديل الأول: السماح لـ Netlify و localhost بكلم السيرفر
app.use(cors({
    origin: [
        'http://localhost:5173', 
        'http://localhost:5174', 
        'https://lighthearted-custard-60b4c9.netlify.app' // رابط موقعك على نيتلفاي
    ], 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return; // عشان Vercel ميكررش الاتصال
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4 
    });
    console.log('✅ Database connected successfully');
  } catch (err) {
    console.log('❌ DB Connection Error:', err.message);
  }
};

connectDB();

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('🚀 API is running on Vercel...');
});

// التعديل الثاني: مهم جداً لـ Vercel
const PORT = process.env.PORT || 5005; 
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

module.exports = app; // لازم نصدر app عشان Vercel يعرف يشغله