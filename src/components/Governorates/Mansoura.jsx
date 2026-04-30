import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Governorates.css';

function MansouraPage({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin]             = useState(true);
  const navigate                          = useNavigate();
  const [formData, setFormData]           = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? 'http://localhost:5005/api/auth/login'
      : 'http://localhost:5005/api/auth/register';
    try {
      const res = await axios.post(url, formData, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
      if (isLogin) {
        localStorage.setItem('user',  JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        setShowAuthModal(false);
        alert(`أهلاً بك يا ${res.data.user.username} في عروس النيل 🌸`);
      } else {
        setIsLogin(true);
        alert('تم التسجيل بنجاح، سجل دخولك الآن');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'خطأ في الاتصال بالسيرفر');
    }
  };

  const handleGoogleLogin   = () => { window.location.href = 'http://localhost:5005/api/auth/google'; };
  const handleFacebookLogin = () => { window.location.href = 'http://localhost:5005/api/auth/facebook'; };

  return (
    <div className="province-page" style={{ direction: 'rtl' }}>

      {/* ── Navbar ── */}
      <nav className="gov-navbar">
        <div className="gov-logo" onClick={() => navigate('/')}>إيمجرنت 🏠</div>

        <div className="gov-nav-links">
          <Link to="/"                    className="gov-nav-link">الرئيسية</Link>
          <Link to="/mansoura/facilities" className="gov-nav-link">مرافق عامة</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {!user ? (
            <button className="gov-login-btn" onClick={() => { setIsLogin(true); setShowAuthModal(true); }}>
              👤 تسجيل الدخول
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="gov-user-name">أهلاً، {user.username}</span>
              <button className="gov-logout-btn" onClick={handleLogout}>خروج</button>
            </div>
          )}
          <button
            className={`gov-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <div className={`gov-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/"                    className="gov-nav-link" onClick={() => setMenuOpen(false)}>🏠 الرئيسية</Link>
        <Link to="/mansoura/facilities" className="gov-nav-link" onClick={() => setMenuOpen(false)}>🌸 مرافق عامة</Link>
      </div>

      {/* ── Hero ── */}
      <div className="gov-hero" style={{ backgroundImage: `url('https://i.pinimg.com/1200x/77/a0/d5/77a0d55695c6443589e5be9e5761c533.jpg')` }}>
        <div className="gov-hero-content">
          <h1>المنصورة</h1>
          <p>الرئيسية › جمهورية مصر العربية › الدقهلية › المنصورة</p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="gov-container">
        <h2 className="gov-section-title">دليل مدينة المنصورة — عاصمة الجمال والعلم</h2>

        <div className="gov-info-row">
          <div className="gov-info-card">
            <h3>🌸 المنصورة: عروس النيل</h3>
            <p>المنصورة هي مدينة مصرية مشهورة وعاصمة محافظة الدقهلية، وتقع حول فرع دمياط. تتميز بموقعها الاستراتيجي في قلب دلتا النيل وتحتضن 19 مركزاً إدارياً. تُعدّ واحدة من أجمل مدن الدلتا بنيلها الساحر وحياتها الثقافية النابضة.</p>
          </div>
          <div className="gov-image-box">
            <img src="https://i.pinimg.com/1200x/81/a9/0e/81a90ede5a7afd72c1330447b68c71b0.jpg" alt="Mansoura Nile" />
            <div className="gov-image-caption">نيل المنصورة الساحر</div>
          </div>
        </div>

        <div className="gov-info-row">
          <div className="gov-info-card">
            <h3>🏥 عاصمة الطب والعلوم</h3>
            <p>تفتخر المنصورة بكونها "عاصمة الطب في مصر"، حيث تضم جامعة المنصورة التي تُعد من أرقى الجامعات إقليمياً، وتشتهر بمراكزها الطبية العالمية مثل مركز الكلى والمسالك البولية (مركز غنيم).</p>
          </div>
          <div className="gov-image-box">
            <img src="https://i.pinimg.com/736x/f5/cf/81/f5cf81349f5ddc0b6fe80eff76bc6a0b.jpg" alt="Mansoura University" />
            <div className="gov-image-caption">جامعة المنصورة</div>
          </div>
        </div>

        <div className="gov-info-row">
          <div className="gov-info-card">
            <h3>🏛️ أبرز المعالم في المنصورة</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
              {['دار ابن لقمان (متحف)','جامعة المنصورة','حديقة شجرة الدر','نادي جزيرة الورد','شارع المشاية السفلية','مسجد النصر','المنصورة الجديدة','ستاد المنصورة الرياضي'].map((m) => (
                <li key={m} style={{ fontSize: '0.88rem', color: '#374151', padding: '8px 12px', background: '#f3f4f8', borderRadius: 8 }}>✓ {m}</li>
              ))}
            </ul>
          </div>
          <div className="gov-image-box">
            <img src="https://cdn2.wingie.com/uploads/f_webp,s_825x620,q_60,fit_cover/mydan_am_klthwm_2fe1cdd971.png" alt="Mansoura Landmarks" />
            <div className="gov-image-caption">ميدان أم كلثوم</div>
          </div>
        </div>

        <div className="gov-map-section">
          <h2 className="gov-section-title">📍 خريطة عروس الدقهلية</h2>
          <div className="gov-map-container">
            <iframe
              title="Mansoura Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109400.9926442657!2d31.3094895!3d31.0422204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79db7a9053547%3A0xf8dab3bbed766c97!2sMansoura!5e0!3m2!1sen!2seg!4v1700000000000"
              width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* ── Auth Modal ── */}
      {showAuthModal && (
        <div className="gov-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="gov-auth-card" onClick={(e) => e.stopPropagation()}>
            <button className="gov-close-btn" onClick={() => setShowAuthModal(false)}>×</button>
            <h2>{isLogin ? 'تسجيل الدخول' : 'حساب جديد'}</h2>
            <form className="gov-form" onSubmit={handleAuthSubmit}>
              {!isLogin && <input className="gov-input" name="username" type="text"     placeholder="اسم المستخدم"      onChange={handleChange} required />}
              <input className="gov-input" name="email"    type="email"    placeholder="البريد الإلكتروني" onChange={handleChange} required />
              <input className="gov-input" name="password" type="password" placeholder="كلمة المرور"       onChange={handleChange} required />
              <button type="submit" className="gov-submit-btn">{isLogin ? 'دخول' : 'إنشاء حساب'}</button>
            </form>
            <div className="divider-text">أو عبر</div>
            <div className="gov-social-row">
              <button className="gov-social-btn google"   onClick={handleGoogleLogin}><img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" /> Google</button>
              <button className="gov-social-btn facebook" onClick={handleFacebookLogin}><img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="FB" /> Facebook</button>
            </div>
            <p className="gov-toggle-text">
              {isLogin ? 'ليس لديك حساب؟ ' : 'لديك حساب؟ '}
              <span className="gov-toggle-link" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'سجل هنا' : 'سجل دخولك'}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MansouraPage;