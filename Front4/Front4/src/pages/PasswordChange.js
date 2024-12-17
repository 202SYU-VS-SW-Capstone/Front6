import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../modules/contexts/AuthContext"; // AuthContext에서 현재 사용자 정보 가져오기
import { changePassword } from "../modules/api/memberApi"; // 비밀번호 변경 API 함수
import "../components/css/PasswordChange.css";

const PasswordChange = () => {
  const navigate = useNavigate();
  const { userInfo, logout } = useAuth(); // 현재 로그인한 사용자 정보와 로그아웃 함수
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatched, setIsMatched] = useState(true);

  useEffect(() => {
    if (password && confirmPassword) {
      setIsMatched(password === confirmPassword);
    } else {
      setIsMatched(true);
    }
  }, [password, confirmPassword]);

  console.log("userInfo in PasswordChange:", userInfo);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isMatched || !password) {
      alert("비밀번호가 일치하지 않거나 비어있습니다.");
      return;
    }

    try {
      // 비밀번호 변경 API 요청
      const response = await changePassword({
        memberId: userInfo?.memberId, // AuthContext에서 가져온 memberId
        newPassword: password,
      });

      if (response.success) {
        alert("비밀번호 변경 성공! 다시 로그인해주세요.");
        logout(); // 로그아웃 처리
        navigate("/login"); // 로그인 페이지로 이동
      } else {
        alert(response.message || "비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 변경 중 오류 발생:", error);
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="password-change-container">
      <h1 className="password-change-title">비밀번호 변경</h1>
      <div className="password-change-content">
      <div className="password-change-image-container">
          <img
            src="/img/mypage.png" // 원하는 이미지 경로로 수정
            alt="비밀번호 변경 관련 이미지"
            className="password-change-image"
          />
        </div>
        <div className="password-change-form-container">
          <form onSubmit={handleSubmit} className="password-change-form">
            <input
              type="password"
              placeholder="새 비밀번호를 입력하세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="password-change-input"
            />
            <input
              type="password"
              placeholder="비밀번호를 다시 입력하세요."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="password-change-input"
            />
            {!isMatched && (
              <p className="password-change-error-message">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
            <button type="submit" className="password-change-button">
              네, 비밀번호를 변경하겠습니다.
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
