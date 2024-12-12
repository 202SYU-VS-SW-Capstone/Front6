import React, { useState } from 'react';
import '../components/css/Signup.css';
import { useNavigate } from 'react-router-dom';
import { signup } from '../modules/api/memberApi'; // API 함수 import

const Signup = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [termsAccepted, setTermsAccepted] = useState({
    privacyPolicy: false,
    dataSharing: false,
    marketing: false,
  });

  // 회원가입 처리 함수
  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const signupData = {
      email: username,
      password,
      nickname,
      securityQuestion,
      securityAnswer,
      memberType: "Regular", // 기본 회원 유형 설정
      joinDate: new Date().toISOString().split('T')[0], // 오늘 날짜
    };

    try {
      await signup(signupData); // API 함수 호출
      alert("회원가입이 완료되었습니다.");
      navigate('/login'); // 성공 후 로그인 페이지로 이동
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert(error.message || "회원가입에 실패했습니다.");
    }
  };

  const handleCheckboxChange = (e) => {
    setTermsAccepted({
      ...termsAccepted,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <div className="input-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
              required
            />
            <button type="button" className="duplicate-check-btn">중복확인</button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password-confirm">비밀번호 확인</label>
          <input
            type="password"
            id="password-confirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nickname">닉네임</label>
          <div className="input-group">
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
              required
            />
            <button type="button" className="duplicate-check-btn">중복확인</button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="security-question">비밀번호 찾기 질문</label>
          <select
            id="security-question"
            value={securityQuestion}
            onChange={(e) => setSecurityQuestion(e.target.value)}
            required
          >
            <option value="" disabled>선택하세요</option>
            <option value="pet">반려동물 이름은?</option>
            <option value="school">초등학교 이름은?</option>
            <option value="movie">가장 좋아하는 영화 제목은?</option>
            <option value="trip">처음으로 다녀온 여행지는 어디인가요?</option>
            <option value="book">가장 좋아하는 책 제목은 무엇인가요?</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="security-answer">답변</label>
          <input
            type="text"
            id="security-answer"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            placeholder="답변을 입력하세요"
            required
          />
        </div>

        <fieldset className="terms-container">
          <legend>이용약관</legend>
          <label>
            개인정보 수집에 동의합니다. (필수)
            <input
              type="checkbox"
              name="privacyPolicy"
              checked={termsAccepted.privacyPolicy}
              onChange={handleCheckboxChange}
              required
            />
          </label>
          <label>
            개인정보 제공에 동의합니다. (필수)
            <input
              type="checkbox"
              name="dataSharing"
              checked={termsAccepted.dataSharing}
              onChange={handleCheckboxChange}
              required
            />
          </label>
          <label>
            마케팅 정보 수신에 동의합니다. (선택)
            <input
              type="checkbox"
              name="marketing"
              checked={termsAccepted.marketing}
              onChange={handleCheckboxChange}
            />
          </label>
        </fieldset>

        <button type="submit" className="submit-button">회원가입 하기</button>
        <p className="login-link">
          이미 계정이 있으신가요? <a href="./Login">로그인 하러 가기</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
