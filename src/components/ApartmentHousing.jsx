import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ApartmentHousing.css';

const API_BASE = 'http://localhost:5005';

function ApartmentHousing({ user, setShowAuthModal }) {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/auth/all-houses`);
        const filtered = res.data.filter(h =>
          h.category?.includes('شقة') ||
          h.category?.toLowerCase().includes('apartment') ||
          h.category?.trim() === 'شقق'
        );
        setApartments(filtered.length > 0 ? filtered : res.data);
        setError(null);
      } catch (err) {
        console.error('خطأ في الربط:', err);
        setError('تعذّر الاتصال بالخادم — تأكد من تشغيل الـ Backend على بورت 5005');
      } finally {
        setLoading(false);
      }
    };
    fetchApartments();
  }, []);

  const handleAddClick = () => {
    if (user) navigate('/add-house');
    else setShowAuthModal(true);
  };

  /* ── Loading ── */
  if (loading) return (
    <div className="housing-page">
      <div className="housing-loading">
        <div className="spinner" />
        <p>جاري تحميل أفضل الشقق لك…</p>
      </div>
    </div>
  );

  /* ── Error ── */
  if (error) return (
    <div className="housing-page">
      <div className="housing-error">
        <div style={{ fontSize: '3rem', marginBottom: 12 }}>⚠️</div>
        <h3>{error}</h3>
        <button className="retry-btn" onClick={() => window.location.reload()}>
          حاول مجدداً
        </button>
      </div>
    </div>
  );

  return (
    <div className="housing-page">

      {/* ── Header ── */}
      <header className="housing-page-header">
        <h1>🏢 قسم الشقق</h1>
        <p>أفضل الخيارات المتاحة للمغتربين والطلاب في قلب مصر</p>
        <button className="add-listing-btn" onClick={handleAddClick}>
          ＋ أضف إعلانك الآن
        </button>
      </header>

      {/* ── Grid ── */}
      <div className="apartments-grid-wrapper">
        <div className="apartments-grid">
          {apartments.length > 0 ? (
            apartments.map((apt, index) => {
              const imagePath = Array.isArray(apt.image) && apt.image.length > 0
                ? apt.image[0]
                : apt.image;
              const imgUrl = imagePath
                ? `${API_BASE}${imagePath}`
                : 'https://placehold.co/400x250?text=لا+توجد+صورة';

              return (
                <div
                  key={apt._id}
                  className="apt-card"
                  style={{ animationDelay: `${(index % 9) * 0.07}s` }}
                >
                  {/* Image */}
                  <div className="apt-card-image">
                    <img
                      src={imgUrl}
                      alt={apt.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/400x250?text=الصورة+غير+متاحة';
                      }}
                    />
                    <span className="apt-price-badge">{apt.price} ج.م / شهر</span>
                    {apt.category && (
                      <span className="apt-category-tag">{apt.category}</span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="apt-card-body">
                    <h3 className="apt-card-title">{apt.title}</h3>
                    <div className="apt-card-location">
                      <span>📍</span>
                      <span>{apt.location || 'موقع غير محدد'}</span>
                    </div>

                    <div className="apt-card-features">
                      <div className="apt-feature">
                        <span className="apt-feature-icon">🛌</span>
                        <span>{apt.rooms || 0} غرف</span>
                      </div>
                      <div className="apt-feature">
                        <span className="apt-feature-icon">🚿</span>
                        <span>{apt.bathrooms || 0} حمام</span>
                      </div>
                    </div>

                    <button
                      className="apt-details-btn"
                      onClick={() => navigate(`/house/${apt._id}`)}
                    >
                      عرض التفاصيل كاملة 🔍
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-apartments">
              <div className="icon">🏠</div>
              <p>لا توجد شقق مطابقة للبحث حالياً</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApartmentHousing;