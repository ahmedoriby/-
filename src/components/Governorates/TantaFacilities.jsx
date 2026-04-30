import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TantaFacilities() {
  const navigate = useNavigate();
  const [activeMap, setActiveMap] = useState("hospitals in Tanta Egypt");

  const facilities = [
    { id: 1, category: "المستشفيات والخدمات الطبية", icon: "🏥", color: "#e74c3c", searchQuery: "hospitals in Tanta Egypt", nearbyLink: "https://www.google.com/maps/search/hospitals+near+Tanta", items: ["مستشفى طنطا الجامعي", "المستشفى الفرنساوي العالمي", "مستشفى المنشاوي العام"] },
    { id: 2, category: "التعليم والجامعات", icon: "🎓", color: "#2980b9", searchQuery: "Tanta University Egypt", nearbyLink: "https://www.google.com/maps/search/universities+near+Tanta", items: ["جامعة طنطا", "المجمع الطبي بطنطا", "كلية الحقوق والتربية"] },
    { id: 3, category: "النقل والمواصلات", icon: "🚌", color: "#f39c12", searchQuery: "Tanta train station", nearbyLink: "https://www.google.com/maps/search/transportation+near+Tanta", items: ["محطة قطار طنطا المركزية", "موقف طنطا سبرباي", "موقف الجلاء"] },
    { id: 4, category: "المرافق والمعالم الدينية", icon: "🕌", color: "#27ae60", searchQuery: "El Sayed El Badawy Mosque Tanta", nearbyLink: "https://www.google.com/maps/search/mosques+near+Tanta", items: ["مسجد السيد البدوي", "مطرانية طنطا", "منطقة الساحة والزيارة"] },
    { id: 5, category: "النوادي والمنشآت الرياضية", icon: "⚽", color: "#8e44ad", searchQuery: "sports clubs in Tanta Egypt", nearbyLink: "https://www.google.com/maps/search/sports+clubs+near+Tanta", items: ["نادي طنطا الرياضي", "ستاد طنطا الرياضي", "نادي قحافة الرياضي"] },
    { id: 6, category: "التسوق والحلويات", icon: "🛍️", color: "#d35400", searchQuery: "malls and sweets in Tanta Egypt", nearbyLink: "https://www.google.com/maps/search/shopping+malls+near+Tanta", items: ["طنطا سيتي مول", "شارع البحر والبورصة", "محلات حلويات طنطا الشهيرة"] }
  ];

  return (
    <div style={pageWrapper}>
      <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap" rel="stylesheet" />
      
      {/*   Hero    */}
      <div style={heroSection}>
        <div style={heroOverlay}>
          <h1 style={heroTitle}>مرافق مدينة طنطا</h1>
          <p style={heroSubtitle}>استكشف أهم الخدمات والوجهات الحيوية في قلب الدلتا وعاصمة محافظة الغربية</p>
          <button 
            onClick={() => window.scrollTo({ top: 750, behavior: 'smooth' })} 
            style={heroBtn}
            onMouseOver={(e) => e.target.style.backgroundColor = '#004a85'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#005EAA'}
          >
            ابدأ الاستكشاف الآن ⬇️
          </button>
        </div>
      </div>

      <div style={containerStyle}>
        {/*  الخريطة  */}
        <div id="map-explorer" style={mapSectionStyle}>
          <div style={{ flex: 1, minWidth: '350px', padding: '20px' }}>
            <h2 style={{ color: '#005EAA', fontSize: '32px', marginBottom: '15px' }}>📍 مستكشف طنطا الذكي</h2>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '25px' }}>
              اختر قسماً لعرض المواقع على الخريطة مباشرة.
            </p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '12px', 
              marginTop: '10px' 
            }}>
               {facilities.map(f => (
                 <button 
                    key={f.id} 
                    onClick={() => setActiveMap(f.searchQuery)} 
                    style={{
                      ...miniMapBtn, 
                      fontSize: '19px', 
                      backgroundColor: activeMap === f.searchQuery ? '#005EAA' : '#fff', 
                      color: activeMap === f.searchQuery ? '#fff' : '#333',
                      border: activeMap === f.searchQuery ? '2px solid #005EAA' : '1px solid #ddd'
                    }}>
                    <span style={{ fontSize: '22px' }}>{f.icon}</span> {f.category.split(' ')[0]}
                  </button>
               ))}
            </div>
          </div>
          
          <div style={{ flex: 2, height: '500px', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <iframe 
              title="Tanta Map"
              src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3423.824523!2d30.9996!3d30.7865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s${encodeURIComponent(activeMap)}!5e0!3m2!1sar!2seg!4v1710000000000!5m2!1sar!2seg`}
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy">
            </iframe>
          </div>
        </div>

        {/*  الكروت  */}
        <div style={gridStyle}>
          {facilities.map((fac) => (
            <div key={fac.id} style={{ ...cardStyle, borderTop: `10px solid ${fac.color}` }}>
              <div style={{ ...iconCircle, backgroundColor: fac.color }}>{fac.icon}</div>
              <h3 style={{ fontSize: '28px', color: '#333', marginBottom: '20px' }}>{fac.category}</h3>
              <ul style={listStyle}>
                {fac.items.map((item, index) => (
                  <li key={index} style={listItemStyle}>• {item}</li>
                ))}
              </ul>
              
              <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                <button onClick={() => {setActiveMap(fac.searchQuery); window.scrollTo({top: 750, behavior: 'smooth'});}} style={{ ...detailsBtn, borderColor: fac.color, color: fac.color }}>
                   تحديد المواقع على الخريطة 🌍
                </button>
                <a href={fac.nearbyLink} target="_blank" rel="noreferrer" style={gpsBtn}>
                   الأقرب لمكاني الآن (GPS) 📍
                </a>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => navigate(-1)} style={backBtnStyle}>العودة لصفحة طنطا الرئيسية</button>
      </div>
    </div>
  );
}

// Styles
const heroSection = {
  height: '75vh',
  backgroundImage: 'url("https://tnu.edu.eg/Design/assets/media/--hero/slider2.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const heroOverlay = {
  backgroundColor: 'rgba(0,0,0,0.55)',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  textAlign: 'center'
};

const heroTitle = { color: '#fff', fontSize: '75px', margin: '0 0 20px 0', textShadow: '2px 2px 15px rgba(0,0,0,0.6)' };
const heroSubtitle = { color: '#eee', fontSize: '24px', maxWidth: '850px', marginBottom: '40px' };
const heroBtn = { padding: '18px 45px', fontSize: '20px', backgroundColor: '#005EAA', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' };

const mapSectionStyle = { display: 'flex', alignItems: 'center', gap: '30px', backgroundColor: '#fff', padding: '35px', borderRadius: '30px', marginTop: '50px', marginBottom: '60px', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', flexWrap: 'wrap' };

const miniMapBtn = { 
  height: '65px', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  gap: '10px',
  border: '1px solid #ddd', 
  borderRadius: '15px', 
  cursor: 'pointer', 
  fontWeight: 'bold', 
  transition: '0.3s' 
};

const gpsBtn = { textDecoration: 'none', textAlign: 'center', padding: '15px', borderRadius: '15px', backgroundColor: '#27ae60', color: '#fff', fontWeight: 'bold', fontSize: '16px', transition: '0.3s' };
const pageWrapper = { direction: 'rtl', backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: "'Tajawal', sans-serif" };
const containerStyle = { maxWidth: '1800px', margin: '0 auto', padding: '0 40px' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '40px' };
const cardStyle = { backgroundColor: '#fff', padding: '40px', borderRadius: '30px', boxShadow: '0 12px 25px rgba(0,0,0,0.06)', transition: '0.3s', textAlign: 'right' };
const iconCircle = { width: '75px', height: '75px', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '38px', marginBottom: '25px' };
const listStyle = { listStyle: 'none', padding: 0, margin: '0 0 30px 0' };
const listItemStyle = { fontSize: '19px', color: '#444', marginBottom: '12px' };
const detailsBtn = { width: '100%', padding: '15px', borderRadius: '15px', border: '2px solid #005EAA', backgroundColor: 'transparent', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', transition: '0.3s' };
const backBtnStyle = { display: 'block', margin: '70px auto', padding: '18px 55px', backgroundColor: '#222', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px' };

export default TantaFacilities;