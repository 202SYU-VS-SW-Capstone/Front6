import React, { useState, useEffect } from "react";
import "../components/css/Withdraw.css";

const Withdraw = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatched, setIsMatched] = useState(true);

  // 비밀번호와 확인 비밀번호 일치 여부를 확인
  useEffect(() => {
    if (password && confirmPassword) {
      setIsMatched(password === confirmPassword);
    } else {
      setIsMatched(true); // 입력이 없으면 경고 숨김
    }
  }, [password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isMatched && password) {
      alert("탈퇴가 완료되었습니다.");
    } else {
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
    }
  };

  return (
    <div className="Withdraw-container">
      <h1 className="Withdraw-title">탈퇴하기</h1>
      <div className="Withdraw-image-container">
        <img
          src="/img/mypage.png" // 원하는 이미지 경로로 수정
          alt="탈퇴 관련 이미지"
          className="Withdraw-image"
        />
      </div>
      <form className="Withdraw-form" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="Withdraw-input"
        />
        <input
          type="password"
          placeholder="비밀번호 확인을 위해 다시 입력하세요."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="Withdraw-input"
        />
        {!isMatched && (
          <p className="Withdraw-error-message">
            비밀번호가 일치하지 않습니다.
          </p>
        )}
        <button type="submit" className="Withdraw-button">
          네, 탈퇴하겠습니다.
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
