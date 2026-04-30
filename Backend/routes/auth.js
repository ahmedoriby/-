const express = require('express');
const router = express.Router(); 
const User = require('../models/User'); 
const House = require('../models/House'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer'); 
const path = require('path');

// إعدادات تخزين الصور
const storage = multer.diskStorage({
    destination: './uploads/', 
    filename: function (req, file, cb) {
        cb(null, 'house-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

//HousingPage.jsx بتطلب
router.get('/all-houses', async (req, res) => {
    try {
        const houses = await House.find().sort({ createdAt: -1 });
        
        const formattedHouses = houses.map(h => {
            const houseObj = h.toObject();
            if (Array.isArray(houseObj.image) && houseObj.image.length > 0) {
                houseObj.image = houseObj.image[0]; //  أول صورة عشان عرض في الكارت
            }
            return houseObj;
        });

        res.json(formattedHouses);
    } catch (err) {
        res.status(500).json({ error: "فشل في بيانات السكن" });
    }
});

// تسجيل مستخدم جديد
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "هذا البريد الإلكتروني مسجل بالفعل" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: "تم التسجيل بنجاح" });
    } catch (err) {
        res.status(500).json({ error: "خطأ في عملية التسجيل" });
    }
});

// تسجيل الدخول
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "البيانات المدخلة غير صحيحة" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "كلمة المرور غير مطابقة" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '1h' });
        
        res.json({ 
            message: "تم تسجيل الدخول",
            token, 
            user: { id: user._id, username: user.username } 
        });
    } catch (err) {
        res.status(500).json({ error: "فشل تسجيل الدخول" });
    }
});

// إضافة سكن جديد
router.post('/add-house', upload.array('images', 10), async (req, res) => {
    try {
        const { title, description, price, location, rooms, bathrooms, category, owner } = req.body;
        const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

        const newHouse = new House({
            title,
            description,
            price,
            location,
            rooms: Number(rooms),
            bathrooms: Number(bathrooms),
            category,
            image: imagePaths, 
            owner
        });

        await newHouse.save();
        res.status(201).json({ message: "تمت إضافة العقار بنجاح" });
    } catch (err) {
        res.status(500).json({ error: "فشل في حفظ بيانات العقار" });
    }
});

router.get('/house/:id', async (req, res) => {
    try {
        const house = await House.findById(req.params.id);
        if (!house) return res.status(404).json({ message: "السكن غير موجود" });
        res.json(house);
    } catch (err) {
        res.status(500).json({ error: "خطأ في السيرفر" });
    }
});

module.exports = router;