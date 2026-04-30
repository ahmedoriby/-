import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Governorates.css';

function CairoPage({ user, setUser }) {
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
        alert(`أهلاً بك يا ${res.data.user.username} في القاهرة 🎉`);
      } else {
        setIsLogin(true);
        alert('تم التسجيل بنجاح، يمكنك الآن تسجيل الدخول');
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
          <Link to="/"                className="gov-nav-link">الرئيسية</Link>
          <Link to="/cairo/facilities" className="gov-nav-link">مرافق عامة</Link>
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
          {/* Hamburger */}
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
        <Link to="/"                className="gov-nav-link" onClick={() => setMenuOpen(false)}>🏠 الرئيسية</Link>
        <Link to="/cairo/facilities" className="gov-nav-link" onClick={() => setMenuOpen(false)}>🏙️ مرافق عامة</Link>
      </div>

      {/* ── Hero ── */}
      <div className="gov-hero" style={{ backgroundImage: `url('https://i.pinimg.com/1200x/3f/99/e7/3f99e7c5f7302608b8432635d1af7ed2.jpg')` }}>
        <div className="gov-hero-content">
          <h1>القاهرة</h1>
          <p>الرئيسية › جمهورية مصر العربية › القاهرة</p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="gov-container">
        <h2 className="gov-section-title">دليل مدينة القاهرة الشامل</h2>

        <div className="gov-info-row">
          <div className="gov-info-card">
            <h3>🏰 تاريخ القاهرة ونشأتها</h3>
            <p>بدأ بناء العاصمة الجديدة للدولة الفاطمية في مصر على يد القائد جوهر الصقلي بأمر من الخليفة المعز لدين الله الفاطمي عام 969 م وأطلق عليها في ذلك الوقت اسم المنصورية، وعند وصول الخليفة المعز لدين الله إلى مصر ودخل المدينة الجديدة وأسماها القاهرة.</p>
          </div>
          <div className="gov-image-box">
            <img src="https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1000" alt="Old Cairo" />
            <div className="gov-image-caption">مسجد الرفاعي</div>
          </div>
        </div>

        <div className="gov-info-row">
          <div className="gov-info-card">
            <h3>🏙️ دليل مدينة القاهرة في مصر</h3>
            <p>مدينة القاهرة هي عاصمة جمهورية مصر العربية، وهي أكبر وأهم مدنها، وتعد أكبر مدينة عربية من حيث المساحة وعدد السكان، حيث يبلغ عدد سكانها حوالي 21.3 مليون نسمة.</p>
          </div>
          <div className="gov-image-box">
            <img src="https://i.pinimg.com/1200x/86/6e/f6/866ef6160bbe9dffb69e36bb24602cf7.jpg" alt="Cairo Square" />
            <div className="gov-image-caption">ميدان التحرير</div>
          </div>
        </div>

        {/* Map */}
        <div className="gov-map-section">
          <h2 className="gov-section-title">📍 خريطة المواقع الحيوية</h2>
          <div className="gov-map-container">
            <iframe
              title="Cairo Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.60389531818!2d31.188423485747067!3d30.059488470356165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296efaa6095!2sCairo!5e0!3m2!1sen!2seg!4v1700000000000"
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
              <button className="gov-social-btn google" onClick={handleGoogleLogin}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" /> Google
              </button>
              <button className="gov-social-btn facebook" onClick={handleFacebookLogin}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" /> Facebook
              </button>
            </div>
            <p className="gov-toggle-text">
              {isLogin ? 'ليس لديك حساب؟ ' : 'لديك حساب؟ '}
              <span className="gov-toggle-link" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'سجل هنا' : 'سجل دخولك'}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CairoPage;