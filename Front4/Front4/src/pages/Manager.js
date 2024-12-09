import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/Manager.css';

const Manager = () => {
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    navigate(page);
  };

  return (
    <div className="manager-container">
      <h2>원하는 관리 페이지를 선택하세요</h2>
      <div className="button-grid">
        <button onClick={() => handleNavigation('/memberlist')} className="manager-button">회원 관리</button>
        <button onClick={() => handleNavigation('/recipe')} className="manager-button">레시피 관리</button>
        <button onClick={() => handleNavigation('/notice')} className="manager-button">컨텐츠 관리</button>
        <button onClick={() => handleNavigation('/dataManagement')} className="manager-button">데이터 관리</button>
      </div>
    </div>
  );
};

export default Manager;
