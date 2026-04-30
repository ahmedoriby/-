import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// تعريف العنوان الثابت للسيرفر عشان ميتغيرش في الكود
const API_BASE_URL = "http://localhost:5005";

function HousingPage({ type, viewOnly }) {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ضفنا حالة للخطأ عشان نفهم إيه اللي بيحصل

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // طلب البيانات من السيرفر بورت 5005
        const res = await axios.get(`${API_BASE_URL}/api/auth/all-houses`);
        
        console.log("البيانات اللي وصلت:", res.data); // بص في الـ Console وشوف البيانات بتوصل ولا لا

        if (res.data && Array.isArray(res.data)) {
          // تصفية البيانات مع التأكد من حذف المسافات
          const filtered = res.data.filter(h => 
            h.category?.toString().trim() === type?.toString().trim()
          );
          setHouses(filtered);
        }
      } catch (e) { 
        console.error("❌ فشل الاتصال بالسيرفر:", e);
        setError("تعذر الاتصال بالسيرفر");
      } finally { 
        setLoading(false); 
      }
    };

    if (type) fetchHouses();
  }, [type]);

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>جاري تحميل {type}...</p>
    </div>
  );

  if (error) return (
    <div className="error-message" style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
      <h2>⚠️ {error}</h2>
      <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', cursor: 'pointer' }}>إعادة محاولة</button>
    </div>
  );

  return (
    <div className="housing-page-wrapper" style={{ direction: 'rtl' }}>
      <header className="housing-header">
        <div className="header-content">
          <h2>سكن {type}</h2>
          <p>اكتشف أفضل الخيارات المتاحة في مدينة {type === 'طالبات' || type === 'طلبة' ? 'طنطا' : type}</p>
        </div>
        {!viewOnly && (
          <Link to="/add-house" className="btn-add-inline">
            <span className="plus-icon">+</span> أضف إعلانك الآن
          </Link>
        )}
      </header>

      <div className="houses-grid">
        {houses.length > 0 ? (
          houses.map((h) => (
            <div key={h._id} className="house-card">
              <div className="card-image-wrapper">
                <img 
                  src={h.image ? `${API_BASE_URL}${h.image}` : "https://via.placeholder.com/300"} 
                  alt={h.title} 
                  onError={(e) => { e.target.src = "https://via.placeholder.com/300"; }}
                />
                <span className="price-tag">{h.price} ج.م / شهر</span>
              </div>
              <div className="card-details">
                <h3>{h.title}</h3>
                <p>📍 {h.location}</p>
                <div className="card-features">
                  <span>🛌 {h.rooms} غرف</span>
                  <span>🚿 {h.bathrooms} حمام</span>
                </div>
                <button className="btn-view-details">عرض التفاصيل</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">
            <p>لا يوجد سكن متاح حالياً في هذا القسم.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HousingPage;