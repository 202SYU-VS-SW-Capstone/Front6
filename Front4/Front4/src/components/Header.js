import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../modules/contexts/AuthContext'; // AuthContext에서 useAuth 가져오기
import './css/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, userInfo, logout } = useAuth(); // 로그인 상태, 유저 정보, 로그아웃 함수 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout(); // 로그아웃 실행
    navigate('/login'); // 로그인 페이지로 이동
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleSubmenu = () => {
    setSubmenuOpen((prev) => !prev); // 서브메뉴 상태만 토글
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav>
        {/* 로고 */}
        <Link to="/" className="nav-logo">
          <img src="img/logo.png" alt="새길 로고" className="logo-image" />
        </Link>

        {/* 데스크탑 메뉴 */}
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {isLoggedIn ? (
            // 로그인 상태일 때 메뉴
            <>
              <li>
                <span>안녕하세요, {userInfo?.nickname}님!</span>
              </li>
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
              <li>
                <Link to="/login" onClick={handleLogout}>로그아웃</Link>
              </li>
            </>
          ) : (
            // 비로그인 상태일 때 메뉴
            <>
              <li><Link to="/login">로그인</Link></li>
              <li><Link to="/signup">회원가입</Link></li>
            </>
          )}

          {/* 서브메뉴 */}
          <li
            className="submenu-container"
            onClick={toggleSubmenu} // 클릭 시 서브메뉴 열기/닫기
            onMouseEnter={() => setSubmenuOpen(true)} // 마우스를 올리면 서브메뉴 열기
            onMouseLeave={() => !submenuOpen && setSubmenuOpen(false)} // 서브메뉴가 열려있지 않으면 마우스를 빼면 닫기
          >
            <Link to="#"> ☰</Link>
            {submenuOpen && (
              <ul className="submenu"> 
                <li><Link to="/imageAnalysis">이미지 분석</Link></li>
                <li><Link to="/fridgeInventory">나의 냉장고</Link></li> 
                <li><Link to="/ingredient">재료 등록하기</Link></li>   
                <li><Link to="/recipeResults">추천 레시피?</Link></li>    
                <li><Link to="/withdraw">탈퇴하기</Link></li>  
                <li><Link to="/passwordChange">비밀번호 변경하기</Link></li>  
                <li><Link to="/ReportForm">신고하기</Link></li>  
              </ul>
            )}
          </li>
        </ul>
      
        {/* 모바일 메뉴 토글 */}
        <div className="menu-toggle" onClick={toggleMenu}>
          ☰
        </div>
      </nav>
    </header>
  );
};

export default Header;
