import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <li><Link to="/login">로그인</Link></li>
          <li><Link to="/signup">회원가입</Link></li>
          <li><Link to="/inquiryForm">문의하기</Link></li>

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
                <li><Link to="/recipe">Recipe</Link></li>
                <li><Link to="/imageAnalysis">Image Analysis</Link></li>
                <li><Link to="/fridgeInventory">Fridge Inventory</Link></li>
              
              {/* 주석처리..?*/}
                  <li><Link to="/mypage">mypage</Link></li>  
                  <li><Link to="/recipe">recipe</Link></li>  
                  <li><Link to="/ingredient">ingredient</Link></li>  
                  <li><Link to="/imageAnalysis">imageAnalysis</Link></li>  
                  <li><Link to="/recipeResults">RecipeResults</Link></li>  
                  <li><Link to="/fridgeInventory">FridgeInventory</Link></li>  
                  <li><Link to="/withdraw">Withdraw</Link></li>  
                  <li><Link to="/passwordChange">PasswordChange</Link></li>  
                  <li><Link to="/ReportForm">ReportForm</Link></li>  
                  
                  <li><Link to="/manager">Manager</Link></li>  
                  <li><Link to="/memberList">MemberList</Link></li>
                  <li><Link to="/notice">Notice</Link></li>
                  <li><Link to="/nonMember">NonMember</Link></li>
                  <li><Link to="/dataManagement">DataManagement</Link></li>
              

              
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
