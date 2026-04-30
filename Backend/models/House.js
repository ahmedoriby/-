const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
    title: { type: String, required: true }, // عنوان الإعلان 
    description: { type: String },           // وصف التفاصيل
    price: { type: Number, required: true }, // السعر
    location: { type: String, required: true }, // المنطقة
    rooms: { type: Number, default: 0 },     // عدد الغرف
    
    //     عدد الحمامات
    bathrooms: { type: Number, default: 0 }, 
    
    //    الصورة لمصفوفة    
    image: [{ type: String }],                
    
    // إضافة نوع السكن شقة، غرفة
    category: { type: String, default: 'شقق' },

    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // اليوزر   
    createdAt: { type: Date, default: Date.now } // تاريخ 
});

module.exports = mongoose.model('House', HouseSchema);