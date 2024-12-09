import React, { useState, useEffect } from "react";
import "../components/css/PasswordChange.css";

const PasswordChange = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isMatched && password) {
      alert("비밀번호 변경이 완료되었습니다.");
      setPassword("");
      setConfirmPassword("");
    } else {
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
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
