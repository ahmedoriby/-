import React, { useState, useEffect } from 'react';
import './Home.css';

const provinces = [
  { id: 1, name: 'القاهرة',      img: 'https://i.pinimg.com/1200x/79/d4/43/79d4430efd428156c4805accbd0a3586.jpg' },
  { id: 2, name: 'الإسكندرية',  img: 'https://i.pinimg.com/736x/d2/74/de/d274de3913f631e3de67757735c987a3.jpg' },
  { id: 3, name: 'المنصورة',    img: 'https://i.pinimg.com/1200x/b0/01/7b/b0017bab0851e1cdd9f1e60d2700b9e6.jpg' },
  { id: 4, name: 'طنطا',        img: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Mosque_of_St._Ahmed_El-Badawi.jpg' },
];

const stats = [
  { number: '+500',  label: 'وحدة سكنية' },
  { number: '4',     label: 'محافظات' },
  { number: '+1000', label: 'مستخدم' },
  { number: '24/7',  label: 'دعم متواصل' },
];

function Home({ user, setUser }) {
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [isSignup, setIsSignup]         = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [formData, setFormData]         = useState({ username: '', email: '', password: '' });

  /* Navbar scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? '/api/auth/register' : '/api/auth/login';
    try {
      const res  = await fetch(`http://localhost:5005${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setIsModalOpen(false);
        alert(`أهلاً بك يا ${data.user.username} 🎉`);
      } else {
        alert(data.message || data.error || 'خطأ في البيانات');
      }
    } catch {
      alert('السيرفر غير متاح — تأكد من تشغيل الـ Backend على بورت 5005');
    }
  };

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <div className="home-container">

      {/* ── Navbar ── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-logo">🏠 إيمجرنت</div>

        <div className="navbar-links">
          <a href="/" className="nav-link">الصفحة الرئيسية</a>
          <div className="nav-item dropdown">
            <span className="nav-link">السكن ▾</span>
            <div className="dropdown-menu">
              <a href="/apartment-housing">🏢 سكن شقق</a>
            </div>
          </div>
        </div>

        <div className="navbar-auth">
          {user ? (
            <div className="user-info-display">
              <span>👤 {user.username}</span>
              <button onClick={handleLogout} className="logout-mini-btn">تسجيل الخروج</button>
            </div>
          ) : (
            <button
              className="login-btn"
              onClick={() => { setIsSignup(false); setIsModalOpen(true); }}
            >
              <span>تسجيل الدخول</span>
              <i className="user-icon">👤</i>
            </button>
          )}
        </div>
      </nav>

      {/* ── Auth Modal ── */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setIsModalOpen(false)}>×</button>

            <h2>{isSignup ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}</h2>

            <form className="login-form" onSubmit={handleAuth}>
              {isSignup && (
                <input name="username" type="text" placeholder="اسم المستخدم" required onChange={handleInputChange} />
              )}
              <input name="email"    type="email"    placeholder="البريد الإلكتروني" required onChange={handleInputChange} />
              <input name="password" type="password" placeholder="كلمة المرور"       required onChange={handleInputChange} />
              <button type="submit" className="submit-btn">
                {isSignup ? 'إنشاء حساب' : 'دخول'}
              </button>
            </form>

            <div className="divider">أو تسجيل عبر</div>

            <div className="social-login-container">
              <button className="social-btn google">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" />
                Google
              </button>
              <button className="social-btn facebook">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" />
                Facebook
              </button>
            </div>

            <p className="signup-text">
              {isSignup ? 'عندك حساب فعلاً؟ ' : 'ليس لديك حساب؟ '}
              <span onClick={() => setIsSignup(!isSignup)} className="toggle-auth">
                {isSignup ? 'سجل دخول هنا' : 'سجل هنا'}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <section className="hero-section-clean">
        <video autoPlay loop muted playsInline className="hero-video">
          <source
            src="https://res.cloudinary.com/dqfssku6h/video/upload/v1771601645/the-power-of-the-ancestors_on75me.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content-wrapper">
          <h1 className="hero-title">جمهورية مصر العربية</h1>
          <p className="hero-subtitle">ابحث عن مسكنك المثالي في أكبر المدن المصرية</p>
          <div className="hero-btn-group">
            <a href="#provinces" className="hero-cta-primary">استكشف المحافظات 🗺️</a>
            <a href="/apartment-housing" className="hero-cta-secondary">تصفح الشقق</a>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <div className="scroll-dot" />
          <span>اسحب للأسفل</span>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="stats-bar">
        {stats.map((s, i) => (
          <div className="stat-item" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="stat-number">{s.number}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Provinces ── */}
      <section className="provinces-section" id="provinces">
        <div className="provinces-section-header">
          <div className="section-label">🏙️ المحافظات</div>
          <h2>اختر محافظتك</h2>
          <p>نوفر لك أفضل خيارات السكن في قلب المدن المصرية الكبرى</p>
        </div>

        <div className="provinces-grid">
          {provinces.map((prov) => (
            <a key={prov.id} href={`/search/${prov.name}`} className="province-card">
              <img src={prov.img} alt={prov.name} loading="lazy" />
              <div className="card-center-overlay">
                <h3>{prov.name}</h3>
                <span className="card-explore-tag">استكشف →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;