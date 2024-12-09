import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/DataManagement.css';

function DataManagement() {
  const navigate = useNavigate();

  return (
    <div className="data-management-content">
      <h1 className="data-management-title">레시피 통계 확인</h1>
      <button className="inquiry-button" onClick={() => navigate('/inquiry')}>문의 보기</button>
      <ul className="data-category-list">
        <li>한식 <span>→</span></li>
        <li>중식 <span>→</span></li>
        <li>양식 <span>→</span></li>
        <li>일식 <span>→</span></li>
        <li>기타 <span>→</span></li>
      </ul>
    </div>
  );
}

export default DataManagement;
