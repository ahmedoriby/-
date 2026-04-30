import React, { useState } from 'react';
import axios from 'axios';
import './AddHouse.css';

const LOCATIONS  = ['القاهرة', 'الإسكندرية', 'طنطا', 'المنصورة'];
const CATEGORIES = [
  { value: 'شقق',     label: 'شقة كاملة' },
  { value: 'غرف',     label: 'غرفة (سكن مشترك)' },
  { value: 'استوديو', label: 'استوديو' },
];

function AddHouse() {
  const [formData, setFormData] = useState({
    title: '', description: '', price: '',
    location: 'القاهرة', rooms: '', bathrooms: '', category: 'شقق',
  });
  const [images,   setImages]   = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading,  setLoading]  = useState(false);

  const set = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((k) => data.append(k, formData[k]));
    images.forEach((img) => data.append('images', img));

    try {
      await axios.post('http://localhost:5005/api/auth/add-house', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ تم نشر الإعلان بنجاح!');
      setFormData({ title: '', description: '', price: '', location: 'القاهرة', rooms: '', bathrooms: '', category: 'شقق' });
      setImages([]);
      setPreviews([]);
    } catch (err) {
      console.error(err);
      alert('❌ حدث خطأ أثناء الرفع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-house-wrapper">
      <div className="add-house-card">

        {/* Header */}
        <div className="add-house-header">
          <div className="add-house-icon">🏠</div>
          <h2>إضافة سكن جديد</h2>
          <p>أضف إعلانك وابدأ في مساعدة المغتربين والطلاب</p>
        </div>

        <form className="add-house-form" onSubmit={handleSubmit}>

          {/* Title */}
          <div className="form-group">
            <label className="form-label">📋 عنوان الإعلان</label>
            <input
              type="text"
              className="form-input-field"
              placeholder="مثال: شقة لقطة بوسط البلد — 2 غرفة"
              value={formData.title}
              onChange={set('title')}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">📝 وصف السكن</label>
            <textarea
              className="form-input-field"
              placeholder="وصف مفصّل: المساحة، الدور، القرب من الخدمات والمواصلات…"
              value={formData.description}
              onChange={set('description')}
              required
            />
          </div>

          {/* Price / Rooms / Bathrooms */}
          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">💰 السعر/شهر</label>
              <input type="number" className="form-input-field" placeholder="ج.م"
                value={formData.price} onChange={set('price')} required />
            </div>
            <div className="form-group">
              <label className="form-label">🛌 الغرف</label>
              <input type="number" className="form-input-field" placeholder="عدد"
                value={formData.rooms} onChange={set('rooms')} required />
            </div>
            <div className="form-group">
              <label className="form-label">🚿 الحمامات</label>
              <input type="number" className="form-input-field" placeholder="عدد"
                value={formData.bathrooms} onChange={set('bathrooms')} required />
            </div>
          </div>

          {/* Location / Category */}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">📍 المحافظة</label>
              <select className="form-input-field" value={formData.location} onChange={set('location')}>
                {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">🏷️ نوع السكن</label>
              <select className="form-input-field" value={formData.category} onChange={set('category')}>
                {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>

          {/* Images */}
          <div className="form-group">
            <label className="form-label">📸 صور السكن</label>
            <div className="file-upload-area">
              <input type="file" multiple accept="image/*" onChange={handleImageChange} />
              <div className="file-upload-icon">📂</div>
              <div className="file-upload-text">
                اسحب الصور هنا أو <span>اضغط للاختيار</span>
              </div>
            </div>
            {previews.length > 0 && (
              <div className="image-preview-grid">
                {previews.map((src, i) => (
                  <div className="preview-thumb" key={i}>
                    <img src={src} alt={`preview-${i}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="add-house-submit" disabled={loading}>
            {loading ? '⏳ جاري الرفع…' : '🚀 نشر الإعلان الآن'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddHouse;