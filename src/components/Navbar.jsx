import React, { useState, useContext } from 'react'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext'; 
import logo from '../assets/logo.png'; 

function Navbar() {
  const { user, setUser, logout } = useContext(AuthContext); 
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [hoveredPath, setHoveredPath] = useState(null); // لإضافة تأثير اللون الأصفر

  const navigate = useNavigate();
  const location = useLocation();

  // التحقق لو إحنا في الصفحة الرئيسية أو صفحة البحث
  const isHome = location.pathname === '/' || location.pathname.startsWith('/search');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = 'http://localhost:5005'; 
    const url = isLogin ? `${baseUrl}/api/auth/login` : `${baseUrl}/api/auth/register`;
    
    try {
      const response = await axios.post(url, formData);
      if (isLogin) {
        const userData = response.data.user;
        setUser(userData); 
        localStorage.setItem('user', JSON.stringify(userData));
        setShowAuthModal(false);
        alert(`أهلاً يا ${userData.username}، نورت إيمجرنت!`);
      } else {
        setIsLogin(true);
        alert("تم التسجيل بنجاح");
      }
    } catch (err) {
      alert("مشكلة في الدخول: " + (err.response?.data?.message || "السيرفر مش بيرد"));
    }
  };

  return (
    <>
      <nav className="navbar" style={navStyle}>
        {/* 1. اللوجو */}
        <div className="nav-logo" onClick={() => navigate('/')} style={logoContainerStyle}>
          <img 
            src={logo} 
            alt="لوجو إيمجرنت" 
            style={{ height: '50px', width: 'auto', objectFit: 'contain' }} 
          />
        </div>

        {/* 2. الـ Breadcrumbs (المسار) - يظهر فقط في الصفحات الداخلية */}
        {!isHome && (
          <div className="breadcrumbs-nav" style={breadcrumbWrapper}>
            <span 
              onClick={() => navigate('/')}
              onMouseEnter={() => setHoveredPath('home')}
              onMouseLeave={() => setHoveredPath(null)}
              style={{...breadcrumbItem, color: hoveredPath === 'home' ? '#ffcc00' : '#fff'}}
            >
              الرئيسية
            </span>
            <span style={separatorStyle}>/</span>
            <span 
              onClick={() => navigate(-1)}
              onMouseEnter={() => setHoveredPath('city')}
              onMouseLeave={() => setHoveredPath(null)}
              style={{...breadcrumbItem, color: hoveredPath === 'city' ? '#ffcc00' : '#fff'}}
            >
              محافظة القاهرة
            </span>
            <span style={separatorStyle}>/</span>
            <span style={currentStepStyle}>المرافق العامة</span>
          </div>
        )}

        {/* 3. أزرار التحكم */}
        <div className="nav-actions" style={actionsWrapper}>
          {user ? (
            <div className="user-logged-in" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button onClick={() => navigate('/add-house')} className="btn-add">إضافة سكن</button>
              <div className="user-profile-circle" title={user.username}>
                {user.username ? user.username[0].toUpperCase() : 'U'}
              </div>
              <button onClick={logout} className="btn-logout">خروج</button>
            </div>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className="btn-login-trigger" style={loginBtnStyle}>
               تسجيل الدخول / إنشاء حساب
            </button>
          )}
        </div>
      </nav>

      {/* مودال تسجيل الدخول (نفس الكود بتاعك) */}
      {showAuthModal && (
        <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
           {/* ... محتوى المودال الخاص بك ... */}
        </div>
      )}
    </>
  );
}

// تنسيقات سريعة عشان تظبط الـ Breadcrumbs في النص بالظبط
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 40px',
  backgroundColor: '#1a1a1a',
  height: '75px',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  direction: 'rtl'
};

const breadcrumbWrapper = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '15px',
  fontWeight: 'bold'
};

const breadcrumbItem = { cursor: 'pointer', transition: '0.3s' };
const separatorStyle = { color: '#666', margin: '0 5px' };
const currentStepStyle = { color: '#ffcc00', borderBottom: '2px solid #ffcc00' };
const logoContainerStyle = { cursor: 'pointer', display: 'flex', alignItems: 'center' };
const actionsWrapper = { display: 'flex', alignItems: 'center' };
const loginBtnStyle = { 
  padding: '8px 18px', 
  borderRadius: '25px', 
  border: '1px solid #fff', 
  backgroundColor: 'transparent', 
  color: '#fff', 
  cursor: 'pointer' 
};

export default Navbar;