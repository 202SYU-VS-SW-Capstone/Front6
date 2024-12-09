import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h3>새길</h3>
          <p>새로운 길을 열어가는 혁신적인 서비스.</p>
        </div>
        <div className="footer-section">
          <h4>연락처</h4>
          <p>대표 이메일: contact@saegil.com</p>
          <p>고객센터: 1234-5678</p>
        </div>
        <div className="footer-section">
          <h4>팔로우하기</h4>
          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
      <p>© 2024 새길. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
