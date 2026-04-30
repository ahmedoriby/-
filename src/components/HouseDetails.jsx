import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HouseDetails.css';

const API_BASE = 'http://localhost:5005';

function HouseDetails() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const [house, setHouse]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/auth/house/${id}`);
        setHouse(res.data);
      } catch (err) {
        console.error('خطأ في التحميل:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  /* ── Loading ── */
  if (loading) return (
    <div className="house-details-wrapper">
      <div className="house-loading">
        <div className="spinner" />
        <p style={{ color: 'var(--color-text-muted)', marginTop: 8 }}>جاري تحميل التفاصيل…</p>
      </div>
    </div>
  );

  /* ── Not found ── */
  if (!house) return (
    <div className="house-details-wrapper">
      <div className="house-not-found">
        <div style={{ fontSize: '3.5rem', marginBottom: 14 }}>🏚️</div>
        <h2>السكن غير موجود حالياً</h2>
        <button onClick={() => navigate(-1)}>← رجوع للقائمة</button>
      </div>
    </div>
  );

  const images = Array.isArray(house.image)
    ? house.image
    : house.image ? [house.image] : [];

  return (
    <div className="house-details-wrapper">
      <button className="house-details-back" onClick={() => navigate(-1)}>
        ← رجوع للقائمة
      </button>

      <div className="house-details-card">
        {/* Gallery */}
        <div style={{ padding: '24px 24px 0' }}>
          {images.length > 0 ? (
            <div className="house-gallery">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={`${API_BASE}${img}`}
                  alt={`${house.title} - ${i + 1}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/800x420?text=صورة+غير+متاحة';
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="house-no-image">لا توجد صور متاحة 🖼️</div>
          )}
        </div>

        {/* Body */}
        <div className="house-details-body">
          <h1 className="house-details-title">{house.title}</h1>

          {/* Price + Category */}
          <div className="house-meta-row">
            <div className="house-price">
              💰 {house.price}
              <span> ج.م / شهر</span>
            </div>
            {house.category && (
              <span className="house-category-badge">{house.category}</span>
            )}
          </div>

          {/* Location */}
          <div className="house-location">
            <span>📍</span>
            <span><strong>الموقع: </strong>{house.location}</span>
          </div>

          {/* Stats */}
          <div className="house-stats-row">
            <div className="house-stat-chip">
              <span className="stat-icon">🛏️</span>
              <span className="stat-value">{house.rooms ?? '—'}</span>
              <span className="stat-name">غرف</span>
            </div>
            <div className="house-stat-chip">
              <span className="stat-icon">🚿</span>
              <span className="stat-value">{house.bathrooms ?? '—'}</span>
              <span className="stat-name">حمامات</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseDetails;