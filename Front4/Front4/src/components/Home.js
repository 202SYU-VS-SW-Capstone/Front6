import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 임포트
import './css/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="main-section">
        <h2>“식재료 사진을 업로드 해주세요! 냉장고 관리를 도와 드릴게요!”</h2>
        <img src={`${process.env.PUBLIC_URL}/img/1.jpg`} alt="메인" className="main-image" />
        
        {/* Link 컴포넌트를 사용하여 페이지 이동 */}
        <Link to="/ImageAnalysis" className="upload-button">재료 분석하기</Link> 
      </div>

      <section className="recipe-section">
        <h3>레시피 구경하기</h3>
        <div className="gallery">
          <div className="gallery-item">
            <img src={`${process.env.PUBLIC_URL}/img/1.jpg`} alt="바삭 돈까스 레시피" />
            <p>@foodlover의 "바삭 돈까스 레시피"</p>
            <span>우리 가족 최애 반찬!</span>
          </div>
          <div className="gallery-item">
            <img src={`${process.env.PUBLIC_URL}/img/2.png`} alt="매콤 떡볶이 레시피" />
            <p>@spicyqueen의 "매콤 떡볶이 레시피"</p>
            <span>한국인의 소울 푸드!</span>
          </div>
          <div className="gallery-item">
            <img src={`${process.env.PUBLIC_URL}/img/3.png`} alt="버터 크루와상 레시피" />
            <p>@bakerylove의 "버터 크루와상 레시피"</p>
            <span>바삭바삭 크루와상!</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
