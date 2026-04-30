import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Governorates.css';

function Alex({ user, setUser }) {
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
        alert(`أهلاً بك في الإسكندرية يا ${res.data.user.username} 🌊`);
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
          <Link to="/alex/facilities" className="gov-nav-link">مرافق عامة</Link>
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
        <Link to="/"                className="gov-nav-link" onClick={() => setMenuOpen(false)}>🏠 الرئيسية</Link>
        <Link to="/alex/facilities" className="gov-nav-link" onClick={() => setMenuOpen(false)}>🌊 مرافق عامة</Link>
      </div>

      {/* ── Hero ── */}
      <div className="gov-hero" style={{ backgroundImage: `url('https://a0.muscache.com/im/pictures/Mt/MtTemplate-6947899/original/7938bb87-6034-4a1e-ba93-7e352b3a7466.jpeg?im_w=960')` }}>
        <div className="gov-hero-content">
          <h1>الإسكندرية</h1>
          <p>الرئيسية › جمهورية مصر العربية › الإسكندرية</p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="gov-container">
        <h2 className="gov-section-title">دليل مدينة الإسكندرية الشامل</h2>

        <div className="gov-info-row">
          <div className="gov-info-card">
            <h3>🌊 عروس البحر المتوسط</h3>
            <p>الإسكندرية الملقبة بعروس البحر الأبيض المتوسط، هي واحدة من أهم المحافظات الساحلية في مصر، وتعدّ العاصمة الثانية لمصر وتضم أكبر الموانئ البحرية، كما تتميز بتاريخها العريق ومبانيها الكلاسيكية.</p>
          </div>
          <div className="gov-image-box">
            <img src="https://i.pinimg.com/736x/0b/79/a7/0b79a77f9cf568cec725ba9f25e34307.jpg" alt="Alexandria" />
            <div className="gov-image-caption">كورنيش الإسكندرية</div>
          </div>
        </div>

        <div className="gov-info-row">
          <div className="gov-info-card">
            <h3>🏢 التاريخ والتخطيط العمراني</h3>
            <p>تأسست مدينة الإسكندرية عام 332 ق.م على يد الإسكندر الأكبر، لتكون مركزاً حضارياً يجمع بين الشرق والغرب، وظلت لقرون منارة للعلم والثقافة بوجود مكتبتها التاريخية العريقة.</p>
          </div>
          <div className="gov-image-box">
            <img src="https://i.pinimg.com/1200x/a2/fc/71/a2fc714d88d8cb3b546a53fb487def4f.jpg" alt="Qaitbay" />
            <div className="gov-image-caption">قلعة قايتباي الأثرية</div>
          </div>
        </div>

        <div className="gov-info-row">
          <div className="gov-info-card">
            <h3>🏛️ المعالم السياحية والأثرية</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
              {['مكتبة الإسكندرية الجديدة','متحف الأحياء المائية','قلعة قايتباي','مقابر كوم الشقافة','المتحف اليوناني الروماني','المسرح الروماني'].map((m) => (
                <li key={m} style={{ fontSize: '0.9rem', color: '#374151', padding: '8px 12px', background: '#f3f4f8', borderRadius: 8 }}>✓ {m}</li>
              ))}
            </ul>
          </div>
          <div className="gov-image-box">
            <img src="https://i.pinimg.com/1200x/91/05/ad/9105adc46836386e01da501cc8aa84ed.jpg" alt="History" />
            <div className="gov-image-caption">التراث السكندري</div>
          </div>
        </div>

        <div className="gov-map-section">
          <h2 className="gov-section-title">📍 الخريطة التفاعلية</h2>
          <div className="gov-map-container">
            <iframe
              title="Alexandria Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109166.36872584556!2d29.85196305!3d31.200092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c49126714fd3%3A0xb4e0c7a7e10a69a0!2sAlexandria!5e0!3m2!1sen!2seg!4v1700000000000"
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

export default Alex;