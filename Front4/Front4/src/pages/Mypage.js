import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../modules/contexts/AuthContext"; // AuthContext 불러오기
import "../components/css/Mypage.css";

const Mypage = () => {
  const { userInfo, logout } = useAuth(); // AuthContext에서 사용자 정보와 로그아웃 함수 가져오기
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState("/img/mypage.png");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    if (userInfo) {
      setWelcomeMessage(`환영합니다 ${userInfo.nickname} 님!`);
    }
  }, [userInfo]);

  const handleLogout = () => {
    logout(); // 로그아웃 처리
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <div className="mypage-container">
      <header className="header">
        <div className="welcome-text">{welcomeMessage}</div>
        <button className="logout-button" onClick={handleLogout}>
          로그아웃
        </button>
      </header>

      <h1 className="mypage-title">마이페이지</h1>
      <div className="hero-image">
        <img src={profileImage} alt="프로필 이미지" />
      </div>

      <div className="user-info-section">
        <p>회원 닉네임 : {userInfo?.nickname}</p>
        <Link to="/PasswordChange">
          <button className="button">비밀번호 변경하기</button>
        </Link>
        <button className="button">닉네임 변경하기</button>
        <button className="button">사진 변경하기</button>
      </div>

      <div className="mypage-buttons">
        <Link to="/InquiryForm">
          <button className="button">1:1 문의하기</button>
        </Link>
        <Link to="/Withdraw">
          <button className="button">회원탈퇴 하기</button>
        </Link>
      </div>

      <div className="extra-buttons">
        <button className="button">평가한 레시피 보기</button>
        <button className="button">작성글 보기</button>
        <button className="button">작성 댓글 보기</button>
      </div>
    </div>
  );
};

export default Mypage;
