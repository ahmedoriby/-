import React from 'react';
import { useParams } from 'react-router-dom';
import './ProvincePage.css';

const provincesData = {
  "القاهرة": {
    heroImg: "https://i.pinimg.com/1200x/3f/99/e7/3f99e7c5f7302608b8432635d1af7ed2.jpg",
    description: "القاهرة هي عاصمة مصر وأكبر مدنها، يسكنها حوالي 21.3 مليون نسمة.",
    neighborhoods: [
      { name: "حي المعادي", img: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a", desc: "دليل السكن في المعادي" },
      { name: "التجمع الخامس", img: "https://images.unsplash.com/photo-1552422535-c45813c61732", desc: "دليل السكن في التجمع" },
      { name: "مدينة نصر", img: "https://images.unsplash.com/photo-1568440833354-814bb4739229", desc: "دليل السكن في مدينة نصر" }
    ],
    zones: ["المنطقة الشرقية: 9 أحياء", "المنطقة الغربية: 9 أحياء"]
  },
  "الإسكندرية": {
    heroImg: "https://images.unsplash.com/photo-1599905272100-38166c3044a8",
    description: "عروس البحر المتوسط وثاني أكبر مدينة في مصر، تشتهر بجمال شواطئها وتاريخها العريق.",
    neighborhoods: [
      { name: "سموحة", img: "https://images.unsplash.com/photo-1569336415962-a4bd4f79c3f2", desc: "أرقى أحياء الإسكندرية" },
      { name: "المنتزة", img: "https://images.unsplash.com/photo-1580220665241-119102283030", desc: "بجوار حدائق الملك" },
      { name: "محرم بك", img: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699", desc: "حي تاريخي في وسط المدينة" }
    ],
    zones: ["حي شرق", "حي وسط", "حي غرب"]
  }
};

function ProvincePage() {
  const { name } = useParams();
  const data = provincesData[name];

  if (!data) {
    return <div style={{paddingTop: '150px', textAlign: 'center'}}>جاري تجهيز بيانات {name} يا user ...</div>;
  }

  return (
    <div className="province-page">
      <div className="main-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${data.heroImg})` }}>
        <div className="hero-content">
          <h1>{name}</h1>
          <div className="breadcrumb">الرئيسية {'>'} مصر {'>'} {name}</div>
        </div>
      </div>

      <div className="container">
        <div className="section-header">
          <h2>أهم الأحياء في {name}</h2>
        </div>
        
        <div className="neighborhood-grid">
          {data.neighborhoods.map((neigh, index) => (
            <div className="n-card" key={index}>
              <img src={neigh.img} alt={neigh.name} />
              <div className="n-info"><h3>{neigh.name}</h3><p>{neigh.desc}</p></div>
            </div>
          ))}
        </div>

        <div className="details-section">
          <h2>دليل مدينة {name} في مصر</h2>
          <p>{data.description}</p>
          
          <div className="info-grid">
            <div className="info-item">
              <h3>أبرز النقاط</h3>
              <ul>
                <li>الموقع الإستراتيجي والخدمات</li>
                <li>شبكة طرق حديثة تربط الأحياء</li>
              </ul>
            </div>
            <div className="info-item">
              <h3>المناطق الرئيسية</h3>
              <ul>
                {data.zones.map((zone, i) => <li key={i}>{zone}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProvincePage;