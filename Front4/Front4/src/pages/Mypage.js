import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 추가
import "../components/css/Mypage.css";

const Mypage = () => {
  const [userName, setUserName] = useState("홍길동");
  const [profileImage, setProfileImage] = useState("/path/to/새길로고.png");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = {
          name: "홍길동",
          image: "/img/mypage.png",
        };

        setUserName(userData.name);
        setProfileImage(userData.image);
        setWelcomeMessage(`환영합니다 ${userData.name} 님!`);
      } catch (error) {
        console.error("사용자 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="mypage-container">
      <header className="header">
        <div className="welcome-text">{welcomeMessage}</div>
        <button className="logout-button">로그아웃</button>
      </header>

      <h1 className="mypage-title">마이페이지</h1>
      <div className="hero-image">
        <img src={profileImage} alt="Hero Image" />
      </div>

      <div className="user-info-section">
        <p>회원 닉네임 : {userName}</p>
        <Link to="/PasswordChange"><button className="button">비밀번호 변경하기</button></Link>
        <button className="button">닉네임 변경하기</button>
        <button className="button">사진 변경하기</button>
      </div>

      <div className="mypage-buttons">
        {/* Link 컴포넌트를 사용하여 InquiryForm 페이지로 이동 */}
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
