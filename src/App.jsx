import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home              from './components/Home';
import AddHouse          from './components/AddHouse';
import ApartmentHousing  from './components/ApartmentHousing';
import ProvincePage      from './components/ProvincePage';
import HouseDetails      from './components/HouseDetails';

import CairoPage         from './components/Governorates/CairoPage';
import CairoFacilities   from './components/Governorates/CairoFacilities';
import Alex              from './components/Governorates/Alex';
import AlexFacilities    from './components/Governorates/AlexFacilities';
import Tanta             from './components/Governorates/Tanta';
import TantaFacilities   from './components/Governorates/TantaFacilities';
import Mansoura          from './components/Governorates/Mansoura';
import MansouraFacilities from './components/Governorates/MansouraFacilities';

import axios from 'axios';

function App() {
  const [user, setUser]                   = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin]             = useState(true);
  const [formData, setFormData]           = useState({ username: '', email: '', password: '' });
  const [scrolled, setScrolled]           = useState(false);

  /* Restore session */
  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try { setUser(JSON.parse(saved)); }
      catch { console.error('خطأ في قراءة بيانات المستخدم'); }
    }
  }, []);

  /* Navbar scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? 'http://localhost:5005/api/auth/login'
      : 'http://localhost:5005/api/auth/register';
    try {
      const res = await axios.post(url, formData);
      if (isLogin) {
        const userData = res.data.user;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setShowAuthModal(false);
        alert(`أهلاً بك يا ${userData.username} 🎉`);
      } else {
        setIsLogin(true);
        alert('تم التسجيل بنجاح، يمكنك الآن تسجيل الدخول');
      }
    } catch (err) {
      alert('خطأ: ' + (err.response?.data?.message || 'فشل الاتصال'));
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="App">

        {/* ── Global Navbar (shown on non-Home pages) ── */}
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>
            <h2>إيــمــجــرنــت 🏠</h2>
          </Link>

          <div className="nav-actions">
            {user ? (
              <div className="user-logged-in">
                <div className="user-profile-circle" title={user.username}>
                  {user.username ? user.username[0].toUpperCase() : 'U'}
                </div>
                <button onClick={handleLogout} className="btn-logout">خروج</button>
              </div>
            ) : (
              <div
                className="auth-trigger-inline"
                onClick={() => setShowAuthModal(true)}
              >
                <span className="auth-text-large">تسجيل الدخول / إنشاء حساب</span>
              </div>
            )}
          </div>
        </nav>

        {/* ── Auth Modal ── */}
        {showAuthModal && (
          <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setShowAuthModal(false)}>×</button>
              <h2>{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</h2>

              <form onSubmit={handleSubmit} className="modal-form">
                {!isLogin && (
                  <input
                    name="username" type="text"
                    placeholder="اسم المستخدم"
                    onChange={handleInputChange} required
                  />
                )}
                <input
                  name="email" type="email"
                  placeholder="البريد الإلكتروني"
                  onChange={handleInputChange} required
                />
                <input
                  name="password" type="password"
                  placeholder="كلمة السر"
                  onChange={handleInputChange} required
                />
                <button type="submit" className="submit-auth">
                  {isLogin ? 'تسجيل الدخول' : 'إتمام التسجيل'}
                </button>
              </form>

              <p onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'لا تملك حساباً؟ سجل الآن' : 'لديك حساب بالفعل؟ سجل دخولك'}
              </p>
            </div>
          </div>
        )}

        {/* ── Routes ── */}
        <main>
          <Routes>
            <Route path="/"                    element={<Home user={user} setUser={setUser} />} />
            <Route path="/apartment-housing"   element={<ApartmentHousing user={user} setShowAuthModal={setShowAuthModal} />} />
            <Route path="/house/:id"           element={<HouseDetails />} />

            <Route path="/search/القاهرة"      element={<CairoPage   user={user} setUser={setUser} />} />
            <Route path="/search/الإسكندرية"  element={<Alex        user={user} setUser={setUser} />} />
            <Route path="/search/طنطا"         element={<Tanta       user={user} setUser={setUser} />} />
            <Route path="/search/المنصورة"    element={<Mansoura    user={user} setUser={setUser} />} />

            <Route path="/cairo/facilities"    element={<CairoFacilities />} />
            <Route path="/alex/facilities"     element={<AlexFacilities />} />
            <Route path="/mansoura/facilities" element={<MansouraFacilities />} />
            <Route path="/tanta/facilities"    element={<TantaFacilities />} />

            <Route path="/search/:name"        element={<ProvincePage />} />
            <Route path="/add-house"           element={user ? <AddHouse /> : <Home user={user} setUser={setUser} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;