import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Governorates.css';

function TantaPage({ user, setUser }) {
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
        alert(`أهلاً بك يا ${res.data.user.username} في عاصمة الدلتا 🕌`);
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
          <Link to="/"                 className="gov-nav-link">الرئيسية</Link>
          <Link to="/tanta/facilities" className="gov-nav-link">مرافق عامة</Link>
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
        <Link to="/"                 className="gov-nav-link" onClick={() => setMenuOpen(false)}>🏠 الرئيسية</Link>
        <Link to="/tanta/facilities" className="gov-nav-link" onClick={() => setMenuOpen(false)}>🕌 مرافق عامة</Link>
      </div>

      {/* ── Hero ── */}
      <div className="gov-hero" style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/a/ab/Mosque_of_St._Ahmed_El-Badawi.jpg')` }}>
        <div className="gov-hero-content">
          <h1>طنطا</h1>
          <p>الرئيسية › جمهورية مصر العربية › الغربية › طنطا</p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="gov-container">
        <h2 className="gov-section-title">دليل مدينة طنطا — عاصمة الدلتا</h2>

        <div className="gov-info-row">
          <div className="gov-info-card">
            <h3>🕌 مدينة طنطا: قلب الغربية</h3>
            <p>طنطا هي عاصمة محافظة الغربية، وتعتبر من أهم المدن المصرية وأكبر مدن منطقة الدلتا. تقع في منتصف الطريق بين القاهرة والإسكندرية، مما يجعلها نقطة وصل حيوية. تشتهر بكونها مركزاً تجارياً وصناعياً هاماً، خاصة في مجالات المنسوجات والزيوت والصابون، كما أنها وجهة دينية وسياحية كبرى لوجود مسجد سيدي أحمد البدوي.</p>
          </div>
          <div className="gov-image-box">
            <img src="https://i.pinimg.com/736x/f5/18/a7/f518a7510448a470098d7a485b989e07.jpg" alt="Tanta Mosque" />
            <div className="gov-image-caption">مسجد السيد البدوي</div>
          </div>
        </div>

        <div className="gov-info-row">
          <div className="gov-info-card">
            <h3>🎓 التعليم والثقافة في طنطا</h3>
            <p>تعتبر جامعة طنطا واحدة من أعرق الجامعات المصرية، وتضم كليات في كافة التخصصات، مما جعل المدينة وجهة للطلاب من مختلف المحافظات. وتُعرف طنطا تاريخياً بـ"مدينة العلم" حيث كانت منارة تعليمية في قلب الدلتا.</p>
          </div>
          <div className="gov-image-box">
            <img src="https://view.tanta.edu.eg/univ/5a3882ff-0fbf-4105-aacf-96e4c20262689bae88e0-84e1-4a28-a997-817b765563728317A629-F269-4C09-94D1-7E4BEDDDC92D.jpeg" alt="Tanta University" />
            <div className="gov-image-caption">جامعة طنطا</div>
          </div>
        </div>

        <div className="gov-info-row">
          <div className="gov-info-card">
            <h3>🏛️ أشهر معالم طنطا</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
              {['مسجد السيد أحمد البدوي','جامعة طنطا','حديقة الأندلس','مسرح طنطا','مول طنطا الجديد','نادي طنطا الرياضي','شارع البحر الرئيسي','متحف طنطا الآثاري'].map((m) => (
                <li key={m} style={{ fontSize: '0.88rem', color: '#374151', padding: '8px 12px', background: '#f3f4f8', borderRadius: 8 }}>✓ {m}</li>
              ))}
            </ul>
          </div>
          <div className="gov-image-box">
            <img src="https://media.gemini.media/img/original/2019/6/19/2019_6_19_13_59_10_196.jpg" alt="Tanta Streets" />
            <div className="gov-image-caption">مول طنطا التجاري</div>
          </div>
        </div>

        <div className="gov-map-section">
          <h2 className="gov-section-title">📍 موقع طنطا على الخريطة</h2>
          <div className="gov-map-container">
            <iframe
              title="Tanta Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54751.04250269095!2d30.97151034863281!3d30.79469550000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7c9780a8767e3%3A0xc3f3453303c734!2sTanta!5e0!3m2!1sen!2seg!4v1700000000000"
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

export default TantaPage;